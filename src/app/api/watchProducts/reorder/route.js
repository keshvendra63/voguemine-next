import connectDb from "../../../../../config/connectDb";
import connectDb2 from "../../../../../config/connectDb2";
import {WatchProductModel1,WatchProductModel2} from "../../../../../models/watchProductModel";
export async function POST(req) {
    const body=await req.json()
    const { productIds } = body;
    try {
        await connectDb()
        await connectDb2()
      const updates = productIds.map((id, index) =>
        ({ updateOne: { filter: { _id: id }, update: { $set: { order: index } } } })
      );
  
      await WatchProductModel1.bulkWrite(updates);
      await WatchProductModel2.bulkWrite(updates);

  
      return Response.json({status:200, message: "Products reordered successfully" });
    } catch (error) {
      console.error('Error reordering products:', error);
      return Response.json({status:500, error: 'Internal server error' });
    }
  }