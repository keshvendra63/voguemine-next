import connectDb from "../../../../../config/connectDb";
import {ProductModel1} from "../../../../../models/productModel";
import {MenModel1} from "../../../../../models/mensModel";
import {WomenModel1} from "../../../../../models/womensModel";
import {KidModel1} from "../../../../../models/kidsModel";
import {AccessoriesModel1} from "../../../../../models/accessoriesModel";

export const config = {
  maxDuration: 10,
};

export async function GET(request) {
  try {
    await connectDb();

    // Get 1 isTrending collection from each category
    const mensFeatured = await MenModel1.findOne({ isTrending: "true", status: "active" });
    const womensFeatured = await WomenModel1.findOne({ isTrending: "true", status: "active" });
    const kidFeatured = await KidModel1.findOne({ isTrending: "true", status: "active" });
    const accFeatured = await AccessoriesModel1.findOne({ isTrending: "true", status: "active" });

    // Get mostTrending collection from one of the models
    let mostTrendingCollection = await MenModel1.findOne({ mostTrending: "true", status: "active" });

    if (!mostTrendingCollection) {
      mostTrendingCollection = await WomenModel1.findOne({ mostTrending: "true", status: "active" });
    }
    if (!mostTrendingCollection) {
      mostTrendingCollection = await KidModel1.findOne({ mostTrending: "true", status: "active" });
    }
    if (!mostTrendingCollection) {
      mostTrendingCollection = await AccessoriesModel1.findOne({ mostTrending: "true", status: "active" });
    }

    let mostFeaturedProducts = [];
    if (mostTrendingCollection) {
      mostFeaturedProducts = await ProductModel1.find({
        collectionHandle: mostTrendingCollection.handle,
        state: "active"
      })
      .limit(8)
      .sort({ order: 1 ,updatedAt:-1})  // -1 means descending (newest first)
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          featuredCollections: [
            mensFeatured,
            womensFeatured,
            kidFeatured,
            accFeatured
          ].filter(Boolean), // remove nulls if any
          mostTrendingCollection,
          mostFeaturedProducts
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {
    console.error("Error in featured API:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch featured data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
