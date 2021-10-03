<template>  
  
  <div id="app">
    
    <Header />
    <!-- <div>       -->
      <!-- <Header /> -->
      <!-- <router-link to="/">
        <img
          id="logo"
          :src="require('./assets/icon-left-font.png')"
          alt="logo Groupomania"
        />
      </router-link> -->
    <!-- </div> -->
    <router-view/>
    
  </div>
  
</template>

<script>
    import Header from './components/Header'

    export default {
    name: 'App',
    components: {
      Header      
    }
  }

</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

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

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
}
body {
  background-image: linear-gradient(180deg, #fd2d01 0%, #e08e22 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  width: 540px;
  background:white;
  border-radius: 16px;
  padding:32px;
}
.card__title {
  text-align:center;
  font-weight: 800;
  color:#fd2d01;
}
.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
  .button {
    background: #fd2d01;
    color:#ffffff;
    border-radius: 8px;
    // font-weight: 800;
    font-weight: bold!important;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }

  .btn-disconnect {
    color: #fff!important;
    background-color: #fd2d01!important;
    // border-color: #fd2d01;
  }

  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: #fd0101;
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }

  .row > * {
    flex-shrink: 1 !important;
  } 

</style>
