<template>
  <div class="service-info">
    <Header />
    <Banner />
    <div class="info-wrapper">
      <router-link
        tag="div"
        class="info-item"
        v-for="item in list"
        :key="item.id"
        :to="{path: '/channel-detail', query: {code: item.channelCode}}"
      >
        <i class="icon-mobile" v-html="item.metaDescription"></i>
        <h5>{{item.name}}</h5>
        <p>{{item.summary}}</p>
      </router-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../widgets/Banner";
export default {
  components: {
    Header,
    Footer,
    Banner
  },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.Ajax.getChannelList({
      channelCode: "syxx"
    }).then(res => {
      if (res.code === 0) {
        this.list = res.datas;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.service-info {
  width: 100%;
  height: 100%;
  .info-wrapper {
    box-sizing: border-box;
    margin-top: 80px;
    padding: 0 30px;
    .info-item {
      width: 690px;
      padding: 60px 60px 0;
      margin-bottom: 40px;
      height: 310px;
      background: #f5f5f5;
      box-sizing: border-box;
      .icon-mobile {
        font-size: 52px;
        color: #333333;
      }
      h5 {
        margin-top: 36px;
        font-size: 30px;
        color: #333333;
      }
      p {
        margin-top: 20px;
        font-size: 24px;
        color: #666666;
        line-height: 30px;
      }
    }
  }
}
</style>