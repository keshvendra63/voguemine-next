const mongoose=require("mongoose")
import connectDb2 from "../config/connectDb2";

const eventsSchema=new mongoose.Schema({
    event:{
        type:String,
    },
},{
    timestamps:true
}
)

const EventsModel1 =mongoose.models.Events || mongoose.model("Events", eventsSchema);
let EventsModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Events) {
    EventsModel2 = conn2.models.Events;
  } else {
    EventsModel2 = conn2.model("Events", eventsSchema);
  }
};

setupDb2Model();

export { EventsModel1, EventsModel2 };