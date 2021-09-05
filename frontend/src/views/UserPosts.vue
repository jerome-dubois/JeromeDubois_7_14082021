<template>
  <div class="public-profile">
    <h1>This is the page with user posts</h1>

    <Posts />

  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue'

export default {
  name: 'Home',
  components: {
    Posts
  }
}
</script>