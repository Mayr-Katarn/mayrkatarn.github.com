<template>
  <v-dialog
    v-model="dialog" 
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn depressed v-on="on" class="mx-1">Login</v-btn>
    </template>

    <v-card>
      <v-tabs>
        <v-tab>Login</v-tab>
        <v-tab>Regestration</v-tab>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-2 mt-2"
          small
          depressed
          color="primary"
          @click="dialog = !dialog"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <v-tab-item>
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
                v-model="login.email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field 
                prepend-icon="mdi-lock" 
                name="password" 
                label="Password" 
                type="password"
                v-model="login.password"
                :counter="6"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <h5 v-if="loginError" class="error--text mr-4">{{loginError}}</h5>
            <v-btn 
              color="primary"
              @click="userLogin"
              :disabled="!valid"
            >Login</v-btn>
          </v-card-actions>
        </v-tab-item>

        <v-tab-item>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              validation
            >
              <v-text-field
                prepend-icon="mdi-account"
                name="nickname" 
                label="Nickname" 
                type="text"
                v-model="regestration.nickname"
                :rules="nicknameRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                name="email" 
                label="Email" 
                type="email"
                v-model="regestration.email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field 
                prepend-icon="mdi-lock" 
                name="password" 
                label="Password" 
                type="password"
                v-model="regestration.password"
                :counter="6"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <h5 v-if="regError" class="error--text mr-4">{{regError}}</h5>
            <v-btn 
              color="primary"
              @click="userRegestration"
              :disabled="!valid"
            >Regestration</v-btn>
          </v-card-actions>
        </v-tab-item>
      </v-tabs>
    </v-card>


  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      login: {
        email: 'user1@test.com',
        password: 'qweqwe'
      },
      regestration: {
        email: '',
        password: '',
        nickname: ''
      },
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters',
      ],
      nicknameRules: [
        v => !!v || 'Nickname is required',
        v => (v && v.length >= 4) || 'Nickname must more than 4 characters',
      ]
    }
  },
  methods: {
    userLogin() {
      const user = {
        email: this.login.email,
        password: this.login.password
      }
      this.$store.dispatch('loginUser', user)
      if (!this.loginError) {
        this.dialog = false
      }
    },
    userRegestration() {
      const user = {
        email: this.regestration.email,
        password: this.regestration.password,
        nickname: this.regestration.nickname
      }
      this.$store.dispatch('regUser', user)
      if (!this.regError) {
        this.dialog = false
      }
    }
  },
  computed: {
    loginError() {
      return this.$store.getters.loginError
    },
    regError() {
      return this.$store.getters.regError
    }
  },
  created() {
    if (this.$route.fullPath === '/?login=false') {
      this.dialog = true
    }
  }
}
</script>