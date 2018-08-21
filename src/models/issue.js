// @flow
import mongoose from 'mongoose';

const { Schema } = mongoose;

const issueSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  issueKey: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Issue = mongoose.model('Issue', issueSchema);

export default Issue;
