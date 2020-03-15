<template>
  <div class="index-container">
    <Header />
    <div class="banner">
      <img src="../../assets/images/banner.png" alt />
      <p>Welcome to Sichuan</p>
    </div>
    <div class="wrapper">
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>Carefree good times</h3>
          <p>"Come on ~ to drink GaiWanCha ~"</p>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>Carefree good times</h3>
          <p>"Come on ~ to drink GaiWanCha ~"</p>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>Carefree good times</h3>
          <p>"Come on ~ to drink GaiWanCha ~"</p>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/images/index@3x.png" alt />
        <div>
          <h3>Carefree good times</h3>
          <p>"Come on ~ to drink GaiWanCha ~"</p>
        </div>
      </div>
    </div>
    <div class="type">
      <div class="type-box">
        <div class="item">
          <div class="icon-wrapper">
            <i class="icon-mobile">&#xe666;</i>
          </div>
          <p>Tourist VISA</p>
        </div>
        <div class="item">
          <div class="icon-wrapper"><i class="icon-mobile">&#xe66f;</i></div>
          <p class="desc">City traffic</p>
        </div>
        <div class="item">
          <div class="icon-wrapper"><i class="icon-mobile">&#xe66c;</i></div>
          <p class="desc">Hotel accomodation</p>
        </div>
      </div>
      <div class="type-box">
        <div class="item">
          <div class="icon-wrapper">
            <i class="icon-mobile">&#xe675;</i>
          </div>
          <p>Travel agency inquiry</p>
        </div>
        <div class="item">
          <div class="icon-wrapper"><i class="icon-mobile">&#xe672;</i></div>
          <p class="desc">Caring service</p>
        </div>
        <div class="item">
          <div class="icon-wrapper"><i class="icon-mobile">&#xe668;</i></div>
          <p class="desc">Health and life safety</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  .banner {
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
    p {
      // left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      position: absolute;
      text-align: center;
      font-size: 52px;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 80px;
    padding: 0 30px;
    box-sizing: border-box;
    .item {
      width: 690px;
      height: 300px;
      margin-bottom: 50px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
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
    margin-bottom: 100px;
    .type-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 60px;
      .item{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .icon-wrapper{
          height: 120px;
          width: 120px;
          border: 1px solid  #999999;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-mobile{
            font-size: 52px;
            color: #333333;
          }
        }
        p{
          margin-top: 30px;
          width: 100%;
          text-align: center;
          font-size: 24px;
          word-break: keep-all;
          white-space: nowrap;

        }
      }
    }
  }
}
</style>