const mongoose =require("mongoose");
import connectDb2 from "../config/connectDb2";

var historySchema = new mongoose.Schema(
    {
    name:{
        type: String,
      },
    title: {
        type: String,
        },
    sku:{
        type:String,
       
        },
    productchange:{
        type:String,
        },
        time:{
            type:Date,
        }
  });
const HistoryModel1 =mongoose.models.History || mongoose.model("History", historySchema);
let HistoryModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.History) {
    HistoryModel2 = conn2.models.History;
  } else {
    HistoryModel2 = conn2.model("History", historySchema);
  }
};

setupDb2Model();

export { HistoryModel1, HistoryModel2 };