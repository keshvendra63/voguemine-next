const mongoose = require("mongoose"); // Erase if already required
import connectDb2 from "../config/connectDb2";

// Declare the Schema of the Mongo model
var watchabondendSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },
    shippingInfo:{
      name:{
        type:String,
      },
      email:{
        type:String,
      },
      phone:{
        type:Number,
      },
      address:{
        type:String,
      },
      city:{
        type:String,
      },
      state:{
        type:String,
      },
      pincode:{
        type:Number,
      },
    },
    orderItems:[{
      product:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"WatchProduct",
      },
      quantity:{
        type:Number,
      },
      price:{
        type:Number,
      },
    }],
    month:{
      type:String,
      default:new Date().getMonth()
    },
    totalPrice:{
      type:Number,
    },
    shippingCost:{
      type:Number,
    },
    orderType:{
      type:String,
    },
    discount:{
      type:Number,
    },
    finalAmount:{
      type:Number,
    },
    orderCalled:{
      type:String,
    },
  },
  {
    timestamps: true,
  }
);
watchabondendSchema.pre("save", async function (next) {
  try {
    if (!this.orderNumber) {
      const latestOrder = await this.constructor.findOne({}, {}, { sort: { 'createdAt': -1 } });
      let latestOrderNumber = 0;

      if (latestOrder && latestOrder.orderNumber) {
        latestOrderNumber = parseInt(latestOrder.orderNumber.replace(/[^\d]/g, ''), 10);
      }

      const tagPrefix = "TC00";
      const newOrderNumber = `${tagPrefix}${latestOrderNumber + 1}`;
      this.orderNumber = newOrderNumber;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const WatchAbondendModel1 =mongoose.models.WatchAbondend || mongoose.model("WatchAbondend", watchabondendSchema);
let WatchAbondendModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.WatchAbondend) {
    WatchAbondendModel2 = conn2.models.WatchAbondend;
  } else {
    WatchAbondendModel2 = conn2.model("WatchAbondend", watchabondendSchema);
  }
};

setupDb2Model();

export { WatchAbondendModel1, WatchAbondendModel2 };