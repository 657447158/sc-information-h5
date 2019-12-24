<template>
  <div class="borrow">
    <scroll-load requestName="getMyLendOrderList" @list="getList" :params="params">
      <ul class="borrow-list" slot="list">
        <router-link
          tag="li"
          class="borrow-list-item"
          v-for="item in list"
          :key="item.id"
          :to="{ path: item.detailPath, query: {loanOrderId: item.loanOrderId}
          }"
        >
          <div class="top">
            <span class="box box1">借款人</span>
            <span class="box box2">{{item.userName}}</span>
            <span class="box box3">已实名</span>
            <span class="icon-wx" v-if="item.wxPayFlag === 1"></span>
            <span class="icon-alipay" v-if="item.aliPayFlag === 1"></span>
            <span class="icon-card" v-if="item.bankPayFlag === 1"></span>
            <div class="btn">借出</div>
          </div>
          <p class="time">{{item.LoginDateDesc}}</p>
          <div class="title-box">
            <div class="title-box-item">
              <span class="p1">可借金额</span>
              <p class="p2">¥<span>{{item.loanNum}}</span></p>
            </div>
            <div class="title-box-item">
              <span class="p1">参考年华</span>
              <span class="p3">{{item.annualizedRateDesc}}</span>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom-item">
              <span class="p1">到期利息</span>
              <span>¥ {{item.loanInterest}}</span>
            </div>
            <div class="bottom-item">
              <span class="p1">借贷周期（天）</span>
              <span>{{item.loanPeriod}}</span>
            </div>
            <div class="bottom-item">
              <span class="p1">日息</span>
              <span>{{item.dailyRateDesc}}</span>
            </div>
          </div>
        </router-link>
      </ul>
    </scroll-load>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        params: {
          condition: 10
        },
        list: []
      }
    },
    methods: {
      getList (val) {
        this.list = this.list.concat(val)
        this.list.map(item => {
          if (item.loanStatus === 1) {
            item.detailPath = '/pay-detail'
          } else if (item.loanStatus === 4 || item.loanStatus === 5) {
            item.detailPath = '/receive-lend'
          } else {
            item.detailPath = '/lend-current-detail'
          }
        })
      }
    }
  }
</script>