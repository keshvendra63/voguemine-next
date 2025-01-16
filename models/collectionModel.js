const mongoose = require("mongoose"); // Erase if already required

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
mongoose.models={}
export default mongoose.model("Collection", collectionSchema);