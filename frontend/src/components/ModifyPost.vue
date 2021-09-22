<template>
  <div>
    <ModifyPostButton
      :postModalId="post.id"
    >
      <b-modal
        :id="`modal-${post.id}`"
        title="Modifier le post"
        ok-title="Enregistrer le post"
        ok-variant="light"
        @ok="updatePost"
        ok-only
      >
        <b-form>
          <PostForm
            :url="post.imageUrl"            
            v-model="post.content"     
          />
        </b-form>
      </b-modal>
    </ModifyPostButton>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"
import PostForm from './PostForm'
import ModifyPostButton from './ModifyPostButton'

export default {
  name: 'ModifyPost',
  components: {
    ModifyPostButton,
    PostForm    
  },
  props: ['post'],
  data () {
    return {   
        //   postTextContent: this.post.content,
        //   selectedFile: null
    }
  },
  computed: {
    ...mapState(["userInfos"])
  },
  methods: { 

    // deletePost () {

    //   axios
    //     .delete(`http://localhost:3000/api/post/${this.post.id}`, {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token")
    //       }
    //     })
    //     .then(() => {
    //       window.location.reload();
    //     })
    //     .catch(error => console.log(error));
   
    // },
    // selectFile (file) {
    //   this.selectedFile = file
    // },

    updatePost () {

      axios
        .put(`http://localhost:3000/api/post/${this.post.id}`, 
        {            
            content: this.post.content,
            imageUrl: this.post.imageUrl,
        },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })        
        .catch(error => console.log(error));
   
    },
  }
}
</script>