import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {OrderModel1,OrderModel2} from "../../../../../models/orderModel";
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const id = searchParams.get("id")
    const token = searchParams.get("token")

    const body=await request.json()
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      const updatedOrder = await OrderModel1.findByIdAndUpdate(id, body, {
        new: true,
      });
      const updatedOrder1 = await OrderModel2.findByIdAndUpdate(id, body, {
        new: true,
      });
      if(updatedOrder && updatedOrder1){
        return Response.json(updatedOrder)
      }
      else{
        return Response.json({
            status:400, message:"Unable to Update Order",error:error
          },{status:400})
      }
    } catch (error) {
      return Response.json({
        status:500, message:"Server Error",error:error
      },{status:500})
    }
  }