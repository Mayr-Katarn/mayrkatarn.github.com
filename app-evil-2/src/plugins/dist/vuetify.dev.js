"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _lib = _interopRequireDefault(require("vuetify/lib"));

var _colors = _interopRequireDefault(require("vuetify/lib/util/colors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_lib["default"]);

var _default = new _lib["default"]({
  theme: {
    themes: {
      light: {
        primary: _colors["default"].red.darken1,
        // #E53935
        secondary: _colors["default"].red.lighten4,
        // #FFCDD2
        accent: _colors["default"].indigo.base // #3F51B5

      }
    }
  }
});

exports["default"] = _default;