// @flow
import OrderModel from '../models/order';

export const load = async ({ id }) => {
  const order = await OrderModel.findOne({ id });
  if (!order) return null;

  return order;
};

export const loadAll = async () => {
  const orders = await OrderModel.find();
  return orders;
};

export const edit = async ({ id, values }) => {
  return OrderModel.findOneAndUpdate({ id }, { $set: values }, { runValidators: true, new: true }, (err, doc) => {
    if (err) {
      new Error(`Error: ${err}`);
      return null;
    }
    return doc;
  });
};

const generateId = () => {
  const randomNumber = Math.floor((Math.random() * 1000000) + 1).toString();

  return `SAL${randomNumber.padStart((7), '0')}`;
};

export const add = async ({ values }) => {
  const id = generateId();
  const newOrder = new OrderModel({ ...values, id });
  await newOrder.save(err => {
    if (err) {
      new Error(`Error: ${err}`);
      return null;
    }
  });
  return newOrder;
};
