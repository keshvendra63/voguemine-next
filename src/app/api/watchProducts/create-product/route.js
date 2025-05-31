import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {WatchProductModel1,WatchProductModel2} from "../../../../../models/watchProductModel";
export async function POST(req){
  const {searchParams}=new URL(req.url)
  const token=searchParams.get("token")
    const body = await req.json();
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      const newProduct = await WatchProductModel1.create(body);
      const newProduct1 = await WatchProductModel2.create(body);


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
      console.log(error)
        return Response.json({
            status:500,message:error
        },{status:500})
    }
  }