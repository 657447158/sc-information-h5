import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Ajax from './service'
import Toast from './components/toast'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueI18n from 'vue-i18n'
import './components'
import 'swiper/dist/css/swiper.css'
import './assets/styles/layout.scss'

import msg from '@/languages'

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.Ajax = Ajax
Vue.use(Toast)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: process.env.NODE_ENV,
  messages: msg
})

router.beforeEach((to, from, next) => {
  let nodeList = document.querySelectorAll('.mask')
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].click()
  }
  if (to.path === '/index/borrow' && to.query.param) {
    axios({
      method: 'post',
      url: '/loanApi/api/otc/immediately/getWebToken',
      params: {
        param: to.query.param,
      }
    }).then(res => {
      if (res.data.success == true)
      {
        localStorage.setItem("loantoken", res.data.data)
        axios.defaults.headers.token = localStorage.getItem('loantoken');
        next()
      }
    }).catch(err =>{
      console.log('fail' + err)
    })
  } else {
    next()
  }
})

new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
