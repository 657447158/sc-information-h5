<template>
  <div class="index-container">
    <Header />
    <!-- 顶部banner -->
    <div class="index-banner">
      <img v-if="detail.navImage" :src="detail.navImage" />
    </div>
    <div class="wrapper">
      <a class="item" href="/list?code=djrm">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>{{$t('index.time.title')}}</h3>
          <p>{{$t('index.time.slogan')}}</p>
        </div>
      </a>
     <a class="item" href="/list?code=xm">
        <img src="../../assets/images/index1@3x.png" alt />
        <div>
          <h3>{{$t('index.art.title')}}</h3>
          <p>{{$t('index.art.slogan')}}</p>
        </div>
      </a>
      <a class="item" href="/list?code=ys">
        <img src="../../assets/images/index2@3x.png" alt />
        <div>
          <h3>{{$t('index.food.title')}}</h3>
          <p>{{$t('index.food.slogan')}}</p>
        </div>
      </a>
       <a class="item" href="/list?code=yswh">
        <img src="../../assets/images/index3@3x.png" alt />
        <div>
          <h3>{{$t('index.story.title')}}</h3>
          <p>{{$t('index.story.slogan')}}</p>
        </div>
      </a>
      <a class="item" href="/list?code=mswh">
        <img src="../../assets/images/index4@3x.png" alt />
        <div>
          <h3>{{$t('index.night.title')}}</h3>
          <p>{{$t('index.night.slogan')}}</p>
        </div>
      </a>
    </div>

    <div class="type">
      <router-link 
        class="item"
        v-for="item in informationList"
        :key="item.id"
        :to="`chanel-detail?code=${item.channelCode}`"
      >
        <i class="icon-mobile" v-html="item.metaDescription"></i>
        <p>{{item.name}}</p>
      </router-link>
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
    width: 100vw;
    height: 440px;
    background: #e2e2e2;
    img {
      display: block;
      font-size: 0;
      height: 100%;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 80px 30px;
    box-sizing: border-box;
    .item {
      width: 690px;
      height: 300px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 40px;
      &~.item {
        margin-top: 50px;
      }
      h3 {
        font-size: 46px;
        font-weight: bold;
        color: #ffffff;
      }
      p {
        margin-top: 24px;
        font-size: 24px;
        color: #ffffff;
      }
      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
      }
    }
  }
  .type{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 100px;
    .item{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(100vw / 3);
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
        font-size: 24px;
      }
    }
  }
}
</style>