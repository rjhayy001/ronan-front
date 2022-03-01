import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        user: {},
        forceReloadFlag: false
    }),
    mutations: {
        login(state, data) {
            state.user = data.user
        },
        toggleForceReload(state, hint=true) {
            state.forceReloadFlag = hint
        },
    },
    getters :{
        user: state => {
          return state.user
        },
        forceReloadFlag: state => {
          return state.forceReloadFlag
        }
    },
})