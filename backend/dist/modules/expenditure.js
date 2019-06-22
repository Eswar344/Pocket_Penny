"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expenditure_model = require("./model");

var mongoose = require('mongoose');

var JIRO = require('@madewithjiro/jiro-sdk');

var uuid = require('uuid');

var _ref = new JIRO.default(),
    Store = _ref.Store;

var ExpenditureColletion = "expenditures";
var CategoryCollection = "category";

var categoriesModule = require('../category/module');

var createExpenditure =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(body, user) {
    var cost, date, category, description, _ref3, _ref4, categoryObject, id, created;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cost = body.cost, date = body.date, category = body.category, description = body.description;

            if (category) {
              _context.next = 3;
              break;
            }

            throw new Error("Please provide category Field");

          case 3:
            if (cost) {
              _context.next = 7;
              break;
            }

            throw new Error("Fill the cost Field");

          case 7:
            if (date) {
              _context.next = 9;
              break;
            }

            throw new Error("Please Select Date");

          case 9:
            _context.next = 11;
            return Store.getAll(CategoryCollection, [category]);

          case 11:
            _ref3 = _context.sent;
            _ref4 = _slicedToArray(_ref3, 1);
            categoryObject = _ref4[0];

            if (!(categoryObject.length == 0)) {
              _context.next = 16;
              break;
            }

            throw new Error("Please provide a valid category");

          case 16:
            id = uuid.v4();
            _context.next = 19;
            return Store.set(ExpenditureColletion, id, {
              id: id,
              cost: cost,
              date: date,
              category: category,
              description: description,
              user: user
            });

          case 19:
            created = _context.sent;

            if (!created) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", {
              id: id,
              cost: cost,
              date: date,
              user: user,
              category: categoryObject,
              description: description
            });

          case 22:
            throw new Error("Could not create expenditure. Please try again");

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createExpenditure(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var displaylist =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(query) {
    var categories, expenditures, filteredExpenditures;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return categoriesModule.getCategories();

          case 2:
            categories = _context2.sent;
            _context2.next = 5;
            return Store.search(ExpenditureColletion, "user", query.user);

          case 5:
            expenditures = _context2.sent;
            filteredExpenditures = expenditures;

            if (query.categoryId) {
              filteredExpenditures = filteredExpenditures.filter(function (expenditure) {
                return expenditure.category == query.categoryId;
              });
            }

            if (query.date) {
              filteredExpenditures.sort(function (a, b) {
                return a.date - b.date;
              });
            }

            return _context2.abrupt("return", filteredExpenditures.map(function (exp) {
              var category = exp.category,
                  rest = _objectWithoutProperties(exp, ["category"]);

              var selectedCategory = categories.find(function (cat) {
                return cat.id == category;
              });
              return _objectSpread({}, rest, {
                category: {
                  id: selectedCategory.id,
                  name: selectedCategory.name
                }
              });
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function displaylist(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var editlist =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(query, id) {
    var edited, _ref7, _ref8, ans;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Store.update(ExpenditureColletion, id, query);

          case 2:
            edited = _context3.sent;

            if (!edited) {
              _context3.next = 10;
              break;
            }

            _context3.next = 6;
            return Store.search(ExpenditureColletion, "id", id);

          case 6:
            _ref7 = _context3.sent;
            _ref8 = _slicedToArray(_ref7, 1);
            ans = _ref8[0];
            return _context3.abrupt("return", ans);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function editlist(_x4, _x5) {
    return _ref6.apply(this, arguments);
  };
}();

var removelist =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(id) {
    var _ref10, _ref11, expenditure, checked;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Store.search(ExpenditureColletion, "id", id);

          case 2:
            _ref10 = _context4.sent;
            _ref11 = _slicedToArray(_ref10, 1);
            expenditure = _ref11[0];

            if (expenditure) {
              _context4.next = 7;
              break;
            }

            throw new Error("Invalid id");

          case 7:
            _context4.next = 9;
            return Store.delete(ExpenditureColletion, id);

          case 9:
            checked = _context4.sent;

            if (!checked) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", id);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function removelist(_x6) {
    return _ref9.apply(this, arguments);
  };
}();

function cleanUpExpenditures() {
  return _cleanUpExpenditures.apply(this, arguments);
}

function _cleanUpExpenditures() {
  _cleanUpExpenditures = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5() {
    var expenditures, expendituresWithoutUserId, removedRecords;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Store.get(ExpenditureColletion);

          case 2:
            expenditures = _context5.sent;
            expendituresWithoutUserId = expenditures.filter(function (expenditure) {
              return !expenditure.user;
            });
            _context5.next = 6;
            return Promise.all(expendituresWithoutUserId.map(function (expenditure) {
              return Store.delete(ExpenditureColletion, expenditure.id);
            }));

          case 6:
            removedRecords = _context5.sent;
            console.log("Cleaned up ".concat(removedRecords.length, " expenditures without userId"));

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _cleanUpExpenditures.apply(this, arguments);
}

cleanUpExpenditures();
module.exports = {
  createExpenditure: createExpenditure,
  displaylist: displaylist,
  editlist: editlist,
  removelist: removelist
};