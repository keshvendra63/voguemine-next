const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var watchorderSchema = new mongoose.Schema(
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    shippingInfo:{
      name:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      phone:{
        type:Number,
        required:true
      },
      isVarified:{
        type:Boolean,
      },
      address:{
        type:String,
        required:true
      },
      city:{
        type:String,
        required:true
      },
      state:{
        type:String,
        required:true
      },
      pincode:{
        type:Number,
        required:true
      },
    },
    trackingInfo:{
      partner:{
        type:String,
      },
      link:{
        type:String,
      },
    },
    paymentInfo:{
      razorpayOrderId:{
        type:String,
        required:true,
      },
      razorpayPaymentId:{
        type:String,
        required:true,
      },
      paymentId:{
        type:String,
      },
    },
    orderItems:[{
      product:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"WatchProduct",
      required:true
      },
      quantity:{
        type:Number,
        required:true
      },
      price:{
        type:Number,
        required:true
      },
      sku:{
        type:String,
      }
    }],
    paidAt:{
      type:Date,
      default:Date.now()
    },
    month:{
      type:String,
      default:new Date().getMonth()
    },
    totalPrice:{
      type:Number,
      required:true
    },
    shippingCost:{
      type:Number,
      required:true
    },
    orderType:{
      type:String,
      required:true
    },
    discount:{
      type:Number,
      required:true,
    },
    finalAmount:{
      type:Number,
      required:true
    },
    orderStatus:{
      type:String,
      default:"Ordered"
    },
    orderComment:[
      {
        name:String,
        message:String,
        time:Date,
      }
    ],
    orderCalled:{
      type:String,
    },
    orderHistory:[
      {
        name:String,
        message:String,
        time:Date,
      }
    ]
  },
  {
    timestamps: true,
  }
);
watchorderSchema.pre("save", async function (next) {
  try {
    if (!this.orderNumber) {
      const latestOrder = await this.constructor.findOne({}, {}, { sort: { 'createdAt': -1 } });
      let latestOrderNumber = 0;

      if (latestOrder && latestOrder.orderNumber) {
        latestOrderNumber = parseInt(latestOrder.orderNumber.replace(/[^\d]/g, ''), 10);
      }

      const tagPrefix = "TC"
      const newOrderNumber = `${tagPrefix}${latestOrderNumber + 1}`;
      this.orderNumber = newOrderNumber;
    }
    next();
  } catch (error) {
    next(error);
  }
});

mongoose.models={}
export default mongoose.model("WatchOrder", watchorderSchema);