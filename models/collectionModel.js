const mongoose = require("mongoose"); // Erase if already required
import connectDb2 from "../config/connectDb2";

// Declare the Schema of the Mongo model
var collectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    images:[],
    metaTitle:{
      type:String,

    },
    metaDesc:{
      type:String,

    },
    category:{
      type:String,
      
    },
    handle:{
      type:String,
      unique: true,
      lowercase: true,
    },
    status:{
      type:String,
    },
    products:[
      {
        product:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        }
      }
    ]

  },
  {
    timestamps: true,
  }
);
const CollectionModel1 =mongoose.models.Collection || mongoose.model("Collection", collectionSchema);
let CollectionModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Collection) {
    CollectionModel2 = conn2.models.Collection;
  } else {
    CollectionModel2 = conn2.model("Collection", collectionSchema);
  }
};

setupDb2Model();

export { CollectionModel1, CollectionModel2 };