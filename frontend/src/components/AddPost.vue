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

export default {

    name: 'Add',
    components: {
    },
    data () {
        return {
          Post: {
            userId: 5,
            content: '',
            imageUrl: 'testimage'                
          },
          msgError: ""
        };
    },    
    methods: {
      
      addPost() {

        console.log("Test Post", this.Post);
        
        axios
          .post("http://localhost:3000/api/posts", this.Post)
          .then(response => {
            if (response) {
              window.location.reload();
            }
          })
          .catch(error => (this.msgError = error));
      }

    }

}

</script>