<template>
  <div class="register"> 

    <div class="card">
        <h1 class="card__title">Inscription</h1>    
        <p class="card__subtitle" >Tu as déjà un compte ? <router-link to="/login" class="card__action">Se connecter</router-link></p>
    </div>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" aria-label="Écrire votre adresse mail" placeholder="Adresse mail"/>
    </div>
    <div class="form-row">
      <input v-model="firstName" class="form-row__input" type="text" aria-label="Écrire votre prénom" placeholder="Prénom"/>
      <input v-model="lastName" class="form-row__input" type="text" aria-label="Écrire votre nom" placeholder="Nom"/>
    </div>   
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" aria-label="Écrire votre mot de passe" placeholder="Mot de passe"/>
    </div>    
    <div class="form-row" v-if="status == 'error_create'">
      Adresse mail déjà utilisée ou mot de passe invalide
    </div>
    <div class="form-row">
      <!-- <button @click="register()" class="button"> -->
      <button @click="register()" class="button" aria-label="S'inscrire" :class="{'button--disabled' : !validatedFields}">
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Register',
  components: {
  },
  data: function () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    }
  },
  mounted: function () {
    if (localStorage.getItem('token')) {      
      this.$router.push('/account');
      return ;
    }
    // if (this.$store.state.token) {      
    //   this.$router.push('/account');
    //   return ;
    // }
    // if (this.token !== null) {
    //   this.$router.push('/account');
    //   return ;
    // }
  },  
  computed: {
    validatedFields: function () {

      if (this.email != "" && this.prenom != "" && this.nom != "" && this.password != "") {
          return true;
        } else {
          return false;
        }      
      
    },
    ...mapState(['status', 'user'])
  },
  methods: {    
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
      })     
      .then(
        function () {
        self.$router.push('/account');
        },
        function (error) {
        console.log(error);
        }
      )
      
    },    
    register: function () {
      const self = this;
      this.$store.dispatch('register', {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      }).then(function () {
        self.login();
      }, function (error) {
        console.log(error);
      })
    }    
  }
};
</script>

<style scoped>

  .form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }
  .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }
  .form-row__input::placeholder {
    color:#aaaaaa;
  }
</style>