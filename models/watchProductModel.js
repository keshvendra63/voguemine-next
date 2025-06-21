const mongoose = require("mongoose"); // Erase if already required
import connectDb2 from "../config/connectDb2";

// Declare the Schema of the Mongo model
var watchproductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique:false,
    },
    alt:{
      type:String,
    },
    order:{
      type:Number,
    },
    handle: {
      type: String,
      unique: true,
      lowercase: true,
      required:true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sku:{
      type:String,
      required:true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    ratings: [
      {
        star: Number,
        name:String,
        email:String,
        comment: String,
      },
    ],
    totalrating: {
      type: Number,
      default: 0,
    },
    state:{
      type:String,
      required:true,
      default:"active"
    },

    images: [
    ],
   quantity:{
    type:Number,
    required:true,
   },
    metaDesc:{
      type:String,
    },
    metaTitle:{
      type:String,
    },
    isFeatured:{
      type:String,
      default:"false"
    },
    
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);
const WatchProductModel1 =mongoose.models.WatchProduct || mongoose.model("WatchProduct", watchproductSchema);
let WatchProductModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.WatchProduct) {
    WatchProductModel2 = conn2.models.WatchProduct;
  } else {
    WatchProductModel2 = conn2.model("WatchProduct", watchproductSchema);
  }
};

setupDb2Model();

export { WatchProductModel1, WatchProductModel2 };