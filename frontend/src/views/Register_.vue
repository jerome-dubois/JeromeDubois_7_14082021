<template>
  <div class="register">    
    <h1>Hello, this is the register page</h1>

    <b-card>

      <b-card-text>
        Créer un compte
      </b-card-text>
      
      <b-form>
      
        <b-form-group id="firstName-group" label="Prénom" label-for="firstName">
          <b-form-input
            id="firstName"
            v-model="formRegister.firstName"
            type="text"
            placeholder="Prénom"
            required
          ></b-form-input>
        </b-form-group>
        
        <b-form-group id="lastName-group" label="Nom" label-for="lastName">
          <b-form-input
            id="lastName"
            v-model="formRegister.lastName"
            type="text"
            placeholder="Nom"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="email-group" label="Email" label-for="email">
          <b-form-input
            id="email"
            v-model="formRegister.email"
            type="email"
            placeholder="Email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="password-group" label="Mot de passe" label-for="password">
          <b-form-input
            id="password"
            v-model="formRegister.password"
            type="password"
            placeholder="Mot de passe"
            required
          ></b-form-input>
        </b-form-group>
      
        <b-button
          @click.prevent="register"
          type="submit"
          variant="primary">
          <span>S'inscrire</span>
        </b-button>

      </b-form>

      <p>
        Vous avez déjà un compte ?
        <router-link to="/login">
          Identifiez-vous! 
        </router-link>
      </p>

    </b-card>     

  </div>

</template>

<script>

import axios from "axios";

export default {
  name: 'Register',
  components: {
  },
  data() {
    return {
      formRegister: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''         
      }
    }
  },
  // computed: {
  //   ...mapState(["user"])
  // },
  methods: {
    register() {
      if (
        this.formRegister.firstName !== null &&
        this.formRegister.lastName !== null &&
        this.formRegister.email !== null &&
        this.formRegister.password !== null
      ) {
        axios
          .post("http://localhost:3000/api/auth/register", this.formRegister)
          .then(response => {
            console.log(response);
          })
          .catch(error => console.log(error));

      } else {
        alert ("Veuillez saisir la totalité des champs du formulaire");
        // this.errorMessage = 'Veuillez saisir la totalité des champs du formulaire';
      }
    }   
  }
};
</script>