<!--
 * @Author: kouJing
 * @Date: 2020-01-08 15:44:59
 * @LastEditors  : kouJing
 * @LastEditTime : 2020-01-17 15:25:11
 * @Description: 酒店列表
 -->
<template>
  <div>
    <Header />
    <!-- 当前位置 -->
    <!-- <Crumbs
      :lv2="crumbsLv2"
      :lv4="crumbsLv4"
    /> -->
    <!-- 简介 -->
    <div class="hotel-wrap">
      <!-- <div class="scenic-info">精挑细选，只为了你</div>
      <div class="scenic-summary">房型丰富，风格迥异更养眼；暂别奔忙，来这里品味慢生活...</div> -->
      <!-- <div class="select" style="padding-top:10px">
        <p>{{$t('hotel.starRating')}}</p>
        <ul>
          <li
            v-for="(item, index) in tagList"
            :key="item.resourceLevel"
            @click="setResourceLevel(item.resourceLevel, index)"
            :class="tagActive === index ? 'curr' : ''"
          >{{item.name}}</li>
        </ul>
        <p>{{$t('hotel.area')}}</p>
        <ul>
          <li
            v-for="(item, index) in regionList"
            :key="item.region"
            @click="setRegion(item.region, index)"
            :class="regionActive === index ? 'curr' : ''"
          >{{item.name}}</li>
        </ul>
      </div> -->
      <!-- 酒店列表 -->
      <scroll-load requestName="getHotelList" @list="getList" :params="params" style="padding-top:20px">
        <ul class="hotel" slot="list">
          <li class="hotel-list" v-for="item in list" :key="item.id">
            <a>
              <div class="hotel-list-cover">
                <img
                  :src="item.pictureFourToThree || item.picture"
                  :alt="item.name"
                  v-if="item.pictureFourToThree || item.picture"
                />
              </div>
              <div class="hotel-list-bottom">
                <p class="hotel-list-bottom-tit">{{item.name}}</p>
                <p class="hotel-list-bottom-other">
                  <span class="ued-mobile">&#xe71f;</span>
                  {{$t('hotel.address')}}：{{item.address || 'unknow'}}
                </p>
                <p class="hotel-list-bottom-other">
                  <span class="ued-mobile">&#xe7be;</span>
                  {{$t('hotel.phone')}}：{{item.phone || 'unknow'}}
                </p>
              </div>
            </a>
          </li>
        </ul>
      </scroll-load>
    </div>
    <Footer />
  </div>
</template>
<script>
// import Crumbs from '@/widgets/crumbs.vue'
import Header from "@/components/Header/index";
import Footer from "@/components/Footer/index";
export default {
  components: {
    // Crumbs,
		Header,
		Footer,
  },
  data() {
    return {
      params: {
        resourceLevel: "",
        region: ""
      },
      tagList: [
        {
          name: "All",
          resourceLevel: ""
        },
        {
          name: "five-star",
          resourceLevel: "hotelStarLevel_5"
        },
        {
          name: "four-star",
          resourceLevel: "hotelStarLevel_4"
        },
        {
          name: "three-star",
          resourceLevel: "hotelStarLevel_3"
        }
      ],
      tagActive: 0,
      regionActive: 0,
      regionList: [
        {
          name: 'All',
          region: ''
        }
      ],
      list: []
    };
  },
  created() {
    // 获取地区列表
    this.getAreaList();
  },
  methods: {
    // 酒店等级
    setResourceLevel(resourceLevel, index) {
      if (this.params.resourceLevel === resourceLevel) {
        this.params.resourceLevel = "";
        this.tagActive = -1;
      } else {
        this.params.resourceLevel = resourceLevel;
        this.tagActive = index;
      }
    },
    // 地区列表
    getAreaList() {
      let _this = this;
      this.Ajax.getSiteRegions({
        loading: false
      })
        .then(res => {
          if (res.code === 0 && res.datas && res.datas.length > 0) {
            _this.regionList = this.regionList.concat(res.datas)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setRegion(region, index) {
      if (this.params.region === region) {
        this.params.region = "";
        this.regionActive = -1;
      } else {
        this.params.region = region;
        this.regionActive = index;
      }
    },
    setTag(tagId, index) {
      if (this.params.grade === tagId || tagId === "All") {
        this.params.grade = "";
        this.active = -1;
      } else {
        this.params.grade = tagId;
        this.active = index;
      }
    },
    /**
     * [获取数据]
     */
    getList(value) {
      this.list = this.list.concat(value);
    }
  },
  // 深度监听
  watch: {
    params: {
      handler() {
        this.list = [];
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.hotel-wrap {
	background: #fff;
	min-height: calc(100vh - 410px);
	overflow: hidden;
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
.select {
  padding: 0 40px;
  color: #666;
  font-size: $f24;
  line-height: 1;
  p {
    font-weight: bold;
  }
  ul {
    padding: 30px 0 60px;
    min-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      display: inline-block;
      margin-right: 40px;
      &.curr {
        color: $themeColor;
      }
    }
  }
}
.hotel {
  display: flex;
  flex-direction: column;
  padding: 0 40px 40px;
  &-list {
    margin-bottom: 40px;
    &-cover {
      position: relative;
      width: 100%;
      height: 453px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-bottom {
      padding: 39px 29px 30px;
      border: 1px solid #ececec;
      &-tit {
        color: $fc06;
        font-size: $f30;
        font-weight: bold;
        line-height: 1.2;
        @include ellipsis;
      }
      &-other {
        margin-top: 24px;
        color: #666;
        font-size: $f24;
        line-height: 1;
        @include ellipsis;
        .ued-mobile {
          margin-right: 15px;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
