<template>
  <div>
    <button       
      @click="getAllComments"
      class="display-comments mb-2 pt-0 d-flex text-left"
      aria-label="Afficher tous les commentaires"
    >
      <span>Afficher tous les commentaires</span>

    </button>

    <div class="comment mb-2 text-left">

      <Comment
        v-for="comment in commentsList"
        v-bind:key="comment.id"
        :comment="comment"
        :post="post"
      />

    </div>

    <AddComment :post="post" />
    
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"
import AddComment from './AddComment'
import Comment from './Comment'

export default {
  name: 'Comments',
  components: {
    AddComment,
    Comment
  },
  props: ['post'],
  computed: {
    ...mapState(["userInfos"])
  },
  data () {
    return {
      commentsList: []
    }
  },
  methods: {        
    getAllComments () {
      axios
      .get(`http://localhost:3000/api/posts/${this.post.id}/comments`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {        
        this.commentsList = response.data;
        console.log("commentsList", this.commentsList);
      })
      .catch(error => {
        console.log(error);
      })      
      
    }
  }
}
</script>