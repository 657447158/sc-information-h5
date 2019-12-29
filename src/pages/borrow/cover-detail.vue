<template>
  <div class="detail">
    <div class="detail-top">
      <div class="detail-top-box">
        <p class="title">借入金额CNY</p>
        <p class="total">{{detail.loanNum}}</p>
        <div class="infos">
          <div class="infos-item">
            <p>利息(CNY)</p>
            <p class="val">{{detail.loanInterest}}</p>
          </div>
          <div class="infos-item">
            <p>应还本息(CNY)</p>
            <p class="val">{{detail.loanAllNum}}</p>
          </div>
          <div class="infos-item">
            <p>借款周期(天)</p>
            <p class="val">{{detail.loanPeriod}}天</p>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-ct">
      <div class="detail-ct-item">
        <span class="label">抵押</span>
        <span>{{detail.pledgeNumDesc}}</span>
      </div>
      <div class="detail-ct-item">
        <span class="label">日利率(%)</span>
        <span>{{detail.dailyRateDesc}}</span>
      </div>
      <div class="detail-ct-item">
        <span class="label">折合年化(%)</span>
        <span>{{detail.annualizedRateDesc}}</span>
      </div>
      <div class="detail-ct-item">
        <span class="label">借款周期</span>
        <span>{{detail.loanPeriod}}天</span>
      </div>
      <div class="detail-ct-item">
        <span class="label">开始日期</span>
        <span>{{detail.loanStartDate}}</span>
      </div>
      <div class="detail-ct-item">
        <span class="label">到期还款日</span>
        <span>{{detail.loanEndDate}}</span>
      </div>
      <div class="detail-ct-item">
        <span class="label">补仓数量</span>
        <span>{{detail.coverNum}}{{detail.coverCoinName}}</span>
      </div>
      <div class="detail-ct-item">
        <span class="label">补仓日期</span>
        <span>{{detail.coverDate}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        detail: {}
      }
    },
    created () {
      this.getCoverDetail()
    },
    methods: {
      getCoverDetail () {
        this.Ajax.getCoverDetail({
          coverId: this.$route.query.coverId
        }).then(res => {
          if (res.success) {
            this.detail = res.data
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .detail {
    &-top {
      width: 100vw;
      height: 370px;
      background: url('../../assets/images/top-bg.png') no-repeat top center / 100% 315px;
      overflow: hidden;
      &-box {
        margin: 70px auto 0;
        padding: 42px 34px 0 34px;
        width: 710px;
        height: 300px;
        background: $bg01;
        border-radius:5px;
      }
      .title {
        margin-bottom: 28px;
        font-size: 30px;
        color: $fc02;
      }
      .total {
        margin-bottom: 36px;
        display: block;
        width: 100%;
        font-size: 36px;
        color: #FF4D07;
      }
      .icon {
        margin-right: 20px;
        width: 50px;
        height: 50px;
      }
      .infos {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        color: $fc04;
        .val {
          margin-top: 24px;
          color: #003333;
        }
      }
    }
    &-ct {
      margin: 32px auto 0;
      padding: 42px 0;
      width: 710px;
      font-size: 24px;
      color: $fc02;
      background: $bg01;
      border-radius: 5px;
      &-item {
        padding: 0 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &~& {
          margin-top: 38px;
        }
      }
      .label {
        font-size: 28px;
      }
    }
  }
</style>