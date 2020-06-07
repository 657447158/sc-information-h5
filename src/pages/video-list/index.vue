<template>
  <!-- 宣传视频列表 -->
  <div>
    <Header />
    <!-- 当前位置 -->
    <!-- 二级栏目banner -->
    <!-- <Banner :channelCode="code"/> -->
    <div class="scenic-info">{{name}}</div>
    <!-- <div class="scenic-summary">{{desc}}</div> -->
     <!-- <div class="nav-list">
      <span
        v-for="(item, index) in tagList"
        :key="item.id"
        class="nav-list-item"
        :class="tagIndex == index && 'active'"
        @click="chooseTag(item, index)"
      >{{item.name}}</span>
    </div> -->
    <div class="daq-video">
      <scroll-load requestName="getVideoList" @list="getList" :list="list" :params="params">
        <ul class="video-list" slot="list">
          <li v-for="item in list" :key="item.id" class="list" @click="playVideo(item.upload)">
            <div class="img-box" :class="!item.coverpictureFourToThree && 'daq-no-photo'">
              <img
                class="daq-img"
                v-if="item.coverpictureFourToThree"
                :src="item.coverpictureFourToThree"
              />
              <p class="video-btn">
                <i class="ued-mobile">&#xe6fc;</i>
              </p>
            </div>
            <div class="content-box">
              <h2 class="name">{{item.title}}</h2>
            </div>
          </li>
        </ul>
      </scroll-load>
      <video-popup :isShow="isShow" :url="playUrl" @closePopup="handleHide"></video-popup>
    </div>
    <Footer />
  </div>
</template>
<script>
// import Banner from '@/widgets/channel-banner.vue'
import VideoPopup from "../../components/videoPopup/video-popup.vue";
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";
import Ajax from "@/service";
export default {
  data() {
    return {
     
      list: [],
      code: this.$route.query.code || "wenwu",
      params: {
        typeCode: ""
      },
      isShow: false,
      playUrl: "",
      desc:"",
      name:"",
      tagList:[],
       tagIndex: 0
    };
  },
  components: {
    VideoPopup,
    Header,
    Footer
    // Banner
  },
  mounted() {
    // this.Ajax.getChannelDetail({
    //   channelCode: "jcsp"
    // }).then(res => {
    //   if (res.code === 0) {
    //     // this.desc = res.data.metaDescription;
    //     this.name = res.data.name;
    //   }
    // });
    this.getTagsByType();
  },
  methods: {
     chooseTag (item, index) {
      if (this.tagIndex === index) return
      if (item.upload) return
      this.list = []
      this.tagIndex = index
      this.params.typeCode = item.id
    },
      // 获取分类
    getTagsByType () {
      Ajax.getTagsByType({
        type: 2
      }).then(res => {
        if (res.code === 0) {
          this.tagList = res.datas
          // this.params.tag = res.datas[0].id
          this.pFlag = true
        }
      })
    },
    getList(value) {
      this.list = this.list.concat(value);
    },
    playVideo(url) {
        console.log(url);
      this.isShow = true;
      this.playUrl = url;
    },
    handleHide(value) {
      this.isShow = value;
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-list {
  padding: 0 30px 30px;
  overflow-x: scroll;
  white-space: nowrap;
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
  margin: 60px 0 24px;
  color: $fc06;
  font-size: $f36;
  font-weight: bold;
  line-height: 1;
  padding-left: 40px;
}
.scenic-summary {
  padding: 0 40px 60px;
  color: $fc07;
  font-size: $f24;
  line-height: 1.5;
}
.daq-video {
  padding-left: 40px;
  padding-right: 40px;
  .title {
    font-size: #c8c8c8;
    color: $fc06;
    font-weight: bold;
    margin-bottom: 60px;
  }
  .list {
    margin-top: 30px;
  }
  .img-box {
    position: relative;
    width: 100%;
    height: 502px;
    overflow: hidden;
    .video-btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.2);
      .ued-mobile {
        color: $fc10;
        font-size: 60px;
      }
    }
  }
  .content-box {
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .name {
      font-size: 32px;
      color: $fc06;
      padding: 24px 0;
      margin: 0 32px;
      background: #ffffff;
      @include ellipsis();
    }
    .summary {
      font-size: 28px;
      margin: 32px 24px 0;
      color: $fc07;
      line-height: 1.5;
      @include ellipsisLn(2);
    }
  }
}
</style>