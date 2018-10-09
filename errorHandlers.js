/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.to = promise => {
  return promise.then(data => [null, data]).catch(err => [err]);
};

exports.catchErrors = fn => {
  return function(...args) {
    return fn(...args).catch(err => {
      console.error('RIP you, have an error!!!');
      console.error(err);
    });
  };
};

exports.throwAsyncErrors = fn => {
  try {
    return fn();
  } catch (err) {
    throw err;
  }
};
