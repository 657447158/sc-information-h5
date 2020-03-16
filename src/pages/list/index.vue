<template>
  <div class="list-container">
    <Header/>
      <Banner/>
      <Menu/>
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
import Banner from "../../widgets/Banner";
import Menu from './Menu';
export default {
  components: {
    Header,
    Footer,
    List,
    Banner,
    Menu
  }
};
</script>

<style lang="scss" scoped>
.list-container {
    width: 100%;
    height: 100%;
}
</style>