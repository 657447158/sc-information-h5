<template>
  <div class="list-container">
    <Header />
    <div class="submenu" v-if="codeList.length">
      <div
        class="menu-item"
        :class="pSelectIndex === index && 'active'"
        v-for="(item, index) in codeList"
        :key="item.id"
      >
        <div class="item-box">
          <div class="title" @click="chooseItem(index)">
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <p class="page-tit">{{title}}</p>
    <ul class="list-wrap" v-if="qList.length">
      <li v-for="(item, index) in qList" :key="item.id" @click="goTo(index)">
        <p class="list-item-title">{{item.title}}</p>
      </li>
    </ul>
    <div class="answer">
      <div v-for="(item, index) in qList" :key="item.id" class="answer-item" :id="`answer${index}`">
        <div v-html="item.content"></div>
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
    Footer,
  },
  data() {
    return {
      code: this.$route.query.code,
      codeList: [],
      pSelectIndex: 0,
      title: "",
      params: {
        channelCode: "",
        limitPage: 99
      },
      qList: []
    };
  },
  mounted() {
    this.getChannelList();
  },
  methods: {
    chooseItem(index) {
      if (this.pSelectIndex === index) return;
      this.pSelectIndex = index;
      this.qList = [];
      this.title = this.codeList[index].name
      this.params.channelCode = this.codeList[index].channelCode
      this.getNewsList()
    },
    getParams(val) {
      if (this.params.channelCode === val) return;
      this.newsList = [];
      this.params.channelCode = val;
    },
    getChannelList() {
      this.Ajax.getChannelList({
        channelCode: this.code
      }).then(res => {
        if (res.code === 0 && res.datas.length) {
          this.codeList = res.datas;
          this.title = res.datas[0].name;
          this.params.channelCode = res.datas[0].channelCode;
          this.getNewsList();
        }
      });
    },
    getNewsList() {
      this.Ajax.getNewsList(this.params).then(res => {
        if (res.code === 0) {
          this.qList = res.datas;
        }
      });
    },
    goTo (index) {
      this.originD = 0
      this.fDistance = 0
      this.QDom = document.getElementById(`answer${index}`)
      this.fDistance = this.QDom.offsetTop - 100
      window.requestAnimationFrame(this.step)
    },
    step () {
      const distance = this.QDom.offsetTop
      const v = distance / 10
      this.originD = this.originD + v
      if (this.originD > this.fDistance) {
        document.documentElement.scrollTop = this.fDistance
      } else {
        document.documentElement.scrollTop = this.originD
      }
      const clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
      let isEnd = false
      if (scrollTop != 0 && clientHeight + scrollTop == scrollHeight) {
        isEnd = true
      }
      if ((distance - document.documentElement.scrollTop > 100 && document.documentElement.scrollTop < document.body.scrollHeight) && !isEnd) {
        window.requestAnimationFrame(this.step)
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.page-tit {
  padding: 60px 30px;
  font-size: 36px;
  font-weight: bold;
}
.submenu {
  position: sticky;
  top: 120px;
  z-index: 99;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #e2e2e2;
  background: #f9f9f9;
  overflow-x: scroll;
  overflow-y: hidden;
  .menu-item {
    position: relative;
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
      text-align: right;
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
.list-container {
  width: 100%;
  height: 100%;
  .list-wrap {
    padding: 0 30px 80px;
  }
  li ~ li {
    margin-top: 60px;
  }
  .img-box {
    display: block;
    width: 100%;
    height: 453px;
    overflow: hidden;
    img {
      display: flex;
      font-size: 0;
      width: 100%;
      height: 100%;
    }
  }
  .list-item-title {
    display: flex;
    align-items: flex-start;
    margin-top: 40px;
    font-size: 28px;
    color: #333;
    &::before {
      content: "";
      margin: 6px 12px 0 0;
      display: block;
      min-width: 14px;
      height: 14px;
      background: $themeColor;
    }
  }
}
.answer {
  padding: 0 30px 80px;
}
</style>