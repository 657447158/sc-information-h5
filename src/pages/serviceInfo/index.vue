<template>
  <div class="service-info">
    <Header />
    <Banner />
    <div class="info-wrapper">
        <div class="info-item">
            <i class="icon-mobile">&#xe666;</i>
            <h5>Tourist VISA</h5>
            <p>Seda, a pure paradise of wonderful prairie, where you 
can forget all your worries.</p>
        </div>
        <div class="info-item">
            <i class="icon-mobile">&#xe66f;</i>
            <h5>City traffic</h5>
            <p>Seda, a pure paradise of wonderful prairie, where you 
can forget all your worries.</p>
        </div>
        <div class="info-item">
            <i class="icon-mobile">&#xe66c;</i>
            <h5>Hotel accomodation</h5>
            <p>Seda, a pure paradise of wonderful prairie, where you 
can forget all your worries.</p>
        </div>
        <div class="info-item">
            <i class="icon-mobile">&#xe675;</i>
            <h5>HTravel agency inquiry</h5>
            <p>Seda, a pure paradise of wonderful prairie, where you 
can forget all your worries.</p>
        </div>
        <div class="info-item">
           <i class="icon-mobile">&#xe672;</i>
            <h5>Caring service</h5>
            <p>Seda, a pure paradise of wonderful prairie, where you 
can forget all your worries.</p>
        </div>
        <div class="info-item">
            <i class="icon-mobile">&#xe668;</i>
            <h5>Health and life safety</h5>
            <p>Seda, a pure paradise of wonderful prairie, where you 
can forget all your worries.</p>
        </div>
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
  }
};
</script>

<style lang="scss" scoped>
.service-info {
  width: 100%;
  height: 100%;
  .info-wrapper{
      box-sizing: border-box;;
      margin-top: 80px;
      padding: 0 30px;
      .info-item{
          width: 690px;
          padding: 60px;
          margin-bottom: 40px;
          background: #f5f5f5;
          box-sizing: border-box;
          .icon-mobile{
              font-size: 52px;
              color: #333333;
          }
          h5{
              margin-top: 40px;
              font-size: 30px;
              color: #333333;
          }
          p{
              margin-top: 32px;
              font-size: 24px;
              color: #666666;
              line-height: 30px;
          }
          
      }
  }
}
</style>