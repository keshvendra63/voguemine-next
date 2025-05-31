import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import authMiddleware from "../../../../../controller/authController";
import {OrderModel1,OrderModel2} from "../../../../../models/orderModel";
import {ProductModel1,ProductModel2} from "../../../../../models/productModel";
export async function PUT(request){
    const {searchParams}=new URL(request.url)
    const orderId  = searchParams.get("id")
    const token  = searchParams.get("token")

    try {
        await connectDb()
        await connectDb2()
        await authMiddleware(token)
      // Fetch the order
      const order = await OrderModel1.findById(orderId);
      const order1 = await OrderModel2.findById(orderId);

  
      if (!order) {
        return Response.json({status:400, message: "Order not found" },{status:400});
      }
  
      // Retrieve order items
      const orderItems = order.orderItems;
  
      // Increase inventory for each order item
      for (const orderItem of orderItems) {
        const { product, color, size, quantity } = orderItem;
        const productId = product._id;
  
        // Find the product in the database
        const foundProduct = await ProductModel1.findById(productId);
        const foundProduct1 = await ProductModel2.findById(productId);

  
        // Find the variant matching the color and size
        const variant = foundProduct.variants.find(
          (variant) => (variant.color).toLowerCase().trim() === color.toLowerCase().trim() && (variant.size).toLowerCase().trim() === size.toLowerCase().trim()
        );
        const variant1 = foundProduct1.variants.find(
          (variant) => (variant.color).toLowerCase().trim() === color.toLowerCase().trim() && (variant.size).toLowerCase().trim() === size.toLowerCase().trim()
        );
  
        if (variant) {
          // Check if there is enough quantity available
            // Subtract the ordered quantity from the variant's quantity
            variant.quantity += quantity;
            variant1.quantity += quantity;
            foundProduct.sold -= quantity;
            foundProduct1.sold -= quantity;
            await foundProduct.save();
            await foundProduct1.save();

  
        } else {
            console.error(`Variant not found for ${color} - ${size}`)
            return;
        }
      }
  
      // Update order type to 'Cancelled'
      order.orderType = 'Returned';
      order1.orderType = 'Returned';

      await order.save();
      await order1.save();

  
      return Response.json({message:"Order Returned"})
    } catch (error) {
      console.error("Error Retuning order:", error);
      return Response.json({status:500,message:"Server Error",error:error},{status:500})
    }
}