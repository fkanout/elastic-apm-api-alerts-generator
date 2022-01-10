const SLOW_ROUTE_MS = 20000;

const apm = require('elastic-apm-node').start({
  serviceName: 'o11y-app',
})

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/slow', async (ctx, next) => {
  await new Promise((res, rej) => setTimeout(res, SLOW_ROUTE_MS));
  ctx.body = {
    success: true
  };
  await next();
});

router.get('/fail', async (ctx) => {
  ctx.throw(500, 'SERVER ERROR 😱')
});

router.get('/error', async (ctx, next) => {
  const err = new Error('Ups, something broke!')
  apm.captureError(err)
  ctx.body = "An error sent to APM server"
  await next();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3002);