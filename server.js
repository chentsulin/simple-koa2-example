'use strict';

const co = require('co');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
const views = require('koa-views');
const convert = require('koa-convert');
const finalHandler = require('./lib/finalHandler');
const router = require('./router');

const app = new Koa();

app.use(finalHandler())
app.use(convert(views(`${__dirname}/views`, {
  map: {
    html: 'nunjucks'
  }
})));
app.use(async (ctx, next) => {
  ctx.render = co.wrap(ctx.render);
  await next();
})
app.use(logger());
app.use(convert(bodyParser()));
app.keys = ['some secret hurr'];
app.use(convert(session(app)));
app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
