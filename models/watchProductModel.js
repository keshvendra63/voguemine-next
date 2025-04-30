const mongoose = require("mongoose"); // Erase if already required

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

mongoose.models={}
export default mongoose.model("WatchProduct", watchproductSchema);
