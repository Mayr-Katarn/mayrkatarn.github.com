<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              validation
            >
              <v-text-field
                prepend-icon="mdi-account"
                name="email" 
                label="Email" 
                type="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field 
                prepend-icon="mdi-lock" 
                name="password" 
                label="Password" 
                type="password"
                v-model="password"
                :counter="6"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-text-field                 
                prepend-icon="mdi-lock" 
                name="confirm-password" 
                label="Confirm Password" 
                type="password"
                v-model="confirmPassword"
                :counter="6"
                :rules="confirmPasswordRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              color="primary"
              @click="validate"
              :loading="loading"
              :disabled="!valid || loading"
            >Create acc</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password should match',
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
        .then(() => {
          this.$router.push('/mayrkatarn.pages/app-evil-2/')
        })
        .catch(()=> {})
      }
    }
  }
}
</script>