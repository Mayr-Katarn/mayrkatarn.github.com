"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _ContactBook = _interopRequireDefault(require("@/components/ContactBook"));

var _Contact = _interopRequireDefault(require("@/components/Contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/mayrkatarn.pages/app-contact-book/',
  name: 'book',
  component: _ContactBook["default"]
}, {
  path: '/mayrkatarn.pages/app-contact-book/contact/:id',
  props: true,
  name: 'contact',
  component: _Contact["default"]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    if (to.name === 'contact') {
      return {
        x: 0,
        y: 0
      };
    } else {
      return savedPosition;
    }
  }
});
var _default = router;
exports["default"] = _default;