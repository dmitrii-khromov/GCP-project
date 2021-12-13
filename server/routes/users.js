const router = require('express').Router();
const { getUser, buyTicket, boughtTickets, returnTicket } = require('../controllers/users');

router.get('/me', getUser);
router.get('/tickets', boughtTickets);
router.post('/tickets', buyTicket);
router.delete('/tickets', returnTicket);

module.exports = router;
