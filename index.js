const SLOW_ROUTE_MS = 5000;
const FLAKINESS_RATIO = 0.95;

const apm = require("elastic-apm-node").start({
  serviceName: "o11y-app",
});

const Koa = require("koa");
const logger = require("koa-logger");
const Router = require("koa-router");
const app = new Koa();
app.use(logger());
const router = new Router();

router.get("/slow", async (ctx, next) => {
  await new Promise((res, rej) =>
    setTimeout(res, Math.round(1000 + Math.random() * SLOW_ROUTE_MS))
  );
  ctx.body = {
    success: true,
  };
  await next();
});

router.get("/fail", async (ctx) => {
  ctx.throw(500, "SERVER ERROR 😱");
});

router.get("/error", async (ctx, next) => {
  const err = new Error("Ups, something broke!");
  apm.captureError(err);
  ctx.body = "An error sent to APM server";
  await next();
});

router.get("/flaky", async (ctx, next) => {
  const randomNumber = Math.random();
  const shouldFail = randomNumber >= FLAKINESS_RATIO;
  if (shouldFail) {
    ctx.throw(500, "SERVER ERROR 😱");
  } else {
    ctx.body = {
      success: true,
    };
    await next();
  }
});

router.get("/success", async (ctx, next) => {
  ctx.body = {
    success: true,
  };
  await next();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3002);
