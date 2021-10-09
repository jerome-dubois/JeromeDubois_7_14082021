<template>
  
  <div>
    <b-card>      
      
      <DeleteUser :user="user" />

      <div>      
                  
        <b-card-text>
            <div><em class="text-secondary">{{user.firstName}} {{user.lastName}}</em></div>
        </b-card-text>
       
      </div>

    </b-card> 
    
  </div>

</template>

<script>
import { mapState } from "vuex";
import DeleteUser from './DeleteUser'

export default {
  name: 'User',
  components: {
    DeleteUser
  },  
  props: ['user'],
  // computed: {
  //   ...mapState("user")
  // }
  computed: {
    ...mapState(["userInfos"])
  },
  methods: {
    // emitPost() {
    //   this.$emit("post", { post: this.post });
    // }
  }
}
</script>