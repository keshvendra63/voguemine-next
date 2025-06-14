import {CollectionModel1} from "../../../../models/collectionModel";
import connectDb from "../../../../config/connectDb";

export async function GET(request) {
  const { searchParams } = new URL(request.url); // Extract query params from the request URL
  const handle = searchParams.get("handle"); // Get the 'handle' query parameter

  if (!handle) {
    return Response.json(
      { success: false, error: "Handle is required" },
      { status: 400 } // Bad Request
    );
  }

  try {
    // Connect to MongoDB
    await connectDb();

    // Find the collection by handle
    const collection = await CollectionModel1.findOne({ handle })
      .populate({
        path: "products.product", // Populate the product details
        model: "Product", // Reference the Product model
      })
      .exec();

    if (!collection) {
      return Response.json(
        { success: false, error: "Collection not found" },
        { status: 404 } // Not Found
      );
    }

    // Respond with the collection details
    return Response.json({ success: true, collection }, { status: 200 });
  } catch (error) {
    console.error("Error fetching collection by handle:", error.message);
    return Response.json(
      { success: false, error: "Failed to fetch collection" },
      { status: 500 } // Internal Server Error
    );
  }
}
