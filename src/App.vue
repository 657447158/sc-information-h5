<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  provide () {                                       
    return {
      reload: this.reload                                              
    }
  },
  data() {
    return{
      isRouterAlive: true
    }
  },
  created () {
    sessionStorage.setItem('loginStamp', '1')
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
          this.isRouterAlive = true
      }) 
    },
    // 用户初始化，记录登录时间
    initLoanUser () {
      this.Ajax.initLoanUser()
    }
  },
  watch: {
    $route (to) {
      if (to.path === '/index/borrow') {
        if (sessionStorage.getItem('loginStamp') === '1') {
          this.initLoanUser()
        }
      } else {
        sessionStorage.setItem('loginStamp', '0')
      }
    }
  }
}
</script>
