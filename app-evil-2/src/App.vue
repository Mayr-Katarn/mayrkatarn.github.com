<template>
  <v-app>
    <v-navigation-drawer 
      app 
      temporary
      v-model="drawer"
    >
      <v-list>
         <v-subheader>MENU</v-subheader>
        <v-list-item-group
          color="primary"
          
        >
          <v-list-item
            v-for="link of links"
            :key="link.title"
            :to="link.url"
          >
            <v-list-item-icon>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="isUserLoggetIn" @click="onLogout">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color='blue'>
      <v-toolbar
        color='blue'
        dark
        flat
      >
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link to="https://mayr-katarn.github.io/mayrkatarn.pages/app-evil-2/" tag="span" class="pointer">Looking for Evils</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
          class="hidden-sm-and-down"
          large
          tile
          text
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn 
          class="hidden-sm-and-down"
          large
          tile
          text
          @click="onLogout"
          v-if="isUserLoggetIn"
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>

      </v-toolbar>
      
    </v-app-bar>

    <div class="info">NOT FINAL VERSION</div>

    <v-main>

      <router-view></router-view>
      
    </v-main>

    <v-snackbar
      timeout="5000"
      v-model="snackbar"
      :multi-line="multiLine"
    >
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
          @click.native="closeError"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>

export default {

  data () {
    return {
      drawer: false,
      snackbar: false,
      multiLine: true
    }
  },
  computed: {
    error () {
      this.showSError() // вызывает функцию в случае изменения переменной ниже
      return this.$store.getters.error
    },
    isUserLoggetIn () {
      return this.$store.getters.isUserLoggetIn
    },
    links () {
      if (this.isUserLoggetIn) {
        return [
          {title: 'Orders', icon: 'mdi-timeline-check-outline', url: '/orders'},
          {title: 'New Evil', icon: 'mdi-flask-empty-plus-outline', url: '/new'},
          {title: 'My Evil', icon: 'mdi-cat', url: '/list'}
        ]
      }

      return [
        {title: 'Login', icon: 'mdi-lock', url: '/login'},
        {title: 'Registation', icon: 'mdi-account-plus-outline', url: '/registration'}
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    showSError () {
      if (this.$store.getters.error) {
        this.snackbar = true
      }
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass" scoped>
.pointer
  cursor: pointer

.info
  color: orange
  font-size: 20px
  position: fixed
  bottom: 0
  z-index: 1000
</style>