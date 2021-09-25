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

      <ModifyPost :post="post" />

      <b-card-text v-if="post.id">
          <span>Post id: {{ post.id }}</span>
      </b-card-text>

      <b-card-text v-if="post.content">
          <span>Post content: {{ post.content }}</span>
      </b-card-text>

      <b-card-text v-if="post.imageUrl">
          <span>Post imageUrl: {{ post.imageUrl }}</span>
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
import ModifyPost from './ModifyPost'

export default {
  name: 'Post',
  components: {
    ModifyPost
  },
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