import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {OrderModel1,OrderModel2} from "../../../../../models/orderModel";
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const id = searchParams.get("id")
    const token = searchParams.get("token")

    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      // Fetch the order
      const order = await OrderModel1.findById(id);
      const order1 = await OrderModel2.findById(id);
  
      if (!order) {
        return Response.json({ message: "Order not found" },{status:400});
      }
  
      order.orderCalled = 'Called';
      order1.orderCalled = 'Called';

      await order.save();
      await order1.save();

  
      return Response.json({ message: "Order Confirmed successfully" });
    } catch (error) {
      console.error("Error Confirming order:", error);
      return Response.json({ message: "Server Error" },{status:500});
    }
  }