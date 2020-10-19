<template>
  <v-dialog
    v-model="dialog"
    scrollable 
    persistent :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="warning" depressed v-on="on">Edit</v-btn>
    </template>
      <v-card>
        <v-card-title class="headline orange lighten-2 mb-2">
          Edit Evil
        </v-card-title>

        <v-card-text>
          <v-text-field
						name="title" 
						label="Evil title" 
						type="text"
						v-model="editedTitle"
						:rules="[v => !!v || 'Title is required']"
					></v-text-field>
					<v-textarea 						
						name="description" 
						label="Evil description" 
						type="text"
						v-model="editedDescription"
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
          >
            Cancel
          </v-btn>
          <v-btn
            color="success"
            @click="onSave"
          >
            Save
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
      editedTitle: this.evil.title,
      editedDescription: this.evil.description
    }
  },
  methods: {
    onCancel () {
      this.editedTitle = this.evil.title,
      this.editedDescription = this.evil.description
      this.dialog = false
    },
    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') {
        this.$store.dispatch('updatedEvil', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.evil.id
        })
      }
      this.dialog = false
    }
  }
}
</script>