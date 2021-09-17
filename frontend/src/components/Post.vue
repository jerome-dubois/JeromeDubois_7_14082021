<template>
  
  <div class="post">
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

      <b-card-text v-if="post.imageUrl">
          {{ post.imageUrl }}
      </b-card-text>

      <!-- <div v-if="post.imageUrl">
        <img      
        :src="post.imageUrl"
        alt=""
        />
      </div> -->

    </b-card> 
    
  </div>

</template>

<script>
// import { mapState } from "vuex";

export default {
  name: 'Post',
  components: {},
  // props: {
  //   post: {
  //     type: Object,
  //     required: true
  //   }
  // },
  props: ['post'],
  // computed: {
  //   ...mapState("user")
  // }
  methods: {
    // emitPost() {
    //   this.$emit("post", { post: this.post });
    // }
  }
}
</script>