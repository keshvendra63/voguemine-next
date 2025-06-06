import connectDb from "../../../../../config/connectDb"
import {CouponModel1} from "../../../../../models/couponModel"; // Import your Coupon model

export async function GET(){
    try{
        await connectDb()
        const coupons=await CouponModel1.find()
        if(coupons){
            return Response.json(coupons)
        }
        else{
        return Response.json({status:400,message:"Unable to fetch Coupons"},{status:400})

        }

    }catch(err){
        return Response.json({success:false,message:err},{status:500})
    }
}