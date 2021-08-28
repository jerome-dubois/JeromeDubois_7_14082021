<template>
  <div class="public-profile">
    <Header />
    <h1>This is the page with user posts</h1>

    <Posts />

  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Posts from '@/components/Posts.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Posts
  }
}
</script>