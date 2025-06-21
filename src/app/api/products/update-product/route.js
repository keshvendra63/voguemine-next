import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {ProductModel1,ProductModel2} from "../../../../../models/productModel";
export async function PUT(request) {
    const {searchParams}=new URL(request.url)
    const id=searchParams.get("id")
    const token=searchParams.get("token")

    const body=await request.json()
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      const updateProduct = await ProductModel1.findByIdAndUpdate(id , body, {
        new: true,
      });
      const updateProduct1 = await ProductModel2.findByIdAndUpdate(id , body, {
        new: true,
      });
      if(updateProduct){
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
      console.log(error.message)
        return Response.json({
            status:500,message:error
        },{status:500})
    }
  }