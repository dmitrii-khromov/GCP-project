const router = require('express').Router();
const usersRouter = require('./users');
const ticketsRouter = require('./tickets');
const auth = require('../middlewares/auth');

const {
  login,
  createUser,
} = require('../controllers/users');

const {
  validateSignup,
  validateSignin,
} = require('../middlewares/validation');

const NotFoundError = require('../errors/not-found-err');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.use('/tickets', ticketsRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Not found'));
});

module.exports = router;