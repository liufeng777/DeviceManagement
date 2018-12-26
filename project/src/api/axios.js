import axios from 'axios'
import Vue from 'vue'
import store from '@/store'

import { Loading } from 'element-ui'

import { BASE_URL, BASE_PORT } from '@/assets/js/utils'

const baseUrl = BASE_URL + ':' + BASE_PORT

axios.defaults.timeout = 1000 * 60 * 2
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// export default axisoInstance
export default async (urlVal = '', data = {}, loading = true) => {
  const url = baseUrl + urlVal
  let loadingInstance

  try {
    if (loading) {
      loadingInstance = Loading.service({
        fullscreen: false,
        text: '加载中...'
      })
    }
    const token = sessionStorage.getItem('token')
    if (token) {
      data.token = token
    }
    const res = await axios.post(url, data)

    if (res) {
      if (loadingInstance) {
        loadingInstance.close()
      }
      if (+res.result === -1) {
        store.dispatch('showDialog', '当前登录已失效，请重新登录')
        return
      }
      if (res.result !== 0) {
        Vue.prototype.$notify({
          type: 'error',
          title: '错误',
          message: res.msg
        })
        return false
      }
      return res
    }
  } catch (error) {
    if (loadingInstance) {
      loadingInstance.close()
    }
    Vue.prototype.$notify({
      type: 'error',
      title: '错误',
      message: '连接服务器错误'
    })
    throw new Error(error)
  }
}
