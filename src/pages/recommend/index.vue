<template>
  <div class="recommend">
    <Header />
    <Banner />
    <div class="wrapper">
      <router-link
        tag="div"
        class="card"
        v-for="item in list"
        :key="item.id"
        :to="{path: '/list', query: {code: item.channelCode}}"
      >
        <img :src="item.channelImage" alt />
        <p>{{item.name}}</p>
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
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.Ajax.getChannelList({
      channelCode: 'ztlytj'
    }).then(res => {
      if (res.code === 0) {
        this.list = res.datas
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  height: 100%;
  .wrapper{
    padding: 80px 30px;
  }
  .card {
    position: relative;
    width: 100%;
    height: 260px;
    overflow: hidden;
    &~.card {
      margin-top: 40px;
    }
    img {
      display: block;
      font-size: 0;
      width: 100%;
      height: 100%;
    }
    p {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>