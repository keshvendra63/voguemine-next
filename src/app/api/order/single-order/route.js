import {OrderModel1} from "../../../../../models/orderModel"
import {ProductModel1} from "../../../../../models/productModel"
import connectDb from "../../../../../config/connectDb"
export async function GET(request){
    const {searchParams}=new URL(request.url)
    const id = searchParams.get("id")
    try{
      await connectDb()
      const order=await OrderModel1.findById(id).populate("user").populate("orderItems.product")
      if(order){
        return Response.json(order)
      }
     else{
        return Response.json({status:400,message:"Unable to get order"})
     }
    }
    catch(error){
        return Response.json({status:500,message:"Server Error"})
    }
  }