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
  return await OrderModel.findOneAndUpdate({ _id }, {values}, { runValidators: true, new: true }, (err, doc) => {
    if (err) {
      new Error(`Error: ${err}`);
      return null;
    }

    return doc;
  });
};

export const add = async ({ values }) => {
  const newOrder = new OrderModel(values);
  
  return await newOrder.save(err => {
    if (err) {
      new Error(`Error: ${err}`);
      return null;
    }

    return newOrder;
  });
};
