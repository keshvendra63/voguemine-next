import connectDb from "../../../../../config/connectDb"
import connectDb2 from "../../../../../config/connectDb2"
import authMiddleware from "../../../../../controller/authController"
import {WatchBannerModel1,WatchBannerModel2} from "../../../../../models/watchbannerModel"
export async function POST(req){
    const {searchParams}=new URL(req.url)
    const token=searchParams.get("token")
    const body=await req.json()
    try{
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
        const scroll=await WatchBannerModel1.create(body)
        const scroll1=await WatchBannerModel2.create({...body,_id:scroll?._id})

        if(scroll && scroll1){
            return Response.json(scroll)
        }

    }catch(error){
        return Response.json({success:false,message:error},{status:500})
    }
}