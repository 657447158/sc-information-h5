<template>
  <div class="header">
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
        <h5>{{$t('app.home')}}</h5>
        <p>{{$t('app.CarefreeGoodTimes')}}</p>
        <p>{{$t('app.slowLift')}}</p>
        <p>{{$t('app.versionMap')}}</p>
      </div>
      <div class="menu-item">
        <h5>{{$t('app.destination')}}</h5>
      </div>
      <div class="menu-item">
        <h5>{{$t('app.themeRavel')}}</h5>
        <p>{{$t('app.hotSeason')}}</p>
        <p>{{$t('app.panda')}}</p>
        <p>{{$t('app.foodExploration')}}</p>
        <p>{{$t('app.artCulture')}}</p>
        <p>{{$t('app.folkCulture')}}</p>
        <p>{{$t('app.museum')}}</p>
      </div>
      <div class="menu-item">
        <h5>{{$t('app.practicalInformation')}}</h5>
        <p>{{$t('app.touristVISA')}}</p>
        <p>{{$t('app.cityTraffic')}}</p>
        <p>{{$t('app.hotelAccomodation')}}</p>
        <p>{{$t('app.travelAgencyInquiry')}}</p>
        <p>{{$t('app.caringService')}}</p>
        <p>{{$t('app.healthAndLifeSafety')}}</p>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  .main-conten {
    height: 100%;
    padding: 0 20px;
    display: flex;
    z-index: 100;
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
    top: 100%;
    padding-bottom: 80px;
    // height: 100px;
    background: #ffffff;
    z-index: -1;
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