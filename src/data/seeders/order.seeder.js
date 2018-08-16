import mongoose from 'mongoose';
import Order from '../../models/order';

async function orderSeeder() {
  const createOrderPromise = [];
  await Order.remove({});

  const orders = [
    {
      id: 'SAL1004892',
      price: 10.5,
      customerName: 'Tiago',
      address: {
        street: 'Mocked street',
        number: '10',
        postcode: '098765',
      },
    },
    {
      id: 'SAL1004877',
      price: 29.9,
      customerName: 'Souto',
      address: {
        street: 'Mocked avenue',
        number: '589',
        postcode: '123456',
      },
    },
  ];

  orders.forEach(order => {
    createOrderPromise.push(Order.create(order));
  });

  return Promise.all(createOrderPromise);
}

const closeConnection = () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected');
  });
};

async function initSeed() {
  await mongoose.connect('mongodb://localhost/albelli');

  console.log('***** seeding order instances...');
  await orderSeeder();

  closeConnection();
}

initSeed();
