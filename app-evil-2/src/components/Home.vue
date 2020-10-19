<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel v-model="model">
            <v-carousel-item
              v-for="evil of promos"
              :key="evil.id"
              :src="evil.imageSrc"
            >
            <div class="carousel-link">
              <v-btn class="error" :to="'/mayrkatarn.pages/app-evil-2/evil/' + evil.id">{{ evil.title }}</v-btn>
            </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs14
          sm6
          md4
          v-for="evil of evils"
          :key="evil.id"
        >
          <v-card
            class="mx-auto mb-4"
            max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="evil.imageSrc"
            >
              <v-card-title>{{evil.title}}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              {{evil.subtitle}}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{evil.description}}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn
                depressed
                :to="'/mayrkatarn.pages/app-evil-2/evil/' + evil.id"
              >
                More info
              </v-btn>
              <app-join-modal :evil='evil'></app-join-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout>
        <v-flex class="grid-loading">
          <v-progress-circular
            indeterminate
            color="red"
            size="80"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ['evil'],
  computed: {
    promos () {
      return this.$store.getters.promos
    },
    evils () {
      return this.$store.getters.evils
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  
  data () {
    return {
      model: 0      
    }
  }
}
</script>

<style lang="sass">
.carousel-link
  position: absolute
  display: flex
  justify-content: center
  bottom: 50px
  width: 100%
  left: 50%
  background: rgba(0, 0, 0, .3)
  transform: translate(-50%, 0)
  padding: 5px 15px
  border-top-left-radius: 5px
  border-top-right-radius: 5px

.grid-loading
  display: grid
  place-items: center
  position: absolute
  left: 50%
  top: 25%
  transform: translate(-50%, 0)
</style>