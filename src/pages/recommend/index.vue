<template>
  <div class="recommend">
    <Header />
    <Banner />
    <div class="wrapper">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Card from "../../widgets/Card";
import Banner from "../../widgets/Banner";
export default {
  components: {
    Header,
    Footer,
    Card,
    Banner
  }
};
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  height: 100%;
  .wrapper{
    margin-top: 80px;
    padding: 0 30px;
  }
}
</style>