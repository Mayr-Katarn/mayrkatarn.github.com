"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("@/components/Home"));

var _authGuard = _interopRequireDefault(require("./auth-guard"));

var _Evil = _interopRequireDefault(require("@/components/Evils/Evil"));

var _EvilList = _interopRequireDefault(require("@/components/Evils/EvilList"));

var _NewEvil = _interopRequireDefault(require("@/components/Evils/NewEvil"));

var _Login = _interopRequireDefault(require("@/components/Auth/Login"));

var _Registration = _interopRequireDefault(require("@/components/Auth/Registration"));

var _Orders = _interopRequireDefault(require("@/components/User/Orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: 'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/',
  name: 'home',
  component: _Home["default"]
}, {
  path: 'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/evil/:id',
  props: true,
  name: 'evil',
  component: _Evil["default"]
}, {
  path: 'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/list',
  name: 'list',
  component: _EvilList["default"],
  beforeEnter: _authGuard["default"]
}, {
  path: 'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/new',
  name: 'new',
  component: _NewEvil["default"],
  beforeEnter: _authGuard["default"]
}, {
  path: 'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/login',
  name: 'login',
  component: _Login["default"]
}, {
  path: 'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/registration',
  name: 'registration',
  component: _Registration["default"]
}, {
  path: 'https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/orders',
  name: 'orders',
  component: _Orders["default"],
  beforeEnter: _authGuard["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes,
  mode: 'history' // убирает # в роуте

});
var _default = router;
exports["default"] = _default;