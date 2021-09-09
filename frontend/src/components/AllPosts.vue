<template>
  <div class="home">
    <h1>This is the all posts component</h1>
    <b-row >
      <b-col cols="12" lg="6" v-for="post in allPosts" :key="post.id">
        <Post :post="post" />
      </b-col>
    </b-row>

  </div>
</template>

<script>
import axios from "axios";
import Post from './Post'

export default {
  name: 'AllPosts',
  components: {   
    Post
  },
  methods : {
    displayAllPosts () {
      axios
      .get("http://localhost:3000/api/posts")
      .then(response => {
        console.log("allPosts", response.data);
        this.allPosts = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    }    
  }
  
}

</script>