"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var fb = _interopRequireWildcard(require("firebase"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Evil = function Evil(title, description, ownerId) {
  var imageSrc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var promo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var id = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  _classCallCheck(this, Evil);

  this.title = title;
  this.description = description;
  this.ownerId = ownerId;
  this.imageSrc = imageSrc;
  this.promo = promo;
  this.id = id;
};

var _default = {
  state: {
    evils: []
  },
  mutations: {
    newEvil: function newEvil(state, payload) {
      state.evils.push(payload);
    },
    loadEvils: function loadEvils(state, payload) {
      state.evils = payload;
    },
    updateEvil: function updateEvil(state, _ref) {
      var title = _ref.title,
          description = _ref.description,
          id = _ref.id;
      var evil = state.evils.find(function (a) {
        return a.id === id;
      });
      evil.title = title;
      evil.description = description;
    }
  },
  actions: {
    newEvil: function newEvil(_ref2, payload) {
      var commit, getters, image, nEvil, evil, imageExt, imageSrc;
      return regeneratorRuntime.async(function newEvil$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref2.commit, getters = _ref2.getters;
              commit('clearError');
              commit('setLoading', true);
              image = payload.image;
              _context.prev = 4;
              nEvil = new Evil(payload.title, payload.description, getters.user.id, '', payload.promo);
              _context.next = 8;
              return regeneratorRuntime.awrap(fb.database().ref('evils').push(nEvil));

            case 8:
              evil = _context.sent;
              imageExt = image.name.slice(image.name.lastIndexOf('.'));
              _context.next = 12;
              return regeneratorRuntime.awrap(fb.storage().ref("evils/".concat(evil.key).concat(imageExt)).put(image));

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(fb.storage().ref("evils/".concat(evil.key).concat(imageExt)).getDownloadURL());

            case 14:
              imageSrc = _context.sent;
              _context.next = 17;
              return regeneratorRuntime.awrap(fb.database().ref('evils').child(evil.key).update({
                imageSrc: imageSrc
              }));

            case 17:
              commit('setLoading', false);
              commit('newEvil', _objectSpread({}, nEvil, {
                id: evil.key,
                imageSrc: imageSrc
              }));
              _context.next = 26;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](4);
              commit('setError', _context.t0.message);
              commit('setLoading', false);
              throw _context.t0;

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[4, 21]]);
    },
    fetchEvils: function fetchEvils(_ref3) {
      var commit, resultEvils, database, evils;
      return regeneratorRuntime.async(function fetchEvils$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref3.commit;
              commit('clearError');
              commit('setLoading', true);
              resultEvils = [];
              _context2.prev = 4;
              _context2.next = 7;
              return regeneratorRuntime.awrap(fb.database().ref('evils').once('value'));

            case 7:
              database = _context2.sent;
              evils = database.val();
              Object.keys(evils).forEach(function (key) {
                var evil = evils[key];
                resultEvils.push(new Evil(evil.title, evil.description, evil.ownerId, evil.imageSrc, evil.promo, key));
              });
              commit('loadEvils', resultEvils);
              commit('setLoading', false);
              _context2.next = 19;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](4);
              commit('setError');
              commit('setLoading', false);
              throw _context2.t0;

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[4, 14]]);
    },
    updatedEvil: function updatedEvil(_ref4, _ref5) {
      var commit, title, description, id;
      return regeneratorRuntime.async(function updatedEvil$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref4.commit;
              title = _ref5.title, description = _ref5.description, id = _ref5.id;
              commit('clearError');
              commit('setLoading', true);
              _context3.prev = 4;
              _context3.next = 7;
              return regeneratorRuntime.awrap(fb.database().ref('evils').child(id).update({
                title: title,
                description: description
              }));

            case 7:
              commit('updateEvil', {
                title: title,
                description: description,
                id: id
              });
              commit('setLoading', false);
              _context3.next = 16;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](4);
              commit('setError', _context3.t0.message);
              commit('setLoading', false);
              throw _context3.t0;

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[4, 11]]);
    }
  },
  getters: {
    evils: function evils(state) {
      return state.evils;
    },
    promos: function promos(state) {
      return state.evils.filter(function (evil) {
        return evil.promo;
      });
    },
    myEvils: function myEvils(state, getters) {
      return state.evils.filter(function (evil) {
        return evil.ownerId === getters.user.id;
      });
    },
    evilById: function evilById(state) {
      return function (evilId) {
        return state.evils.find(function (evil) {
          return evil.id === evilId;
        });
      };
    }
  }
};
exports["default"] = _default;