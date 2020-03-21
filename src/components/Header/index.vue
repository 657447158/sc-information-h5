<template>
  <div class="header" :class="!isHide && 'active'">
    <div class="main-conten">
      <router-link to="index">
        <img src="@/assets/images/logo@3x.png" class="logo" />
      </router-link>
      <div class="header-right" @click="toggleMenu">
        <!-- <span class="icon-mobile">&#xe673;</span> -->
        <span class="menu">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </div>
    <div class="submenu" :class="{ 'hide': isHide }">
      <div class="menu-item">
        <h5 @click="goTo('index')">{{$t('app.home')}}</h5>
        <p @click="goTo('list?code=yxhgj')">{{$t('app.CarefreeGoodTimes')}}</p>
        <p @click="goTo('list?code=wymsh')">{{$t('app.slowLift')}}</p>
        <p @click="goTo('list?code=chcbt')">{{$t('app.versionMap')}}</p>
      </div>
      <div class="menu-item">
        <h5 @click="goTo('destination?code=mdd')">{{$t('app.destination')}}</h5>
      </div>
      <div class="menu-item">
        <h5 @click="goTo('recommend?code=recommend')">{{$t('app.themeRavel')}}</h5>
        <p @click="goTo('list?code=djrm')">{{$t('app.hotSeason')}}</p>
        <p @click="goTo('list?code=xm')">{{$t('app.panda')}}</p>
        <p @click="goTo('list?code=ys')">{{$t('app.foodExploration')}}</p>
        <p @click="goTo('list?code=yswh')">{{$t('app.artCulture')}}</p>
        <p @click="goTo('list?code=mswh')">{{$t('app.folkCulture')}}</p>
        <p @click="goTo('list?code=bwg')">{{$t('app.museum')}}</p>
      </div>
      <div class="menu-item">
        <h5 @click="goTo('serviceInfo?code=info')">{{$t('app.practicalInformation')}}</h5>
        <p @click="goTo('channel-detail?code=qz')">{{$t('app.touristVISA')}}</p>
        <p @click="goTo('channel-detail?code=jt')">{{$t('app.cityTraffic')}}</p>
        <p @click="goTo('channel-detail?code=zs')">{{$t('app.hotelAccomodation')}}</p>
        <p @click="goTo('channel-detail?code=lxs')">{{$t('app.travelAgencyInquiry')}}</p>
        <p @click="goTo('channel-detail?code=fw')">{{$t('app.caringService')}}</p>
        <p @click="goTo('channel-detail?code=jkhrsaq')">{{$t('app.healthAndLifeSafety')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHide: true
    };
  },
  methods: {
    toggleMenu() {
      this.isHide = !this.isHide;
    },
    goTo (url) {
      this.toggleMenu()
      this.$router.push(url)
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  // z-index: 99;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  // box-shadow: 4px 4px 14px 7px rgba(0, 0, 0, 0.1);
  &.active {
    z-index: 10000;
  }
  .main-conten {
    height: 100%;
    padding: 0 20px;
    display: flex;
    z-index: 10001;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    box-shadow: 4px 4px 14px 7px rgba(0, 0, 0, 0.1);
    .logo {
      width: 128px;
      height: 60px;
    }
    .header-right {
      display: flex;
      align-items: center;
      .icon-mobile {
        font-size: 36px;
        color: #666666;
      }
      .menu {
        height: 40px;
        width: 56px;
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        i {
          display: inline-block;
          height: 4px;
          width: 100%;
          background: #000000;
        }
      }
    }
  }
  .submenu {
    width: 100%;
    height:1214px;
    box-sizing: border-box;
    padding: 0 40px;
    position: absolute;
    left: 0;
    top: 120px;
    padding-bottom: 80px;
    // height: 100px;
    background: #ffffff;
    z-index: 1;
    // height: 374px;
    transition: height 0.3s;
    overflow: scroll;
    // opacity: 1;
    &.hide {
      height: 0;
      overflow: hidden;
      padding-bottom: 0;
      // opacity: 0;
    }
    .menu-item {
      h5 {
        margin-top: 60px;
        font-size: 32px;
        color: #333333;
      }
      p {
        margin-top: 40px;
        font-size: 28px;
        color: #666666;
        font-weight: normal;
      }
    }
  }
}
</style>