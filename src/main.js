import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}`
axios.defaults.headers.common['x-api-key'] = `${process.env.VUE_APP_API_KEY}`
Vue.use(VueAxios, axios)

const app = new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Object.defineProperties(Vue.prototype, {
  app: {
    get: function get () {
      return app
    }
  }
})
