import connectDb from "../../../../../config/connectDb"
import connectDb2 from "../../../../../config/connectDb2"
import authMiddleware from "../../../../../controller/authController"
import {WatchBannerModel1,WatchBannerModel2} from "../../../../../models/watchbannerModel"
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const body=await request.json()
    const {images}=body
    const id=searchParams.get("id") ||"" 
    const token=searchParams.get("token") ||"" 

    try{
await connectDb()
await connectDb2()
await authMiddleware(token)
const banners=await WatchBannerModel1.findByIdAndUpdate(id, {banners:images}, {
    new: true,
  });
  const banners1=await WatchBannerModel2.findByIdAndUpdate(id, {banners:images}, {
    new: true,
  });
return Response.json(banners)
    }
    catch(error){
        return Response.json({success:false,message:error},{status:500})
    }
}