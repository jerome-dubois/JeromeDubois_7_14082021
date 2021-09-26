import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    // instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    status: '',
    user: user,
    userInfos: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userId:'',
      token:''
    },
  },
  mutations: {
    SET_STATUS: function (state, status) {
      state.status = status;
    },
    // logUser: function (state, user) {
    //   instance.defaults.headers.common['Authorization'] = user.token;
    //   localStorage.setItem('user', JSON.stringify(user));
    //   state.user = user;
    // },
    USER_INFOS: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    LOGOUT: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
    }
  },
  actions: {
    login: ({commit}, userInfos) => {
      // commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        // instance.post('/login', userInfos)
        axios
          .post("http://localhost:3000/api/auth/login", userInfos)
          .then(response => {
            localStorage.setItem('token',response.data.token)
            console.log(response.data)
            // location.replace(location.origin)
          })
          .then(function (response) {
          commit('USER_INFOS', response.data);
          })
          // .then(
          //   console.log(userInfos)
          // )
          .then(function (response) {
            commit('SET_STATUS', '');
            // commit('logUser', response.data);
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

      axios
      .get("http://localhost:3000/api/loggedUser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(function (response) {
        console.log("logged user response", response);
        commit('USER_INFOS', response.data);
      })
      .catch(error => console.log(error));

    }

  }

})