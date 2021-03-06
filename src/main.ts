import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './utils/http'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios=axios; //可以在任何组件使用axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
