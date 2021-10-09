<template>
  <div class="mt-5 home">
    <!-- <h1>This is the page with all the users</h1> -->
        
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="12">
        <b-card-text class="row justify-content-center align-items-center flex-column">
          <User v-for="user in users" v-bind:key="user.id" :user="user" />
        </b-card-text>
      </b-col>
    </b-row> 

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import User from '@/components/User.vue'
import { mapState } from 'vuex'

export default {
  name: 'Users',
  components: {
    User
  },
  data() {
    return {
      user: {
        id: "",
        firstName: '',
        lastName: '',
        email: '',
        admin: ''
      },        
      users: [],      
    };
  },
  computed: {
    ...mapState(["userInfos"])
  },
  mounted () {
    axios
      .get(`http://localhost:3000/api/users`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {        
        this.users = response.data;
        console.log("users", this.users);
      })
      .catch(error => {
        console.log(error);
      })
  },
}
</script>

<style>
  .home {
    margin-top: 100px!important;
  }
   
</style>