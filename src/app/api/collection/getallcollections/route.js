import connectDb from "../../../../../config/connectDb";
import {MenModel1} from '../../../../../models/mensModel';
import {WomenModel1} from '../../../../../models/womensModel';
import {KidModel1} from '../../../../../models/kidsModel';
import {AccessoriesModel1} from '../../../../../models/accessoriesModel';
export const config = {
    maxDuration: 10,
  };
export async function GET(request) {
    try {
        await connectDb();

        const mens = await MenModel1.find();
        const womens = await WomenModel1.find();
        const kids = await KidModel1.find();
        const accessories = await AccessoriesModel1.find();

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
