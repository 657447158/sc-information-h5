<template>
  <div>
    <Header />
    <div class="detail">
      <p class="detail-title">{{detail.title}}</p>
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
      id: this.$route.query.id,
      detail: {}
    };
  },
  mounted() {
    this.Ajax.getNewsDetail({
      id: this.id
    }).then(res => {
      console.log(res);
      if (res.code === 0) {
        this.detail = res.data;
        this.$nextTick(() => {
          console.log("--")
          let imgList = document.querySelectorAll(".content img");
          for (let i = 0; i < imgList.length; i++) {
            imgList[i].style.height="auto"
          }
        });
      }
    });
  }
};
</script>

<style lang="scss">
.detail {
  box-sizing: border-box;
  padding: 60px 30px;
  min-height: calc(100vh - 350px);
  background: #fff;
  overflow-x: hidden;
  &-title {
    font-size: 36px;
    color: #333;
    margin-bottom: 32px;
    font-weight: bold;
    line-height: 54px;
  }
}
</style>