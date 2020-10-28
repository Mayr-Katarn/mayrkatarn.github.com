"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _vuetify = _interopRequireDefault(require("./plugins/vuetify"));

var _EditContactModal = _interopRequireDefault(require("@/components/EditContactModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

_vue["default"].component('app-edit-contact-modal', _EditContactModal["default"]);

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  vuetify: _vuetify["default"],
  render: function render(h) {
    return h(_App["default"]);
  },
  created: function created() {
    this.$store.dispatch('fetchContacts'); // resiving contact list from JSON file, sort it by name and writing it in application state
  }
}).$mount('#app');