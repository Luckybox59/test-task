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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvc2VuZC1lbWFpbC5qcyJdLCJuYW1lcyI6WyJ0cmFuc3BvcnRlciIsIm5vZGVtYWlsZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJzZXJ2aWNlIiwiYXV0aCIsInVzZXIiLCJwYXNzIiwidG8iLCJsaW5rIiwibWFpbE9wdGlvbnMiLCJmcm9tIiwic3ViamVjdCIsImh0bWwiLCJzZW5kTWFpbCIsImVyciIsImluZm8iLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxjQUFjQyxxQkFBV0MsZUFBWCxDQUEyQjtBQUM3Q0MsV0FBUyxPQURvQztBQUU3Q0MsUUFBTTtBQUNKQyxVQUFNLGdDQURGO0FBRUpDLFVBQU07QUFGRjtBQUZ1QyxDQUEzQixDQUFwQjs7a0JBUWUsVUFBQ0MsRUFBRCxFQUFLQyxJQUFMLEVBQWM7O0FBRTNCLE1BQU1DLGNBQWM7QUFDbEJDLFVBQU0sa0NBRFk7QUFFbEJILFVBRmtCO0FBR2xCSSxhQUFTLGtDQUhTO0FBSWxCQyxnZ0JBQXlISixJQUF6SDtBQUprQixHQUFwQjs7QUFPQVIsY0FBWWEsUUFBWixDQUFxQkosV0FBckIsRUFBa0MsVUFBQ0ssR0FBRCxFQUFNQyxJQUFOLEVBQWU7QUFDL0MsUUFBSUQsR0FBSixFQUFTO0FBQ1BFLGNBQVFDLEdBQVIsQ0FBWUgsR0FBWjtBQUNELEtBRkQsTUFFTztBQUNMRSxjQUFRQyxHQUFSLENBQVlGLEtBQUtHLFFBQWpCO0FBQ0Q7QUFDRixHQU5EO0FBT0QsQyIsImZpbGUiOiJzZW5kLWVtYWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5cbmNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICBzZXJ2aWNlOiAnZ21haWwnLFxuICBhdXRoOiB7XG4gICAgdXNlcjogJ2x1Y2t5LnRlc3QubWFpbC5zZW5kQGdtYWlsLmNvbScsXG4gICAgcGFzczogJzY1NHBwcDMyMScsXG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCAodG8sIGxpbmspID0+IHtcblxuICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICBmcm9tOiAnbHVja3kudGVzdC5tYWlsLnNlbmQ1OUBnbWFpbC5jb20nLFxuICAgIHRvLFxuICAgIHN1YmplY3Q6ICfQn9C+0LTRgtCy0LXRgNC00LjRgtC1INGB0LLQvtC5INCw0LTRgNC10YEg0Y3Quy4g0L/QvtGH0YLRiycsXG4gICAgaHRtbDogYDxwPtCf0L7QtNGC0LLQtdGA0LTQuNGC0LUg0YHQstC+0Lkg0LDQtNGA0LXRgSDRjdC7LiDQv9C+0YfRgtGLLCDRh9GC0L7QsdGLINC/0L7Qu9GD0YfQuNGC0Ywg0LTQvtGB0YLRg9C/INC6INGD0YcuINC30LDQv9C40YHQuCBcItCU0JTQlNCU0JRcIiwg0L3QsNC20LDQsiDQvdCwINGB0LvQtdC0LiDRgdGB0YvQu9C60YMgPGEgaHJlZj1cIiR7bGlua31cIj7RgdGB0YvQu9C60LA8L2E+PC9wPmBcbiAgfTtcblxuICB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucywgKGVyciwgaW5mbykgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8ucmVzcG9uc2UpO1xuICAgIH1cbiAgfSk7XG59OyJdfQ==