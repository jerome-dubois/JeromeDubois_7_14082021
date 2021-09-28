import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// import $ from 'jquery'

// Installation de BootstrapVue - Source: https://bootstrap-vue.org/docs
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import des fichiers CSS Bootstrap et BootstrapVue (l'ordre est important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

// Rendre BootstrapVue disponible tout au long du projet
Vue.use(BootstrapVue)
// Installation du plugin de composants d'icône BootstrapVue
Vue.use(IconsPlugin)

new Vue({  
  store,
  router,
  render: h => h(App)
}).$mount('#app')
