<template>
  <div class="login">    
    <h1>Hello, this is the login</h1>

    <b-card>

      <b-card-text>
        Se connecter
      </b-card-text>

      <b-form>            

        <b-form-group id="email-group" label="Email" label-for="email">
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password-group" label="Mot de passe" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            required
          ></b-form-input>
        </b-form-group>
      
        <b-button         
          @click="login()"
          type="submit"
          variant="primary">
          <span>Se connecter</span>
        </b-button>

      </b-form>

      <p>
        Vous n'êtes pas encore inscrit ?
        <router-link to="/register">
          Créer un compte
        </router-link>
      </p>

    </b-card>     

  </div>

</template>

<script>

import axios from "axios";
import { mapState } from "vuex";

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      formLogin: {
        email: '',
        password: ''         
      }
    }
  },
  computed: {
    ...mapState(["userInfos"])
  },
  mounted() {
      console.log(this.$store.state.userInfos);
  },
  methods: {   
        
    login() {
      if (
        this.formLogin.email !== null &&
        this.formLogin.password !== null
      ) {
        axios
          .post("http://localhost:3000/api/auth/login", this.formLogin)
          .then(response => {
            localStorage.setItem('token',response.data.token)
            // location.replace(location.origin)
          })
          .then(response => {
            this.$store.dispatch('getUserInfosInStore', response);
          })
          .then(console.log(this.$store.state.userInfos))
          .catch(error => console.log(error));

      } else {
        alert ("Veuillez renseigner un email et un mot de passe");
        this.errorMessage = 'Veuillez renseigner un email et un mot de passe';
      }
    }       
  }  

};
</script>