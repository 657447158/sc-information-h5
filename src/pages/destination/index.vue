<template>
  <div class="destination-container">
    <Header />
    <Banner code="mdd" :title="$t('destination.pageTit')"/>
    <div class="top">
      <div class="title">Choose destination</div>
      <div class="menu">
        <span
          v-for="item in list"
          :key="item.id"
          :class="{'active':item.id === detail.id}"
          @click="changeChannelCode(item.channelCode)"
        >{{item.name}}</span>
      </div>
      <div class="desc-title">{{detail.name}}</div>
      <div class="content">
        <p v-html="detail.content"></p>
      </div>
      <div class="arrow icon-mobile" v-if="detail.content.length">&#xe6af;</div>
    </div>
    <div class="bottom">
      <h3>Recommended tourist attractions</h3>
      <scroll-load
        requestName="getNewsList"
        :params="params"
        :limit="6"
        :pFlag="requestState"
        @list="getList"
      >
        <div class="list-box" slot="list">
          <router-link
            tag="div"
            :to="{path:`article-detail?id=${item.id}`}"
            class="item des-list-item animate-item"
            v-for="(item) in sceneryList"
            :key="item.id"
          >
            <img :src="item.coverFourToThree" alt />
            <h5>{{item.title}}</h5>
          </router-link>
        </div>
      </scroll-load>
    </div>
    <Footer />
  </div>
</template>

<script>
import ScrollLoad from "@/components/scrollLoad/scrollLoad.vue";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/widgets/Banner";
import Ajax from "@/service";
import Tools from "@/utils/tools.js";

export default {
  components: {
    Header,
    Footer,
    Banner,
    ScrollLoad
  },
  data() {
    return {
      list: [],
      channelCode: Tools.getUrlParams("channelCode"),
      detail: {},
      sceneryList: [],
      params: {
        channelCode: ""
      },
      requestState: false
    };
  },
  mounted() {
    this.getChannelList();
  },
  methods: {
    changeChannelCode(code){
      this.sceneryList = []
      this.channelCode = code;
      this.params.channelCode = code
      this.getChannelDetail();
    },
    getList(list) {
      if (!list) return;
      this.sceneryList = this.sceneryList.concat(list);
    },
    // 获取目的地详情
    getChannelDetail() {
      Ajax.getChannelDetail({
        channelCode: this.channelCode
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data;
        }
      });
    },
    // 获取目的地列表(栏目)
    getChannelList() {
      Ajax.getChannelList({
        channelCode: "mdd",
        limitPage: 99
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas;
          this.channelCode =
            this.channelCode || (res.datas[0] && res.datas[0].channelCode);
          this.getChannelDetail();
          this.params.channelCode = this.channelCode;
          this.requestState = true;
        }
      });
    },
    getDestinationList() {
      Ajax.getDestinationList({
        limitPage: 10
      }).then(res => {
        if (res.code === 0) {
          this.list = res.datas;
          console.log(this.list);
        }
      });
    }
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
        word-break: break-all;
      }
    }
    .arrow {
      padding: 50px 30px 100px;
      font-size: 12px;
      color: #999999;
    }
  }
  .bottom {
    padding: 120px 30px 20px;
    background: #ffffff;
    h3 {
      font-size: 46px;
      font-weight: bold;
      color: #333333;
      padding-bottom: 60px;
    }
    .list-box {
      .item {
        img {
          width: 690px;
          height: 450px;
        }
        h5 {
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