<template>
  <div class="home">

    <h1>This is the home page with the posts from the selected user</h1>

    <!-- <div> -->
        <!-- <router-link
          :to="{ name: 'SelectedUserAccount', params: { userId: post.User.id } }">
          <p>
            {{ post.User.firstName }} {{ post.User.lastName }}
          </p>
        </router-link>
      </div> -->

    <b-card-text v-if="user.admin==true">    
    <!-- <b-card-text> -->

        {{ user.firstName }}
        <!-- {{ $store.state.user }} -->
        <!-- {{user.firstName}} -->
    </b-card-text>    

    <Post v-for="post in userposts" v-bind:key="post.id" :post="post" />

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import Post from '@/components/Post.vue'
import { mapState } from "vuex"

export default {
  name: 'Home',
  components: {
    Post
  },
  data() {
    return {
      post: {
        id: "",
        content: "",
        imageUrl: ""
      },        
      userposts: [],      
    };
  },
  computed: {
    ...mapState(["user"])
  },
  mounted () {
    axios
      .get(`http://localhost:3000/api/users/${this.$route.params.userId}/posts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.userposts = response.data;
        console.log("selected user posts", this.userposts);        
      })
      .catch(error => {
        console.log(error);
      })
  },
}
</script>