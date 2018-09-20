import mongoose from 'mongoose';
import Issue from '../../models/issue';

async function issueSeeder() {
  const createIssuePromise = [];
  await Issue.remove({});

  const issues = [
    {
      orderId: 'SAL1004892',
      issueKey: 'CC-1',
    },
    {
      orderId: 'SAL1004892',
      issueKey: 'CC-2',
    },
    {
      orderId: 'SAL1004877',
      issueKey: 'CC-3',
    },
  ];

  issues.forEach(issue => {
    createIssuePromise.push(Issue.create(issue));
  });

  return Promise.all(createIssuePromise);
}

const closeConnection = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected');
  });
};

async function initSeed() {
  await mongoose.connect('mongodb://localhost/fullstack-rest');

  console.log('***** seeding issue instances...');
  await issueSeeder();

  closeConnection();
}

initSeed();
