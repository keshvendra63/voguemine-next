const mongoose = require("mongoose"); // Erase if already required
import connectDb2 from "../config/connectDb2";

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    handle:{
      type:String,
      unique:true,
      required:true,
    },
    metaTitle:{
      type:String
    },
    metaDesc:{
      type:String
    },
    description: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    comment:[
      {
        email:{
          type:String,
        },
        name:{
          type:String,
          required:true
        },
        msg:{
          type:String,
          required:true,
        },
        time:{
          type:Date,
      default:Date.now()
        }
        
        
      }
    ]
,
    author: {
      type: String,
    },
    images: [],
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

const BlogModel1 =mongoose.models.Blog || mongoose.model("Blog", blogSchema);
let BlogModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Blog) {
    BlogModel2 = conn2.models.Blog;
  } else {
    BlogModel2 = conn2.model("Blog", blogSchema);
  }
};

setupDb2Model();

export { BlogModel1, BlogModel2 };
