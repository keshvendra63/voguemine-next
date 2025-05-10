import connectDb from "../../../../../config/connectDb";
import Product from "../../../../../models/productModel";
import Men from '../../../../../models/mensModel';
import Women from '../../../../../models/womensModel';
import Kid from '../../../../../models/kidsModel';
import Accessories from '../../../../../models/accessoriesModel';
export const config = {
    maxDuration: 10,
  };
export async function GET(request) {
    try {
        await connectDb();

        const mensFeatured = await Men.find({ isTrending: "true",state: "active" });
        const mensMostFeatured = await Men.find({ mostTrending: "true",state: "active" });
        const mensFeaturedPrdts = mensMostFeatured.length > 0 ? await Product.find({ collectionHandle: mensMostFeatured[0]?.handle,state: "active" }).sort({ createdAt: -1 }).limit(4) : [];

        const womensFeatured = await Women.find({ isTrending: "true",state: "active" });
        const womensMostFeatured = await Women.find({ mostTrending: "true",state: "active" });
        const womensFeaturedPrdts = womensMostFeatured.length > 0 ? await Product.find({ collectionHandle: womensMostFeatured[0]?.handle,state: "active" }).sort({ createdAt: -1 }).limit(4) : [];

        const kidFeatured = await Kid.find({ isTrending: "true",state: "active" });
        const kidMostFeatured = await Kid.find({ mostTrending: "true",state: "active" });
        const kidFeaturedPrdts = kidMostFeatured.length > 0 ? await Product.find({ collectionHandle: kidMostFeatured[0]?.handle,state: "active" }).sort({ createdAt: -1 }).limit(4) : [];

        const accFeatured = await Accessories.find({ isTrending: "true",state: "active" });
        const accMostFeatured = await Accessories.find({ mostTrending: "true",state: "active" });
        const accFeaturedPrdts = accMostFeatured.length > 0 ? await Product.find({ collectionHandle: accMostFeatured[0]?.handle,state: "active" }).sort({ createdAt: -1 }).limit(4) : [];

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    mens: {
                        mensFeatured,
                        mensMostFeatured,
                        mensFeaturedPrdts
                    },
                    womens: {
                        womensFeatured,
                        womensMostFeatured,
                        womensFeaturedPrdts
                    },
                    kids: {
                        kidFeatured,
                        kidMostFeatured,
                        kidFeaturedPrdts
                    },
                    accessories: {
                        accFeatured,
                        accMostFeatured,
                        accFeaturedPrdts
                    }
                }
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

    } catch (error) {
        console.error("Error fetching collection by handle:", error.message);
        return new Response(
            JSON.stringify({ success: false, error: "Failed to fetch collection" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
