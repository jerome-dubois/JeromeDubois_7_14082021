import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    status: '',
    token: '',
    userInfos: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      admin:'',
      userId:'',
      id:''
    },
  },
  mutations: {
    SET_STATUS: function (state, status) {
      state.status = status;
    },    
    USER_INFOS: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    TOKEN_IN_STORE: function (state, token) {
      state.token = token;
      console.log("token in store", state.token);
    },
    LOGOUT: function (state) {
      state.token = '';
      localStorage.removeItem('token')
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/api/auth/login", userInfos)
          .then(response => {
            console.log(response.data);
            commit('USER_INFOS', response.data);
            // console.log("userInfos in store",this.$store.state.userInfos);
            localStorage.setItem('token',response.data.token);
            commit('TOKEN_IN_STORE',response.data.token);
          })                  
          .then(function (response) {            
            commit('SET_STATUS', '');
            resolve(response);
          })          
          .catch(function (error) {
            commit('SET_STATUS', 'error_login');
            reject(error);
          });
      });
    },
    register: ({commit}, userInfos) => {
      commit('SET_STATUS', 'loading');
      return new Promise((resolve, reject) => { 
        
        console.log("userInfos", userInfos);
        axios
          .post("http://localhost:3000/api/auth/register", userInfos)          
          .then(response => {
            console.log(response.data);            
          })
          .then(function (response) {
            commit('SET_STATUS', 'created');
            resolve(response);
          })
          .catch(function (error) {
            commit('SET_STATUS', 'error_create');
            reject(error);
          });

      });      
    },

    getUserInfos: ({commit}) => {
      // commit;
      axios
      .get("http://localhost:3000/api/loggedUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(function (response) {
        console.log("logged user response", response.data);
        commit('USER_INFOS', response.data);
      })
      .catch(error => console.log(error))

    }

  },
  plugins: [createPersistedState()]

})