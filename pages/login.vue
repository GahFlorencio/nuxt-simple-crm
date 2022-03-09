<template>
  <v-app>
    <v-container align-center justify-center>
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title class="pb-0 mb-9">
          <h1>Login</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              label="Email"
              autocomplete="new-email"
              prepend-icon="mdi-account-circle"
            />
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              autocomplete="new-password"
              label="Senha"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click ="login()" color="primary">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

  </v-app>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'login',
  data () {
    return {
      showPassword: false,
      autofilled: false,
      email:'administrador@email.com',
      password: 'secret'
    }
  },
 methods:{
   async login() {
     this.error = null
     return this.$auth
       .loginWith('local', {
         data: {
           email: this.email,
           password: this.password
         }
       })
       .catch((err) => {
         // eslint-disable-next-line no-console
         console.error(err)
         const responseData = err.response?.data
         this.error = responseData?.error ?? responseData
       })
   },
 }
}
</script>
