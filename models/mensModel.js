const mongoose=require("mongoose")
import connectDb2 from "../config/connectDb2";

const menSchema=new mongoose.Schema({
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
const MenModel1 =mongoose.models.Men || mongoose.model("Men", menSchema);
let MenModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Men) {
    MenModel2 = conn2.models.Men;
  } else {
    MenModel2 = conn2.model("Men", menSchema);
  }
};

setupDb2Model();

export { MenModel1, MenModel2 };