require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const { celebrate, Joi, errors } = require('celebrate');

const cookieParser = require('cookie-parser');

const NotFindError = require('./utils/notFindError');

const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors({
  origin: ['https://mokwar.nomoreparties.co', 'http://localhost:3000', 'http://mokwar.nomoreparties.co'],
}));

const {
  login,
  createUser,
} = require('./controllers/users');

mongoose.connect('mongodb://0.0.0.0:27017/afilavoavoa', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('All is fine');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use('*', (req, res, next) => {
  next(new NotFindError('Данная страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
