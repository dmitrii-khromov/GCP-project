const mongoose = require('mongoose');
const validator = require('validator');

const ticketSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  hall: {
    type: String,
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  seat: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: false,
    select: false,
  },
});

module.exports = mongoose.model('ticket', ticketSchema);