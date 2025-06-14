const mongoose=require("mongoose")
import connectDb2 from "../config/connectDb2";

const kidSchema=new mongoose.Schema({
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

const KidModel1 =mongoose.models.Kid || mongoose.model("Kid", kidSchema);
let KidModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Kid) {
    KidModel2 = conn2.models.Kid;
  } else {
    KidModel2 = conn2.model("Kid", kidSchema);
  }
};

setupDb2Model();

export { KidModel1, KidModel2 };