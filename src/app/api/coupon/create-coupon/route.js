import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {CouponModel1,CouponModel2} from "../../../../../models/couponModel";
export async function POST(request) {
    const {searchParams}=new URL(request.url)
    const token=searchParams.get("token")
    const body=await request.json()
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
        
                const data=await CouponModel1.create(body)
                const data1=await CouponModel2.create({...body,_id:data?._id})
        
                if(data && data1){
                    return Response.json(data)
                }
    } catch (error) {
        return Response.json({success:false,message:error},{status:500})   
    }
  }