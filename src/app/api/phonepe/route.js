import axios from "axios";
import uniqid from "uniqid";
import crypto from "crypto";
import connectDb from "../../../../config/connectDb";
import Product from "../../../../models/productModel";
// Utility function to generate SHA256 hash
const validateOrderPricesAndAmounts = async (orderItems, totalPrice, finalAmount, discount, shippingCost) => {
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
          (variant.color).toLowerCase().trim() === (orderItem.color).toLowerCase().trim() && (variant.size).toLowerCase().trim() === (orderItem.size).toLowerCase().trim()
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

const SHA256 = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};
export async function POST(request) {
  const body = await request.text(); // Read the raw body as a string
  const parsedBody = JSON.parse(body);
  try {
    const { amount, number, merchantTransactionId,shippingInfo, orderItems, totalPrice, finalAmount, shippingCost, orderType, discount, paymentInfo, tag, isPartial } = parsedBody
    await connectDb()
    await validateOrderPricesAndAmounts(orderItems, totalPrice, finalAmount, discount, shippingCost);
    const payEndpoint = "/pg/v1/pay";
    const userId = "MUID" + uniqid();
    // Payload for initiating payment
    const payload = {
      merchantId: process.env.PMID,
      merchantTransactionId,
      merchantUserId: userId,
      amount: amount * 100, // Convert to smallest currency unit
      redirectUrl: `https://voguemine.com/api/phonepe/status?merchantTransactionId=${merchantTransactionId}&orderData=${JSON.stringify({parsedBody})}`,
      redirectMode: "POST",
      mobileNumber: number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    const base63EncodedPayload = bufferObj.toString("base64");
    const xVerify = SHA256(base63EncodedPayload + payEndpoint + process.env.PSALT) + "###" + process.env.PSALATINDEX;

    // Options for Axios request
    const options = {
      method: "POST",
      url: `${process.env.PHONEPE_HOST}${payEndpoint}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      data: {
        request: base63EncodedPayload,
      },
    };

    // Sending the request to PhonePe
    const paymentResponse = await axios.request(options);

    if (paymentResponse.data.success) {
      return Response.json(
        { success: true, url: paymentResponse.data.data.instrumentResponse.redirectInfo.url },
        { status: 200 }
      );
    } else {
      return Response.json(
        { success: false, error: "Payment initiation failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in POST handler:", error.message);
    return Response.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}