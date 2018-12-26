import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  activeIndex: '/home',
  dialogVisible: false,
  dialogMsg: ''
}
const mutations = {
  setActiveIndex: (state, index) => {
    state.activeIndex = index
  },
  showDialog: (state, msg) => {
    state.dialogVisible = true
    state.dialogMsg = msg
  },
  closeDialog: (state) => {
    state.dialogVisible = false
  }
}
const actions = {
  setActiveIndex: ({ commit }, index) => {
    commit('setActiveIndex', index)
  },
  showDialog: ({ commit }, msg) => {
    commit('showDialog', msg)
  },
  closeDialog: ({ commit }) => {
    commit('closeDialog')
  }
}
const getters = {
  activeIndex: state => state.activeIndex,
  dialogVisible: state => state.dialogVisible,
  dialogMsg: state => state.dialogMsg
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
