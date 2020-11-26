<template>
  <v-app>

    <v-app-bar app>
      <v-toolbar-title>
        <h1>NOTEBOOK</h1>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid v-if="!loading">
        <v-list two-line>
          <template v-for="(note, index) of notes">
            <v-hover :key="note.title" v-slot="{ hover }">
              <v-list-item @click="note.active = !note.active">

                <v-list-item-content>
                  <v-list-item-title v-text="note.noteTitle"></v-list-item-title>
                  <v-list-item-subtitle v-text="note.text"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action class="flex-row align-center">
                  
                  <app-edit-modal
                    @click="note.active = !note.active"
                    :id="note.id"
                    :hover="hover"
                    :hide="true"
                    :modal="0"
                  ></app-edit-modal>
                  
                  <v-icon
                    v-if="!note.active"
                    color="grey lighten-1"
                  >
                    mdi-flag-outline
                  </v-icon>

                  <v-icon
                    v-else
                    color="yellow darken-3"
                  >
                    mdi-flag
                  </v-icon>
                </v-list-item-action>

              </v-list-item>
            </v-hover>

            <v-divider
              v-if="index < notes.length - 1"
              :key="index"
            ></v-divider>

          </template>
        </v-list>

        <app-edit-modal
          :hide="false"
          :modal="1"
        ></app-edit-modal>

        <app-edit-modal
          :hide="!isSelected"
          :modal="2"
        ></app-edit-modal>

      </v-container>

      <div v-else class="text-center mt-6">
        <v-progress-circular
          indeterminate
          size="60"
        ></v-progress-circular>
      </div>

    </v-main>

  </v-app>
</template>

<script>

export default {
  computed: {
    notes() {
      return this.$store.getters.notes
    },
    isSelected() {
      return this.notes.some(el => {return el.active})
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="sass">
  .hide
    display: none !important
  .show
    display: flex !important
</style>
