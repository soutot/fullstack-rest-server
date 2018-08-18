// @flow
import OrderModel from '../models/order';

// export default class order {

// };

export const load = async ({ _id }) => {
  const order = await OrderModel.findOne({ _id });

  if (!order) return null;

  return order;
};

export const loadAll = async () => {
  const order = await OrderModel.find();
  return order;
};

export const edit = async ({ _id, values }) => {
  return await OrderModel.findOneAndUpdate({ _id }, values, { upsert:true }, (err, doc) => {
    if (err) return null;
    return doc;
  });
};

export const add = async ({ values }) => {
  const newOrder = new OrderModel(values);
  await newOrder.save();

  return newOrder;
};
