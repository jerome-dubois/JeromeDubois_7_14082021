<template>
  <div class="home mt-5">
    <!-- <h1>This is the home page with the posts from all users</h1> -->
    <AddPost />
    
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6">
        <Post v-for="post in posts" v-bind:key="post.id" :post="post" />
      </b-col>
    </b-row>   

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import AddPost from '@/components/AddPost.vue'
import Post from '@/components/Post.vue'
// import $ from 'jquery'

export default {
  name: 'Home',
  components: {
    AddPost,
    Post
  },
  data() {
    return {
      post: {
        id: "",
        content: "",
        imageUrl: ""
      },        
      posts: [],      
    };
  },
  mounted () {
    axios
      .get(`http://localhost:3000/api/posts`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {        
        this.posts = response.data;
        console.log("posts", this.posts);
      })
      .catch(error => {
        console.log(error);
      })
  },
}
</script>
