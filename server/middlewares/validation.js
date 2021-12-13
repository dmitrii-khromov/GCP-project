const { celebrate, Joi } = require('celebrate');

const validateTicket = celebrate({
  body: Joi.object().keys({
    date: Joi.date().required()
      .messages({
        'date.empty': 'date must not be empty',
        'any.required': 'date must be specified',
      }),
    movieTitle: Joi.string().required()
      .messages({
        'string.empty': 'movieTitle must not be empty',
        'any.required': 'movieTitle must be specified',
      }),
    hall: Joi.string().required()
      .messages({
        'string.empty': 'hall must not be empty',
        'any.required': 'hall must be specified',
      }),
    row: Joi.number().integer().min(1).max(20).required(),
    seat: Joi.number().integer().min(1).max(30).required(),
  }).unknown(true),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(
        'Valid email must be specified',
      )
      .messages({
        'string.empty': 'email value cannot be empty',
        'any.required': 'email must be specified',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'password cannot be empty',
        'any.required': 'password must be specified',
      }),
    name: Joi.string().required()
      .messages({
        'string.empty': 'user name cannot be empty',
        'any.required': 'user name must be specified',
      }),
  }).unknown(true),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(
        'Valid email must be specified',
      )
      .messages({
        'string.empty': 'email value cannot be empty',
        'any.required': 'email must be specified',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'password value cannot be empty',
        'any.required': 'password must be specified',
      }),
  }),
});

module.exports = {
  validateTicket,
  validateSignup,
  validateSignin,
};
