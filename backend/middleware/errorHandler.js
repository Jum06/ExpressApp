// middleware/errorHandler.js
import logger from "../logger.js";

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);

    const statusCode = err.statusCode || 500;
    const response = {
        message: err.message || 'Internal Server Error',
    };

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

export default errorHandler;