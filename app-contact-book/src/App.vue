<template>
  <v-container class="overflow-hidden">
    <v-app>
      
      <!-- application top bar -->
      <v-app-bar
        min-width="440"
        fixed
        color="#fcb69f"
        dark
        shrink-on-scroll
        src="./assets/book.jpg"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <v-toolbar-title>
          <router-link to="/mayrkatarn.pages/app-contact-book/" tag="span" class="pointer">CONTACT BOOK</router-link>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>


        <v-text-field
          class="mt-3"
          name="search"
          label="Contact search"
          id="id"
          v-model="searchInput"
          @keyup="searchByName"
        ></v-text-field>

        <div class="pt-2 pl-2">
          <v-btn
            depressed
            fab
            dark
            x-small
            color="gray"
            @click="favoritContactsToogle"
            v-if="!favorits"
          >
            <v-icon dark>
              mdi-heart-plus
            </v-icon>
          </v-btn>
          <v-btn
            depressed
            fab
            dark
            x-small
            color="pink"
            @click="favoritContactsToogle"
            v-else
          >
            <v-icon dark>
              mdi-heart-plus
            </v-icon>
          </v-btn>
        </div>
      </v-app-bar>

      <!-- field providing animation of the top bar when scrolling -->
      <v-sheet class="overflow-y-auto">

        <!-- main application field -->
        <v-main class="mt-10">
          <v-container class="mt-12">
            <!-- vue-router -->
            <router-view></router-view>
          </v-container>
        </v-main>

      </v-sheet>

    </v-app>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      searchInput: ''
    }
  },
  computed: {
    // receiving favorits toogle state
    favorits() {
      return this.$store.getters.favorits
    }
  },
  methods: {
    // return to contact book if methods of searching are used
    toBook() {
      if (this.$route.fullPath !== '/mayrkatarn.pages/app-contact-book/') {
        this.$router.push('/mayrkatarn.pages/app-contact-book/')
      }
    },

    // change favorits toogle state
    favoritContactsToogle() {
      this.toBook()
      if (this.favorits) {
        this.$store.dispatch('setFavorits', false)
      } else {
        this.$store.dispatch('setFavorits', true)
      }
    },

    // change searching input state
    searchByName() {
      this.toBook()
      this.$store.dispatch('setSearch', this.searchInput)
    }
  }
}
</script>

<style>
  .pointer {
    cursor: pointer
  }
</style>