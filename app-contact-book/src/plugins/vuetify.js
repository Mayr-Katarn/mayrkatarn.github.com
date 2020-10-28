import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.teal.lighten3, // #80CBC4
        secondary: colors.teal.lighten4, // #3F51B5
        accent: colors.red.accent4, // #D50000
        edit: colors.yellow.darken1, // #FDD835
      }
    }
  }
})
