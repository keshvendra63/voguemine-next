import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {ProductModel1,ProductModel2} from "../../../../../models/productModel";
export async function POST(req){
  const {searchParams}=new URL(req.url)
  const token=searchParams.get("token")
    const body = await req.json();
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      const newProduct = await ProductModel1.create(body);
      const newProduct1 = await ProductModel2.create({...body,_id:newProduct?._id});

      if(newProduct && newProduct1){
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