function errorHandler(error, req, res, next){
    console.error('Error: ', error);
    const statusCode = error.statusCode || 500;
    const message =
        error.isOperational && error.message
        ? error.message
        : 'Something went wrong on the server.';

  res.status(statusCode).json({
    success: false,
    status: error.status || 'error',
    message,
    ...(error.details && { details: error.details }),
  });
}

module.exports = errorHandler;