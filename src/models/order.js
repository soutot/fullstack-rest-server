// @flow
import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
  street: { type: String },
  number: { type: Number },
  postcode: { type: String },
});

const orderSchema = new Schema({
  customerName: { type: String },
  price: { type: Number },
  address: { type: addressSchema },
});

export const Order = mongoose.model('Order', orderSchema);

export default Order;
