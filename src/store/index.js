import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        user: {}
    }),
    mutations: {
        login(state, data) {
            state.user = data.user
        },
    },
    getters :{
        user: state => {
          return state.user
        }
      },
})