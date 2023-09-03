const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');// celebrate
const urlEdit = require('../utils/constant');

const {
  getUsers,
  getUsersById,
  editUserData,
  editUserAvatar,
  getUsersMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUsersById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserData);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlEdit),
  }),
}), editUserAvatar);

module.exports = router;
