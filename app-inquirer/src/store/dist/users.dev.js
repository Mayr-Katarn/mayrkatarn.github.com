"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  state: {
    currentUser: false,
    loginError: false,
    regError: false,
    users: [{
      nickname: 'user1',
      email: 'user1@test.com',
      password: 'qweqwe',
      uid: 0,
      ownwerOf: []
    }],
    lastUid: 0
  },
  mutations: {
    loginUser: function loginUser(state, _ref) {
      var email = _ref.email,
          password = _ref.password;
      var user = state.users.find(function (el) {
        if (el.email === email) {
          return el;
        } else {
          return false;
        }
      });

      if (user && user.password === password) {
        state.currentUser = user;
        state.loginError = false;
      } else {
        state.loginError = 'Wrong e-mail or password';
      }
    },
    regUser: function regUser(state, _ref2) {
      var email = _ref2.email,
          password = _ref2.password,
          nickname = _ref2.nickname;
      var isExistByEmail = state.users.some(function (el) {
        return el.email === email;
      });
      var isExistByNickname = state.users.some(function (el) {
        return el.nickname === nickname;
      });

      if (isExistByEmail) {
        state.regError = 'User with this e-mail is allready exist';
      } else if (isExistByNickname) {
        state.regError = 'User with this nickname is allready exist';
      } else if (!isExistByEmail && !isExistByNickname) {
        state.lastUid++;
        var user = {
          nickname: nickname,
          email: email,
          password: password,
          uid: state.lastUid,
          ownerOf: []
        };
        state.regError = false;
        state.users.push(user);
        state.currentUser = user;
      }
    },
    logoutUser: function logoutUser(state) {
      state.currentUser = false;
    }
  },
  actions: {
    loginUser: function loginUser(_ref3, payload) {
      var commit = _ref3.commit;
      commit('loginUser', payload);
    },
    regUser: function regUser(_ref4, payload) {
      var commit = _ref4.commit;
      commit('regUser', payload);
    },
    logoutUser: function logoutUser(_ref5) {
      var commit = _ref5.commit;
      commit('logoutUser');
    }
  },
  getters: {
    currentUser: function currentUser(state) {
      return state.currentUser;
    },
    loginError: function loginError(state) {
      return state.loginError;
    },
    regError: function regError(state) {
      return state.regError;
    }
  }
};
exports["default"] = _default;