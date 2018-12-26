// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import md5 from 'js-md5'

// style
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/style.styl'

// iconfont
import './assets/iconfont/iconfont.css'

// echarts
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/markLine'

import * as utils from './assets/js/utils'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$md5 = md5
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
