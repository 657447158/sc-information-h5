<template>
  <div class="list-container">
    <Header/>
      <Banner/>
      <List/>
      <List/>
      <List/>
      <List/>
      <List/>
    <Footer/>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import List  from "../../widgets/ListItem";
import Banner from "../../widgets/Banner"
export default {
  components: {
    Header,
    Footer,
    List,
    Banner
  }
};
</script>

<style lang="scss" scoped>
.list-container {
    width: 100%;
    height: 100%;
}
</style>