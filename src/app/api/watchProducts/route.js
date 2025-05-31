import {WatchProductModel1} from "../../../../models/watchProductModel";
import connectDb from "../../../../config/connectDb";
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    await connectDb();

    let query = {};
    query.state = searchParams.get("state") || "active";
    // Brand filtering (convert to lowercase)
    if (searchParams.get("brand")) {
      const brands = searchParams
        .get("brand")
        .split(",")
        .map((brand) => brand.trim().toLowerCase());
      query["$expr"] = {
        $in: [
          { $toLower: "$brand" }, // Convert brand field in DB to lowercase
          brands,                 // Array of input brands
        ],
      };
    }

    // Search functionality
    if (searchParams.get("search")) {
      const searchKeywords = searchParams.get("search").toLowerCase().split(" ");
      const searchConditions = [];

      searchKeywords.forEach((keyword) => {
        let regexPattern;
       
          regexPattern = new RegExp(`^${keyword}$`, "i");

        if (regexPattern) {
          searchConditions.push({
            $or: [
              { title: { $regex: regexPattern } },
              { brand: { $regex: regexPattern } },
              { sku: { $regex: regexPattern } },
            ],
          });
        }
      });

      if (searchConditions.length > 0) {
        query.$and = searchConditions;
      }
    }

    // Sorting
    const sortQuery = searchParams.get("sort");
    let sortCriteria = { order: 1, createdAt: -1 }; // Default sorting
    if (sortQuery) {
      if (sortQuery === "title") sortCriteria = { title: 1 };
      else if (sortQuery === "-title") sortCriteria = { title: -1 };
      else if (sortQuery === "price") sortCriteria = { price: 1 };
      else if (sortQuery === "-price") sortCriteria = { price: -1 };
    }

    // Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 16;
    const skip = (page - 1) * limit;

    // Total documents count
    const totalDocs = await WatchProductModel1.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    // Aggregation pipeline
    let productQuery = WatchProductModel1.aggregate([
      { $match: query },
      { $addFields: { totalQuantity: { $sum: "$quantity" } } },
      {
        $addFields: {
          isSoldOut: {
            $cond: { if: { $eq: ["$totalQuantity", 0] }, then: 1, else: 0 },
          },
        },
      },
      { $sort: { isSoldOut: 1, ...sortCriteria } },
      { $skip: skip },
      { $limit: limit },
    ]);

    // Field Projection
    if (searchParams.get("fields")) {
      const fields = searchParams
        .get("fields")
        .split(",")
        .reduce((acc, field) => {
          acc[field.trim()] = 1;
          return acc;
        }, {});
      productQuery = productQuery.project(fields);
    }

    // Fetch products
    const products = await productQuery;

    // Response
    return Response.json(
      {
        success: true,
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalDocs,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return Response.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}