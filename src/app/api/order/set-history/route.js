import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import {OrderModel1,OrderModel2} from "../../../../../models/orderModel";
export async function PUT(req){
    const body=await req.json()
    const { name, message, time,orderId } = body;

    try {
        await connectDb()
        await connectDb2()
  
        // Update product with new rating and comment
        const messageOrder = await OrderModel1.findByIdAndUpdate(
            orderId,
            {
                $push: {
                    orderHistory: {
                        name: name,
                        message: message,
                        time: time,
                        orderId: orderId,
                    },
                },
            },
            { new: true }
        );
        const messageOrder1 = await OrderModel2.findByIdAndUpdate(
            orderId,
            {
                $push: {
                    orderHistory: {
                        name: name,
                        message: message,
                        time: time,
                        orderId: orderId,
                    },
                },
            },
            { new: true }
        );
  
  
        // Calculate new average rating for the product
  
        // Update product with new average rating
        const updatedOrder = await OrderModel1.findByIdAndUpdate(
            orderId,
            { new: true }
        );
        const updatedOrder1 = await OrderModel2.findByIdAndUpdate(
            orderId,
            { new: true }
        );
  
        return Response.json(updatedOrder);
    } catch (error) {
        console.error("Error while updating history:", error);
        return Response.json({status:500, message: "Internal server error" });
    }
  }