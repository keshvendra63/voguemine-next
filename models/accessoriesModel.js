const mongoose=require("mongoose")
import connectDb2 from "../config/connectDb2";
const accessoriesSchema=new mongoose.Schema({
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

const AccessoriesModel1 =mongoose.models.Accessories || mongoose.model("Accessories", accessoriesSchema);
let AccessoriesModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Accessories) {
    AccessoriesModel2 = conn2.models.Accessories;
  } else {
    AccessoriesModel2 = conn2.model("Accessories", accessoriesSchema);
  }
};

setupDb2Model();

export { AccessoriesModel1, AccessoriesModel2 };