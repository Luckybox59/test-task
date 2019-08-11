'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer2.default.createTransport({
  service: 'gmail',
  auth: {
    user: 'lucky.test.mail.send@gmail.com',
    pass: '654ppp321'
  }
});

exports.default = function (to, link) {
  var mailOptions = {
    from: 'lucky.test.mail.send59@gmail.com',
    to: to,
    subject: 'Подтвердите свой адрес эл. почты',
    html: '<p>\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B. \u043F\u043E\u0447\u0442\u044B, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0443\u0447. \u0437\u0430\u043F\u0438\u0441\u0438 "\u0414\u0414\u0414\u0414\u0414", \u043D\u0430\u0436\u0430\u0432 \u043D\u0430 \u0441\u043B\u0435\u0434. \u0441\u0441\u044B\u043B\u043A\u0443 <a href="' + link + '">\u0441\u0441\u044B\u043B\u043A\u0430</a></p>'
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvc2VuZC1lbWFpbC5qcyJdLCJuYW1lcyI6WyJ0cmFuc3BvcnRlciIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsInVzZXIiLCJwYXNzIiwidG8iLCJsaW5rIiwibWFpbE9wdGlvbnMiLCJmcm9tIiwic3ViamVjdCIsImh0bWwiLCJzZW5kTWFpbCIsImVyciIsImluZm8iLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxjQUFjQyxxQkFBV0MsZUFBWCxDQUEyQjtBQUM3Q0MsV0FBUyxPQURvQztBQUU3Q0MsUUFBTTtBQUNKQyxVQUFNLGdDQURGO0FBRUpDLFVBQU07QUFGRjtBQUZ1QyxDQUEzQixDQUFwQjs7a0JBUWUsVUFBQ0MsRUFBRCxFQUFLQyxJQUFMLEVBQWM7QUFDM0IsTUFBTUMsY0FBYztBQUNsQkMsVUFBTSxrQ0FEWTtBQUVsQkgsVUFGa0I7QUFHbEJJLGFBQVMsa0NBSFM7QUFJbEJDLGdnQkFBeUhKLElBQXpIO0FBSmtCLEdBQXBCOztBQU9BUixjQUFZYSxRQUFaLENBQXFCSixXQUFyQixFQUFrQyxVQUFDSyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUMvQyxRQUFJRCxHQUFKLEVBQVM7QUFDUEUsY0FBUUMsR0FBUixDQUFZSCxHQUFaO0FBQ0QsS0FGRCxNQUVPO0FBQ0xFLGNBQVFDLEdBQVIsQ0FBWUYsS0FBS0csUUFBakI7QUFDRDtBQUNGLEdBTkQ7QUFPRCxDIiwiZmlsZSI6InNlbmQtZW1haWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcblxuY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydCh7XG4gIHNlcnZpY2U6ICdnbWFpbCcsXG4gIGF1dGg6IHtcbiAgICB1c2VyOiAnbHVja3kudGVzdC5tYWlsLnNlbmRAZ21haWwuY29tJyxcbiAgICBwYXNzOiAnNjU0cHBwMzIxJyxcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCAodG8sIGxpbmspID0+IHtcbiAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XG4gICAgZnJvbTogJ2x1Y2t5LnRlc3QubWFpbC5zZW5kNTlAZ21haWwuY29tJyxcbiAgICB0byxcbiAgICBzdWJqZWN0OiAn0J/QvtC00YLQstC10YDQtNC40YLQtSDRgdCy0L7QuSDQsNC00YDQtdGBINGN0LsuINC/0L7Rh9GC0YsnLFxuICAgIGh0bWw6IGA8cD7Qn9C+0LTRgtCy0LXRgNC00LjRgtC1INGB0LLQvtC5INCw0LTRgNC10YEg0Y3Quy4g0L/QvtGH0YLRiywg0YfRgtC+0LHRiyDQv9C+0LvRg9GH0LjRgtGMINC00L7RgdGC0YPQvyDQuiDRg9GHLiDQt9Cw0L/QuNGB0LggXCLQlNCU0JTQlNCUXCIsINC90LDQttCw0LIg0L3QsCDRgdC70LXQtC4g0YHRgdGL0LvQutGDIDxhIGhyZWY9XCIke2xpbmt9XCI+0YHRgdGL0LvQutCwPC9hPjwvcD5gLFxuICB9O1xuXG4gIHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zLCAoZXJyLCBpbmZvKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coaW5mby5yZXNwb25zZSk7XG4gICAgfVxuICB9KTtcbn07XG4iXX0=