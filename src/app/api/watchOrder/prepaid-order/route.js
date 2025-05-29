import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {WatchOrderModel1,WatchOrderModel2} from "../../../../../models/watchOrderModel";
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const orderId  = searchParams.get("id")
    const token  = searchParams.get("token")

    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      // Assuming you have a model named Order and Mongoose as the ORM
      const updatedOrder = await WatchOrderModel1.findByIdAndUpdate(orderId, { orderType: 'Prepaid' }, {
        new: true,
      });
      const updatedOrder1 = await WatchOrderModel2.findByIdAndUpdate(orderId, { orderType: 'Prepaid' }, {
        new: true,
      });
      if(updatedOrder && updatedOrder1){
        return Response.json({message:"Order Marked as Prepaid"})
      }
    } catch (error) {
      // Handle errors appropriately
      return Response.json({status:500,message:"Server Error",error:error},{status:500})
    }
  };
  