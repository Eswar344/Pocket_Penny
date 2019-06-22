"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var category_model = require("./category_model");

var mongoose = require("mongoose");

var JIRO = require('@madewithjiro/jiro-sdk');

var uuid = require('uuid');

var _ref = new JIRO.default(),
    Store = _ref.Store;

var CategoryCollection = "category";

function getCategories() {
  return _getCategories.apply(this, arguments);
}

function _getCategories() {
  _getCategories = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Store.get(CategoryCollection);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getCategories.apply(this, arguments);
}

function createDefaultCategories() {
  return _createDefaultCategories.apply(this, arguments);
}

function _createDefaultCategories() {
  _createDefaultCategories = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var checkExistingCategories, arr;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getCategories();

          case 2:
            checkExistingCategories = _context3.sent;

            if (!checkExistingCategories.length) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return");

          case 5:
            console.log("No default existis creating default");
            arr = [{
              name: "Dress"
            }, {
              name: "Food"
            }, {
              name: "Rent"
            }, {
              name: "Petrol"
            }, {
              name: "makeup kit"
            }];
            arr.forEach(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(el) {
                var id, result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        id = uuid.v4();
                        _context2.next = 3;
                        return Store.set(CategoryCollection, id, _objectSpread({
                          id: id
                        }, el));

                      case 3:
                        result = _context2.sent;
                        console.log("Created new category", el);

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createDefaultCategories.apply(this, arguments);
}

createDefaultCategories();

function removeAllCategories() {
  return _removeAllCategories.apply(this, arguments);
} // removeAllCategories();


function _removeAllCategories() {
  _removeAllCategories = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var categories;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Store.get(CategoryCollection);

          case 2:
            categories = _context4.sent;
            _context4.next = 5;
            return Promise.all(categories.map(function (category) {
              return Store.delete(CategoryCollection, category.id);
            }));

          case 5:
            console.log("Removed ".concat(categories.length, " categories"));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _removeAllCategories.apply(this, arguments);
}

module.exports = {
  getCategories: getCategories
};