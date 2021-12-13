const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const Conflict = require('../errors/conflict-err');
const AuthError = require('../errors/auth-err');
const Forbidden = require('../errors/forbidden-err');
const Ticket = require('../models/ticket');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError({ message: 'No user with id specified' });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name ? req.body.name : 'Name',
    }))
    .then((user) => {
      res.send({ data: { name: user.name, email: user.email } });
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new Conflict({ message: 'Internal server error' }));
      }
      else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(() => {
      next(new AuthError({ message: 'Invalid email or password' }));
    });
};

const buyTicket = (req, res, next) => {
  const { date, movieTitle, hall, row, seat } = req.body;
  Ticket.find({'date' : new Date(date)}).select('+owner')
  .then((tickets) => {
    const availableTicket = tickets.find((ticket) => {
      if ((ticket.owner === undefined || ticket.owner === null) &&
          ticket.movieTitle === movieTitle &&
          ticket.hall === hall &&
          ticket.row === row &&
          ticket.seat === seat) {
            return true;
          }

      return false;
    });

    if (availableTicket !== undefined) {
      Ticket.findByIdAndUpdate(availableTicket._id, {owner: req.user._id}, {new: true}, function(err, updatedTicket) {
        if (err) {
          throw new Error({ message: `Failed to buy a ticket. ${err}.` });
        }
      });
    }
    else {
      throw new NotFoundError({ message: 'Failed to find available ticket.' });
    }
    
    res.send({ data: availableTicket });
  })
  .catch(next);
};

const boughtTickets = (req, res, next) => {
  Ticket.find({"owner" : req.user._id}).select('+owner')
  .then((tickets) => {
    res.send({ data: tickets });
  })
  .catch(next);
};

const returnTicket = (req, res, next) => {
  const { ticketId } = req.body;
  Ticket.findByIdAndUpdate(ticketId).select('+owner')
  .orFail(() => new NotFoundError({ message: 'A ticket has not been found.' }))
  .then((ticket) => {
    if (!ticket.owner || !ticket.owner.equals(req.user._id)) {
      throw new Forbidden({ message: 'Failed to return a ticket. Access denied.' });
    }

    ticket.owner = undefined;
    ticket.save();

    res.send({ data: ticket });
  })
  .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
  buyTicket,
  boughtTickets,
  returnTicket,
};
