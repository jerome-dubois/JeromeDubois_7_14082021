<template>
  <div>
        
    <button v-b-toggle.collapse-1
      v-if="(userInfos.admin == 1)"
      class="modify-button"
      :id="`${userInfos.userId}`"
    >   
       <i class="fas fa-trash-alt fa-2x"></i>     
    </button>

    <b-collapse 
      id="collapse-1"
      v-if="(userInfos.admin == 1)"
    >
      <b-card> 
        
        <!-- <p>
          
          <b-button>
            <span>Modifier l'utilisateur</span>
          </b-button>
         
        </p> -->
        <p class="card-text">

          <b-button
            @click="deleteUser"
          >   
            <span>Supprimer l'utilisateur</span>
          </b-button>

        </p>

      </b-card>

    </b-collapse>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from "vuex"

export default {
  name: 'DeleteUser',
  components: { 
  },
  props: [
    'user'
  ],
  data () {
    return {
        // content: this.post.content
    }
  },  
  computed: {
    ...mapState(["userInfos"])
  },
  methods: {

    deleteUser () {

      axios
        .delete(`http://localhost:3000/api/users/${this.user.id}`, {
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