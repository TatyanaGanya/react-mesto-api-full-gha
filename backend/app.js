require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// winston
const { errors } = require('celebrate');
// cors
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mongodb' } = process.env;

const app = express();

// cors
app.use(cors({ credentials: true, origin: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(requestLogger); // подключаем логгер запросов

app.use('/', require('./routes/index'));

app.use('*', (req, res, next) => {
  next(new NotFoundError({ message: 'страница не найдена' }));
});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
