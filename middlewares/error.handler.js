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

module.exports = { logErrors, errorHandler, boomErrorHandler }