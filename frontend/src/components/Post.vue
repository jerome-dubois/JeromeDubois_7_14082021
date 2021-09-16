<template>
  
  <div class="post">
    
    <h1>This is the selected Post component</h1>

    <b-card>
      
      <!-- <div> -->
        <!-- <router-link
          :to="{ name: 'SelectedUserAccount', params: { userId: post.User.id } }">
          <p>
            {{ post.User.firstName }} {{ post.User.lastName }}
          </p>
        </router-link>
      </div> -->

      <b-card-text v-if="post.content">
          {{ post.content }}
      </b-card-text>

      <div v-if="post.imageUrl">
        <img      
        :src="post.imageUrl"
        alt=""
        />
      </div>

    </b-card> 
    
  </div>

</template>

<script>
// import { mapState } from "vuex";

export default {
  name: 'Post',
  components: {},
  props: ['post']
  // computed: {
  //   ...mapState("user")
  // }
}
</script>