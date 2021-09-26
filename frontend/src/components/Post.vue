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

      <!-- <b-card-text v-if="post.id">
          <span>Post id: {{ post.id }}</span>
      </b-card-text> -->

      <b-card-text class="text-left mt-3 mb-0 mb-lg-3" v-if="post.content">
          <span>Post content: {{ post.content }}</span>
      </b-card-text>

      <div
        class="post d-flex align-items-center justify-content-center my-1 mb-lg-4"
        v-if="post.imageUrl"
      >
        <img
          v-b-modal="`modal-photo-${post.id}`"
          class="post__image"
          :src="post.imageUrl"
          alt=""
        />
        <b-modal
          :id="`modal-photo-${post.id}`"
          size="xl"
          class="modal-photo"
          header-class="header-style"
        >
          <div slot="modal-title"></div>
          <div class="d-flex align-items-center justify-content-center">
            <img class="modal-photo__img" :src="post.imageUrl" alt="" />
          </div>
          <div slot="modal-footer"></div>
        </b-modal>
      </div>

      <!-- <b-card-text v-if="post.imageUrl">
          <span>Post imageUrl: {{ post.imageUrl }}</span>
      </b-card-text> -->

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