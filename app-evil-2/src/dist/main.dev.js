"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _JoinModal = _interopRequireDefault(require("@/components/Shared/JoinModal"));

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/auth");

var _vuetify = _interopRequireDefault(require("./plugins/vuetify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

_vue["default"].component('app-join-modal', _JoinModal["default"]);

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  vuetify: _vuetify["default"],
  render: function render(h) {
    return h(_App["default"]);
  },
  created: function created() {
    var _this = this;

    var firebaseConfig = {
      apiKey: "AIzaSyBMreHyAnUEYTA-mLOeMQYJtiUQe37oyLs",
      authDomain: "app-of-evil.firebaseapp.com",
      databaseURL: "https://app-of-evil.firebaseio.com",
      projectId: "app-of-evil",
      storageBucket: "app-of-evil.appspot.com",
      messagingSenderId: "487567609336",
      appId: "1:487567609336:web:8ef211a2be2a464c915a0d",
      measurementId: "G-X1Z78TPLD9"
    };

    _app["default"].initializeApp(firebaseConfig);

    _app["default"].analytics();

    _app["default"].auth().onAuthStateChanged(function (user) {
      if (user) {
        _this.$store.dispatch('autoLoginUser', user);
      }
    });

    this.$store.dispatch('fetchEvils');
  }
}).$mount('#app');