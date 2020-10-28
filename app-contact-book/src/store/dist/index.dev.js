"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _users = _interopRequireDefault(require("./json/users.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_vue["default"].use(_vuex["default"]);

var Contact = function Contact(name, username, email, address, phone, website, company, posts, accountHistory, favorite, avatar, id) {
  _classCallCheck(this, Contact);

  this.name = name;
  this.username = username;
  this.email = email;
  this.address = address;
  this.phone = phone;
  this.website = website;
  this.company = company;
  this.posts = posts;
  this.accountHistory = accountHistory;
  this.favorite = favorite;
  this.avatar = avatar;
  this.id = id;
};

var _default = new _vuex["default"].Store({
  state: {
    contacts: [],
    loading: false,
    favorits: false,
    search: ''
  },
  mutations: {
    // sending contact list to state
    loadContacts: function loadContacts(state, payload) {
      state.contacts = payload;
    },
    // updating loading state
    setLoading: function setLoading(state, payload) {
      state.loading = payload;
    },
    // updating favorits state
    setFavorits: function setFavorits(state, payload) {
      state.favorits = payload;
    },
    // updating search state
    setSearch: function setSearch(state, payload) {
      state.search = payload;
    },
    // updating information about contact and sort updated contact list
    updateContact: function updateContact(state, _ref) {
      var name = _ref.name,
          phone = _ref.phone,
          email = _ref.email,
          website = _ref.website,
          streetA = _ref.streetA,
          streetB = _ref.streetB,
          streetC = _ref.streetC,
          streetD = _ref.streetD,
          city = _ref.city,
          cState = _ref.cState,
          country = _ref.country,
          zipcode = _ref.zipcode,
          companyName = _ref.companyName,
          catchPhrase = _ref.catchPhrase,
          bs = _ref.bs,
          id = _ref.id;
      var contact = state.contacts.find(function (key) {
        if (key.id === id) {
          return key;
        }
      });
      contact.name = name;
      contact.phone = phone;
      contact.email = email;
      contact.website = website;
      contact.address.streetA = streetA;
      contact.address.streetB = streetB;
      contact.address.streetC = streetC;
      contact.address.streetD = streetD;
      contact.address.city = city;
      contact.address.cState = cState;
      contact.address.country = country;
      contact.address.zipcode = zipcode;
      contact.company.name = companyName;
      contact.company.catchPhrase = catchPhrase;
      contact.company.bs = bs;
      state.contacts.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    }
  },
  actions: {
    setLoading: function setLoading(_ref2, payload) {
      var commit = _ref2.commit;
      commit('setLoading', payload);
    },
    setFavorits: function setFavorits(_ref3, payload) {
      var commit = _ref3.commit;
      commit('setFavorits', payload);
    },
    setSearch: function setSearch(_ref4, payload) {
      var commit = _ref4.commit;
      commit('setSearch', payload);
    },
    fetchContacts: function fetchContacts(_ref5) {
      var commit = _ref5.commit;
      commit('setLoading', true);
      var contactsDB = [];
      var contacts = _users["default"];
      Object.keys(contacts).forEach(function (key) {
        var contact = contacts[key];
        contactsDB.push(new Contact(contact.name, contact.username, contact.email, contact.address, contact.phone, contact.website, contact.company, contact.posts, contact.accountHistory, contact.favorite, contact.avatar, contact.id));
      });
      contactsDB.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
      commit('loadContacts', contactsDB);
      commit('setLoading', false);
    },
    updatedContact: function updatedContact(_ref6, _ref7) {
      var commit = _ref6.commit;
      var name = _ref7.name,
          phone = _ref7.phone,
          email = _ref7.email,
          website = _ref7.website,
          streetA = _ref7.streetA,
          streetB = _ref7.streetB,
          streetC = _ref7.streetC,
          streetD = _ref7.streetD,
          city = _ref7.city,
          cState = _ref7.cState,
          country = _ref7.country,
          zipcode = _ref7.zipcode,
          companyName = _ref7.companyName,
          catchPhrase = _ref7.catchPhrase,
          bs = _ref7.bs,
          id = _ref7.id;
      commit('setLoading', true);
      commit('updateContact', {
        name: name,
        phone: phone,
        email: email,
        website: website,
        streetA: streetA,
        streetB: streetB,
        streetC: streetC,
        streetD: streetD,
        city: city,
        cState: cState,
        country: country,
        zipcode: zipcode,
        companyName: companyName,
        catchPhrase: catchPhrase,
        bs: bs,
        id: id
      });
      commit('setLoading', false);
    }
  },
  getters: {
    // sending contact list from state
    contacts: function contacts(state) {
      return state.contacts;
    },
    // sending information about loading
    loading: function loading(state) {
      return state.loading;
    },
    // sending information about searching by favorite
    favorits: function favorits(state) {
      return state.favorits;
    },
    // searching favorit contacts in state and sending it
    contactsByFavorit: function contactsByFavorit(state) {
      return state.contacts.filter(function (contact) {
        return contact.favorite === true;
      });
    },
    // sending information about searching state
    search: function search(state) {
      return state.search;
    },
    // searching contact by name in state and sending it
    contactsByName: function contactsByName(state) {
      return state.contacts.filter(function (contact) {
        return contact.name.toLowerCase().indexOf(state.search) > -1;
      });
    },
    // searching contact by id in state and sending it
    contactById: function contactById(state) {
      return function (contactId) {
        return state.contacts.find(function (contact) {
          if (contact.id === +contactId) {
            return contact;
          }
        });
      };
    }
  }
});

exports["default"] = _default;