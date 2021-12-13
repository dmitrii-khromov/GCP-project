const router = require('express').Router();

const {
  getAvailableTickets,
  createTicket
} = require('../controllers/tickets');

const {
  validateTicket
} = require('../middlewares/validation');

router.get('/', getAvailableTickets);
router.post('/', validateTicket, createTicket);

module.exports = router;