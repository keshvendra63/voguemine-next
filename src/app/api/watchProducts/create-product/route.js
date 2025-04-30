import connectDb from "../../../../../config/connectDb";
import authMiddleware from "../../../../../controller/authController";
import WatchProduct from "../../../../../models/watchProductModel";
export async function POST(req){
  const {searchParams}=new URL(req.url)
  const token=searchParams.get("token")
    const body = await req.json();
    try {
        await connectDb()
        await authMiddleware(token)
      const newProduct = await WatchProduct.create(body);

      if(newProduct){
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