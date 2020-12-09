<template>
  <v-container fluid v-if="!loading" class="ml-4 pr-8">

    <div v-if="survey.participation==='public' || (survey.participation==='private' && user)">
      <!-- Voting -->
      <template v-if="survey.type === 'voting'">
        <h1>{{ survey.name }}</h1>
        <v-radio-group v-model="answers">
          <v-radio
            v-for="v of survey.qq"
            :key="v"
            :label="v"
            :value="survey.qq.indexOf(v)"
            :disabled="isPassed"
          ></v-radio>
        </v-radio-group>
      </template>
      
      <!-- Poll -->
      <template v-if="survey.type === 'poll'">
        <h1>{{ survey.name }}</h1>
        <div v-for="(item, index) of survey.qq" :key="index">
          <v-divider class="mb-2"></v-divider>

          <h3>{{index + 1}}. {{item.question}}</h3>
          <v-radio-group class="mt-2" v-model="answers[index]">
            <v-container class="py-2" fluid v-for="v of item.options" :key="v">
              <v-radio
                :label="v"
                :value="item.options.indexOf(v)"
                :disabled="isPassed"
              ></v-radio>
              <v-textarea
                v-if="item.options.indexOf(v) === item.options.length - 1"
                :disabled="(answers[index] !== item.options.length - 1) || isPassed"
                v-model="opinion[index]"
                solo
                no-resize
                height="80"
                label="Type the answer"
              ></v-textarea>
            </v-container>
          </v-radio-group>

        </div>
      </template>

      <v-btn class="success mb-8" @click="confirmVote" :disabled="isAnswered || isPassed">Confirm</v-btn>
      <v-btn class="warning ml-2 mb-8" @click="reTake" v-show="survey.reTake && isPassedByAnon">Retake survey</v-btn>

    </div>

    <div v-else class="my-2">
      <h2 v-if="survey.participation==='hide'" class="error">The opportunity to take part in this survey is closed for now</h2>
      <h2 v-else class="error">You need login to take part in this survey</h2>
    </div>
    
    <v-divider></v-divider>

    <div v-if="survey.showResultsTo==='public' || (survey.showResultsTo==='private' && user)">
      <!-- Voiting results -->
      <v-expansion-panels class="mt-8" v-if="survey.type === 'voting'">
        <v-expansion-panel>
          <!-- <v-expansion-panel-header v-if="!survey.showResult" :disabled="!survey.showResult">
            Vote to see the results
          </v-expansion-panel-header> -->
          <v-expansion-panel-header class="text-h6">
            Results
          </v-expansion-panel-header>
          <v-expansion-panel-content v-for="(result, index) of results" :key="index">
            <h4>{{ survey.qq[index] }}</h4>
            <v-progress-linear
              :value="results[index]"
              height="20"
            >
              <strong>{{ result }}%</strong>
            </v-progress-linear>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Poll results -->
      <v-expansion-panels class="mt-8" v-if="survey.type === 'poll'">
        <v-expansion-panel>
          <!-- <v-expansion-panel-header v-if="!survey.showResult" :disabled="!survey.showResult">
            Vote to see the results
          </v-expansion-panel-header> -->
          <v-expansion-panel-header class="text-h6">
            Results
          </v-expansion-panel-header>
          <v-expansion-panel-content v-for="(item, index) of survey.qq" :key="index">
            <h3 class="text-decoration-underline mt-4">{{index + 1}}. {{item.question}}</h3>

            <div v-for="(result, index) of results[index]" :key="index">
              <h4>{{ item.options[index] }}</h4>
              <v-progress-linear
                height="20"
                :value="result"
              >
                <strong>{{ result }}%</strong>
              </v-progress-linear>
              
            </div>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <div v-else class="my-2">
      <h2 v-if="survey.showResultsTo==='hide'" class="error">The opportunity to see results of this survey is closed for now</h2>
      <h2 v-else class="error">You need login to see results of this survey</h2>
    </div>

  </v-container>

  <div v-else class="text-center mt-6">
    <v-progress-circular
      indeterminate
      size="60"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    survey(){
      return this.$store.getters.surveyById(this.id)
    },
    user() {
      return this.$store.getters.currentUser
    },
    results() {
      let results = []
      let votedTimes = this.survey.votedTimes

      if (this.survey.type === 'voting') {
        let sum = 0
        let votes = this.survey.votes
        for (let i = 0; i < votes.length; i++) {
          results.push(Math.round(100 / votedTimes * votes[i]))
          sum += results[i]
        }
        if (sum === 99) results[0] += 1
        else if (sum === 101) results[0] -= 1
      }
      
      if (this.survey.type === 'poll') {
        let qq = this.survey.qq
        for (let i = 0; i < qq.length; i++) {
          let sum = 0
          let resultsOfQ = []
          for (let j = 0; j < qq[i].votes.length; j++) {
            resultsOfQ.push(Math.round(100 / votedTimes * qq[i].votes[j]))
            sum += resultsOfQ[j]
          }
          if (sum === 99) resultsOfQ[0] += 1
          else if (sum === 101) resultsOfQ[0] -= 1
          results.push(resultsOfQ)
        }
      }
      return results
    },
    isAnswered() {
      let a
      if (this.survey.type === 'voting') {
        a = this.answers.length === 0
      }
      if (this.survey.type === 'poll') {
        a = this.answers.some(answer => {return answer === null})
      }
      return a
    },
    isPassed() {
      let user = this.user
      let isParticipant
      if (user) {
        isParticipant = this.survey.participants.some(el => {return el === user.nickname})
        return isParticipant && this.isPassedByAnon
      }
      return this.isPassedByAnon
    }
  },
  data() {
    return {
      answers: [],
      opinion: [],
      isPassedByAnon: false,
      loading: true
    }
  },
  methods: {
    reTake() {
      this.isPassedByAnon = false
    },
    confirmVote() {
      this.isPassedByAnon = true
      if (this.survey.type === 'voting') this.$store.dispatch('setVoting', {id: this.id, answers: this.answers, participant: this.user.nickname || 'anonymous'})
      if (this.survey.type === 'poll') this.$store.dispatch('setPoll', {id: this.id, answers: this.answers, opinion: this.opinion, participant: this.user.nickname || 'anonymous'})
    }
  },
  created() {
    let survey = this.survey
    if (survey.type === 'poll') {
      for (let i = 0; i < survey.qq.length; i++) {
        this.answers.push(null)
        this.opinion.push(null)
      }
    }
    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>