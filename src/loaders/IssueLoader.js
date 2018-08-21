// @flow
import IssueModel from '../models/issue';

export const load = async ({ id }) => {
  const issue = await IssueModel.findOne({ id });
  if (!issue) return null;

  return issue;
};

export const loadAll = async () => {
  const issues = await IssueModel.find();
  return issues;
};

export const loadByOrder = async ({ orderId }) => {
  if (!orderId) {
    return null;
  }

  const issues = await IssueModel.find({ orderId });
  return issues;
};
