"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _authGuard = _interopRequireDefault(require("./auth-guard"));

var _Home = _interopRequireDefault(require("@/components/Home"));

var _Survey = _interopRequireDefault(require("@/components/Survey"));

var _NewSurvey = _interopRequireDefault(require("@/components/NewSurvey"));

var _MySurveys = _interopRequireDefault(require("@/components/MySurveys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  name: 'home',
  component: _Home["default"]
}, {
  path: '/survey/:id',
  props: true,
  name: 'survey',
  component: _Survey["default"]
}, {
  path: '/new',
  name: 'new',
  component: _NewSurvey["default"],
  beforeEnter: _authGuard["default"]
}, {
  path: '/my',
  props: true,
  name: 'my',
  component: _MySurveys["default"],
  beforeEnter: _authGuard["default"]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior: function scrollBehavior(to, from, savedPosition) {
    if (to.name === 'survey' || to.name === 'home') {
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