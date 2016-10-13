module.exports = (fn, args, ctx) => {
    try {
      fn.call(ctx, ...args);
    } catch(err) {
      return err
    }
}