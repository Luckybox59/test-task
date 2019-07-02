'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sendEmail = require('./send-email');

var _sendEmail2 = _interopRequireDefault(_sendEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var logger = (0, _morgan2.default)('combined');

app.use(logger);
app.use((0, _cors2.default)());

//router.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json());

//app.use(session());

//const allowCrossDomain = function(req, res, next) {
//  res.header('Access-Control-Allow-Origin', '*');
//  res.header('Access-Control-Allow-Methods', '*');
//  res.header('Access-Control-Allow-Headers', '*');
//  next();
//}

//app.use(allowCrossDomain)

app.post('/register', function (req, res) {
  console.log(req.sessionID);
  var link = 'http://localhost:3000';
  //sendMail(req.body.email, link);
  res.status(200).end();
});

//app.use(router)

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Express server listening on port\' ' + port);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2ZXIvYXBwLmpzIl0sIm5hbWVzIjpbImFwcCIsImxvZ2dlciIsInVzZSIsInBvc3QiLCJyZXEiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic2Vzc2lvbklEIiwibGluayIsInN0YXR1cyIsImVuZCIsInBvcnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImxpc3RlbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsTUFBTSx3QkFBWjtBQUNBLElBQU1DLFNBQVMsc0JBQU8sVUFBUCxDQUFmOztBQUVBRCxJQUFJRSxHQUFKLENBQVFELE1BQVI7QUFDQUQsSUFBSUUsR0FBSixDQUFRLHFCQUFSOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBRixJQUFJRyxJQUFKLENBQVMsV0FBVCxFQUFzQixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNsQ0MsVUFBUUMsR0FBUixDQUFZSCxJQUFJSSxTQUFoQjtBQUNBLE1BQU1DLE9BQU8sdUJBQWI7QUFDQTtBQUNBSixNQUFJSyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsR0FBaEI7QUFDRCxDQUxEOztBQU9BOztBQUVBLElBQU1DLE9BQU9DLFFBQVFDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixJQUFqQzs7QUFFQWYsSUFBSWdCLE1BQUosQ0FBV0osSUFBWCxFQUFpQixZQUFNO0FBQ3JCTixVQUFRQyxHQUFSLHlDQUFpREssSUFBakQ7QUFDRCxDQUZEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5pbXBvcnQgbW9yZ2FuIGZyb20gJ21vcmdhbic7XG5pbXBvcnQgc2Vzc2lvbiBmcm9tICdleHByZXNzLXNlc3Npb24nO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBzZW5kTWFpbCBmcm9tICcuL3NlbmQtZW1haWwnO1xuXG5jb25zdCBhcHAgPSBFeHByZXNzKCk7XG5jb25zdCBsb2dnZXIgPSBtb3JnYW4oJ2NvbWJpbmVkJyk7XG5cbmFwcC51c2UobG9nZ2VyKTtcbmFwcC51c2UoY29ycygpKTtcblxuLy9yb3V0ZXIudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XG4vL3JvdXRlci51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG4vL2FwcC51c2Uoc2Vzc2lvbigpKTtcblxuLy9jb25zdCBhbGxvd0Nyb3NzRG9tYWluID0gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbi8vICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xuLy8gIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnKicpO1xuLy8gIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLCAnKicpO1xuLy8gIG5leHQoKTtcbi8vfVxuXG4vL2FwcC51c2UoYWxsb3dDcm9zc0RvbWFpbilcblxuYXBwLnBvc3QoJy9yZWdpc3RlcicsIChyZXEsIHJlcykgPT4ge1xuICBjb25zb2xlLmxvZyhyZXEuc2Vzc2lvbklEKTtcbiAgY29uc3QgbGluayA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnO1xuICAvL3NlbmRNYWlsKHJlcS5ib2R5LmVtYWlsLCBsaW5rKTtcbiAgcmVzLnN0YXR1cygyMDApLmVuZCgpO1xufSk7XG5cbi8vYXBwLnVzZShyb3V0ZXIpXG4gXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xuXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgY29uc29sZS5sb2coYEV4cHJlc3Mgc2VydmVyIGxpc3RlbmluZyBvbiBwb3J0JyAke3BvcnR9YCk7XG59KTtcbiJdfQ==