import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import fs from 'fs';

import sendMail from './send-email';
import User from './entities/User';

export default () => {
  const app = new Express();
  app.use(morgan('dev'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const filepath = `${__dirname}/usersDB.json`;

  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, 'supersecret', (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const { users } = res.locals.db;
          res.locals.user = users.find(u => u.id === authData.id);
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  };

  const readDb = (req, res, next) => {
    const db = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    res.locals.db = db;
    next();
  };

  const readOnlyProps = new Set(['password', 'id', 'verifyEmail', 'balance', 'operations']);

  app.post('/users/new', readDb, (req, res) => {
    const { db } = res.locals;
    const { users } = db;
    db.numOfRegistrations += 1;
    const { firstName, email, password } = req.body;
    const user = new User({
      id: db.numOfRegistrations,
      firstName,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    users.push(user);

    const newDb = JSON.stringify(db, '', 2);
    fs.writeFileSync(filepath, newDb, 'utf8');

    jwt.sign({ id: user.id, email }, 'emailsecret', (err, token) => {
      const verifyLink = `http://localhost:3000/users/new/verify?token=${token}`;
      sendMail(email, verifyLink);
    });
    jwt.sign({ id: user.id, email }, 'supersecret', { expiresIn: '2h' }, () => {
      res.sendStatus(200);
    });
  });

  app.get('/users/verify/email', readDb, (req, res) => {
    const { token } = req.query;
    const decoded = jwt.verify(token, 'emailsecret');
    const { users } = res.locals.db;
    const user = users.find(u => u.id === decoded.id);
    user.verifyEmail = true;
    res.sendfile(`${__dirname}/views/verifyEmail.html`);
  });

  app.post('/session/new', readDb, (req, res) => {
    const { email, password } = req.body;
    const { users } = res.locals.db;
    console.log(req.body);
    const user = users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
      jwt.sign({ id: user.id, email }, 'supersecret', { expiresIn: '2h' }, (err, token) => {
        res.status(200).json({ token });
      });
    }
  });

  app.get('/users', readDb, verifyToken, (req, res) => {
    const { password, ...profile } = res.locals.user;
    res.status(200).json(profile);
  });

  app.put('/users/edit', readDb, verifyToken, (req, res) => {
    const { db, user } = res.locals;
    const keys = Object.keys(req.body);
    keys.forEach((prop) => {
      if (_.has(user, prop) && !readOnlyProps.has(prop)) {
        user[prop] = req.body[prop];
      }
    });

    const newDb = JSON.stringify(db, '', 2);
    fs.writeFileSync(filepath, newDb, 'utf8');

    res.sendStatus(204);
  });

  app.patch('/users/edit/password', readDb, verifyToken, (req, res) => {
    const { db, user } = res.locals;
    const { currentPassword, newPassword } = req.body;
    let message = '';
    if (bcrypt.compareSync(currentPassword, user.password)) {
      user.password = bcrypt.hashSync(newPassword, 8);
      message = 'Пароль успешно измненен!';

      const newDb = JSON.stringify(db, '', 2);
      fs.writeFileSync(filepath, newDb, 'utf8');
    } else {
      message = 'Ошибка! Пароль не был изменен!';
    }
    res.status(200).json({ message });
  });

  app.patch('/users/edit/transactions', readDb, verifyToken, (req, res) => {
    const { db, user } = res.locals;
    const { balance, action } = req.body;
    moment.locale('ru');
    const date = moment().format('DD MMMM YYYY');
    user.balance = balance;
    user.operations.unshift({ date, action });

    const newDb = JSON.stringify(db, '', 2);
    fs.writeFileSync(filepath, newDb, 'utf8');

    res.sendStatus(204);
  });

  app.get('/users/history', readDb, verifyToken, (req, res) => {
    const { user } = res.locals;
    res.status(200).json(user.operations);
  });

  app.get('/users/balance', readDb, verifyToken, (req, res) => {
    const { user } = res.locals;
    res.status(200).json({ balance: user.balance });
  });

  return app;
};
