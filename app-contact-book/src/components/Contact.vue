<template>
  <v-container class="mt-8">

    <!-- first card with main information -->
    <v-card v-if="!loading" class="d-flex" min-width="420" max-width="1020">
      <v-list-item three-line>

        <v-list-item-content>
          <div class="d-inline-flex headline mb-2">
            {{contact.name}}
          </div>
          <v-divider class="mb-3"></v-divider>

          <!-- contacts field -->
          <div class="title primary rounded pl-3 mb-2">Contacts</div>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-phone</v-icon>
            {{contact.phone}}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-email</v-icon>
            {{contact.email}}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-web</v-icon>
            {{contact.website}}
          </v-list-item-subtitle>
          <v-divider class="mb-3"></v-divider>

          <!-- address field -->
          <div class="title primary rounded pl-3 my-2">Address</div>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-home</v-icon>
            {{contact.address.streetA}}, {{contact.address.streetB}}, {{contact.address.streetC}}, {{contact.address.streetD}}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-city</v-icon>
            {{contact.address.city}}, {{contact.address.state}}, {{contact.address.country}}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-mailbox</v-icon>
            {{contact.address.zipcode}}
          </v-list-item-subtitle>
          <v-divider class="mb-3"></v-divider>

          <!-- company field -->
          <div class="title primary rounded pl-3 mb-2">Company</div>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-subtitles</v-icon>
            {{contact.company.name}}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-chat-alert</v-icon>
            "{{contact.company.catchPhrase}}"
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1 text-subtitle-1 text--primary">
            <v-icon class="mr-2" color="primary">mdi-cog</v-icon>
            {{contact.company.bs}}
          </v-list-item-subtitle>
          <v-divider class="mb-1"></v-divider>

          <!-- 'favorite' button field -->
          <v-card-actions>
            <v-btn
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

            <v-spacer></v-spacer>

            <!-- 'edit' button to open modal window -->
            <app-edit-contact-modal :contact='contact'></app-edit-contact-modal>

            <!-- return to contact book button -->
            <v-btn
              color="primary"
              depressed
              to="/mayrkatarn.pages/app-contact-book/"
            >
            <v-icon class="mr-2">mdi-arrow-left-bold-circle</v-icon>
            Back
            </v-btn>
            
          </v-card-actions>

        </v-list-item-content>
        
        <!-- avatar field -->
        <v-list-item-avatar tile size="80">
          <img :src="contact.avatar">
        </v-list-item-avatar>

      </v-list-item>
    </v-card>

    <!-- second card with additional information -->
    <v-card v-if="!loading" class="d-flex mt-6" min-width="420" max-width="1020">
      <v-list-item>
        <v-list-item-content>

          <!-- card headline -->
          <div class="headline">Posts of {{contact.name}}</div>
          <v-divider></v-divider>

          <!-- mini-cards with contact posts -->
          <v-card
            outlined
            v-for="post of contact.posts"
            :key="post.sentence"
            class="d-flex mt-2 secondary"
            min-width="380"
            max-width="1000"
          >
            <v-list-item-content>
              <div class="font-weight-black pl-3 mb-2">
                <v-icon class="mr-2" color="black">mdi-message-text</v-icon>
                {{post.sentence}}
              </div>
              <v-divider></v-divider>
              <p
                class="ml-2 text-subtitle-2 text--primary"
                v-for="(text, index) of post.sentences.split('\n')"
                :key="'a' + index"
                >
                {{text}}
              </p>
              <v-divider></v-divider>
              <p
                class="ml-2 text-subtitle-2 text--primary"
                v-for="(text, index) of post.paragraph.split('\n')"
                :key="'b' + index"
                >
                {{text}}
              </p>
              <v-divider></v-divider>
              <div class="d-inline-flex">
                <p class="mx-2 mt-2 mb-auto" v-for="word of post.words" :key="word">
                  #{{word}}
                </p>
              </div>
            </v-list-item-content>
          </v-card>

        </v-list-item-content>
      </v-list-item>
    </v-card>

    <!-- animation in case of loading DB -->
    <div v-else class="text-xs-center">
      <v-flex class="grid-loading">
        <v-progress-circular
          indeterminate
          color="primary"
          size="80"
        ></v-progress-circular>
      </v-flex>
    </div>

  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    // receiving contact by his id
    contact() {
      const id = this.id
      return this.$store.getters.contactById(id)
    },
    
    // receiving loading state
    loading () {
			return this.$store.getters.loading
		}
  }
}
</script>