const mongoose = require("mongoose"); // Erase if already required
import connectDb2 from "../config/connectDb2";

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
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
    price1: {
      type: Number,
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
    collectionName:{
      type: String,
      required: true,
    },
    variants:[
      {
        color:{
          type:String,
          default:"",
        },
        size:{
          type:String,
          default:"",
        },
        quantity:{
          type:Number,
          default:0,
        },
      },
    ],
    tags:{
      type:String,
    },
    collectionHandle:{
      type:String,
    },
    metaDesc:{
      type:String,
    },
    metaTitle:{
      type:String,
    },
    metaDesc1:{
      type:String,
    },
    metaTitle1:{
      type:String,
    },
    metaDesc4:{
      type:String,
    },
    metaTitle4:{
      type:String,
    },
    isFeatured:{
      type:String,
      default:"false"
    },
    isSale:{
      type:Boolean,
      default:false,
    }
    
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
const ProductModel1 =mongoose.models.Product || mongoose.model("Product", productSchema);
let ProductModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Product) {
    ProductModel2 = conn2.models.Product;
  } else {
    ProductModel2 = conn2.model("Product", productSchema);
  }
};

setupDb2Model();

export { ProductModel1, ProductModel2 };
