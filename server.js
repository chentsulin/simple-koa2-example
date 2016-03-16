import co from 'co';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import views from 'koa-views';
import convert from 'koa-convert';
import finalHandler from './lib/finalHandler';
import router from './router';

const app = new Koa();

app.use(finalHandler());
app.use(convert(views(`${__dirname}/views`, {
  map: {
    html: 'nunjucks'
  }
})));
app.use(async (ctx, next) => {
  ctx.render = co.wrap(ctx.render);
  await next();
});
app.use(logger());
app.use(convert(bodyParser()));
app.keys = ['some secret hurr'];
app.use(convert(session(app)));
app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
