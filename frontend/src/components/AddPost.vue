<template>

  <div class="my-5 mt-5">           
    
    <h3>Créer un post</h3>

    <b-form @submit="addPost">            

      <PostForm
        @onFileSelected="onFileSelected"
        v-model="Post.content"
        :isCreating="true"
      />

      <!-- <b-form-group>            

        <b-form-input
          id="input-post"
          v-model ="Post.content"
          type="text"
          placeholder="Rédigez votre publication ici"
        >
        </b-form-input>

      </b-form-group>

      <b-form-group>
          <button                       
            type="submit"            
          >
          <span>Publier le post</span>
          </button>
      </b-form-group> -->

    </b-form>      

  </div>

</template>

<script>

import axios from "axios";
import { mapState } from 'vuex';
import PostForm from './PostForm';

export default {

    name: 'Add',
    components: {
      PostForm
    },
    data () {
        return {
          Post: {
            userId: '',
            content: '',
            imageUrl: ''                
          },
          selectedFile: null,
          msgError: ""
        };
    },
    computed: {
    ...mapState(["userInfos"])
    },  
    methods: {
      
      onFileSelected (file) {
      this.selectedFile = file
      },

      addPost() {

        // console.log("Test Post", this.Post);
        // console.log("Test selectedFile", this.selectedFile);
        let formData = new FormData();
        // formData.append('file', this.file);
        formData.append("content", this.Post.content);
        formData.append("image", this.selectedFile);
        console.log("test image", formData.get("image"));
        console.log("test content", formData.get("content"));
        console.log("formData", formData);

        axios
          .post("http://localhost:3000/api/posts", formData,
          // {
          //   Post: this.Post
          // },
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