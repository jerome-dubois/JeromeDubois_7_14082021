<template>
  <div class="selected-post">
    <h1>This is the selected Post view</h1>

    <!-- <Post v-if="post" :post="post" /> -->

    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="6">
        <b-card-text class="row justify-content-center align-items-center flex-column">
          <Post :post="post" />
        </b-card-text>
      </b-col>
    </b-row>

    <!-- <b-card-text v-if="post">
      {{ post }}
    </b-card-text> -->

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
  data () {
    return {
      post: null
    }
  },
  mounted () {
    this.displayPost()
  },
  methods : {    
    displayPost () {
      axios
      .get(`http://localhost:3000/api/posts/${this.$route.params.postId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("postId", this.$route.params.postId),
        console.log("selected post", response.data);
        this.post = response.data;
        console.log("post", this.post.content);
      })
      .catch(error => {
        console.log(error);
      })
    }    
  }

}
</script>