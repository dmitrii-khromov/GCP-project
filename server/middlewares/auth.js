const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const AuthError = require('../errors/auth-err');

module.exports = ((req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthError({ message: 'A user must be authorized' });
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
      throw new AuthError({ message: 'A user must be authorized' });
    }

    req.user = payload;

    next();
  }
  catch (err) {
    next(err);
  }
});
