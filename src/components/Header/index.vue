<template>
  <div class="header">
    <router-link to="index">
      <img src="@/assets/images/logo@3x.png" class="logo" />
    </router-link>
    <div class="header-right">
      <!-- <span class="icon-mobile">&#xe673;</span> -->
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
  position: sticky;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 3px 0 10px rgba(0, 0, 0, .2);
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