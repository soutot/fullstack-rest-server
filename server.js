import Koa from 'koa';
import Router from 'koa-router';
// import convert from 'koa-convert';
import cors from 'koa-cors';

import mongoose from 'mongoose';

import * as OrderLoader from './src/loaders/OrderLoader';

mongoose.connect('mongodb://localhost/albelli');  // Your database endpoint goes here. Example: mongodb://user:password@ds999999.mlab.com:99999/myApp
const PORT = process.env.PORT || 5000;

const app = new Koa();
const router = new Router();
const koaOptions = {
  origin: '*',
};

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'server is on!',
  };
});

router.get('/orders', async (ctx) => {
  try {
    const orders = await OrderLoader.loadAll();
    ctx.body = {
      status: 'success',
      data: orders,
    };
  } catch (err) {
    console.log(err);
  }
});

router.get('/order/:id', async (ctx) => {
  // if(!bodyInfo.username || !bodyInfo.password) {
  //     ctx.status = 402;
  //     ctx.body = "Error, username and password must be provided!";
  // }

  try {
    const order = await OrderLoader.load({ _id: ctx.params.id});
    ctx.body = {
      status: 'success',
      data: order,
    };
  } catch (err) {
    // ctx.status = 402;
    // ctx.body = "Error, username and password must be provided!";
    console.log(err);
  }
});

app.use(cors(koaOptions));
app.use(router.routes());
  

app.listen(PORT, () => {
  console.info('Server running on port %s', PORT);
});
