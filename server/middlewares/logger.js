const winston = require('winston');
const expressWinston = require('express-winston');
//const path = require('path');

const requestLogger = expressWinston.logger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: path.join('logs', 'request.log') }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  level: 'error',
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: path.join('logs', 'error.log') }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
