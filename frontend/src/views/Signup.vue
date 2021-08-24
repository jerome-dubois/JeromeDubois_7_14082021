<template>
  <div class="signup">
    <Header />
    <h1>This is the signup page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>