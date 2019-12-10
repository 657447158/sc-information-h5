<template>
  <div>
    <swiper :options="tabOptions">
      <swiper-slide v-for="(item, index) in tabList" :key="index">
        <p
          :class="tabIndex === index && 'active'"
          @click="chooseTab(item)"
        >{{item.name}}</p>
      </swiper-slide>
    </swiper>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tabOptions: {
          slidesPerView: 'auto'
        },
        tabIndex: 0,
        tabList: [
          {
            name: '当前借出单',
            path: '/my-lend/current'
          },
          {
            name: '历史借出单',
            path: '/my-lend/history'
          },
          {
            name: '我发布的借出单',
            path: '/my-lend/public'
          }
        ]
      }
    },
    methods: {
      chooseTab (item) {
        this.$router.push(item.path)
      }
    },
    watch: {
      $route: {
        handler (from) {
          const path = from.fullPath
          if (path === '/my-lend/current') {
            this.tabIndex = 0
          } else if (path === '/my-lend/history') {
            this.tabIndex = 1
          } else if (path === '/my-lend/public') {
            this.tabIndex = 2
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .swiper-container {
    position: sticky;
    top: 0;
    z-index: 99;
    padding: 0 20px;
    width: 100vw;
    height: 100px;
    background: $bg01;
    /deep/ .swiper-wrapper {
      height: 100px;
    }
    .swiper-slide {
      margin-right: 50px;
      width: auto;
      font-size: 28px;
      color: $fc03;
      &:last-child {
        margin-right: 0;
      }
      p {
        padding-bottom: 28px;
        display: flex;
        align-items: flex-end;
        height: 100%;
      }
      .active {
        position: relative;
        font-size: 30px;
        color: #4491F3;
        font-weight: bold;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          display: block;
          width: 50px;
          height: 6px;
          transform: translateX(-50%);
          background: #4491F3;
        }
      }
    }
  }
  /deep/ .borrow {
    &-list {
      margin-top: 20px;
      padding: 0 28px;
      background: $bg01;
      &-item {
        padding: 38px 0 42px;
        font-size: $f18;
        border-bottom: 1px solid rgba(167, 167, 167, .2);
        &:last-child {
          border-bottom: none;
        }
      }
      .top {
        display: flex;
        align-items: center;
        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4491F3;
        }
        .box1 {
          padding: 0 8px;
          height: 36px;
          color: $fc10;
          background: #4491F3;
          border-radius: 5px 0 0 5px;
        }
        .box2 {
          margin-right: 10px;
          padding: 0 14px;
          height: 36px;
          border: 1px solid #4491F3;
          border-radius: 0 5px 5px 0;
        }
        .box3 {
          padding: 0 8px;
          height: 36px;
          border: 1px solid #4491F3;
          border-radius: 5px;
        }
        .icon-wx {
          margin-left: 16px;
          width: 30px;
          height: 31px;
          background: url('../../assets/images/wx.png') no-repeat center / 100% 100%;
        }
        .icon-alipay {
          margin-left: 8px;
          width: 32px;
          height: 32px;
          background: url('../../assets/images/alipay.png') no-repeat center / 100% 100%;
        }
        .icon-card {
          margin-left: 8px;
          width: 42px;
          height: 32px;
          background: url('../../assets/images/card.png') no-repeat center / 100% 100%;
        }
        .btn {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4491F3;
          width: 85px;
          height: 40px;
          font-size: 24px;
          border-radius: 20px;
          border: 1px solid;
        }
      }
      .time {
        margin: 16px 0 30px;
        font-size: 18px;
        color: $fc03;
      }
      .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-item {
          display: flex;
          flex-direction: column;
          color: $fc02;
          font-size: 24px;
          font-weight: bold;
        }
        .p1 {
          margin-bottom: 20px;
          text-align: right;
        }
        .p2 {
          color: #4491F3;
          span {
            font-size: 36px;
          }
        }
        .p3 {
          font-size: 36px;
        }
      }
      .bottom {
        margin-top: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-item {
          display: flex;
          flex-direction: column;
          font-size: 24px;
          color: $fc02;
        }
        .p1 {
          margin-bottom: 16px;
          color: $fc05;
        }
      }
    }
  }
</style>