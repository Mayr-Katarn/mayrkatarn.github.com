<template>
  <v-container fluid v-if="!loading">
    <h1>My surveys</h1>
    <template  v-for="item of surveys">
      
      <v-hover :key="item.id" v-slot:default="{ hover }">
        <v-card
          :elevation="hover ? 8 : 2"
          class="mx-auto mb-4 pointer"
          color="#26c6da"
          dark
          max-width="400"
        >
          <v-card-title @click="route(item.id)">
            <span class="title font-weight-light">{{ item.type.toUpperCase() }}</span>
            <v-spacer></v-spacer>
            <h4 class="ml-2 yellow--text">{{item.owner}}</h4>
          </v-card-title>

          <v-card-text class="headline font-weight-bold" @click="route(item.id)">
            {{ item.name }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <app-ask-delete-modal :id="item.id"></app-ask-delete-modal>
            <app-edit-modal :id="item.id"></app-edit-modal>
          </v-card-actions>

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
import AskDeleteModal from './Modal/AskDeleteModal'
import EditModal from './Modal/EditModal'

export default {
  components: {
    AppAskDeleteModal: AskDeleteModal,
    AppEditModal: EditModal
  },
  computed: {
    user() {
      return this.$store.getters.currentUser
    },
    surveys() {
      return this.$store.getters.surveysByNickname(this.user.nickname)
    }
  },
  methods: {
    route(id) {
      this.$router.push('/app-inquirer/survey/' + id)
    }
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