<template>
  <div class="destination-container">
    <Header />
    <Banner />
    <div class="top">
      <div class="title">Choose destination</div>
      <div class="menu">
        <span class="active">Cheng du</span>
        <span>Mian yang</span>
        <span>Nei jiang</span>
        <span>Nan chong</span>
        <span>Le shan</span>
      </div>
      <div class="desc-title">Cheng du</div>
      <div class="content">
        <p>
          ChengDu is a wonderful place located in Sichuan province.
          This city is well decorated and designed which attrects lots of
          tourists every year.
        </p>
        <p>
          Why not come to this amazing city to get a rest and have a look
          of these beautiful sceneries.
          Just cherish this hardly-get chance.Don't hestitate.
        </p>
      </div>
      <div class="arrow icon-mobile">&#xe6af;</div>
    </div>
    <div class="bottom">
      <h3>Recommended tourist  attractions</h3>
      <div class="list-box">
          <div class="item">
              <img src="../../assets/images/panda@3x.png" alt="">
              <h5>Chengdu Panda Base</h5>
          </div>
          <div class="item">
              <img src="../../assets/images/panda@3x.png" alt="">
              <h5>Chengdu Panda Base</h5>
          </div>
          <div class="item">
              <img src="../../assets/images/panda@3x.png" alt="">
              <h5>Chengdu Panda Base</h5>
          </div>
          <div class="item">
              <img src="../../assets/images/panda@3x.png" alt="">
              <h5>Chengdu Panda Base</h5>
          </div>

          <div class="item">
              <img src="../../assets/images/panda@3x.png" alt="">
              <h5>Chengdu Panda Base</h5>
          </div>
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
.destination-container {
  width: 100%;
  height: 100%;
  .top {
    background: #f5f5f5;
    .title {
      box-sizing: border-box;
      padding: 100px 30px 40px;
      text-indent: 40px;
      font-size: 46px;
      font-weight: bold;
      color: #333333;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        left: 30px;
        border-top: 20px solid transparent;
        border-left: 25px solid #333333;
        border-bottom: 20px solid transparent;
      }
    }
    .menu {
      display: flex;
      flex-wrap: nowrap;
      overflow: scroll;
      margin-bottom: 40px;
      span {
        padding: 40px 30px;
        font-size: 24px;
        color: #666666;
        font-weight: bold;
        white-space: nowrap;
        &.active {
          color: #d3a180;
        }
      }
    }
    .desc-title {
      padding: 40px 30px;
      font-size: 46px;
      color: #333333;
      font-weight: bold;
      position: relative;
      &:after {
        position: absolute;
        content: "";
        left: 30px;
        bottom: 0;
        width: 60px;
        height: 4px;
        background: #999999;
      }
    }
    .content {
      padding: 0 30px;
      p {
        margin-top: 40px;
        font-size: 24px;
        line-height: 30px;
        color: #666666;
      }
    }
    .arrow{
      padding:50px 30px 100px;
      font-size: 12px;
      color: #999999;
    }
  }
  .bottom{
    padding: 120px 30px 20px;
     background: #ffffff;
    h3{
      font-size: 46px;
      font-weight: bold;
      color: #333333;
      padding-bottom: 60px;
    }
    .list-box{
      .item{
         img{
           width: 690px;
           height: 450px;
         }
         h5{
           margin-top: 30px;
           margin-bottom: 70px;
           font-size: 36px;
           font-weight: normal;
           color: #333333;
         }
      }
    }
  }
}
</style>