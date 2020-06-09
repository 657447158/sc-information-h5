<template>
  <div class="index-container">
    <Header />
    <!-- 顶部banner -->
    <div class="index-banner">
      <img v-if="detail.navImage" :src="detail.navImage" />
      <p>{{$t('index.pageTit')}}</p>
    </div>
    <div class="wrapper">
      <router-link class="item" to="/list?code=yxhgj">
        <img src="@/assets/images/index@3x.png" />
        <h3>{{$t('index.time.title')}}</h3>
      </router-link>
     <router-link class="item" to="/list?code=wymsh">
        <img src="@/assets/images/index1@3x.jpg" />
        <h3>{{$t('index.art.title')}}</h3>
      </router-link>
      <router-link class="item" to="/list?code=chcbt">
        <img src="@/assets/images/index2@3x.png" />
        <h3>{{$t('index.food.title')}}</h3>
      </router-link>
      <router-link class="item" to="/list?code=jxgsh">
        <img src="@/assets/images/index3@3x.png" />
        <h3>{{$t('index.story.title')}}</h3>
      </router-link>
      <div class="item item1">
        <router-link to="/video-list">
          <img src="@/assets/images/index-video.jpeg" />
          <span>{{$t('video')}}</span>
        </router-link>
        <router-link to="/pic-list">
          <img src="@/assets/images/index-pic.jpeg" />
          <span>{{$t('gallery')}}</span>
        </router-link>
      </div>
    </div>

    <div class="type">
      <div
        class="item"
        v-for="item in informationList"
        :key="item.id"
      >
        <router-link to="hotel-list" v-if="item.channelCode === 'zs'">
          <i class="icon-mobile" v-html="item.metaDescription"></i>
          <p>{{item.name}}</p>
        </router-link>
        <router-link :to="`travel-agency?code=${item.channelCode}`" v-else-if="item.channelCode === 'lxs'">
          <i class="icon-mobile" v-html="item.metaDescription"></i>
          <p>{{item.name}}</p>
        </router-link>
        <router-link :to="`list-sub?code=${item.channelCode}`" v-else-if="item.channelCode=== 'qz'">
          <i class="icon-mobile" v-html="item.metaDescription"></i>
          <p>{{item.name}}</p>
        </router-link>
        <router-link :to="`channel-detail?code=${item.channelCode}`" v-else>
          <i class="icon-mobile" v-html="item.metaDescription"></i>
          <p>{{item.name}}</p>
        </router-link>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      detail: {},
      informationList: []
    }
  },
  mounted () {
    this.getChannelDetail()
    this.getChannelCodeByInformation()
  },
  methods: {
    // 获取首页栏目导航图
    getChannelDetail () {
      this.Ajax.getChannelDetail({
        channelCode: 'sy'
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data
        }
      })
    },
    // 获取实用信息下的子栏目
    getChannelCodeByInformation () {
      this.Ajax.getChannelList({
        channelCode: 'syxx'
      }).then(res => {
        if (res.code === 0) {
          this.informationList = res.datas
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  .index-banner {
    position: relative;
    width: 100vw;
    height: 440px;
    background: #e2e2e2;
    img {
      display: block;
      font-size: 0;
      height: 100%;
    }
    p {
      position: absolute;
      top: 50%;
      width: 100%;
      text-align: center;
      font-size: 52px;
      font-weight: bold;
      color: #ffffff;
      transform: translateY(-50%);
      text-shadow: 3px 0 5px rgba(0, 0, 0, .2);
    }
  }
  .wrapper {
    padding: 80px 30px;
    .item {
      display: block;
      width: 100%;
      height: 400px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      &~.item {
        margin-top: 50px;
      }
      h3 {
        padding: 0 30px;
        font-size: 30px;
        font-weight: bold;
        color: #333;
        line-height: 100px;
        background: #fff;
      }
      img {
        display: block;
        font-size: 0;
        width: 100%;
        height: 300px;
      }
    }
    .item1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: none;
      a {
        position: relative;
        width: 330px;
        height: 300px;
      }
      span {
        display: block;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 40px;
        color: #fff;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
  .type{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 100px;
    .item {
      width: 50%;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        &:first-child {
          margin-bottom: 60px;
        }
        .icon-mobile {
          height: 120px;
          width: 120px;
          border: 1px solid  #999999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 52px;
          color: #333333;
        }
        p{
          margin-top: 30px;
          font-size: 30px;
        }
      }
    }
  }
}
</style>