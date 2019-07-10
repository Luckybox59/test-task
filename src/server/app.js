import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import sendMail from './send-email';
import User from './entities/User';

export default () => {
  const app = new Express();
  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const users = [
    new User({
      firstName: 'admin',
      lastName: 'adminich',
      email: 'admin@mail.ru',
      country: 'Russia',
      city: 'Perm',
      password: bcrypt.hashSync('asdfgh', 8),
      balance: 890,
      operations: [
        { date: '14 мая 2019', action: 'Оплата счета' },
        { date: '13 мая 2019', action: 'Оплата счета' },
        { date: '12 мая 2019', action: 'Оплата счета' },
        { date: '11 мая 2019', action: 'Оплата счета' },
        { date: '10 мая 2019', action: 'Пополнение счета' },
        { date: '9 мая 2019', action: 'Оплата счета' },
        { date: '8 мая 2019', action: 'Оплата счета' },
        { date: '7 мая 2019', action: 'Оплата счета' },
      ],
    }),
  ];

  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, 'supersecret', (err, authData) => {
        if (err) {
          console.log('verify token: No!');
          res.sendStatus(403);
        } else {
          console.log('verify token: Yes!');
          res.locals.user = users.find(u => u.id === authData.id);
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  };

  const readOnlyProps = new Set(['password', 'id', 'verifyEmail', 'balance', 'operations']);

  app.post('/users/new', (req, res) => {
    const { firstName, email, password } = req.body;
    const user = new User({ firstName, email, password: bcrypt.hashSync(password, 8) });
    users.push(user);
    jwt.sign({ id: user.id, email }, 'emailsecret', (err, token) => {
      const verifyLink = `http://localhost:3000/users/new/verify?token=${token}`;
      sendMail(email, verifyLink);
    });
    jwt.sign({ id: user.id, email }, 'supersecret', { expiresIn: '2h' }, () => {
      res.sendStatus(200);
    });
  });

  app.get('/users/verify/email', (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, 'emailsecret');
    const user = users.find(u => u.id === decoded.id);
    user.verifyEmail = true;
    res.sendfile(`${__dirname}/views/verifyEmail.html`);
  });

  app.post('/session/new', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
      jwt.sign({ id: user.id, email }, 'supersecret', { expiresIn: '2h' }, (err, token) => {
        res.status(200).json({ token });
      });
    }
  });

  app.get('/users', verifyToken, (req, res) => {
    const user = res.locals.user;
    const { password, ...profile } = user;
    res.status(200).json(profile);
  });

  app.put('/users/edit', verifyToken, (req, res) => {
    const user = res.locals.user;
    const keys = Object.keys(req.body);
    keys.forEach((prop) => {
      if (_.has(user, prop) && !readOnlyProps.has(prop)) {
        user[prop] = req.body[prop];
      }
    });
    res.sendStatus(204);
  });

  app.patch('/users/edit/password', verifyToken, (req, res) => {
    const user = res.locals.user;
    const { currentPassword, newPassword } = req.body;
    console.log('userPass: ' + user.password);
    let message = '';
    if (bcrypt.compareSync(currentPassword, user.password)) {
      user.password = bcrypt.hashSync(newPassword, 8);
      console.log('verify password: Yes!');
      message = 'Пароль успешно измненен!';
    } else {
      console.log('verify password: No!');
      message = 'Ошибка! Пароль не был изменен!';
    }
    res.status(200).json({ message });
  });

  app.patch('/users/edit/transactions', verifyToken, (req, res) => {
    console.log(req.body);
    const user = res.locals.user;
    const { balance, action } = req.body;
    moment.locale('ru');
    const date = moment().format('DD MMMM YYYY');
    user.balance = balance;
    user.operations.unshift({ date, action });
    res.sendStatus(204);
  });

  app.get('/users/history', verifyToken, (req, res) => {
    const user = res.locals.user;
    res.status(200).json(user.operations);
  });

  app.get('/users/balance', verifyToken, (req, res) => {
    const user = res.locals.user;
    res.status(200).json({ balance: user.balance });
  });

  return app;
};
