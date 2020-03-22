<template>
  <div>
    <Header />
    <div class="detail">
      <p class="detail-title">{{detail.name}}</p>
      <div v-html="detail.content" class="content"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      code: this.$route.query.code,
      detail: {}
    };
  },
  mounted() {
    this.getChannelDetail()
  },
  methods: {
    getChannelDetail () {
      this.Ajax.getChannelDetail({
        channelCode: this.code
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data;
        }
      });
    }
  },
  watch: {
    $route (to) {
      this.code = to.query.code
      this.getChannelDetail()
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 60px 30px;
  min-height: calc(100vh - 350px);
  background: #fff;
  overflow: hidden;
  &-title {
    margin-bottom: 32px;
    font-size: 48px;
    color: #333;
    font-weight: bold;
    line-height: 54px;
  }
  .content {
    /deep/ img {
      max-width: 100%;
      height: auto!important;
    }
  }
}
</style>