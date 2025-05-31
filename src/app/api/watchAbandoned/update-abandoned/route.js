import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {WatchAbondendModel1,WatchAbondendModel2} from "../../../../../models/watchAbanModel";
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const id = searchParams.get("id")
    const token = searchParams.get("token")
    const body=await request.json()
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      const updatedOrder = await WatchAbondendModel1.findByIdAndUpdate(id, body, {
        new: true,
      });
      const updatedOrder1 = await WatchAbondendModel2.findByIdAndUpdate(id, body, {
        new: true,
      });
      if(updatedOrder && updatedOrder1){
        return Response.json(updatedOrder)
      }
      else{
        return Response.json({
            status:400, message:"Unable to Update Abandoned",error:error
          })
      }
    } catch (error) {
      return Response.json({
        success:false, message:"Server Error",error:error
      },{status:500})
    }
  }