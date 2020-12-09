import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    surveys: [
      {
        type: 'voting',
        name: 'Best sci-fi movie',
        qq: ['Star Wars', 'Star Track', 'Stargate'],
        votes:[36, 21, 10],
        votedTimes: 67,
        participation: 'public',
        showResultsTo: 'public',
        reTake: true,
        id: 0,
        owner: 'user1',
        participants: []
      },
      {
        type: 'poll',
        name: 'New seasons of TV series rating',
        qq:[
          {question:'Some question 1', options: ['opt 1', 'opt 2', 'opt 3', 'Your option'], votes: [2, 3, 4, 1]},
          {question:'Some question 2', options: ['opt 1', 'opt 2', 'opt 3', 'Your option'], votes: [2, 5, 2, 1]},
          {question:'Some question 3', options: ['opt 1', 'opt 2', 'opt 3', 'Your option'], votes: [1, 3, 4, 2]}
        ],
        opinions: [],
        votedTimes: 10,
        participation: 'public',
        showResultsTo: 'private',
        reTake: false,
        id: 1,
        owner: 'user1',
        participants: []
      },
      {
        type: 'voting',
        name: 'Best 2020 battleroyal',
        qq: ['Apex Legends', 'Call of Duty Warzone', 'Fortnite'],
        votes:[31, 25, 24],
        votedTimes: 80,
        participation: 'private',
        showResultsTo: 'public',
        reTake: false,
        id: 2,
        owner: 'user2',
        participants: []
      },
      {
        type: 'poll',
        name: 'New seasons of TV series rating',
        qq:[
          {question:'Some question 1', options: ['opt 1', 'opt 2', 'opt 3', 'Your option'], votes: [12, 3, 4, 1]},
          {question:'Some question 2', options: ['opt 1', 'opt 2', 'opt 3', 'Your option'], votes: [2, 13, 4, 1]},
          {question:'Some question 3', options: ['opt 1', 'opt 2', 'opt 3', 'Your option'], votes: [2, 3, 4, 11]}
        ],
        opinions: [],
        votedTimes: 20,
        participation: 'private',
        showResultsTo: 'hide',
        reTake: false,
        id: 3,
        owner: 'user2',
        participants: []
      },
    ],
    lastId: 3
  },
  mutations: {
    setVoting(state, {id, answers, participant}) {
      let survey = state.surveys.find(key => {return key.id === +id})
      survey.votes[answers]++
      survey.votedTimes++
      survey.participants.push(participant)
    },
    setPoll(state, {id, answers, opinion, participant}) {
      let survey = state.surveys.find(key => {return key.id === +id})
      for (let i = 0; i < survey.qq.length; i++) {
        survey.qq[i].votes[answers[i]]++
      }
      survey.votedTimes++
      opinion.forEach(element => {
        if (element !== null) {
          survey.opinions.push({quastion: survey.qq[opinion.indexOf(element)].quastion, answer: element})
        }
      })
      survey.participants.push(participant)
    },
    newSurvey(state, payload) {
      if (payload.type === 'voting') {
        let survey = payload
        survey.votes = []
        for (let i = 0; i < survey.qq.length; i++) {
          survey.votes.push(0)
        }
        survey.votedTimes = 0
        state.lastId++
        survey.id = state.lastId
        survey.participants = []
        state.surveys.push(survey)
      } else if (payload.type === 'poll') {
        let survey = payload
        for (let i = 0; i < survey.qq.length; i++) {
          survey.qq[i].options.push('Your option')
          for (let j = 0; j < survey.qq[i].options.length; j++) {
            survey.qq[i].votes.push(0)
          }
        }
        survey.votedTimes = 0
        state.lastId++
        survey.id = state.lastId
        survey.participants = []
        state.surveys.push(survey)
      }
    },
    deleteSurvey(state, survey) {
      let index = state.surveys.indexOf(survey)
      state.surveys.splice(index, 1)
    },
    updateSurvey(state, {name, qq, participation, showResultsTo, reTake, id}) {
      let survey = state.surveys.find(el => {return el.id === id})
      survey.name = name
      survey.qq = qq
      survey.participation = participation
      survey.showResultsTo = showResultsTo
      survey.reTake = reTake
      survey.votedTimes = 0
      if (survey.type === 'voting') {
        survey.votes = []
        for (let i = 0; i < survey.qq.length; i++) {
          survey.votes.push(0)
        }
      } else if (survey.type === 'poll') {
        for (let i = 0; i < survey.qq.length; i++) {
          survey.qq[i].votes.forEach((el, index, arr) => {arr[index] = el*0})
        }
      }
    }
  },
  actions: {
    setVoting({commit}, payload) {
      commit('setVoting', payload)
    },
    setPoll({commit}, payload) {
      commit('setPoll', payload)
    },
    newSurvey({commit}, payload) {
      commit('newSurvey', payload)
    },
    deleteSurvey({commit}, payload) {
      commit('deleteSurvey', payload)
    },
    updateSurvey({commit}, payload) {
      commit('updateSurvey', payload)
    }
  },
  getters: {
    surveys(state) {
      return state.surveys
    },
    surveyById(state) {
      return surveyId => {
        return state.surveys.find(survey => {return survey.id === +surveyId})
      }
    },
    surveysByNickname(state) {
      return surveyOwner => {
        return state.surveys.filter(survey => {return survey.owner === surveyOwner})
      }
    }
  },
  modules: {
    users
  }
})
