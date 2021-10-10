<template>
  <div>
    <div class="d-flex align-items-center position-relative">
      
      <div class="comment-box">
        <p class="mb-0 font-weight-bold">
            {{ comment.User.firstName }} {{ comment.User.lastName }}
        </p>
        
        <input
          ref="inputContent"
          v-model="comment.content"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="updateComment"
          type="text"
          class="input-content border-0 my-2"
          aria-label="Modifier le commentaire"
        />
        
      </div>
      <div class="position-relative">
        <DeleteComment :post="post" :comment="comment" />        
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios"
import DeleteComment from './DeleteComment'

export default {
  name: 'Comment',
  components: {
    DeleteComment
  },
  props: ['comment', 'post'],
  computed: {
    ...mapState(["userInfos"])
  },
  data () {
    return {
    }
  },
  methods: {
   
    updateComment () {
      axios
          .put(`http://localhost:3000/api/posts/${this.post.id}/comments/${this.comment.id}`,          
            {
            content: this.content,
            // userId: this.$store.state.userInfos.id
            },
            {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            if (response) {
              console.log(response);
              // window.location.reload();
            }
          })
          .catch(error => (this.msgError = error));
    }
  }
}
</script>

<style lang="scss">
.comment-button {
  position: static !important;
  margin-left: 10px;
}
.comment-btn-collapsed {
  left: 14px;
  top: 40px;
  width: 200px;
}
.input-content:focus {
  border-radius: 0.25rem;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.comment-date {
  margin-left: 58px;
  font-size: 0.8rem;
}
@media screen and (min-width: 280px) and (max-width: 767px) {
  .comment-date {
    font-size: 0.6rem;
  }
  .comment-button {
    margin-bottom: 0;
    margin-left: 3px;
  }
  .comment-btn-collapsed {
    left: 6px;
    top: 23px;
    width: 135px;
  }
}
</style>