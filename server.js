import co from 'co';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import convert from 'koa-convert';
import finalHandler from './lib/finalHandler';
import router from './router';

const app = new Koa();

app.use(finalHandler());
app.use(views(`${__dirname}/views`, {
  map: {
    html: 'nunjucks',
  },
}));
app.use(logger());
app.use(mount('/static', serve('public')));
app.use(bodyParser());
app.keys = ['some secret hurr'];
app.use(convert(session(app)));
app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
