<template>
  <div class="mt-5 home">
    <!-- <h1>This is the home page with the posts from all users</h1> -->
    <AddPost />
    
    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="12">
        <b-card-text class="row justify-content-center align-items-center flex-column">
          <Post v-for="post in posts" v-bind:key="post.id" :post="post" />
        </b-card-text>
      </b-col>
    </b-row> 

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import AddPost from '@/components/AddPost.vue'
import Post from '@/components/Post.vue'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState(["userInfos"])
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
        console.log("userInfos in store",this.$store.state.userInfos);
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