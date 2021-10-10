<template>
  <div>
       
    <button
      v-if="(comment.userId == userInfos.id) || (userInfos.admin == 1) || (userInfos.admin == 2)"
      class="modify-button"
      @click="deleteComment"
    >   
       <i class="fas fa-trash-alt fa-2x"></i>     
    </button>

    
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"

export default {
  name: 'DeleteComment',
  components: {},
  props: ['comment', 'post'],
  data () {
    return {
        content: this.comment.content
    }
  },  
  computed: {
    ...mapState(["userInfos"])
  },
  methods: {

    deleteComment () {

      axios
        .delete(`http://localhost:3000/api/posts/${this.post.id}/comments/${this.comment.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          window.location.reload();
        })
        .catch(error => console.log(error));
   
    }
  }
}
</script>

<style lang="scss">
.modify-button {
  top: 20px;
  right: 15px;
  padding: 1px 15px 7px !important;
  background-color: transparent;
  border: 0;
  border-radius: 50rem;
  // font-size: 1.5rem;
  font-weight: 700;
  color: #747474;  
}
</style>