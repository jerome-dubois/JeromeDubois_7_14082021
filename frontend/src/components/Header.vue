<template>
  <nav class="row navbar navbar-expand-lg navbar-light bg-light fixed-top px-4">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarToggle"
      aria-controls="navbarToggle"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- <router-link class="navbar-brand" to="/"> -->
    <router-link to="/home" aria-hidden="true">
      <img class="w-50" src="../assets/icon-left-font-monochrome-orange.svg" alt="Logo Groupomania" />
    </router-link>

    <div class="collapse navbar-collapse justify-content-end" id="navbarToggle">
    <!-- <div class="justify-content-end"> -->
      <ul class="navbar-nav mt-2 mt-lg-0">
        <li class="nav-item">
        <!-- <li class="nav-item" v-if="token!==null"> -->
          <router-link class="nav-link" aria-label="Accueil" to="/home">Accueil</router-link>
        </li>
        <!-- <li class="nav-item" v-if="token==null"> -->
        <li class="nav-item">
          <router-link class="nav-link" aria-label="S'inscrire" to="/register">S'inscrire</router-link>
        </li>
        <!-- <li class="nav-item" v-if="token==null"> -->
        <li class="nav-item">
          <router-link class="nav-link" aria-label="Se connecter" to="/login">Se connecter</router-link>
        </li>
        <li class="nav-item">
        <!-- <li class="nav-item" v-if="token!==null"> -->
          <router-link class="nav-link" to="/account">
            <i class="user-icon fas fa-user fa-2x"></i>
            <!-- <i class="user-icon fas fa-user"></i> -->
          </router-link>
        </li>
        <li class="nav-item">
        <!-- <li class="nav-item" v-if="token!==null"> -->
          <button type="button" class="button btn btn-disconnect" aria-label="Se déconnecter" @click="disconnect">Se déconnecter</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["token"])
  },
  methods: {
    disconnect() {
      localStorage.clear();
      // location.replace(location.origin);
      this.$router.push('/login');

    }
  }
};
</script>

<style lang='scss'>
nav {
  position: fixed;
  top: 0;
}
</style>