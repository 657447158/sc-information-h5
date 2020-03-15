<template>
  <div class="card">
    <img src="../assets/images/banner.png" alt />
    <p>{{$t('index.pageTit')}}</p>
  </div>
</template>
<style lang="scss" scoped>
.card {
    width: 690px;
    height: 260px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: -1;
    }
    p {
      // left: 0;
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;
    }
}
</style>