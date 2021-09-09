<template>
  <div class="selected-post">
    <h1>This is the selected Post view</h1>

    <Post v-if="post" :post="post" />

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Post from '@/components/Post.vue';

export default {
  name: 'SelectedPost',
  components: {    
    Post
  },
  methods : {
    displayPost () {
      axios
      .get("http://localhost:3000/api/posts/:id")
      .then(response => {
        console.log("post", response.data);
        this.post = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    }    
  }
}
</script>