<template>
  <div class="banner">
    <img src="../assets/images/banner.png" alt />
    <p>{{$t('index.pageTit')}}</p>
  </div>
</template>
<style lang="scss" scoped>
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
</style>