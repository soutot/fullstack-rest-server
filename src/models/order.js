// @flow
import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: Number,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
    trim: true,
  },
});

const orderSchema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: { type: addressSchema },
});

export const Order = mongoose.model('Order', orderSchema);

export default Order;
