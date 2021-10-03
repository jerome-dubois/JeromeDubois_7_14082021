<template>
  <div class="mt-5 home">

    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="8">
        <b-card-text class="row justify-content-center align-items-center flex-column">
          <h1>
            Voici les posts de {{ userInfos.firstName }} {{ userInfos.lastName }}
          </h1>
        </b-card-text>
      </b-col>
    </b-row>

    <b-row class="row justify-content-center align-items-center flex-column">
      <b-col cols="12" lg="8">
        <b-card-text class="row justify-content-center align-items-center flex-column mx-auto">
          <Post v-for="post in userPosts" v-bind:key="post.id" :post="post" />
        </b-card-text>
      </b-col>
    </b-row>
    
    <!-- <b-card-text v-if="user.admin==true">     -->        

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import Post from '@/components/Post.vue'
import { mapState } from "vuex"

export default {
  name: 'SelectedUserAccount',
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
      userInfos: [],      
      userPosts: [],      
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
        this.userPosts = response.data;
        console.log("selected user posts", this.userPosts);       
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/api/users/${this.$route.params.userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.userInfos = response.data;
        console.log("selected user infos", this.userInfos);        
      })
      .catch(error => {
        console.log(error);
      });

  },
}
</script>