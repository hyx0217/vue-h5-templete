import { login } from '@/api/login'
import Vuex from 'vuex'
import { getToken, setToken } from '../utils/auth'

export default Vuex.createStore({
  state: {
    token: getToken(),
    user: '',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER(state,payload) {
      state.user = payload
    },
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          setToken(res.data.token)
          commit('SET_TOKEN', res.data.token);
          commit('SET_USER', res.data);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
  modules: {},
})
