<template>
  <div class="card">
    <h1 class="card__title">Connexion</h1>
    <!-- <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p> -->
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
    </div>    
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>
    <!-- <div class="form-row"> -->
    <!-- <div class="form-row" v-if="mode == 'login' && status == 'error_login'"> -->
      <!-- Adresse mail et/ou mot de passe invalide -->
    <!-- </div> -->
    <!-- <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div> -->
    <div class="form-row">
      <button @click="login()" class="button">
      <!-- <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}"> -->
        <!-- <span v-if="status == 'loading'">Connexion en cours...</span> -->
        <!-- <span v-else>Connexion</span> -->
        <span>Connexion</span>
      </button>      
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Login',
  data: function () {
    return {
      // mode: 'login',
      email: '',
      password: '',
    }
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push('/account');
      return ;
    }
  },
  computed: {    
    ...mapState(['userInfos'])
  },
  // computed: {
    // validatedFields: function () {
    //   if (this.mode == 'create') {
    //     if (this.email != "" && this.prenom != "" && this.nom != "" && this.password != "") {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     if (this.email != "" && this.password != "") {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // },
    // ...mapState(['status'])
  // },
  methods: {
    // switchToCreateAccount: function () {
    //   this.mode = 'create';
    // },
    // switchToLogin: function () {
    //   this.mode = 'login';
    // },
    login: function () {
      // const self = this;
      this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
      });      
      // .then(
      //   function () {
      //   self.$router.push('/account');
      //   },
      //   function (error) {
      //   console.log(error);
      //   }
      // )
    },
    // createAccount: function () {
    //   const self = this;
    //   this.$store.dispatch('createAccount', {
    //     email: this.email,
    //     firstName: this.firstName,
    //     lastName: this.lastName,
    //     password: this.password,
    //   }).then(function () {
    //     self.login();
    //   }, function (error) {
    //     console.log(error);
    //   })
    // },
  }
}
</script>