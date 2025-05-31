import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
// import Abondend from "../../../../../models/abandonedModel";
import { AbondendModel1,AbondendModel2 } from "../../../../../models/abandonedModel";
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const orderId  = searchParams.get("id")
    const token=searchParams.get("token")
    const orderTy=searchParams.get("type")
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      // Assuming you have a model named Order and Mongoose as the ORM
      const updatedOrder = await AbondendModel1.findByIdAndUpdate(orderId, { orderCalled: orderTy }, {
        new: true,
      });
      const updatedOrder1 = await AbondendModel2.findByIdAndUpdate(orderId, { orderCalled: orderTy }, {
        new: true,
      });
      if(updatedOrder && updatedOrder1){
        return Response.json({message:`Order Marked as ${orderTy}`})
      }
    } catch (error) {
      // Handle errors appropriately
      return Response.json({success:false,message:"Server Error",error:error},{status:500})
    }
  };
  