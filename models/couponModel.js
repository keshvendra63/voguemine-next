const mongoose = require("mongoose"); // Erase if already required
import connectDb2 from "../config/connectDb2";

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: String,
  },
  discounttype:{
    type:String,
    required:true,
  },
  customertype:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    required:true,
  }
  ,
  minItem:{
    type:Number,
  },
  cEmail:{
    type:String,
  },

},{
  timestamps:true,
}
);

const CouponModel1 =mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);
let CouponModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.Coupon) {
    CouponModel2 = conn2.models.Coupon;
  } else {
    CouponModel2 = conn2.model("Coupon", couponSchema);
  }
};

setupDb2Model();

export { CouponModel1, CouponModel2 };
