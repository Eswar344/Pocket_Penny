"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var uuid = _interopRequireWildcard(require("uuid"));

var _jiroSdk = _interopRequireDefault(require("@madewithjiro/jiro-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _ref = new _jiroSdk.default(),
    Store = _ref.Store;

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, score, scoreData, scores;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, score = _req$body.score;
            console.log(name);

            if (!(!name || !score)) {
              _context.next = 5;
              break;
            }

            res.status(400).json({
              error: 'Request is missing information'
            });
            return _context.abrupt("return");

          case 5:
            console.log('Adding to high score table'); // Build the post object

            scoreData = {
              name: name,
              score: score,
              datePosted: Math.floor(Date.now() / 1000)
            };
            console.log(scoreData); // Insert the post

            _context.next = 10;
            return Store.get('gems', 'scores');

          case 10:
            scores = _context.sent;
            if (!scores) scores = [];else scores = scores.scores;
            scores.push(scoreData);
            _context.next = 15;
            return Store.set('gems', 'scores', {
              scores: scores
            });

          case 15:
            console.log('Score Added!'); // Return the post id to the client

            res.status(200).json({
              success: true
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;