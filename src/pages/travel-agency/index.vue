<template>
  <div class="list-container">
    <Header />
    <Banner :code="code" />
    <scroll-load
      requestName="getTravelList"
      :params="params"
      @list="getList"
    >
      <ul slot="list" class="list-wrap" v-if="newsList.length">
        <router-link
          tag="li"
          v-for="item in newsList"
          :key="item.id"
          :to="{path: '/article-detail', query: {id: item.id}}"
        >
          <p class="agency-tit">{{item.name}}</p>
          <p class="agency-info">{{$t('travel.type')}}：{{item.resourceLevel}}</p>
          <p class="agency-info">{{$t('travel.address')}}：{{item.address}}</p>
        </router-link>
      </ul>
    </scroll-load>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/widgets/Banner";
export default {
  components: {
    Header,
    Footer,
    Banner
  },
  data () {
    return {
      code: this.$route.query.code,
      newsList: [],
      params: {
        region: 510000
      }
    }
  },
  methods: {
    getList (val) {
      this.newsList = this.newsList.concat(val)
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
    margin-top: 40px;
  }
  li {
    width: 100%;
    padding: 36px 20px;
    border: 1px solid #e3e3e3;
  }
  .agency-tit {
    margin-bottom: 8px;
    padding-bottom: 24px;
    color: #333;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    border-bottom: 1px solid #e3e3e3;
  }
  .agency-info {
    padding-top: 20px;
    color: #666;
    font-size: 24px;
    line-height: 1.2;
  }
}
</style>