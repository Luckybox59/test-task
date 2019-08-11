'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _sendEmail = require('./send-email');

var _sendEmail2 = _interopRequireDefault(_sendEmail);

var _User = require('./entities/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function () {
  var app = new _express2.default();
  app.use((0, _morgan2.default)('dev'));
  app.use((0, _cors2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json());

  var users = [new _User2.default({
    firstName: 'admin',
    lastName: 'adminich',
    email: 'admin@mail.ru',
    country: 'Russia',
    city: 'Perm',
    password: _bcrypt2.default.hashSync('asdfgh', 8),
    balance: 890,
    operations: [{ date: '14 мая 2019', action: 'Оплата счета' }, { date: '13 мая 2019', action: 'Оплата счета' }, { date: '12 мая 2019', action: 'Оплата счета' }, { date: '11 мая 2019', action: 'Оплата счета' }, { date: '10 мая 2019', action: 'Пополнение счета' }, { date: '9 мая 2019', action: 'Оплата счета' }, { date: '8 мая 2019', action: 'Оплата счета' }, { date: '7 мая 2019', action: 'Оплата счета' }]
  })];

  var verifyToken = function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
      _jsonwebtoken2.default.verify(token, 'supersecret', function (err, authData) {
        if (err) {
          console.log('verify token: No!');
          res.sendStatus(403);
        } else {
          console.log('verify token: Yes!');
          res.locals.user = users.find(function (u) {
            return u.id === authData.id;
          });
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  };

  var readOnlyProps = new Set(['password', 'id', 'verifyEmail', 'balance', 'operations']);

  app.post('/users/new', function (req, res) {
    var _req$body = req.body,
        firstName = _req$body.firstName,
        email = _req$body.email,
        password = _req$body.password;

    var user = new _User2.default({ firstName: firstName, email: email, password: _bcrypt2.default.hashSync(password, 8) });
    users.push(user);
    _jsonwebtoken2.default.sign({ id: user.id, email: email }, 'emailsecret', function (err, token) {
      var verifyLink = 'http://localhost:3000/users/new/verify?token=' + token;
      (0, _sendEmail2.default)(email, verifyLink);
    });
    _jsonwebtoken2.default.sign({ id: user.id, email: email }, 'supersecret', { expiresIn: '2h' }, function () {
      res.sendStatus(200);
    });
  });

  app.get('/users/verify/email', function (req, res) {
    var token = req.query.token;

    var decoded = _jsonwebtoken2.default.verify(token, 'emailsecret');
    var user = users.find(function (u) {
      return u.id === decoded.id;
    });
    user.verifyEmail = true;
    res.sendfile(__dirname + '/views/verifyEmail.html');
  });

  app.post('/session/new', function (req, res) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    var user = users.find(function (u) {
      return u.email === email;
    });
    if (user && _bcrypt2.default.compareSync(password, user.password)) {
      _jsonwebtoken2.default.sign({ id: user.id, email: email }, 'supersecret', { expiresIn: '2h' }, function (err, token) {
        res.status(200).json({ token: token });
      });
    }
  });

  app.get('/users', verifyToken, function (req, res) {
    var user = res.locals.user;

    var password = user.password,
        profile = _objectWithoutProperties(user, ['password']);

    res.status(200).json(profile);
  });

  app.put('/users/edit', verifyToken, function (req, res) {
    var user = res.locals.user;
    var keys = Object.keys(req.body);
    keys.forEach(function (prop) {
      if (_lodash2.default.has(user, prop) && !readOnlyProps.has(prop)) {
        user[prop] = req.body[prop];
      }
    });
    res.sendStatus(204);
  });

  app.patch('/users/edit/password', verifyToken, function (req, res) {
    var user = res.locals.user;
    var _req$body3 = req.body,
        currentPassword = _req$body3.currentPassword,
        newPassword = _req$body3.newPassword;

    console.log('userPass: ' + user.password);
    var message = '';
    if (_bcrypt2.default.compareSync(currentPassword, user.password)) {
      user.password = _bcrypt2.default.hashSync(newPassword, 8);
      console.log('verify password: Yes!');
      message = 'Пароль успешно измненен!';
    } else {
      console.log('verify password: No!');
      message = 'Ошибка! Пароль не был изменен!';
    }
    res.status(200).json({ message: message });
  });

  app.patch('/users/edit/transactions', verifyToken, function (req, res) {
    console.log(req.body);
    var user = res.locals.user;
    var _req$body4 = req.body,
        balance = _req$body4.balance,
        action = _req$body4.action;

    _moment2.default.locale('ru');
    var date = (0, _moment2.default)().format('DD MMMM YYYY');
    user.balance = balance;
    user.operations.unshift({ date: date, action: action });
    res.sendStatus(204);
  });

  app.get('/users/history', verifyToken, function (req, res) {
    var user = res.locals.user;
    res.status(200).json(user.operations);
  });

  app.get('/users/balance', verifyToken, function (req, res) {
    var user = res.locals.user;
    res.status(200).json({ balance: user.balance });
  });

  return app;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvYXBwLmpzIl0sIm5hbWVzIjpbImFwcCIsIkV4cHJlc3MiLCJ1c2UiLCJib2R5UGFyc2VyIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwianNvbiIsInVzZXJzIiwiVXNlciIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZW1haWwiLCJjb3VudHJ5IiwiY2l0eSIsInBhc3N3b3JkIiwiYmNyeXB0IiwiaGFzaFN5bmMiLCJiYWxhbmNlIiwib3BlcmF0aW9ucyIsImRhdGUiLCJhY3Rpb24iLCJ2ZXJpZnlUb2tlbiIsInJlcSIsInJlcyIsIm5leHQiLCJ0b2tlbiIsImhlYWRlcnMiLCJqd3QiLCJ2ZXJpZnkiLCJlcnIiLCJhdXRoRGF0YSIsImNvbnNvbGUiLCJsb2ciLCJzZW5kU3RhdHVzIiwibG9jYWxzIiwidXNlciIsImZpbmQiLCJ1IiwiaWQiLCJyZWFkT25seVByb3BzIiwiU2V0IiwicG9zdCIsImJvZHkiLCJwdXNoIiwic2lnbiIsInZlcmlmeUxpbmsiLCJleHBpcmVzSW4iLCJnZXQiLCJxdWVyeSIsImRlY29kZWQiLCJ2ZXJpZnlFbWFpbCIsInNlbmRmaWxlIiwiX19kaXJuYW1lIiwiY29tcGFyZVN5bmMiLCJzdGF0dXMiLCJwcm9maWxlIiwicHV0Iiwia2V5cyIsIk9iamVjdCIsImZvckVhY2giLCJwcm9wIiwiXyIsImhhcyIsInBhdGNoIiwiY3VycmVudFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJtZXNzYWdlIiwibW9tZW50IiwibG9jYWxlIiwiZm9ybWF0IiwidW5zaGlmdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O2tCQUVlLFlBQU07QUFDbkIsTUFBTUEsTUFBTSxJQUFJQyxpQkFBSixFQUFaO0FBQ0FELE1BQUlFLEdBQUosQ0FBUSxzQkFBTyxLQUFQLENBQVI7QUFDQUYsTUFB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QUFiO0FBQ0FsQyxTQUFLbEIsT0FBTCxHQUFlQSxPQUFmO0FBQ0FrQixTQUFLakIsVUFBTCxDQUFnQm9ELE9BQWhCLENBQXdCLEVBQUVuRCxVQUFGLEVBQVFDLGNBQVIsRUFBeEI7QUFDQUcsUUFBSVUsVUFBSixDQUFlLEdBQWY7QUFDRCxHQVREOztBQVdBakMsTUFBSStDLEdBQUosQ0FBUSxnQkFBUixFQUEwQjFCLFdBQTFCLEVBQXVDLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ25ELFFBQU1ZLE9BQU9aLElBQUlXLE1BQUosQ0FBV0MsSUFBeEI7QUFDQVosUUFBSStCLE1BQUosQ0FBVyxHQUFYLEVBQWdCaEQsSUFBaEIsQ0FBcUI2QixLQUFLakIsVUFBMUI7QUFDRCxHQUhEOztBQUtBbEIsTUFBSStDLEdBQUosQ0FBUSxnQkFBUixFQUEwQjFCLFdBQTFCLEVBQXVDLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ25ELFFBQU1ZLE9BQU9aLElBQUlXLE1BQUosQ0FBV0MsSUFBeEI7QUFDQVosUUFBSStCLE1BQUosQ0FBVyxHQUFYLEVBQWdCaEQsSUFBaEIsQ0FBcUIsRUFBRVcsU0FBU2tCLEtBQUtsQixPQUFoQixFQUFyQjtBQUNELEdBSEQ7O0FBS0EsU0FBT2pCLEdBQVA7QUFDRCxDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnO1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgc2VuZE1haWwgZnJvbSAnLi9zZW5kLWVtYWlsJztcbmltcG9ydCBVc2VyIGZyb20gJy4vZW50aXRpZXMvVXNlcic7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbiAgYXBwLnVzZShtb3JnYW4oJ2RldicpKTtcbiAgYXBwLnVzZShjb3JzKCkpO1xuICBhcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4gIGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG4gIGNvbnN0IHVzZXJzID0gW1xuICAgIG5ldyBVc2VyKHtcbiAgICAgIGZpcnN0TmFtZTogJ2FkbWluJyxcbiAgICAgIGxhc3ROYW1lOiAnYWRtaW5pY2gnLFxuICAgICAgZW1haWw6ICdhZG1pbkBtYWlsLnJ1JyxcbiAgICAgIGNvdW50cnk6ICdSdXNzaWEnLFxuICAgICAgY2l0eTogJ1Blcm0nLFxuICAgICAgcGFzc3dvcmQ6IGJjcnlwdC5oYXNoU3luYygnYXNkZmdoJywgOCksXG4gICAgICBiYWxhbmNlOiA4OTAsXG4gICAgICBvcGVyYXRpb25zOiBbXG4gICAgICAgIHsgZGF0ZTogJzE0INC80LDRjyAyMDE5JywgYWN0aW9uOiAn0J7Qv9C70LDRgtCwINGB0YfQtdGC0LAnIH0sXG4gICAgICAgIHsgZGF0ZTogJzEzINC80LDRjyAyMDE5JywgYWN0aW9uOiAn0J7Qv9C70LDRgtCwINGB0YfQtdGC0LAnIH0sXG4gICAgICAgIHsgZGF0ZTogJzEyINC80LDRjyAyMDE5JywgYWN0aW9uOiAn0J7Qv9C70LDRgtCwINGB0YfQtdGC0LAnIH0sXG4gICAgICAgIHsgZGF0ZTogJzExINC80LDRjyAyMDE5JywgYWN0aW9uOiAn0J7Qv9C70LDRgtCwINGB0YfQtdGC0LAnIH0sXG4gICAgICAgIHsgZGF0ZTogJzEwINC80LDRjyAyMDE5JywgYWN0aW9uOiAn0J/QvtC/0L7Qu9C90LXQvdC40LUg0YHRh9C10YLQsCcgfSxcbiAgICAgICAgeyBkYXRlOiAnOSDQvNCw0Y8gMjAxOScsIGFjdGlvbjogJ9Ce0L/Qu9Cw0YLQsCDRgdGH0LXRgtCwJyB9LFxuICAgICAgICB7IGRhdGU6ICc4INC80LDRjyAyMDE5JywgYWN0aW9uOiAn0J7Qv9C70LDRgtCwINGB0YfQtdGC0LAnIH0sXG4gICAgICAgIHsgZGF0ZTogJzcg0LzQsNGPIDIwMTknLCBhY3Rpb246ICfQntC/0LvQsNGC0LAg0YHRh9C10YLQsCcgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF07XG5cbiAgY29uc3QgdmVyaWZ5VG9rZW4gPSAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHJlcS5oZWFkZXJzWydhdXRob3JpemF0aW9uJ107XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBqd3QudmVyaWZ5KHRva2VuLCAnc3VwZXJzZWNyZXQnLCAoZXJyLCBhdXRoRGF0YSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3ZlcmlmeSB0b2tlbjogTm8hJyk7XG4gICAgICAgICAgcmVzLnNlbmRTdGF0dXMoNDAzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndmVyaWZ5IHRva2VuOiBZZXMhJyk7XG4gICAgICAgICAgcmVzLmxvY2Fscy51c2VyID0gdXNlcnMuZmluZCh1ID0+IHUuaWQgPT09IGF1dGhEYXRhLmlkKTtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMuc2VuZFN0YXR1cyg0MDMpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByZWFkT25seVByb3BzID0gbmV3IFNldChbJ3Bhc3N3b3JkJywgJ2lkJywgJ3ZlcmlmeUVtYWlsJywgJ2JhbGFuY2UnLCAnb3BlcmF0aW9ucyddKTtcblxuICBhcHAucG9zdCgnL3VzZXJzL25ldycsIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih7IGZpcnN0TmFtZSwgZW1haWwsIHBhc3N3b3JkOiBiY3J5cHQuaGFzaFN5bmMocGFzc3dvcmQsIDgpIH0pO1xuICAgIHVzZXJzLnB1c2godXNlcik7XG4gICAgand0LnNpZ24oeyBpZDogdXNlci5pZCwgZW1haWwgfSwgJ2VtYWlsc2VjcmV0JywgKGVyciwgdG9rZW4pID0+IHtcbiAgICAgIGNvbnN0IHZlcmlmeUxpbmsgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXJzL25ldy92ZXJpZnk/dG9rZW49JHt0b2tlbn1gO1xuICAgICAgc2VuZE1haWwoZW1haWwsIHZlcmlmeUxpbmspO1xuICAgIH0pO1xuICAgIGp3dC5zaWduKHsgaWQ6IHVzZXIuaWQsIGVtYWlsIH0sICdzdXBlcnNlY3JldCcsIHsgZXhwaXJlc0luOiAnMmgnIH0sICgpID0+IHtcbiAgICAgIHJlcy5zZW5kU3RhdHVzKDIwMCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy91c2Vycy92ZXJpZnkvZW1haWwnLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IHRva2VuIH0gPSByZXEucXVlcnk7XG4gICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sICdlbWFpbHNlY3JldCcpO1xuICAgIGNvbnN0IHVzZXIgPSB1c2Vycy5maW5kKHUgPT4gdS5pZCA9PT0gZGVjb2RlZC5pZCk7XG4gICAgdXNlci52ZXJpZnlFbWFpbCA9IHRydWU7XG4gICAgcmVzLnNlbmRmaWxlKGAke19fZGlybmFtZX0vdmlld3MvdmVyaWZ5RW1haWwuaHRtbGApO1xuICB9KTtcblxuICBhcHAucG9zdCgnL3Nlc3Npb24vbmV3JywgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IHVzZXIgPSB1c2Vycy5maW5kKHUgPT4gdS5lbWFpbCA9PT0gZW1haWwpO1xuICAgIGlmICh1c2VyICYmIGJjcnlwdC5jb21wYXJlU3luYyhwYXNzd29yZCwgdXNlci5wYXNzd29yZCkpIHtcbiAgICAgIGp3dC5zaWduKHsgaWQ6IHVzZXIuaWQsIGVtYWlsIH0sICdzdXBlcnNlY3JldCcsIHsgZXhwaXJlc0luOiAnMmgnIH0sIChlcnIsIHRva2VuKSA9PiB7XG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgdG9rZW4gfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy91c2VycycsIHZlcmlmeVRva2VuLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB1c2VyID0gcmVzLmxvY2Fscy51c2VyO1xuICAgIGNvbnN0IHsgcGFzc3dvcmQsIC4uLnByb2ZpbGUgfSA9IHVzZXI7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocHJvZmlsZSk7XG4gIH0pO1xuXG4gIGFwcC5wdXQoJy91c2Vycy9lZGl0JywgdmVyaWZ5VG9rZW4sIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSByZXMubG9jYWxzLnVzZXI7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJlcS5ib2R5KTtcbiAgICBrZXlzLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGlmIChfLmhhcyh1c2VyLCBwcm9wKSAmJiAhcmVhZE9ubHlQcm9wcy5oYXMocHJvcCkpIHtcbiAgICAgICAgdXNlcltwcm9wXSA9IHJlcS5ib2R5W3Byb3BdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJlcy5zZW5kU3RhdHVzKDIwNCk7XG4gIH0pO1xuXG4gIGFwcC5wYXRjaCgnL3VzZXJzL2VkaXQvcGFzc3dvcmQnLCB2ZXJpZnlUb2tlbiwgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgdXNlciA9IHJlcy5sb2NhbHMudXNlcjtcbiAgICBjb25zdCB7IGN1cnJlbnRQYXNzd29yZCwgbmV3UGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuICAgIGNvbnNvbGUubG9nKCd1c2VyUGFzczogJyArIHVzZXIucGFzc3dvcmQpO1xuICAgIGxldCBtZXNzYWdlID0gJyc7XG4gICAgaWYgKGJjcnlwdC5jb21wYXJlU3luYyhjdXJyZW50UGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpKSB7XG4gICAgICB1c2VyLnBhc3N3b3JkID0gYmNyeXB0Lmhhc2hTeW5jKG5ld1Bhc3N3b3JkLCA4KTtcbiAgICAgIGNvbnNvbGUubG9nKCd2ZXJpZnkgcGFzc3dvcmQ6IFllcyEnKTtcbiAgICAgIG1lc3NhZ2UgPSAn0J/QsNGA0L7Qu9GMINGD0YHQv9C10YjQvdC+INC40LfQvNC90LXQvdC10L0hJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ3ZlcmlmeSBwYXNzd29yZDogTm8hJyk7XG4gICAgICBtZXNzYWdlID0gJ9Ce0YjQuNCx0LrQsCEg0J/QsNGA0L7Qu9GMINC90LUg0LHRi9C7INC40LfQvNC10L3QtdC9ISc7XG4gICAgfVxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZSB9KTtcbiAgfSk7XG5cbiAgYXBwLnBhdGNoKCcvdXNlcnMvZWRpdC90cmFuc2FjdGlvbnMnLCB2ZXJpZnlUb2tlbiwgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVxLmJvZHkpO1xuICAgIGNvbnN0IHVzZXIgPSByZXMubG9jYWxzLnVzZXI7XG4gICAgY29uc3QgeyBiYWxhbmNlLCBhY3Rpb24gfSA9IHJlcS5ib2R5O1xuICAgIG1vbWVudC5sb2NhbGUoJ3J1Jyk7XG4gICAgY29uc3QgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdCgnREQgTU1NTSBZWVlZJyk7XG4gICAgdXNlci5iYWxhbmNlID0gYmFsYW5jZTtcbiAgICB1c2VyLm9wZXJhdGlvbnMudW5zaGlmdCh7IGRhdGUsIGFjdGlvbiB9KTtcbiAgICByZXMuc2VuZFN0YXR1cygyMDQpO1xuICB9KTtcblxuICBhcHAuZ2V0KCcvdXNlcnMvaGlzdG9yeScsIHZlcmlmeVRva2VuLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB1c2VyID0gcmVzLmxvY2Fscy51c2VyO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHVzZXIub3BlcmF0aW9ucyk7XG4gIH0pO1xuXG4gIGFwcC5nZXQoJy91c2Vycy9iYWxhbmNlJywgdmVyaWZ5VG9rZW4sIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSByZXMubG9jYWxzLnVzZXI7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBiYWxhbmNlOiB1c2VyLmJhbGFuY2UgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBhcHA7XG59O1xuIl19