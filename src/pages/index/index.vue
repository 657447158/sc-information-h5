<template>
  <div class="index">
    <!-- tab切换 -->
    <div class="index-tab">
      <router-link class="index-tab-item" :class="{active: tabIndex === 0}" to="/index/borrow">借入</router-link>
      <router-link class="index-tab-item" :class="{active: tabIndex === 1}" to="/index/lend">借出</router-link>
    </div>
    <!-- 路由插槽 -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tabIndex: 0
      }
    },
    watch: {
      $route: {
        handler (from) {
          const path = from.fullPath
          if (path === '/index/lend') {
            this.tabIndex = 1
          } else {
            this.tabIndex = 0
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .index {
    &-tab {
      padding: 36px 32px 76px;
      display: flex;
      align-items: flex-end;
      height: 160px;
      font-size: $f30;
      color: $fc07;
      font-weight: bold;
      &-item {
        position: relative;
        margin-right: 55px;
        &.active {
          font-size: 48px;
          color: #5E5E5E;
          &::after {
            content: '';
            position: absolute;
            bottom: -28px;
            left: 50%;
            display: block;
            width: 50px;
            height: 8px;
            transform: translateX(-50%);
            background:#5E5E5E;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>