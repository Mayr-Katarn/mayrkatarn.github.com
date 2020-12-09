<template>
  <v-container fluid class="ml-4 pr-8">
    <h1>New survey</h1>
    <v-divider class="primary"></v-divider>
    <h2 class="mt-4 pl-4 blue lighten-5 primary--text">Type</h2>
    <v-radio-group class="mt-2" v-model="type">
      <v-radio
        label="Voting"
        value="voting"
      ></v-radio>
      <v-radio
        label="Poll"
        value="poll"
      ></v-radio>
    </v-radio-group>

    <div v-if="type !== ''">

      <!-- Voting -->
      <div v-if="type === 'voting'">
        <h2 class="mt-14 pl-4 blue lighten-5 primary--text">Title</h2>
        <v-text-field label="Question or theme of voiting" :rules="rules" v-model="name" class="yellow lighten-4 px-2"></v-text-field>

        <h2 class="mt-14 pl-4 blue lighten-5 primary--text">Answer options</h2>
        <v-text-field v-for="(v, index) of qqv" :key="index" :label="'Answer ' + (index + 1)" :rules="rules" v-model="qqv[index]" class="px-2 blue lighten-5"></v-text-field>

        <v-btn depressed tile class="mr-4 mt-2 success" @click="addOption">Add answer</v-btn>
        <v-btn v-if="qqv.length > 2" depressed tile class="mt-2 error" @click="removeOption">Remove answer</v-btn>
      </div>

      <!-- Poll -->
      <div v-if="type === 'poll'">
        <h2 class="mt-14 pl-4 blue lighten-5 primary--text">Title</h2>
        <v-text-field label="Theme of poll" :rules="rules" v-model="name" class="px-2 yellow lighten-4"></v-text-field>

        <h2 class="mt-14 mb-6 pl-4 blue lighten-5 primary--text">Questions</h2>
        <v-tabs vertical background-color="blue lighten-5">
          <v-tab  v-for="(q, index) of qqp" :key="index">
            Question {{index + 1}}
          </v-tab>

          <v-tab-item v-for="(q, index) of qqp" :key="index" class="ml-4">
            <v-text-field label="Question" :rules="rules" v-model="q.question" class="mt-0 px-2 yellow lighten-4"></v-text-field>
            <v-text-field v-for="(v, index) of q.options" :key="index" :label="'Answer ' + (index + 1)" :rules="rules" v-model="q.options[index]" class="mt-2 px-2 blue lighten-5"></v-text-field>
            <v-text-field disabled label='User opinion (always in poll)' class="mt-2 px-2 blue lighten-5"></v-text-field>
            <v-btn depressed tile small class="mt-2 success" @click="addOption(index)">Add answer</v-btn>
            <v-btn v-if="q.options.length > 2" depressed tile small class="ml-4 mt-2 error" @click="removeOption(index)">Remove answer</v-btn>
            <v-divider class="primary mt-2"></v-divider>
          </v-tab-item>
        </v-tabs>

        <div class="mt-2">
          <v-row>
            <v-btn depressed tile small class="ml-3 mr-2 success" @click="addQuestion">Add Question</v-btn>
          </v-row>
          <v-row>
            <v-btn v-if="qqp.length > 2" depressed tile small width="123" class="mt-2 ml-3 error" @click="removeQuestion">Remove Quest.</v-btn>
          </v-row>
        </div>
      </div>

      <div>
        <h2 class="mt-14 pl-4 blue lighten-5 primary--text">Access rules</h2>
        <h3>Who can participate the survey</h3>
        <v-radio-group class="mt-2" v-model="participation">
          <v-radio
            label="Everyone"
            value="public"
          ></v-radio>
          <v-radio
            label="Only registered"
            value="private"
          ></v-radio>
          <v-radio
            label="Nobody"
            value="hide"
          ></v-radio>
        </v-radio-group>

        <h3>Who can see results of the survey</h3>
        <v-radio-group class="mt-2" v-model="showResultsTo">
          <v-radio
            label="Everyone"
            value="public"
          ></v-radio>
          <v-radio
            label="Only registered"
            value="private"
          ></v-radio>
          <v-radio
            label="Nobody"
            value="hide"
          ></v-radio>
        </v-radio-group>

        <h3>Allowed to participate in the survey again?</h3>
        <v-radio-group class="mt-2" v-model="reTake">
          <v-radio
            label="Yes"
            :value="true"
          ></v-radio>
          <v-radio
            label="No"
            :value="false"
          ></v-radio>
        </v-radio-group>
      </div>

      <v-btn class="mr-4" color="success" :disabled="!isValid" @click="createSurvey">Create survey</v-btn>
    </div>


  </v-container>
</template>

<script>
export default {
  data() {
    return {
      type: '',
      name: '',
      qqv: ['', ''],
      qqp: [
        {question: '', options: ['', ''], votes: []},
        {question: '', options: ['', ''], votes: []}
      ],
      participation: 'public',
      showResultsTo: 'public',
      reTake: false,
      rules: [
        value => !!value || 'Required.',
      ]
    }
  },
  methods: {
    addOption(index) {
      if (this.type === 'voting') {
        this.qqv.push('')
      }
      if (this.type === 'poll') {
        this.qqp[index].options.push('')
      }
    },
    addQuestion() {
      this.qqp.push({question: '', options: ['', ''], votes: []})
    },
    removeOption(index) {
      if (this.type === 'voting') {
        this.qqv.pop()
      }
      if (this.type === 'poll') {
        this.qqp[index].options.pop()
      }
    },
    removeQuestion() {
      this.qqp.pop()
    },
    createSurvey() {
      if (this.type === 'voting') {
        const survey = {
          type: this.type,
          name: this.name,
          qq: this.qqv,
          participation: this.participation,
          showResultsTo: this.showResultsTo,
          reTake: this.reTake,
          owner: this.user.nickname
        }
        this.$store.dispatch('newSurvey', survey)
      } else if (this.type === 'poll') {
        const survey = {
          type: this.type,
          name: this.name,
          qq: this.qqp,
          participation: this.participation,
          showResultsTo: this.showResultsTo,
          reTake: this.reTake,
          owner: this.user.nickname
        }
        this.$store.dispatch('newSurvey', survey)
      }
      this.$router.push('/my')
    }
  },
  computed: {
    isValid() {
      let isEmpty
      if (this.type === 'voting') {
        isEmpty = this.qqv.some(el => {return el === ''})
      }
      if (this.type === 'poll') {
        isEmpty = this.qqp.some(el => {
          return el.question === '' || el.options.some(key => {return key === ''})
        })
      }
      return !isEmpty && this.name !== ''
    },
    user() {
      return this.$store.getters.currentUser
    }
  }
}
</script>