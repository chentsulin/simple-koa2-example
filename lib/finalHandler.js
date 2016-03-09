export default function finalHandler() {
  return async (ctx, next) => {
    try {
      await next();
      // Handle 404 upstream.
      var status = ctx.status || 404;
      if (status === 404) ctx.throw(404);
    } catch (error) {
      ctx.status = error.status || 500;
      if (ctx.status === 404) {
        await ctx.render('error/404', { error });
      } else {
        await ctx.render('error/error', { error });
      }
      ctx.app.emit('error', error, ctx);
    }
  };
}
