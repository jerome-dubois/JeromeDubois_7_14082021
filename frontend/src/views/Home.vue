<template>
  <div class="home">
    <Header />
    <h1>This is the home page with the posts from all users</h1>
    <AddPost />
    <Posts />

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import AddPost from '@/components/AddPost.vue'
import Posts from '@/components/Posts.vue'

export default {
  name: 'Home',
  components: {
    Header,
    AddPost,
    Posts
  }
}
</script>
