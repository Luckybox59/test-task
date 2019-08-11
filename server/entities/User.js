"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lastId = 0;

var getId = function getId() {
  lastId += 1;
  return lastId;
};

var _class = function _class(_ref) {
  var firstName = _ref.firstName,
      lastName = _ref.lastName,
      email = _ref.email,
      country = _ref.country,
      city = _ref.city,
      about = _ref.about,
      password = _ref.password,
      _ref$balance = _ref.balance,
      balance = _ref$balance === undefined ? 0 : _ref$balance,
      _ref$operations = _ref.operations,
      operations = _ref$operations === undefined ? [] : _ref$operations;

  _classCallCheck(this, _class);

  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.verifyEmail = false;
  this.country = country;
  this.city = city;
  this.about = about;
  this.password = password;
  this.id = getId();
  this.balance = balance;
  this.operations = operations;
};

exports.default = _class;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvZW50aXRpZXMvVXNlci5qcyJdLCJuYW1lcyI6WyJsYXN0SWQiLCJnZXRJZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiZW1haWwiLCJjb3VudHJ5IiwiY2l0eSIsImFib3V0IiwicGFzc3dvcmQiLCJiYWxhbmNlIiwib3BlcmF0aW9ucyIsInZlcmlmeUVtYWlsIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsU0FBUyxDQUFiOztBQUVBLElBQU1DLFFBQVEsU0FBUkEsS0FBUSxHQUFNO0FBQ2xCRCxZQUFVLENBQVY7QUFDQSxTQUFPQSxNQUFQO0FBQ0QsQ0FIRDs7YUFNRSxzQkFBMEc7QUFBQSxNQUE1RkUsU0FBNEYsUUFBNUZBLFNBQTRGO0FBQUEsTUFBakZDLFFBQWlGLFFBQWpGQSxRQUFpRjtBQUFBLE1BQXZFQyxLQUF1RSxRQUF2RUEsS0FBdUU7QUFBQSxNQUFoRUMsT0FBZ0UsUUFBaEVBLE9BQWdFO0FBQUEsTUFBdkRDLElBQXVELFFBQXZEQSxJQUF1RDtBQUFBLE1BQWpEQyxLQUFpRCxRQUFqREEsS0FBaUQ7QUFBQSxNQUExQ0MsUUFBMEMsUUFBMUNBLFFBQTBDO0FBQUEsMEJBQWhDQyxPQUFnQztBQUFBLE1BQWhDQSxPQUFnQyxnQ0FBdEIsQ0FBc0I7QUFBQSw2QkFBbkJDLFVBQW1CO0FBQUEsTUFBbkJBLFVBQW1CLG1DQUFOLEVBQU07O0FBQUE7O0FBQ3hHLE9BQUtSLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxPQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxPQUFLTyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsT0FBS04sT0FBTCxHQUFlQSxPQUFmO0FBQ0EsT0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsT0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxPQUFLSSxFQUFMLEdBQVVYLE9BQVY7QUFDQSxPQUFLUSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxPQUFLQyxVQUFMLEdBQWtCQSxVQUFsQjtBQUNELEMiLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBsYXN0SWQgPSAwO1xuXG5jb25zdCBnZXRJZCA9ICgpID0+IHtcbiAgbGFzdElkICs9IDE7XG4gIHJldHVybiBsYXN0SWQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gIGNvbnN0cnVjdG9yKHsgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGNvdW50cnksIGNpdHksIGFib3V0LCBwYXNzd29yZCwgYmFsYW5jZSA9IDAsIG9wZXJhdGlvbnMgPSBbXSB9KSB7XG4gICAgdGhpcy5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XG4gICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcbiAgICB0aGlzLnZlcmlmeUVtYWlsID0gZmFsc2U7XG4gICAgdGhpcy5jb3VudHJ5ID0gY291bnRyeTtcbiAgICB0aGlzLmNpdHkgPSBjaXR5O1xuICAgIHRoaXMuYWJvdXQgPSBhYm91dDtcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgdGhpcy5pZCA9IGdldElkKCk7XG4gICAgdGhpcy5iYWxhbmNlID0gYmFsYW5jZTtcbiAgICB0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zO1xuICB9XG59XG4iXX0=