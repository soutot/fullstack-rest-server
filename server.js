import Koa from 'koa';
import Router from 'koa-router';
// import convert from 'koa-convert';
import cors from 'koa-cors';
import bodyParser from 'koa-body-parser';

import mongoose from 'mongoose';

import * as OrderLoader from './src/loaders/OrderLoader';

mongoose.connect('mongodb://localhost/albelli');
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
  if (!ctx.params || !ctx.params.id) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Invalid order id',
    };
    return;
  }

  try {
    const order = await OrderLoader.load({ id: ctx.params.id });
    ctx.body = {
      status: 'success',
      data: order,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong while trying to get the order!',
    };
  }
});

router.put('/orderEdit/:id', async (ctx) => {
  if (!ctx.params || !ctx.params.id) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Invalid order id',
    };
    return;
  }

  try {
    const order = await OrderLoader.edit({ id: ctx.params.id, values: ctx.request.body });
    ctx.body = {
      status: 'success',
      data: order,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong while trying to edit the order!',
    };
  }
});

router.post('/orderAdd', async (ctx) => {
  if (!ctx.request || !ctx.request.body) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Invalid order data',
    };
    return;
  }

  try {
    const order = await OrderLoader.add({ values: ctx.request.body });
    if (!order) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Invalid order data',
      };
      return;
    }
    ctx.body = {
      status: 'success',
      data: order,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong while trying to add the order!',
    };
  }
});

// app.use(router.routes()).use(router.allowedMethods());
app.use(cors(koaOptions));
app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => {
  console.info('Server running on port %s', PORT);
});
