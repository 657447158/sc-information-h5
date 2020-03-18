<template>
  <div class="submenu">
    <div class="menu-item" @click="selectIndex(1)">
      <div class="item-box dropdown">
        <div class="title">
          <span>Food</span>
          <span class="icon-mobile">&#xe6af;</span>
        </div>
        <ul v-if="selected === 1" @click.stop="selectIndex(0)">
          <li>
            <a href="https://www.baidu.com">Sichuan cuisine</a>
          </li>
          <li>
            <a href="https://www.baidu.com">Hot Pot</a>
          </li>
          <li>
            <a href="https://www.baidu.com">Refreshments</a>
          </li>
          <li>
            <div class="close" @click.stop="selectIndex(0)">×</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu-item">
      <div class="item-box">
        <div class="title">
          <span>Coffee</span>
        </div>
      </div>
    </div>
    <div class="menu-item" @click="selectIndex(2)">
      <div class="item-box dropdown">
        <div class="title">
          <span>Tea</span>
          <span class="icon-mobile">&#xe6af;</span>
        </div>
        <ul v-show="selected === 2">
          <li>
            <a href="https://www.baidu.com">1Sichuan cuisine</a>
          </li>
          <li>
            <a href="https://www.baidu.com">1Hot Pot</a>
          </li>
          <li>
            <a href="https://www.baidu.com">2Refreshments</a>
          </li>
          <li>
            <div class="close" @click.stop="selectIndex(0)">×</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="menu-item noborder">
      <div class="item-box">
        <div class="title">
          <span>Wine</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: 0
    };
  },
  methods: {
    selectIndex(index) {
      console.log("ddd", index);
      this.selected = index;
      console.log(this.selected);
    }
  }
};
</script>
<style lang="scss" scoped>
.submenu {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e2e2;
  background: #f9f9f9;
  .menu-item {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    .item-box {
      height: 120px;
      //   width: 200px;
      display: flex;
      align-items: center;
      justify-items: center;
      border: 1px solid transparent;
      box-sizing: border-box;
      .title {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        // margin-top: 24px;
        text-align: center;
        color: #666666;
        font-size: 24px;
        .icon-mobile {
          margin-left: 12px;
          font-size: 10px;
          color: #6a6a6a;
        }
      }
      ul {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background:rgba(0,0,0,0.9);
        display: block;
        padding: 120px 15px 20px;
        color: #bbb;
        transition: all 3s;
        z-index: 9999;
        li {
          padding-top: 40px;
          a {
            width: 100%;
            font-size: 36px;
            line-height: 36px;
            text-align: left;
            color: #ffffff;
            cursor: pointer;
          }
          &:hover {
            color: #dcb499;
          }
          .close {
            display: block;
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            overflow: hidden;
            box-sizing: border-box;
            text-align: center;
            line-height: 40px;
            font-size: 48px;
            font-weight: bold;
            border-radius: 40px;
            border: 0;
            color: #fff;
          }
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 39px;
      width: 1px;
      height: 40px;
      right: 0;
      background: #e4e4e4;
    }
    &.noborder {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        width: 0;
        height: 0;
        right: 0;
        background: transparent;
      }
    }
  }
}
</style>