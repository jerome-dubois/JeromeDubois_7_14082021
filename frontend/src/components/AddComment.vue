<template>
  <div>
    <div class="d-flex align-items-center mt-3">      
      <b-form class="w-100" @submit="addComment">
        <b-form-group>
          
          <b-form-textarea
            v-model="content"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="addComment"                 
            class="comment-area border-0"
            placeholder="Écrivez votre commentaire ici..."
            aria-label="Écrire un commentaire"
          >
          </b-form-textarea
        ></b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from 'vuex'
export default {
  name: 'AddComment',
  components: {
  },
  props: ['post'],
  data () {
    return {
      content: '',
      // userData: JSON.parse(localStorage.getItem('userData'))
    }
  },
  computed: {
    ...mapState(["userInfos"])
  },
  methods: {
    addComment () {
      axios
          .post(`http://localhost:3000/api/posts/${this.post.id}/comments`,          
            {
            content: this.content,
            userId: this.$store.state.userInfos.userId
            },
            {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            if (response) {
              console.log(response);
              window.location.reload();
            }
          })
          .catch(error => (this.msgError = error));
    }
    
  }
}
</script>

<style lang="scss">
.comment-area {
  background-color: rgba(108, 117, 125, 0.1);
}
.div-comment-picture {
  width: 45px;
  height: 45px;
  margin-bottom: 0.5rem;
}
.comment-profile-picture {
  height: 45px;
}
@media screen and (min-width: 280px) and (max-width: 769px) {
  .div-comment-picture {
    width: 38px;
    height: 38px;
  }
  .comment-profile-picture {
    height: 38px;
  }
}
</style>