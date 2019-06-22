"use strict";

require("babel-polyfill");

var _express = _interopRequireDefault(require("express"));

var fs = _interopRequireWildcard(require("fs"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express.default)(); // Body parser

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  limit: '2mb',
  extended: true
})); // CORS

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Jiro-Request-Tag');
  next();
}); // Dynamically execute route handler (and capture console from koji if request
// is tagged)

var __originalConsole = console.log.bind(console);

function processRoute(routeName, isProtected, req, res) {
  var _this = this;

  var route = require("./routes/".concat(routeName, "/index.js")); // Console overload for debugging


  var requestTag = req.headers['x-jiro-request-tag'];

  if (!requestTag) {
    console.log = __originalConsole;
  } else {
    console.log = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.unshift("[koji-log] ".concat(requestTag));

      __originalConsole.apply(_this, args);
    };
  } // Invoke the route


  try {
    route.default(req, res).catch(function (err) {
      return console.log('[koji-error]', err);
    });
  } catch (err) {
    console.log('[koji-error]', err);
  }
} // Get all routes


var backendConfig = fs.readdirSync('./routes/').map(function (name) {
  try {
    var body = fs.readFileSync("./routes/".concat(name, "/koji.json"), 'utf8');
    var data = JSON.parse(body);
    return {
      name: name,
      route: data.routes[0]
    };
  } catch (err) {
    return null;
  }
}).filter(function (route) {
  return route;
}).reduce(function (config, _ref) {
  var name = _ref.name,
      route = _ref.route;
  config[name] = route;
  return config;
}, {}); // Create express handlers for each route

Object.keys(backendConfig).forEach(function (routeName) {
  var _backendConfig$routeN = backendConfig[routeName],
      route = _backendConfig$routeN.route,
      method = _backendConfig$routeN.method,
      isProtected = _backendConfig$routeN.isProtected;

  if (method === 'GET') {
    app.get(route, function (req, res) {
      processRoute(routeName, isProtected, req, res);
    });
  } else if (method === 'POST') {
    app.post(route, function (req, res) {
      processRoute(routeName, isProtected, req, res);
    });
  } else if (method === 'PUT') {
    app.put(route, function (req, res) {
      processRoute(routeName, isProtected, req, res);
    });
  } else if (method === 'DELETE') {
    app.delete(route, function (req, res) {
      processRoute(routeName, isProtected, req, res);
    });
  }
});
app.listen(process.env.PORT || 3333, null,
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(err) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (err) {
              console.log(err.message);
            }

            console.log('[koji] backend started');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());