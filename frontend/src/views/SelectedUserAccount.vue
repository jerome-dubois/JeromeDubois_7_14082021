<template>
  <div class="home">

    <h1>This is the home page with the posts from the selected user</h1>
    <Post v-for="post in userposts" v-bind:key="post.id" :post="post" />

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import Post from '@/components/Post.vue'

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
  mounted () {
    axios
      .get(`http://localhost:3000/api/users/${this.$route.params.userId}/posts`)
      .then(response => {
        console.log("selected user posts", this.userposts);
        this.userposts = response.data;
      })
      .catch(error => {
        console.log(error);
      })
  },
}
</script>