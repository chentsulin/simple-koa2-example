import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('index');
});

export default router;
