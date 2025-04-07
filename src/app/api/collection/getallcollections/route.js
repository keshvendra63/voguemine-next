import connectDb from "../../../../../config/connectDb";
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

        const mens = await Men.find();
        const womens = await Women.find();
        const kids = await Kid.find();
        const accessories = await Accessories.find();

        return Response.json({
            mens,womens,kids,accessories
        })
        

    } catch (error) {
        console.error("Error fetching collections:", error.message);
        return new Response(
            JSON.stringify({ success: false, error: "Failed to fetch collection" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
