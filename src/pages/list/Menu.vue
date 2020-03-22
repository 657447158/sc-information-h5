<template>
  <div>
    <div class="submenu" v-if="list.length">
      <div
        class="menu-item"
        :class="pSelectIndex === index && 'active'"
        v-for="(item, index) in list"
        :key="item.id"
      >
        <div class="item-box">
          <div class="title" @click="chooseItem(index)">
            <div class="name">{{item.name}}</div>
            <span class="icon-mobile" v-if="item.children.length">&#xe6af;</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-box" v-show="modalShow">
      <div class="close" @click.stop="closeModal">×</div>
      <ul>
        <li
          :class="cSelectIndex === index && 'active'"
          v-for="(sub, index) in subList"
          :key="sub.id"
          @click.stop="chooseSubItem(index, sub.chanelCode)"
        >{{sub.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  data() {
    return {
      modalShow: false,
      selected: 0,
      subList: [],
      pSelectIndex: 0,
      cSelectIndex: 0,
      coypCSelectIndex: 0,
      scroll:true,
    };
  },
  watch: {
    list: {
      handler(val) {
        if (val.length) {
          this.subList = val[this.selected].children;
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    chooseItem(index) {
      if (!this.list[index].children.length) {
        if (this.pSelectIndex === index) return;
        this.pSelectIndex = index;
        this.$emit("getVal", this.list[index].chanelCode);
      } else {
        this.scroll = false;
        this.iosTrouchFn();
        if (this.pSelectIndex === index) {
          this.cSelectIndex = this.coypCSelectIndex;
        } else {
          this.cSelectIndex = "";
        }
        this.subList = this.list[index].children;
        this.modalShow = true;
      }
    },
    chooseSubItem(index, code) {
      console.log("code", code);
      this.cSelectIndex = index;
      this.coypCSelectIndex = index;
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        for (let j = 0; j < item.children.length; j++) {
          let sub_item = item.children[j];
          if (code === sub_item.chanelCode) {
            this.pSelectIndex = i;
          }
        }
      }
      this.$emit("getVal", code);
      this.closeModal();
    },
    closeModal() {
      this.modalShow = false;
      this.scroll =true;
      this.iosTrouchFn();
    },
    iosTrouchFn() {
      const _this = this;
      
      document.body.addEventListener(
        "touchmove",
        function(e) {
          if (!_this.scroll) {
            e.preventDefault(); //阻止默认事件(上下滑动)
          } else {
            document.body.removeEventListener("touchmove",function(){alert("去除电梯")});
          }
        },
        { passive: false }
      ); //passive防止阻止默认事件不生效
    }
  }
};
</script>
<style lang="scss" scoped>
.submenu {
  position: sticky;
  top: 120px;
  z-index: 99;
  background: red;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e2e2e2;
  background: #f9f9f9;
  overflow-x: scroll;
  .menu-item {
    position: relative;
    // min-width: 25%;
    // flex: 1;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    &.active {
      .title {
        color: $themeColor;
        .icon-mobile {
          color: $themeColor;
        }
      }
    }
    .item-box {
      height: 120px;
      display: flex;
      align-items: center;
      justify-items: center;
      border: 1px solid transparent;
      box-sizing: border-box;
      padding: 0 40px;
    }
    & ~ .menu-item::after {
      content: "";
      position: absolute;
      top: 39px;
      width: 1px;
      height: 40px;
      left: 0;
      background: #e4e4e4;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #666666;
      font-size: 24px;
      .name {
        white-space: nowrap;
        word-break: keep-all;
      }
      .icon-mobile {
        margin-left: 12px;
        font-size: 12spx;
        color: #6a6a6a;
      }
    }
  }
}
.modal-box {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  // background: red;
  display: block;
  padding: 120px 30px;
  color: #bbb;
  transition: all 3s linear;
  z-index: 9999;
  li {
    padding-top: 40px;
    width: 100%;
    font-size: 36px;
    line-height: 36px;
    text-align: left;
    color: #fff;
    &.active {
      color: $themeColor;
    }
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
</style>