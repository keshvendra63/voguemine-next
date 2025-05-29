import connectDb from "../../../../../config/connectDb";
import {AbondendModel1} from "../../../../../models/abandonedModel";
import {ProductModel1} from "../../../../../models/productModel"; // Ensure Product is imported
export const config = {
  maxDuration: 10,
};
export async function GET(request){
    const {searchParams}=new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || 50); // Number of items per page
    const page = parseInt(searchParams.get("page") || 1); // Current page, default is 1
    try {
      let query = {};
      await connectDb()
  
      // Check if search query is provided
      const count = await AbondendModel1.countDocuments(query); // Total number of matching orders
  
      // Calculate the skipping value based on the current page
      const skip = Math.max(0, (count - (page * limit)));
  
      // Query orders with pagination and search criteria
      const orders = await AbondendModel1.find(query)
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
  
    } catch (error) {
      console.error(error);
      return Response.json({
        success:false,message:"Server Error"
      },{status:500})
    }
  }