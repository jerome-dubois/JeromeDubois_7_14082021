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
  methods : {
    loadSelectedUserAccount () {
      axios
      .get("http://localhost:3000/api/users/:id")
      .then(response => {
        console.log("selectedUserAccount", response.user);
        this.selectedUserAccount = response.user;
      })
      .catch(error => {
        console.log(error);
      })
    }    
  }
}
</script>