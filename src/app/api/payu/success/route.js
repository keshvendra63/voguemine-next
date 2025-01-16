import axios from "axios";
import connectDb from "../../../../../config/connectDb";
import Product from "../../../../../models/productModel";
const validateOrderPricesAndAmounts = async ({orderItems, totalPrice, finalAmount, discount, shippingCost}) => {
  try {
    let calculatedTotalPrice = 0;

    for (const orderItem of orderItems) {
      const { product, quantity, price: price } = orderItem;
      const productId = product;

      // Fetch product details from the database
      const foundProduct = await Product.findById(productId);

      if (!foundProduct) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      // Compare individual product prices
      if (foundProduct.price !== price) {
        throw new Error(
          `Price mismatch for product ${foundProduct.title}. Expected: ₹${foundProduct.price}, Received: ₹${price}`
        );
      }

      // Calculate the total price
      calculatedTotalPrice += foundProduct.price * quantity;

      // Optional: Validate inventory (as per your earlier logic)
      const variant = foundProduct.variants.find(
        (variant) =>
          variant.color === orderItem.color && variant.size === orderItem.size
      );

      if (!variant) {
        throw new Error(`Variant not found for color: ${orderItem.color}, size: ${orderItem.size}`);
      }

      if (variant.quantity < quantity) {
        throw new Error(`Not enough quantity available for ${orderItem.color} - ${orderItem.size}`);
      }
    }

    // Validate total price
    if (calculatedTotalPrice !== totalPrice) {
      throw new Error(
        `Total price mismatch. Expected: ₹${calculatedTotalPrice}, Received: ₹${totalPrice}`
      );
    }

    // Calculate the expected final amount
    const expectedFinalAmount = calculatedTotalPrice - discount + shippingCost;

    // Validate final amount
    if (expectedFinalAmount !== finalAmount) {
      throw new Error(
        `Final amount mismatch. Expected: ₹${expectedFinalAmount}, Received: ₹${finalAmount}`
      );
    }

    console.log("All prices and amounts validated successfully");
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const orderDataString = decodeURIComponent(searchParams.get("orderData"));
    const orderData = JSON.parse(orderDataString).payUdata;
    try {
        connectDb()
        await validateOrderPricesAndAmounts({orderItems:orderData?.orderItems, totalPrice:orderData?.totalPrice, finalAmount:orderData?.finalAmount, discount:orderData?.discount, shippingCost:orderData?.shippingCost});
            
        const response = await axios.post(
          "https://voguemine.com/api/order/create-order",
          (orderData)
        );
    
        // Step 5: Extract the necessary details from the API response
        const { success, orderNumber, amount, firstname } = response.data;
        
        if (success) {
          // Step 6: Construct the redirect URL with query parameters
          const redirectUrl = `https://voguemine.com/thankyou?orderNumber=${orderNumber}&firstname=${firstname}&amount=${amount}`;
    
          // Step 7: Redirect the user to the thank you page
          return new Response(null, {
            status: 302,
            headers: {
              Location: redirectUrl,  // Redirect user to the thank you page
            },
          });
        } else {
          // If order creation failed, return an error response
          return new Response(
            JSON.stringify({ success: false, error: "Order Creation Failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      
      } catch (error) {
        console.error("Error in GET handler:", error.message);
        return Response.json(
          { success: false, error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }