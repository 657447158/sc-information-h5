<template>
  <!-- 四川掠影 -->
  <div>
    <Header />
    <!-- <div class="scenic-info">{{name}}</div> -->
    <!-- <div class="scenic-summary">{{desc}}</div> -->
    <div class="nav-list">
      <span
        v-for="(item, index) in tagList"
        :key="item.id"
        class="nav-list-item"
        :class="tagIndex == index && 'active'"
        @click="chooseTag(item, index)"
      >{{item.name}}</span>
    </div>
    <!-- 二级栏目banner -->
    <div class="daq-picture">
      <scroll-load requestName="getPicList" :params="params" @list="getList">
        <div class="daq-picture-list" slot="list">
          <ul class="daq-picture-list-left" ref="left">
            <li
              class="daq-picture-item"
              v-for="item in leftList"
              :key="item.id"
              :style="{height: ((liWidth / item.width * item.height) / 100 + .74)*54 + 'px'}"
              :data-id="item.id"
              @click="viewPhoto(item.url)"
            >
              <img :src="item.url | imgurl" />
              <p class="name">{{item.title}}</p>
              <!--<span class="tag">{{item.type}}</span>-->
            </li>
          </ul>
          <ul class="daq-picture-list-right" ref="right">
            <li
              class="daq-picture-item"
              v-for="item in rightList"
              :key="item.id"
              :style="{height: (liWidth / item.width * item.height / 100 + .74)*54 + 'px'}"
              :data-id="item.id"
              @click="viewPhoto(item.url)"
            >
              <img :src="item.url | imgurl" />
              <p class="name">{{item.title}}</p>
              <!--<span class="tag">{{item.type}}</span>-->
            </li>
          </ul>
        </div>
      </scroll-load>
      <!-- 查看图片 -->
      <daq-check-photo :show="show" :list="picList" :initialSlide="initialSlide" @hide="hide"></daq-check-photo>
      <Footer />
    </div>
  </div>
</template>
<script>
// import Crumbs from "@/widgets/crumbs.vue";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";
import Ajax from "@/service";
export default {
  components: {
    Header,
    Footer
    // Banner
  },
  data() {
    return {
      show: false,
      list: [],
      picList: [],
      initialSlide: 0,
      code: this.$route.query.code || "mjtk",
    //   params: {
    //     datatype: "sourceType_1",
    //     tag: this.$route.query.tag || "284"
    //   },
      liWidth: 323,
      leftList: [],
      rightList: [],
      desc: "",
      name: "",
      crumbsLv2: {
        name: "实用信息",
        href: "/information"
      },
      crumbsLv4: "美景图库",
      tagList: [],
      params: {
        datatype: "sourceType_1",
        tag: ""
      },
      pFlag: false,
      tagIndex: 0
    };
  },
  filters: {
    imgurl(val) {
      if (val.indexOf("?x-oss-process=image") === -1) {
        return val + "?x-oss-process=image/resize,w_323";
      } else {
        return val;
      }
    }
  },
  mounted() {
    // this.Ajax.getChannelDetail({
    //   channelCode: "mjtk"
    // }).then(res => {
    //   if (res.code === 0) {
    //     this.desc = res.data.metaDescription;
    //     this.name = res.data.name;
    //   }
    // });
    this.getTagsByType();
  },
  methods: {
    chooseTag(item, index) {
      if (this.tagIndex === index) return;
      this.tagIndex = index;
      this.list = [];
      this.leftList = [];
      this.rightList = [];
      this.params.tag = item.id;
      this.pFlag = true;
    },
    // 获取分类
    getTagsByType() {
      Ajax.getTagsByType({
        type: 1
      }).then(res => {
        if (res.code === 0) {
          this.tagList = res.datas;
          this.params.tag = res.datas[0].id;
          this.pFlag = true;
        }
      });
    },
    getList(val) {
      this.list = this.list.concat(val);
      this.list.map(item => {
        this.picList.push(item.url);
      });
      this.$nextTick(() => {
        this.updateWaterfall();
      });
    },
    // 瀑布流数据排序
    updateWaterfall() {
      const leftHeight = this.$refs.left.clientHeight;
      const rightHeight = this.$refs.right.clientHeight;
      let item = this.list.shift();
      if (!item) return;
      if (leftHeight <= rightHeight) {
        this.leftList.push(item);
      } else {
        this.rightList.push(item);
      }
      this.$nextTick(() => {
        this.updateWaterfall();
      });
    },
    viewPhoto(url) {
      this.picList.map((item, index) => {
        if (item === url) {
          this.initialSlide = index;
        }
      });
      this.show = true;
    },
    hide() {
      this.show = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-list {
  padding: 60px 30px 30px;
  overflow-x: scroll;
  white-space: nowrap;
   background: #fff;
  &-item {
    margin-right: 12px;
    display: inline-block;
    padding: 0 6px;
    height: 28px;
    font-size: 30px;
    &.active {
      color: $themeColor;
    }
  }
}
.scenic-info {
  padding: 60px 0 24px;
  color: $fc06;
  font-size: $f36;
  font-weight: bold;
  line-height: 1;
  padding-left: 40px;
  background: #fff;
}
.scenic-summary {
  padding: 0 40px;
  color: $fc07;
  font-size: $f24;
  line-height: 1.5;
   background: #fff;
}
.daq-picture {
  /deep/ .daq-no-data-text {
    background: #fff;
  }
  &-list {
    padding: 40px 40px 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: #fff;
  }
  &-item {
    position: relative;
    margin-bottom: 40px;
    width: 323px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: auto;
  }
  .name {
    padding: 0 24px;
    width: 100%;
    height: 74px;
    line-height: 74px;
    font-size: $f28;
    color: $fc06;
    @include ellipsis();
  }
  .tag {
    position: absolute;
    left: 24px;
    bottom: 98px;
    z-index: 1;
    padding: 0 16px;
    text-align: center;
    line-height: 32px;
    color: $fc10;
    font-size: $f20;
    background: rgba(255, 158, 5, 0.8);
    border-radius: 16px;
  }
}
</style>
