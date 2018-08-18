const mongoose = require('mongoose');

require('../models/order');

beforeEach(done => {
  function clearDB() {
    for (let i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(() => {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
      (err) => {
        if (err) {
          throw err;
        }
        return clearDB();
      },
    );
  } else {
    return clearDB();
  }
});

afterEach(done => {
  mongoose.disconnect();
  return done();
});

afterAll(done => done());
