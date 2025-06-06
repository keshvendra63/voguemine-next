const mongoose = require("mongoose"); // Erase if already required
import connectDb2 from "../config/connectDb2";
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    image: 
      {
        public_id: String,
        url: String,
      },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
  return resettoken;
};

const UserModel1 =mongoose.models.User || mongoose.model("User", userSchema);
let UserModel2;
const setupDb2Model = async () => {
  const conn2 = await connectDb2();
  if (conn2.models.User) {
    UserModel2 = conn2.models.User;
  } else {
    UserModel2 = conn2.model("User", userSchema);
  }
};

setupDb2Model();

export { UserModel1, UserModel2 };