<template>  
    
  <div class="card border-0 shadow p-3 mb-5 mt-3 bg-white rounded">  
        
    <h1 class="card__title">Connexion</h1>
    <p class="card__subtitle">Tu n'as pas encore de compte ? <router-link to="/register" class="card__action">Créer un compte</router-link></p>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" aria-label="Écrire votre adresse mail" placeholder="Adresse mail"/>
    </div>    
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" aria-label="Écrire votre mot de passe" placeholder="Mot de passe"/>
    </div>    
    <div class="form-row" v-if="status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>    
    <div class="form-row">
      <button @click="login()" class="button" aria-label="Connexion" :class="{'button--disabled' : !validatedFields}">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
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
      email: '',
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
      if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
    },
    ...mapState(['status','token','userInfos'])
  },
  methods: {

    login: function () {
      const self = this;
      // this.$store.dispatch('getUserInfos');
      console.log("userInfos in store_debut",this.$store.state.userInfos);
      this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
      })
      // .then(this.$store.dispatch('getUserInfos'))
      .then(
        function () {
        self.$router.push('/home');
        },
        function (error) {
        console.log(error);
        }
      );
      console.log("userInfos in store_fin",this.$store.state.userInfos); 
      
    },
    
  }
}

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