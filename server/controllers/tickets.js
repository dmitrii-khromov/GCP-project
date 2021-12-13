const Ticket = require('../models/ticket');
const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden-err');

module.exports.getAvailableTickets = (req, res, next) => {
    Ticket.find({}).select('+owner')
      .then((tickets) => {
        const availableTickets = tickets.filter((ticket) => ticket.owner === undefined || ticket.owner === null);
        res.send({ data: availableTickets });
      })
      .catch(next);
  };
  
module.exports.createTicket = (req, res, next) => {
    const { date, movieTitle, hall, row, seat } = req.body;

    Ticket.create({ date, movieTitle, hall, row, seat })
    .then((ticket) => res.send({ data: ticket }))
    .catch(next);
};