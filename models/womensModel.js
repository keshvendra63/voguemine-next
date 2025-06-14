const mongoose=require("mongoose")
import connectDb2 from "../config/connectDb2";

const womenSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    order:{
        type:Number,
    },
    handle:{
        type:String,
        required:true,
    },
    images:[

    ],
    metaDesc:{
        type:String,
    },
    metaTitle:{
        type:String,
    },
    status:{
        default:"active",
        type:String,
    },
    category:{
        type:String
    },
    products:[

    ],
    productCount:{
        type:Number
    },
    isTrending:{
        type:String,
        default:"false"
    },
    mostTrending:{
        type:String,
        default:"false"
    },

},{
    timestamps:true
}
)
const WomenModel1 =mongoose.models.Women || mongoose.model("Women", womenSchema);
let WomenModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Women) {
    WomenModel2 = conn2.models.Women;
  } else {
    WomenModel2 = conn2.model("Women", womenSchema);
  }
};

setupDb2Model();

export { WomenModel1, WomenModel2 };