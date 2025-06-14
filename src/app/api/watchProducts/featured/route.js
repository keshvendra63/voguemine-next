import {WatchProductModel1} from "../../../../../models/watchProductModel";
import connectDb from "../../../../../config/connectDb";

export async function GET(request) {
  try {
    await connectDb();

    // Fetch featured products
    const featuredProducts = await WatchProductModel1.find({ isFeatured: "true",state:"active" });
    return Response.json(
      {
        success: true,
        data: {
         featuredProducts,
        },
      },
      {
        status: 200,
       
      }
    )
    
  } catch (error) {
    console.error("Error fetching featured products:", error.message);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch products",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
