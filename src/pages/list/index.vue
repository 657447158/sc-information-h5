<template>
  <div class="list-container">
    <Header :code="code" />
    <Banner :code="code" />
    <Menu :list="codeList" @getVal="getParams" />
    <scroll-load
      requestName="getNewsList"
      :params="params"
      :pFlag="pFlag"
      @list="getList"
    >
      <ul slot="list" class="list-wrap" v-if="newsList.length">
        <router-link
          tag="li"
          v-for="item in newsList"
          :key="item.id"
          :to="{path: '/article-detail', query: {id: item.id}}"
        >
          <span class="img-box">
            <img :src="item.cover" />
          </span>
          <h5>{{item.title}}</h5>
          <p class="summary">{{item.summary}}</p>
        </router-link>
      </ul>
    </scroll-load>
    <Footer/>
  </div>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../widgets/Banner";
import Menu from './Menu';
export default {
  components: {
    Header,
    Footer,
    Banner,
    Menu
  },
  data () {
    return {
      code: this.$route.query.code,
      codeList: [],
      newsList: [],
      title: '',
      params: {
        channelCode: ''
      },
      pFlag: false
    }
  },
  mounted () {
    this.getTreeListByChannelCode()
  },
  methods: {
    getList (val) {
      this.newsList = this.newsList.concat(val)
    },
    getParams (val) {
      this.newsList = []
      this.params.channelCode = val
    },
    getTreeListByChannelCode () {
      this.Ajax.getTreeListByChannelCode({
        channelCode: this.code
      }).then(res => {
        if (res.code === 0 && res.datas.length) {
          this.title = res.datas[0].name
          this.codeList = res.datas[0].children
          if (this.codeList[0]) {
            if (this.codeList[0].children.length) {
              this.params.channelCode = this.codeList[0].children[0].chanelCode
            } else {
              this.params.channelCode = this.codeList[0].chanelCode
            }
          } else {
            this.params.channelCode = res.datas[0].chanelCode
          }
          this.pFlag = true
        }
      })
    }
  },
  watch: {
    $route: {
      handler (to, from) {
        if (to.name === 'list') {
          this.newsList = []
          this.code = to.query.code
          this.getTreeListByChannelCode()
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.list-container {
  width: 100%;
  height: 100%;
  .list-wrap {
    padding: 80px 30px;
  }
  li~li {
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
  h5 {
    margin-top: 40px;
    font-size: 36px;
    color: #333;
  }
  .summary {
    margin-top: 20px;
    font-size: 26px;
    color: #666;
    @include ellipsisLn(2);
  }
}
</style>