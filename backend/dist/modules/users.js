"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// var UserModel = require("./model")
var jsonwebtoken = require("jsonwebtoken");

var JIRO = require('@madewithjiro/jiro-sdk');

var uuid = require('uuid');

var _ref = new JIRO.default(),
    Store = _ref.Store;

var UsersCollection = "users";

var createAccount =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(username, password, email, phone) {
    var id, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = uuid.v4();
            _context.next = 3;
            return Store.set(UsersCollection, id, {
              id: id,
              username: username,
              password: password,
              email: email
            });

          case 3:
            token = encode(id, username, email);
            return _context.abrupt("return", token);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createAccount(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var findByQuery =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(queryKey, queryValue) {
    var data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Store.search(UsersCollection, queryKey, queryValue);

          case 2:
            data = _context2.sent;

            if (!data.length) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", true);

          case 5:
            return _context2.abrupt("return", false);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findByQuery(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var encode = function encode(id, name, email) {
  return jsonwebtoken.sign({
    id: id,
    name: name,
    email: email
  }, process.env.JWT_SECRET, {
    expiresIn: "10 days"
  });
};

var decode = function decode(token) {
  var payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  return payload;
};

var getUserById =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(userId) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", Store.search(UsersCollection, "id", userId));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUserById(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

var login =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(email, password) {
    var _ref6, _ref7, user;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(!email || !password)) {
              _context4.next = 2;
              break;
            }

            throw new Error("Email and password are required for login");

          case 2:
            _context4.next = 4;
            return Store.search(UsersCollection, "email", email);

          case 4:
            _ref6 = _context4.sent;
            _ref7 = _slicedToArray(_ref6, 1);
            user = _ref7[0];

            if (user) {
              _context4.next = 9;
              break;
            }

            throw new Error("Invalid email or password");

          case 9:
            if (!(user.password !== password)) {
              _context4.next = 11;
              break;
            }

            throw new Error("Invalid email or password");

          case 11:
            return _context4.abrupt("return", encode(user.id, user.username, user.email));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function login(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

module.exports = {
  createAccount: createAccount,
  encode: encode,
  decode: decode,
  getUserById: getUserById,
  findByQuery: findByQuery,
  login: login
};