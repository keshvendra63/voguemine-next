import connectDb from "../../../../../config/connectDb"
import {ScrollModel1} from "../../../../../models/bannersModel"
export async function GET(request){
    const {searchParams}=new URL(request.url)
    const id=searchParams.get("id") ||"" 
    try{
await connectDb()
const banners=await ScrollModel1.findById(id)
return Response.json(banners)
    }
    catch(error){
        return Response.json({status:500,message:error})
    }
}