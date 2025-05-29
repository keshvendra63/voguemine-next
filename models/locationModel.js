const mongoose=require("mongoose")
import connectDb2 from "../config/connectDb2";

const locationSchema=new mongoose.Schema({
    city:{
        type:String,
    },
    state:{
        type:String,
    },
},{
    timestamps:true
}
)

const LocationModel1 =mongoose.models.Location || mongoose.model("Location", locationSchema);
let LocationModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Location) {
    LocationModel2 = conn2.models.Location;
  } else {
    LocationModel2 = conn2.model("Location", locationSchema);
  }
};

setupDb2Model();

export { LocationModel1, LocationModel2 };