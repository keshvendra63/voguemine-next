import connectDb from "../../../../../config/connectDb";
import {OrderModel1} from "../../../../../models/orderModel";
import {WatchOrderModel1} from "../../../../../models/watchOrderModel";
import {ProductModel1} from "../../../../../models/productModel"; // Ensure Product is imported
import {WatchProductModel1} from "../../../../../models/watchProductModel";
export async function GET(request){
    const {searchParams}=new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || 50); // Number of items per page
    const page = parseInt(searchParams.get("page") || 1); // Current page, default is 1
    const search =searchParams.get("search") || "" // Current page, default is 1
    const isWatchOrders =searchParams.get("isWatchOrders") || "" // Current page, default is 1

    try {
      let query = {};
      await connectDb()
  
      // Check if search query is provided
      if (search) {
        const searchKeyword =search.toLowerCase().trim();
        const regexPattern = new RegExp(`^${searchKeyword}$`, 'i');
      
        query.$or = [
          { orderNumber: { $regex: searchKeyword, $options: 'i' } },
          { 'shippingInfo.firstname': searchKeyword },
          { 'shippingInfo.email': searchKeyword },
          { 'shippingInfo.phone': parseInt(searchKeyword) || null }
          // Add more fields here for flexible searching
          // Example: { 'fieldName': { $regex: new RegExp(searchKeyword, 'i') } }
        ];
      }
      let count;
  if(isWatchOrders){
    count = await WatchOrderModel1.countDocuments(query); // Total number of matching orders

  }else{
    count = await OrderModel1.countDocuments(query); // Total number of matching orders

  }
  
      // Calculate the skipping value based on the current page
      const skip = Math.max(0, (count - (page * limit)));
  
      // Query orders with pagination and search criteria
      if(isWatchOrders!==""){
        const orders = await WatchOrderModel1.find(query)
        .populate("user")
        .populate("orderItems.product")
        .skip(skip)
        .limit(limit);
        return Response.json(
            {
                orders,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalOrders: count
              }
        )
      }else{
        const orders = await OrderModel1.find(query)
        .populate("user")
        .populate("orderItems.product")
        .skip(skip)
        .limit(limit);
        return Response.json(
            {
                orders,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
                totalOrders: count
              }
        )
      }
     
  
    } catch (error) {
      console.error(error);
      return Response.json({
        status:500,message:"Server Error"
      },{status:500})
    }
  }