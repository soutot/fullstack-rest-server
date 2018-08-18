import * as OrderLoader from '../OrderLoader';

process.env.TEST_SUITE = 'orders-test';

it('should add a new order', async () => {
  const values = {
    price: 10.5,
    customerName: 'Tiago',
    address: {
      street: 'Mocked street',
      number: '10',
      postcode: '098765',
    },
  };

  const order = await OrderLoader.add({ values });

  // TODO: improve this
  const result = {
    ...order._doc,
    _id: 'mocked-order-id',
    address: {
      ...order._doc.address._doc,
      _id: 'mocked-address-id',
    },
  };

  expect(result).toMatchSnapshot();
});
