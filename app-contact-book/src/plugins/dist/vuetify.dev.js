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
        primary: _colors["default"].teal.lighten3,
        // #80CBC4
        secondary: _colors["default"].teal.lighten4,
        // #3F51B5
        accent: _colors["default"].red.accent4,
        // #D50000
        edit: _colors["default"].yellow.darken1 // #FDD835

      }
    }
  }
});

exports["default"] = _default;