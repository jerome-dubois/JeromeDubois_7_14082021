<template>
  <div id="app">
    
    <div>
      <router-link to="/">
        <img
          id="logo"
          :src="require('./assets/icon-left-font.png')"
          alt="logo Groupomania"
        />
      </router-link>
    </div>
    <router-view/>
    
  </div>
</template>

<script>
    
    export default {
    name: 'App',
    components: {
      
    }
  }

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
