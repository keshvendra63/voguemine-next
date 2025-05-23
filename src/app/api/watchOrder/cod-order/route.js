import connectDb from "../../../../../config/connectDb";
import authMiddleware from "../../../../../controller/authController";
import WatchOrder from "../../../../../models/watchOrderModel";
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const orderId  = searchParams.get("id")
    const token  = searchParams.get("token")

    try {
        await connectDb()
        await authMiddleware(token)
      // Assuming you have a model named Order and Mongoose as the ORM
      const updatedOrder = await WatchOrder.findByIdAndUpdate(orderId, { orderType: 'COD' }, {
        new: true,
      });
      if(updatedOrder){
        return Response.json({message:"Order Marked as COD"})
      }
    } catch (error) {
      // Handle errors appropriately
      return Response.json({status:500,message:"Server Error",error:error},{status:500})
    }
  };
  