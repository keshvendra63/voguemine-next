import mongoose from 'mongoose';

const oldOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  finalAmount: {
    type: Number,
  },
  orderType: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: [String], // using an array of strings
    default: [],
  },
  address: {
    type: [String],
    default: [],
  },
  city: {
    type: [String],
    default: [],
  },
  state: {
    type: [String],
    default: [],
  },
  zipcode: {
    type: String,
  },
  phone: {
    type: [String],
    default: [],
  },
});

// Avoid model overwrite error in development
const Oldorder = mongoose.models.Oldorder || mongoose.model('Oldorder', oldOrderSchema);

export default Oldorder;
