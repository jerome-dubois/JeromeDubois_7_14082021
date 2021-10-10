<template>
  
  <div class="post">

    <b-card>      
      
      <ModifyPost :post="post" />

      <!-- <b-card-text v-if="post.id"> -->

      <div>
        <router-link
          :to="{ name: 'SelectedUserAccount', params: { userId: post.userId } }">        
          <b-card-text>
            <!-- <span>UserId: {{ post.userId }}</span> -->
            <div>Posté par <em class="text-secondary">{{post.User.firstName}} {{post.User.lastName}}</em> le <em class="text-secondary">{{post.createdAt.split('T')[0]}}</em> à <em class="text-secondary">{{post.createdAt.split('T')[1]}}</em></div>
          </b-card-text>

        </router-link>
      </div>      

      <!-- <router-link
          :to="{ name: 'SelectedPost', params: { postId: post.id } }"
      >          
          <b-card-text class="text-left mt-3 mb-0 mb-lg-3">
              <span>Post id: {{ post.id }}</span>
          </b-card-text>

      </router-link> -->

       <router-link
          :to="{ name: 'SelectedPost', params: { postId: post.id } }"
      >          
          <b-card-text class="text-left mt-3 mb-0 mb-lg-3" v-if="post.content">
            <span>Description: {{ post.content }}</span>
          </b-card-text>  

      </router-link>       

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

      <Comments :post="post" />

    </b-card>
    
  </div>

</template>

<script>
import { mapState } from "vuex"
import ModifyPost from './ModifyPost'
import Comments from './Comments'

export default {
  name: 'Post',
  components: {
    ModifyPost,
    Comments
  },  
  props: ['post'],
  computed: {
    ...mapState(["userInfos"])
  },
  // methods: {
    // emitPost() {
    //   this.$emit("post", { post: this.post });
    // }
  // }
}
</script>