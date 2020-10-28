<template>
  <div>
    <!-- list of favorite contacts, created when search input is not empty -->
    <v-layout v-if="!loading && favorits" row wrap class="mt-8">

      <!-- contact card -->
      <v-card
        class="mx-auto my-2 mx-1"
        v-for="contact of favoritContacts"
        :key="contact.username"
        max-width="360"
        min-width="360"
        max-height="200"
        min-height="200"
        outlined
      >
        <v-list-item three-line>

          <!-- information about contact -->
          <v-list-item-content>
            <div class="title mb-2">{{contact.name}}</div>
            <v-divider class="mb-3"></v-divider>
            <v-list-item-subtitle class="mb-1 font-weight-medium subtitle-1">{{contact.phone}}</v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1 font-weight-medium">{{contact.email}}</v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1 font-weight-medium">{{contact.website}}</v-list-item-subtitle>
          </v-list-item-content>

          <!-- avatar field -->
          <v-list-item-avatar tile size="80">
            <img :src="contact.avatar">
          </v-list-item-avatar>

        </v-list-item>

        <!-- buttons field -->
        <v-card-actions>
          <v-btn
            color="primary"
            depressed
            :to="'/mayrkatarn.pages/app-contact-book/contact/' + contact.id"
          >
            More Info
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            class="mx-2"
            depressed
            fab
            dark
            small
            color="pink"
            @click="contact.favorite = !contact.favorite"
            v-if="contact.favorite"
          >
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            depressed
            fab
            dark
            small
            color="gray"
            @click="contact.favorite = !contact.favorite"
            v-else
          >
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-layout>

    <!-- list of favorite contacts, created when toggle searching by favorit is on -->
    <v-layout v-else-if="!loading && search" row wrap class="mt-8">

      <!-- contact card -->
      <v-card
        class="mx-auto my-2 mx-1"
        v-for="contact of contactsByName"
        :key="contact.username"
        max-width="360"
        min-width="360"
        max-height="200"
        min-height="200"
        outlined
      >
        <v-list-item three-line>

          <!-- information about contact -->
          <v-list-item-content>
            <div class="title mb-2">{{contact.name}}</div>
            <v-divider class="mb-3"></v-divider>
            <v-list-item-subtitle class="mb-1 font-weight-medium subtitle-1">{{contact.phone}}</v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1 font-weight-medium">{{contact.email}}</v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1 font-weight-medium">{{contact.website}}</v-list-item-subtitle>
          </v-list-item-content>

          <!-- avatar field -->
          <v-list-item-avatar tile size="80">
            <img :src="contact.avatar">
          </v-list-item-avatar>

        </v-list-item>

        <!-- buttons field -->
        <v-card-actions>
          <v-btn
            color="primary"
            depressed
            :to="'/mayrkatarn.pages/app-contact-book/contact/' + contact.id"
          >
            More Info
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            class="mx-2"
            depressed
            fab
            dark
            small
            color="pink"
            @click="contact.favorite = !contact.favorite"
            v-if="contact.favorite"
          >
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            depressed
            fab
            dark
            small
            color="gray"
            @click="contact.favorite = !contact.favorite"
            v-else
          >
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-layout>

    <!-- full contact list -->
    <v-layout v-else-if="!loading" row wrap class="mt-8">

      <!-- contact card -->
      <v-card
        class="mx-auto my-2 mx-1"
        v-for="contact of contacts"
        :key="contact.username"
        max-width="360"
        min-width="360"
        max-height="200"
        min-height="200"
        outlined
      >
        <v-list-item three-line>

          <!-- information about contact -->
          <v-list-item-content>
            <div class="title mb-2">{{contact.name}}</div>
            <v-divider class="mb-3"></v-divider>
            <v-list-item-subtitle class="mb-1 font-weight-medium subtitle-1">{{contact.phone}}</v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1 font-weight-medium">{{contact.email}}</v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1 font-weight-medium">{{contact.website}}</v-list-item-subtitle>
          </v-list-item-content>

          <!-- avatar field -->
          <v-list-item-avatar tile size="80">
            <img :src="contact.avatar">
          </v-list-item-avatar>

        </v-list-item>

        <!-- buttons field -->
        <v-card-actions>
          <v-btn
            color="primary"
            depressed
            :to="'/mayrkatarn.pages/app-contact-book/contact/' + contact.id"
          >
            More Info
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            class="mx-2"
            depressed
            fab
            dark
            small
            color="pink"
            @click="contact.favorite = !contact.favorite"
            v-if="contact.favorite"
          >
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            depressed
            fab
            dark
            small
            color="gray"
            @click="contact.favorite = !contact.favorite"
            v-else
          >
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-layout>


    <!-- animation in case of loading DB -->
    <div v-else-if="loading" class="text-xs-center">
      <v-flex class="grid-loading">
        <v-progress-circular
          indeterminate
          color="primary"
          size="80"
        ></v-progress-circular>
      </v-flex>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    // receiving contact list from application state
    contacts() {
      return this.$store.getters.contacts
    },

    // receiving loading state
    loading () {
			return this.$store.getters.loading
    },

    // receiving favorits toogle state
    favorits() {
      return this.$store.getters.favorits
    },

    // receiving list of favorit contacts from state
    favoritContacts() {
      return this.$store.getters.contactsByFavorit
    },

    // receiving list of contacts founded by search input
    contactsByName() {
      return this.$store.getters.contactsByName
    },

    // receiving search input state
    search() {
      return this.$store.getters.search
    }
  }
}
</script>