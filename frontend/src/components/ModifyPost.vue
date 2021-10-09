<template>
  <div>
    <!-- <b-card-text v-if="post.id">
          <span>Post id: {{ post.id }}</span>
    </b-card-text> -->
    
    <button v-b-toggle.collapse-1
      v-if="(post.userId == userInfos.userId) || (userInfos.admin == 1) || (userInfos.admin == 2)"
      class="modify-button"
    >   
       <i class="fas fa-trash-alt fa-2x"></i>     
    </button>

    <b-collapse 
      id="collapse-1"
      v-if="(post.userId == userInfos.userId) || (userInfos.admin == 1) || (userInfos.admin == 2)"
    >
      <b-card> 
        
        <b-modal
        :id="`modal-${post.id}`"
        title="Modifier le post"
        ok-title="Enregistrer le post"        
        @ok="updatePost"
        ok-only
        
         >
            <b-form>
              <PostForm
                @onFileSelected="onFileSelected"                        
                v-model="content"     
              />
            </b-form>
        
        </b-modal>

        <p>
          
          <b-button
            v-b-modal="`modal-${post.id}`"          
          >
            <span>Modifier le post</span>
          </b-button>
         
        </p>
        <p class="card-text">

          <b-button
            @click="deletePost"
          >   
            <span>Supprimer le post</span>
          </b-button>

        </p>

      </b-card>

    </b-collapse>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"
import PostForm from './PostForm'

export default {
  name: 'ModifyPost',
  components: {
    PostForm    
  },
  props: [
    'post'
  ],
  data () {
    return {
        content: this.post.content,
        selectedFile: null
    }
  },  
  computed: {
    ...mapState(["userInfos"])
  },
  methods: {

    deletePost () {

      axios
        .delete(`http://localhost:3000/api/posts/${this.post.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          window.location.reload();
        })
        .catch(error => console.log(error));
   
    },
    onFileSelected (file) {
      this.selectedFile = file
    },
    updatePost () {
      
      console.log("Test Post", this.content);
      console.log("Test selectedFile", this.selectedFile);

      let formData = new FormData();
        formData.append("content", this.content);
        formData.append("image", this.selectedFile);
        console.log("test image", formData.get("image"));
        console.log("test content", formData.get("content"));
        // console.log("formData", formData);

      axios
        .put(`http://localhost:3000/api/posts/${this.post.id}`, formData,
        // {            
        //     content: this.content,
        //     // imageUrl: this.post.imageUrl,
        // },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(() => {
          window.location.reload();
        })       
        .catch(error => console.log(error));
   
    },  
       
    // deletePostTrigger () {
    //   this.$emit('deletePostTrigger')
    // }    
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