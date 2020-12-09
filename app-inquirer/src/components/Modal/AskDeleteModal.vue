<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="420"
  >
    <template v-slot:activator="{ on }">
      <v-btn depressed small color="error" v-on="on">Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="title red lighten-3">
        Are you sure want to delete this survey?
      </v-card-title>
      <v-card-text class="mt-2">All data about <span class="blue--text font-weight-bold">{{ survey.name }}</span> will be lost.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="deleteSurvey" color="error" text>Yes</v-btn>
        <v-btn @click="dialog=!dialog" color="error" text>No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    survey() {
      return this.$store.getters.surveyById(this.id)
    }
  },
  methods: {
    deleteSurvey() {
      this.$store.dispatch('deleteSurvey', this.survey)
    }
  },
}
</script>