import connectDb from "../../../../../config/connectDb";
import {HistoryModel1,HistoryModel2} from "../../../../../models/historyModel";
export async function POST(req){
    const body = await req.json();
    try {
        await connectDb()
      const newHistory = await HistoryModel1.create(body);
      const newHistory1 = await HistoryModel2.create({...body,_id:newHistory?._id});


      if(newHistory && newHistory1){
        return Response.json({
            status:200,message:"History Created"
        })
      }
      else{
        return Response.json({
            status:400,message:"Unable to Create History"
        },{status:400})
      }

    } catch (error) {
        return Response.json({
            status:500,message:error
        },{status:500})
    }
  }