const mongoose=require("mongoose")
import connectDb2 from "../config/connectDb2";
const scrollSchema=new mongoose.Schema({
    banners:[
        
    ],

},{
    timestamps:true
}
)

const ScrollModel1 =mongoose.models.Scroll || mongoose.model("Scroll", scrollSchema);
let ScrollModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Scroll) {
    ScrollModel2 = conn2.models.Scroll;
  } else {
    ScrollModel2 = conn2.model("Scroll", scrollSchema);
  }
};

setupDb2Model();

export { ScrollModel1, ScrollModel2 };