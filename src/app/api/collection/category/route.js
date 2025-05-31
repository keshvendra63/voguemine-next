import connectDb from "../../../../../config/connectDb";
import {MenModel1} from '../../../../../models/mensModel';
import {WomenModel1} from '../../../../../models/womensModel';
import {KidModel1} from '../../../../../models/kidsModel';
import {AccessoriesModel1} from '../../../../../models/accessoriesModel';
import {ProductModel1} from "../../../../../models/productModel";
export const config = {
  maxDuration: 10,
};
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    
    try {
        await connectDb();
        let collectionsWithProductCount = ""
        if (category === "men") {
            const collections = await MenModel1.find();
            collectionsWithProductCount = await Promise.all(
                collections.map(async (collection) => {
                    const productCount = await ProductModel1.countDocuments({ collectionName: collection.title });
                    return { ...collection.toObject(), productCount }
                }))
        }
        else if (category === "women") {
            const collections = await WomenModel1.find();
            collectionsWithProductCount = await Promise.all(
                collections.map(async (collection) => {
                    const productCount = await ProductModel1.countDocuments({ collectionName: collection.title });
                    return { ...collection.toObject(), productCount }
                }))
        }
        else if (category === "kids") {
            const collections = await KidModel1.find();
            collectionsWithProductCount = await Promise.all(
                collections.map(async (collection) => {
                    const productCount = await ProductModel1.countDocuments({ collectionName: collection.title });
                    return { ...collection.toObject(), productCount }
                }))
        }
        else if (category === "accessories") {
            const collections = await AccessoriesModel1.find();
            collectionsWithProductCount = await Promise.all(
                collections.map(async (collection) => {
                    const productCount = await ProductModel1.countDocuments({ collectionName: collection.title });
                    return { ...collection.toObject(), productCount }
                }))
        }
        else {
            return Response.json({ state: 400, message: "Category not defined" })

        }

        if (collectionsWithProductCount !== "") {
            return Response.json(collectionsWithProductCount)
        }
        else {
            return Response.json({ state: 400, message: "Unable to fetch collections" })
        }





    } catch (error) {
        console.error("Error fetching collections:", error.message);
        return new Response.json({ status: 500, success: false, error: "Failed to fetch collection" })
    }
}
