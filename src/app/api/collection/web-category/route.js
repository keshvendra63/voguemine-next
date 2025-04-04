import connectDb from "../../../../../config/connectDb";
import Men from '../../../../../models/mensModel';
import Women from '../../../../../models/womensModel';
import Kid from '../../../../../models/kidsModel';
import Accessories from '../../../../../models/accessoriesModel';
import Product from "../../../../../models/productModel";
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    
    try {
        await connectDb();
        let collectionsWithProductCount = ""
        if (category === "men") {
            const collections = await Men.find({status:"active"});
            collectionsWithProductCount = await Promise.all(
                collections.map(async (collection) => {
                    const productCount = await Product.countDocuments({ collectionName: collection.title });
                    return { ...collection.toObject(), productCount }
                }))
        }
        else if (category === "women") {
            const collections = await Women.find({status:"active"});
            collectionsWithProductCount = await Promise.all(
                collections.map(async (collection) => {
                    const productCount = await Product.countDocuments({ collectionName: collection.title });
                    return { ...collection.toObject(), productCount }
                }))
        }
        else if (category === "kids") {
            const collections = await Kid.find({status:"active"});
            collectionsWithProductCount = await Promise.all(
                collections.map(async (collection) => {
                    const productCount = await Product.countDocuments({ collectionName: collection.title });
                    return { ...collection.toObject(), productCount }
                }))
        }
        else if (category === "accessories") {
            const collections = await Accessories.find({status:"active"});
            collectionsWithProductCount = await Promise.all(
                collections.map(async (collection) => {
                    const productCount = await Product.countDocuments({ collectionName: collection.title });
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
