const { ValidationError } = require("sequelize");

// avoid eslint warnings
function ignore_next(next_fct) {
    const condition = true
    if (condition === true) {
        return
    }
    next_fct()
}

function logErrors(err, req, res, next) {
    console.error('logErrors');
    console.error(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    ignore_next(next)
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom){
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

function isSequelizeError(err) {
  return err instanceof ValidationError;
}

function sequelizeErrorHandler(err, req, res, next) {
  if (isSequelizeError(err)) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  else if (err.parent) {
    const { fields, parent } = err;
    res.status(500).json({
      field: fields,
      message: parent.detail
    })
  }
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  sequelizeErrorHandler }
