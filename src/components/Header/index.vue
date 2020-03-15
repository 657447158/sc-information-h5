<template>
  <div class="header">
    <img src="../../assets/images/logo@3x.png" alt class="logo" />
    <div class="header-right">
      <span class="icon-mobile">&#xe6ae;</span>
      <span class="menu">
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: lightblue;
  .logo {
    width: 128px;
    height: 60px;
  }
  .header-right {
    display: flex;
    align-items: center;
    .icon-mobile{
        font-size: 36px;
        color: #666666;
    }
    .menu {
      height: 40px;
      width: 56px;
      margin-left: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      i {
        display: inline-block;
        height: 4px;
        width: 100%;
        background: #000000;
      }
    }
  }
}
</style>