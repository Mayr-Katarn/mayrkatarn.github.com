<template>
  <v-dialog
    v-model="dialog"
    scrollable 
    persistent :overlay="false"
    max-width="540px"
    transition="dialog-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        class="mr-2"
        :class="{'hide': hide, 'show': hover }"
        small
        :color="color[modal]"
        v-on="on"
      >{{ btnName[modal] }}</v-btn>
    </template>
      <v-card v-if="modal === 0 || modal === 1">
        <v-card-title class="headline orange lighten-2 mb-2">
          {{ message[modal] }}
        </v-card-title>

        <v-card-text>
          <v-text-field
						name="title" 
						label="Note title" 
						type="text"
						v-model="note.noteTitle"
						:rules="[v => !!v || 'Title is required']"
					></v-text-field>
					<v-textarea 						
						name="description"
						label="Note text" 
						type="text"
						v-model="note.text"
						:rules="[v => !!v || 'Text is required']"
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
            depressed
            color="success"
            @click="onConfirm"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="modal === 2">
        <v-card-title class="headline error lighten-2 mb-2">
          {{ message[modal] }}
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            @click="onCancel"
          >
            No
          </v-btn>
          <v-btn
            depressed
            :color="color[modal]"
            @click="onConfirm"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>

  </v-dialog>
</template>

<script>
export default {
  props: ['id', 'modal', 'hover', 'hide'],
  data() {
    return {
      dialog: false,
      message: [
        'Note editor',
        'New note',
        'Do you realy want to delete selected notes?'
      ],
      btnName: [
        'Edit',
        'New note',
        'Delete selected'
      ],
      color: [
        'info',
        'success',
        'error'
      ]
    }
  },
  computed: {
    note() {
      if (this.modal === 0) return this.$store.getters.legacyNote(this.id)
      else return this.$store.getters.newNote
    }
  },
  methods: {
    onCancel () {
      if (this.modal === 0) this.$store.dispatch('cancelNote', true)
      if (this.modal === 1) this.$store.dispatch('cancelNote')
      this.dialog = false
    },
    onConfirm () {
      if (this.note.noteTitle !== '' && this.note.text !== '' && this.modal === 0) {
        this.$store.dispatch('setNote', {
          title: this.note.noteTitle,
          text: this.note.text,
          id: this.id,
          isNew: false
        })
        this.dialog = false
      }
      if (this.note.noteTitle !== '' && this.note.text !== '' && this.modal === 1) {
        this.$store.dispatch('setNote', {
          title: this.note.noteTitle,
          text: this.note.text,
          id: this.id,
          isNew: true
        })
        this.dialog = false
      }
      if (this.modal === 2) {
        this.$store.dispatch('deleteNotes')
        this.dialog = false
      }
    }
  }
}
</script>