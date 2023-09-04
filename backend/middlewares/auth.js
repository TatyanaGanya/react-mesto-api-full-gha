// req.user = payload;
const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'some-secret-key' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима регистрация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError('Необходима регистрация');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
