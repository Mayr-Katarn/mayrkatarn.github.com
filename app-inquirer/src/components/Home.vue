<template>
  <v-container fluid v-if="!loading">

    <template  v-for="item of surveys">
      <v-hover v-if="item.participation!=='hide' || item.showResultsTo!=='hide'" :key="item.id" v-slot:default="{ hover }">
        <v-card
          :elevation="hover ? 8 : 2"
          :to="'/survey/' + item.id"
          class="mx-auto mb-4 pointer"
          color="#26c6da"
          dark
          max-width="400"
        >
          <v-card-title>
            <span class="title font-weight-light">{{ item.type.toUpperCase() }}</span>
            <v-spacer></v-spacer>
            <h5 class="mr-2 yellow--text">{{item.participation}}</h5>
            <v-divider vertical class="white"></v-divider>
            <h4 class="ml-2 yellow--text">{{item.owner}}</h4>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            {{ item.name }}
          </v-card-text>
          
        </v-card>
      </v-hover>
    </template>

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
  computed: {
    surveys(){
      return this.$store.getters.surveys
    },
  },
  data() {
    return {
      loading: true
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>