import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {WatchProductModel1,WatchProductModel2} from "../../../../../models/watchProductModel";
export async function PUT(request) {
    const {searchParams}=new URL(request.url)
    const id=searchParams.get("id")
    const token=searchParams.get("token")

    const body=await request.json()
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      const updateProduct = await WatchProductModel1.findByIdAndUpdate(id , body, {
        new: true,
      });
      const updateProduct1 = await WatchProductModel2.findByIdAndUpdate(id , body, {
        new: true,
      });
      if(updateProduct && updateProduct1){
        return Response.json({
            status:200,message:"Product Created"
        },{status:200})
      }
      else{
        return Response.json({
            status:400,message:"Unable to Create Product"
        },{status:400})
      }
    } catch (error) {
        return Response.json({
            status:500,message:error
        },{status:500})
    }
  }