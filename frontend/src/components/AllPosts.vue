<template>
  <div>
    <b-row>
      <b-col >
        <Post v-for="post in posts" :key="post.id" @postDetails="loadPost"/>
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
  data() {
    return {
      post: {
        id: "",
        content: "",
        imageUrl: ""
      },     
      posts: []
    };
  },
  methods : {
    loadPost(payload) {
      this.post = payload.post;
    },
    displayAllPosts () {
      axios
      .get("http://localhost:3000/api/posts")
      .then(response => {
        console.log("posts", response.data);
        this.posts = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    }    
  }
  
}

</script>