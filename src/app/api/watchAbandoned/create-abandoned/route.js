import WatchProduct from "../../../../../models/watchProductModel"; // Your Product model
import WatchAbondend from "../../../../../models/watchAbanModel";
import connectDb from "../../../../../config/connectDb";
// Function to update inventory after order creation

export async function POST(req,res){
  const body = await req.text(); // Read the raw body as a string
  const parsedBody = JSON.parse(body); // Parse the string as JSON
  const { shippingInfo, orderItems, totalPrice, finalAmount, shippingCost, orderType, discount, paymentInfo } = parsedBody;
  try {
    await connectDb()
    // If inventory is sufficient, create the order
    const order = await WatchAbondend.create({
      shippingInfo,
      orderItems,
      totalPrice,
      finalAmount,
      shippingCost,
      orderType,
      discount,
      paymentInfo,
    });
    const order1=await WatchAbondend.findById(order._id).populate("orderItems.product")

  
    
    return Response.json(
      { success: true, status: "Abandoned Created"},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Creating Abandoned:", error.message);
    return Response.json(
      { success: false, error: "Failed to create Abandoned" },
      { status: 500 }
    );
  }
};

