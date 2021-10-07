<template>
  <div class="selected-post">

    <div>

      <b-card>      
                  
        <b-card-text>
          <div v-if="!loadingData">Posté par <em class="text-secondary">{{post.User.firstName}} {{post.User.lastName}}</em> le <em class="text-secondary">{{post.createdAt.split('T')[0]}}</em> à <em class="text-secondary">{{post.createdAt.split('T')[1]}}</em></div>
        </b-card-text>

        <b-card-text class="text-left mt-3 mb-0 mb-lg-3" v-if="post.content">
            <span>Description: {{ post.content }}</span>
        </b-card-text>          

        <div
          class="post d-flex align-items-center justify-content-center my-1 mb-lg-4"
          v-if="post.imageUrl"
        >
          <img
            v-b-modal="`modal-photo-${post.id}`"
            class="post__image"
            :src="post.imageUrl"
            alt=""
          />
          <b-modal
            :id="`modal-photo-${post.id}`"
            size="xl"
            class="modal-photo"
            header-class="header-style"
          >
            <div slot="modal-title"></div>
            <div class="d-flex align-items-center justify-content-center">
              <img class="modal-photo__img" :src="post.imageUrl" alt="" />
            </div>
            <div slot="modal-footer"></div>
          </b-modal>
        </div>

      </b-card> 
    
    </div>
    
  </div>

</template>

<script>
// @ is an alias to /src

import axios from "axios";
// import Post from '@/components/Post.vue';

export default {
  name: 'SelectedPost',
  components: {
    // Post
  },
  data () {
    return {
      post: '',
      loadingData: true
    }
  },
  // props: ['post'],
  // mounted () {
  //   this.displayPost()
  // },
  created () {
    this.displayPost();
    // this.loadingData = false    
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
      .then( () => {

        this.loadingData = false
          
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

}
</script>

<style>
  .selected-post {
    margin-top: 100px!important;
  }
</style>
