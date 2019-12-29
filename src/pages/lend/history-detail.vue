<template>
  <div class="detail">
    <div class="detail-top">
      <div class="detail-top-box">
        <p class="title">借出金额CNY</p>
        <p class="total">{{detail.loanNum}}</p>
        <div class="infos">
          <div class="infos-item">
            <p>到期利息(CNY)</p>
            <p class="val">{{detail.loanInterest}}</p>
          </div>
          <div class="infos-item">
            <p>到期本息(CNY)</p>
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
        <span class="label">还款日期</span>
        <span>{{detail.repaymentDate}}</span>
      </div>
    </div>
    <div class="detail-pay">
      <span class="label">支付方式</span>
      <div class="detail-pay-right">
        <div class="item" v-if="detail.wxPayFlag === 1">
          <span class="icon-wx"></span>
          <span>微信</span>
        </div>
        <div class="item" v-if="detail.aliPayFlag === 1">
          <span class="icon-alipay"></span>
          <span>支付宝</span>
        </div>
        <div class="item" v-if="detail.bankPayFlag === 1">
          <span class="icon-card"></span>
          <span>银行卡</span>
        </div>
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
      this.getMyLendOrderDetail()
    },
    methods: {
      getMyLendOrderDetail () {
        this.Ajax.getMyLendOrderDetail({
          loanOrderId: this.$route.query.loanOrderId
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
      background: url('../../assets/images/top-bg-lend.png') no-repeat top center / 100% 315px;
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
      color: $fc04;
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
    &-pay {
      margin: 32px auto 0;
      padding: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 710px;
      font-size: 24px;
      color: $fc03;
      background: $bg01;
      border-radius: 5px;
      &-right {
        display: flex;
        align-items: center;
      }
      .item {
        display: flex;
        align-items: center;
        &~.item {
          margin-left: 20px;
        }
      }
      .icon-wx {
        margin-right: 8px;
        width: 30px;
        height: 31px;
        background: url('../../assets/images/wx.png') no-repeat center / 100% 100%;
      }
      .icon-alipay {
        margin-right: 8px;
        width: 32px;
        height: 32px;
        background: url('../../assets/images/alipay.png') no-repeat center / 100% 100%;
      }
      .icon-card {
        margin-right: 8px;
        width: 42px;
        height: 32px;
        background: url('../../assets/images/card.png') no-repeat center / 100% 100%;
      }
    }
  }
</style>