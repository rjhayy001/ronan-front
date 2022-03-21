import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        user: {},
        forceReloadFlag: false,
        newRecord:false,
    }),
    mutations: {
        login(state, data) {
            state.user = data.user
        },
        toggleForceReload(state, hint=true) {
            state.forceReloadFlag = hint
        },
        UPDATE_NEW(state, value) {
            state.newRecord = value
        },
    },
    getters :{
        newDataIndex: (state) => state.newRecord,
        user: state => {
          return state.user
        },
        forceReloadFlag: state => {
          return state.forceReloadFlag
        }
    },
})