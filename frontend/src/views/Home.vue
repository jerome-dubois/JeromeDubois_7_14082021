<template>
  <div class="home">
    <h1>This is the home page with the posts from all users</h1>
    <AddPost />
    <AllPosts />

  </div>
</template>

<script>
// @ is an alias to /src
import AddPost from '@/components/AddPost.vue'
import AllPosts from '@/components/AllPosts.vue'

export default {
  name: 'Home',
  components: {
    AddPost,
    AllPosts
  }
}
</script>
