"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    surveys: [{
      type: 'voting',
      name: 'Best sci-fi movie',
      qq: ['Star Wars', 'Star Track', 'Stargate'],
      votes: [36, 21, 10],
      votedTimes: 67,
      participation: 'public',
      showResultsTo: 'public',
      reTake: true,
      id: 0,
      owner: 'user1',
      participants: []
    }, {
      type: 'poll',
      name: 'New seasons of TV series rating',
      qq: [{
        question: 'Some question 1',
        options: ['opt 1', 'opt 2', 'opt 3', 'Your option'],
        votes: [2, 3, 4, 1]
      }, {
        question: 'Some question 2',
        options: ['opt 1', 'opt 2', 'opt 3', 'Your option'],
        votes: [2, 5, 2, 1]
      }, {
        question: 'Some question 3',
        options: ['opt 1', 'opt 2', 'opt 3', 'Your option'],
        votes: [1, 3, 4, 2]
      }],
      opinions: [],
      votedTimes: 10,
      participation: 'public',
      showResultsTo: 'private',
      reTake: false,
      id: 1,
      owner: 'user1',
      participants: []
    }, {
      type: 'voting',
      name: 'Best 2020 battleroyal',
      qq: ['Apex Legends', 'Call of Duty Warzone', 'Fortnite'],
      votes: [31, 25, 24],
      votedTimes: 80,
      participation: 'private',
      showResultsTo: 'public',
      reTake: false,
      id: 2,
      owner: 'user2',
      participants: []
    }, {
      type: 'poll',
      name: 'New seasons of TV series rating',
      qq: [{
        question: 'Some question 1',
        options: ['opt 1', 'opt 2', 'opt 3', 'Your option'],
        votes: [12, 3, 4, 1]
      }, {
        question: 'Some question 2',
        options: ['opt 1', 'opt 2', 'opt 3', 'Your option'],
        votes: [2, 13, 4, 1]
      }, {
        question: 'Some question 3',
        options: ['opt 1', 'opt 2', 'opt 3', 'Your option'],
        votes: [2, 3, 4, 11]
      }],
      opinions: [],
      votedTimes: 20,
      participation: 'private',
      showResultsTo: 'hide',
      reTake: false,
      id: 3,
      owner: 'user2',
      participants: []
    }],
    lastId: 3
  },
  mutations: {
    setVoting: function setVoting(state, _ref) {
      var id = _ref.id,
          answers = _ref.answers,
          participant = _ref.participant;
      var survey = state.surveys.find(function (key) {
        return key.id === +id;
      });
      survey.votes[answers]++;
      survey.votedTimes++;
      survey.participants.push(participant);
    },
    setPoll: function setPoll(state, _ref2) {
      var id = _ref2.id,
          answers = _ref2.answers,
          opinion = _ref2.opinion,
          participant = _ref2.participant;
      var survey = state.surveys.find(function (key) {
        return key.id === +id;
      });

      for (var i = 0; i < survey.qq.length; i++) {
        survey.qq[i].votes[answers[i]]++;
      }

      survey.votedTimes++;
      opinion.forEach(function (element) {
        if (element !== null) {
          survey.opinions.push({
            quastion: survey.qq[opinion.indexOf(element)].quastion,
            answer: element
          });
        }
      });
      survey.participants.push(participant);
    },
    newSurvey: function newSurvey(state, payload) {
      if (payload.type === 'voting') {
        var survey = payload;
        survey.votes = [];

        for (var i = 0; i < survey.qq.length; i++) {
          survey.votes.push(0);
        }

        survey.votedTimes = 0;
        state.lastId++;
        survey.id = state.lastId;
        survey.participants = [];
        state.surveys.push(survey);
      } else if (payload.type === 'poll') {
        var _survey = payload;

        for (var _i = 0; _i < _survey.qq.length; _i++) {
          _survey.qq[_i].options.push('Your option');

          for (var j = 0; j < _survey.qq[_i].options.length; j++) {
            _survey.qq[_i].votes.push(0);
          }
        }

        _survey.votedTimes = 0;
        state.lastId++;
        _survey.id = state.lastId;
        _survey.participants = [];
        state.surveys.push(_survey);
      }
    },
    deleteSurvey: function deleteSurvey(state, survey) {
      var index = state.surveys.indexOf(survey);
      state.surveys.splice(index, 1);
    },
    updateSurvey: function updateSurvey(state, _ref3) {
      var name = _ref3.name,
          qq = _ref3.qq,
          participation = _ref3.participation,
          showResultsTo = _ref3.showResultsTo,
          reTake = _ref3.reTake,
          id = _ref3.id;
      var survey = state.surveys.find(function (el) {
        return el.id === id;
      });
      survey.name = name;
      survey.qq = qq;
      survey.participation = participation;
      survey.showResultsTo = showResultsTo;
      survey.reTake = reTake;
      survey.votedTimes = 0;

      if (survey.type === 'voting') {
        survey.votes = [];

        for (var i = 0; i < survey.qq.length; i++) {
          survey.votes.push(0);
        }
      } else if (survey.type === 'poll') {
        for (var _i2 = 0; _i2 < survey.qq.length; _i2++) {
          survey.qq[_i2].votes.forEach(function (el, index, arr) {
            arr[index] = el * 0;
          });
        }
      }
    }
  },
  actions: {
    setVoting: function setVoting(_ref4, payload) {
      var commit = _ref4.commit;
      commit('setVoting', payload);
    },
    setPoll: function setPoll(_ref5, payload) {
      var commit = _ref5.commit;
      commit('setPoll', payload);
    },
    newSurvey: function newSurvey(_ref6, payload) {
      var commit = _ref6.commit;
      commit('newSurvey', payload);
    },
    deleteSurvey: function deleteSurvey(_ref7, payload) {
      var commit = _ref7.commit;
      commit('deleteSurvey', payload);
    },
    updateSurvey: function updateSurvey(_ref8, payload) {
      var commit = _ref8.commit;
      commit('updateSurvey', payload);
    }
  },
  getters: {
    surveys: function surveys(state) {
      return state.surveys;
    },
    surveyById: function surveyById(state) {
      return function (surveyId) {
        return state.surveys.find(function (survey) {
          return survey.id === +surveyId;
        });
      };
    },
    surveysByNickname: function surveysByNickname(state) {
      return function (surveyOwner) {
        return state.surveys.filter(function (survey) {
          return survey.owner === surveyOwner;
        });
      };
    }
  },
  modules: {
    users: _users["default"]
  }
});

exports["default"] = _default;