<template>
  <div class="public-profile">
    <h1>This is the home page with the posts from the selected user</h1>

    <p>
      {{ selectedUserAccount.firstName }} {{ selectedUserAccount.lastName }}
    </p>
    
    <AllPosts />

  </div>
</template>

<script>
// @ is an alias to /src
import AllPosts from '@/components/AllPosts.vue';
import axios from "axios";

export default {
  name: 'SelectedUserAccount',
  components: {    
    AllPosts
  },
  data () {
    return {
      selectedUserAccount: null
    }
  },
  mounted () {
    this.loadSelectedUserAccount()
  },
  methods : {
    loadSelectedUserAccount () {
      axios
      .get(`http://localhost:3000/api/users/${this.$route.params.userId}`)
      .then(response => {
        console.log(this.$route.params.userId),
        console.log("selectedUserAccount", response.data);
        this.selectedUserAccount = response.data;
        console.log("selectedUserAccount", this.selectedUserAccount.firstName);
      })
      .catch(error => {
        console.log(error);
      })
    }    
  }  
}
</script>