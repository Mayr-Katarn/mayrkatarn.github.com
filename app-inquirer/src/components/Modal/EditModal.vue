<template>
  <v-dialog
    v-model="dialog"
    hide-overlay
    fullscreen
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn depressed small color="yellow mx-2" v-on="on">Edit</v-btn>
    </template>

    <v-card>
      <v-toolbar
        dark
        color="yellow darken-1"
      >
        <v-btn icon dark @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Editing</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save" :disabled="!isValid">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>

        <h4 class="error--text">Survey results will be reset after saving</h4>

        <!-- Voting -->
        <div v-if="legacy.type === 'voting'">
          <h2 class="mt-10 pl-4 blue lighten-5 primary--text">Title</h2>
          <v-text-field label="Question or theme of voiting" :rules="rules" v-model="legacy.name" class="yellow lighten-4 px-2"></v-text-field>

          <h2 class="mt-14 pl-4 blue lighten-5 primary--text">Answer options</h2>
          <v-text-field v-for="(v, index) of legacy.qq" :key="index" :label="'Answer ' + (index + 1)" :rules="rules" v-model="legacy.qq[index]" class="px-2 blue lighten-5"></v-text-field>

          <v-btn depressed tile class="mr-4 mt-2 success" @click="addOption">Add answer</v-btn>
          <v-btn v-if="legacy.qq.length > 2" depressed tile class="mt-2 error" @click="removeOption">Remove answer</v-btn>
        </div>

        <!-- Poll -->
        <div v-if="legacy.type === 'poll'">
          <h2 class="mt-10 pl-4 blue lighten-5 primary--text">Title</h2>
          <v-text-field label="Theme of poll" :rules="rules" v-model="legacy.name" class="px-2 yellow lighten-4"></v-text-field>

          <h2 class="mt-14 mb-6 pl-4 blue lighten-5 primary--text">Questions</h2>
          <v-tabs vertical background-color="blue lighten-5">
            <v-tab  v-for="(q, index) of legacy.qq" :key="index">
              Question {{index + 1}}
            </v-tab>

            <v-tab-item v-for="(q, index) of legacy.qq" :key="index" class="ml-4">
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
              <v-btn v-if="legacy.qq.length > 2" depressed tile small width="123" class="mt-2 ml-3 error" @click="removeQuestion">Remove Quest.</v-btn>
            </v-row>
          </div>
        </div>

        <div>
          <h2 class="mt-14 pl-4 blue lighten-5 primary--text">Access rules</h2>
          <h3>Who can participate the survey</h3>
          <v-radio-group class="mt-2" v-model="legacy.participation">
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
          <v-radio-group class="mt-2" v-model="legacy.showResultsTo">
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
          <v-radio-group class="mt-2" v-model="legacy.reTake">
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

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      dialog: false,
      legacy: {},
      rules: [
        value => !!value || 'Required.',
      ]
    }
  },
  computed: {
    survey() {
      return this.$store.getters.surveyById(this.id)
    },
    isValid() {
      let isEmpty
      if (this.legacy.type === 'voting') {
        isEmpty = this.legacy.qq.some(el => {return el === ''})
      }
      if (this.legacy.type === 'poll') {
        isEmpty = this.legacy.qq.some(el => {
          return el.question === '' || el.options.some(key => {return key === ''})
        })
      }
      return !isEmpty && this.legacy.name !== ''
    },
  },
  methods: {
    cancel() {
      this.legacy = JSON.parse(JSON.stringify(this.survey))
      if (this.legacy.type === 'poll') {
        for (let i = 0; i < this.legacy.qq.length; i++) {
          this.legacy.qq[i].options.pop()
        }
      }
      this.dialog = false
    },
    save() {
      if (this.legacy.type === 'poll') {
        for (let i = 0; i < this.legacy.qq.length; i++) {
          this.legacy.qq[i].options.push('Your option')
        }
      }
      this.$store.dispatch('updateSurvey', {
        name: this.legacy.name,
        qq: this.legacy.qq,
        participation: this.legacy.participation,
        showResultsTo: this.legacy.showResultsTo,
        reTake: this.legacy.reTake,
        id: this.legacy.id
      })
      this.dialog = false
    },
    addOption(index) {
      if (this.legacy.type === 'voting') {
        this.legacy.qq.push('')
      }
      if (this.legacy.type === 'poll') {
        this.legacy.qq[index].options.push('')
        this.legacy.qq[index].votes.push(0)
      }
    },
    addQuestion() {
      this.legacy.qq.push({question: '', options: ['', ''], votes: [0, 0]})
    },
    removeOption(index) {
      if (this.legacy.type === 'voting') {
        this.legacy.qq.pop()
      }
      if (this.legacy.type === 'poll') {
        this.legacy.qq[index].options.pop()
        this.legacy.qq[index].votes.pop()
      }
    },
    removeQuestion() {
      this.legacy.qq.pop()
    },
  },
  created() {
    this.legacy = JSON.parse(JSON.stringify(this.survey))
    if (this.legacy.type === 'poll') {
      for (let i = 0; i < this.legacy.qq.length; i++) {
        this.legacy.qq[i].options.pop()
      }
    }
  },
}
</script>