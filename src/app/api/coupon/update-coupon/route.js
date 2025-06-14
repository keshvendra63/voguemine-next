import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {CouponModel1,CouponModel2} from "../../../../../models/couponModel";

export async function PUT(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || ""
    const token = searchParams.get("token") || ""

    const body = await request.json()
    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)

        const data=await CouponModel1.findByIdAndUpdate(id, body, {
            new: true,
        });
        const data1=await CouponModel2.findByIdAndUpdate(id, body, {
            new: true,
        });

        if (data && data1) {
            return Response.json(data)
        }
    } catch (error) {
        return Response.json({ success: false, error: "Failed to update coupon" },
            { status: 500 })
    }
}