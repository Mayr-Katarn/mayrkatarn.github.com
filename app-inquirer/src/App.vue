<template>
  <v-app>

    <v-app-bar app>
      <v-toolbar-title>
        <router-link to="/app-inquirer/" tag="h1" class="pointer">Inquirer</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <h3 v-if="user" class="mr-4 font-italic">{{user.nickname}}</h3>
      <v-divider v-if="user" vertical class="mr-4"></v-divider>
      <v-btn v-if="user" depressed :to="'/app-inquirer/new'" class="mx-1">+ New Survey</v-btn>
      <v-btn v-if="user" depressed :to="'/app-inquirer/my'" :user="user" class="mx-1">My Surveys</v-btn>
      <app-login-reg-modal v-if="!user"></app-login-reg-modal>
      <v-btn v-if="user" depressed :to="'/app-inquirer/'" @click="logout" class="mx-1">Logout</v-btn>
    </v-app-bar>

    <v-main>

      <router-view></router-view>

    </v-main>

  </v-app>
</template>

<script>
import LoginRegModal from './components/Auth/LoginRegModal'

export default {
  components: {
    appLoginRegModal: LoginRegModal
  },
  computed: {
    user() {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style lang="sass">
  .pointer
    cursor: pointer
</style>