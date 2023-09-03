const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');// celebrate
const { addUser } = require('../controllers/users');
const urlEdit = require('../utils/constant');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlEdit),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), addUser);

module.exports = router;
