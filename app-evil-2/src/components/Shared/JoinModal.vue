<template>
  <v-dialog
    v-model="dialog"
    scrollable 
    persistent :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary ml-2" depressed v-on="on">Join now</v-btn>
    </template>
      <v-card>
        <v-card-title class="headline orange lighten-2 mb-2">
          Do you realy want to join his army!?
        </v-card-title>

        <v-card-text>
          <v-text-field
						name="name" 
						label="Your name" 
						type="text"
						v-model="name"
						:rules="[v => !!v || 'Title is required']"
					></v-text-field>
					<v-textarea 						
						name="contact" 
						label="Your contact" 
						type="text"
						v-model="contact"
						:rules="[v => !!v || 'Description is required']"
						multi-line
					></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            @click="onCancel"
            :disabled="localLoading"
          >
            Run away 
          </v-btn>
          <v-btn
            color="success"
            @click="onSave"
            :disabled="localLoading"
            :loading="localLoading"
          >
            JOIN HIM!
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['evil'],
  data() {
    return {
      dialog: false,
      name: '',
      contact: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = '',
      this.contact = ''
      this.dialog = false
    },
    onSave () {
      if (this.name !== '' && this.contact !== '') {
        this.localLoading = false
        this.$store.dispatch('createOrder', {
          name: this.name,
          contact: this.contact,
          evilId: this.evil.id,
          ownerId: this.ownerId
        })
        .finally(() => {
          this.name = ''
          this.contact = ''
          this.localLoading = false
          this.dialog = false
        })
      }
    }
  }
}
</script>