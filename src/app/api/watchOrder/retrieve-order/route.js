import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {WatchOrderModel1,WatchOrderModel2} from "../../../../../models/watchOrderModel";
import {WatchProductModel1,WatchProductModel2} from "../../../../../models/watchProductModel";
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const orderId  = searchParams.get("id")
    const token  = searchParams.get("token")

    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      // Fetch the order
      const order = await WatchOrderModel1.findById(orderId);
      const order1 = await WatchOrderModel2.findById(orderId);

  
      if (!order) {
        return Response.json({status:400, message: "Order not found" },{status:400});
      }
  
      // Retrieve order items
      const orderItems = order.orderItems;
  
      // Increase inventory for each order item
      for (const orderItem of orderItems) {
        const { product, quantity } = orderItem;
        const productId = product._id;
  
        // Find the product in the database
        const foundProduct = await WatchProductModel1.findById(productId);
        const foundProduct1 = await WatchProductModel2.findById(productId);

  
        // Find the variant matching the color and size
  
          // Check if there is enough quantity available
          if (foundProduct.quantity >= quantity) {
            // Subtract the ordered quantity from the variant's quantity
            foundProduct.quantity -= quantity;
            foundProduct.sold += quantity;
            foundProduct1.quantity -= quantity;
            foundProduct1.sold += quantity;
            await foundProduct.save();
            await foundProduct1.save();

          } else {
            console.error(`Not enough quantity available for ${color} - ${size}`)
            return;
          }
      }
  
      // Update order type to 'Cancelled'
      order.orderType = 'COD';
      order1.orderType = 'COD';

      await order.save();
      await order1.save();

  
      return Response.json({message:"Order Retrieved"})
    } catch (error) {
      console.error("Error cancelling order:", error);
      return Response.json({success:false,message:"Server Error",error:error},{status:500})
    }
  }