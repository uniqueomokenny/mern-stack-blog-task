'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _user[key];
    }
  });
});

var _aritcle = require('./aritcle');

Object.keys(_aritcle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aritcle[key];
    }
  });
});
//# sourceMappingURL=index.js.map