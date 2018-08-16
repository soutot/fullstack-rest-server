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
