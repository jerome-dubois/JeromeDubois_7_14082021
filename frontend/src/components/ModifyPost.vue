<template>
  <div>
    <!-- <b-card-text v-if="post.id">
          <span>Post id: {{ post.id }}</span>
    </b-card-text> -->
    
    <button v-b-toggle.collapse-1>   
       ...     
    </button>

    <b-collapse id="collapse-1">
        
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
  props: ['post'],
  data () {
    return {
        content: this.post.content
        // userData: JSON.parse(localStorage.getItem('userData')),
        // selectedFile: null
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
    selectFile (file) {
      this.selectedFile = file
    },

    updatePost () {

      axios
        .put(`http://localhost:3000/api/posts/${this.post.id}`, 
        {            
            content: this.content,
            // imageUrl: this.post.imageUrl,
        },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })        
        .catch(error => console.log(error));
   
    },  
       
    // deletePostTrigger () {
    //   this.$emit('deletePostTrigger')
    // }    
  }
}
</script>