<template>
  <div class="index-container">
    <Header />
    <!-- 顶部banner -->
    <div class="index-banner">
      <img v-if="detail.navImage" :src="detail.navImage" />
    </div>
    <div class="wrapper">
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>{{$t('index.time.title')}}</h3>
          <p>{{$t('index.time.slogan')}}</p>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>{{$t('index.art.title')}}</h3>
          <p>{{$t('index.art.slogan')}}</p>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>{{$t('index.food.title')}}</h3>
          <p>{{$t('index.food.slogan')}}</p>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>{{$t('index.story.title')}}</h3>
          <p>{{$t('index.story.slogan')}}</p>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>{{$t('index.night.title')}}</h3>
          <p>{{$t('index.night.slogan')}}</p>
        </div>
      </div>
    </div>
    <div class="type">
      <div class="item">
        <i class="icon-mobile">&#xe666;</i>
        <p>Tourist VISA</p>
      </div>
      <div class="item">
        <i class="icon-mobile">&#xe66f;</i>
        <p class="desc">City traffic</p>
      </div>
      <div class="item">
        <i class="icon-mobile">&#xe66c;</i>
        <p class="desc">Hotel accomodation</p>
      </div>
      <div class="item">
        <i class="icon-mobile">&#xe675;</i>
        <p>Travel agency inquiry</p>
      </div>
      <div class="item">
        <i class="icon-mobile">&#xe672;</i>
        <p class="desc">Caring service</p>
      </div>
      <div class="item">
        <i class="icon-mobile">&#xe668;</i>
        <p class="desc">Health and life safety</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Ajax from '@/service'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      detail: {}
    }
  },
  mounted () {
    Ajax.getChannelDetail({
      channelCode: 'sy'
    }).then(res => {
      if (res.code === 0) {
        this.detail = res.data
      }
    })
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