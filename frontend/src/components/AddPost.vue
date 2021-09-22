<template>

  <div>           
    
    <h3>Créer un post</h3>

    <b-form @submit="addPost">            

      <b-form-group>            

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
      </b-form-group>

    </b-form>      

  </div>

</template>

<script>

import axios from "axios";
import { mapState } from 'vuex';

export default {

    name: 'Add',
    components: {
    },
    data () {
        return {
          Post: {
            userId: '',
            content: '',
            imageUrl: ''                
          },
          msgError: ""
        };
    },
    computed: {
    ...mapState(["userInfos"])
    },  
    methods: {
      
      addPost() {

        console.log("Test Post", this.Post);
        
        axios
          .post("http://localhost:3000/api/posts",
          {
            Post: this.Post
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