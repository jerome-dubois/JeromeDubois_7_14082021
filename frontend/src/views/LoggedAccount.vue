<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voici qui est connecté:</p>
    <p>{{userInfos.firstName}} {{userInfos.lastName}}</p>
    <p>{{userInfos.email}}</p>
    <!-- <p>{{userInfos.token}} {{userInfos.id}}</p> -->
    <!-- <img :src="user.photo"/> -->
    <div class="form-row">      
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'LoggedAccount',
    mounted () {
    // console.log("store_user",this.$store.state.user);
    this.$store.dispatch('getUserInfos');   
    console.log("userInfos in store",this.$store.state.userInfos);
    // if (this.$store.state.token = '') {
    //   this.$router.push('/');
    //   return ;
    // }
    },    
    computed: {
    ...mapState(["userInfos"])
    },
      methods: {
        logout: function () {
          this.$store.commit('LOGOUT');
          this.$router.push('/login');
        }
      }
}
</script>