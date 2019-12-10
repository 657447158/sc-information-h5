<template>
  <div class="detail">
    <div class="detail-top">
      <div class="detail-top-name">
        <span>借出人：{{detail.userName}}</span>
        <a class="icon-phone" :href="`tel:${detail.userMobile}`"></a>
      </div>
      <div class="detail-top-item">
        <span class="label">应还本息(CNY)</span>
        <span>{{detail.loanAllNum}}</span>
      </div>
      <div class="detail-top-item">
        <span class="label">应还利息(CNY)</span>
        <span>{{detail.loanInterest}}</span>
      </div>
      <div class="detail-top-item">
        <span class="label">开始日期</span>
        <span>{{detail.loanStartDate}}</span>
      </div>
      <div class="detail-top-item">
        <span class="label">到期还款日</span>
        <span>{{detail.loanEndDate}}</span>
      </div>
    </div>
    <div class="pay-type">
      <p class="pay-type-title">请向以下账户付款</p>
      <div class="pay-type-item" v-if="detail.wxPayFlag === 1">
        <div class="top">
          <span class="icon-wx"></span>
          <span>微信</span>
        </div>
        <div class="tr">
          <span class="label">姓名</span>
          <span>{{detail.wxRealName}}</span>
        </div>
        <div class="tr">
          <span class="label">微信账户</span>
          <span>{{detail.wxNo}}</span>
        </div>
        <div class="tr">
          <span class="label">二维码</span>
          <span class="icon-code" @click="showHandle(detail.wxPaymentCode)"></span>
        </div>
      </div>
      <div class="pay-type-item" v-if="detail.aliPayFlag === 1">
        <div class="top">
          <span class="icon-alipay"></span>
          <span>支付宝</span>
        </div>
        <div class="tr">
          <span class="label">姓名</span>
          <span>{{detail.aliRealName}}</span>
        </div>
        <div class="tr">
          <span class="label">支付宝账户</span>
          <span>{{detail.aliNo}}</span>
        </div>
        <div class="tr">
          <span class="label">二维码</span>
          <span class="icon-code" @click="showHandle(detail.aliPaymentCode)"></span>
        </div>
      </div>
      <div class="pay-type-item" v-if="detail.bankPayFlag === 1">
        <div class="top">
          <span class="icon-card"></span>
          <span>银行卡</span>
        </div>
        <div class="tr">
          <span class="label">姓名</span>
          <span>{{detail.bankRealName}}</span>
        </div>
        <div class="tr">
          <span class="label">银行卡号</span>
          <span>{{detail.bankCardNumber}}</span>
        </div>
      </div>
    </div>
    <div class="instructions">
      <p class="instructions-title">还款说明</p>
      <p class="txt">1、优投在线为你解答 P2P理财是指以公司为中介机构，把借贷双方对接起来实现各自的借贷需求。</p>
      <p class="txt">2、借款方可以是无抵押贷款或是有抵押贷款。而中介一般是收取双方或单方的手续费为盈利目的或者是挣钱一定息差为盈利目的的新型理财模式。</p>
    </div>
    <div class="detail-bottom">
      <span>申诉</span>
      <span class="btn2">我已还款</span>
    </div>
    <otc-modal :show="showCode" @hide="hideHandle" dir="none">
      <img :src="detail.wxPaymentCode" alt="">
    </otc-modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        detail: {},
        loanOrderId: this.$route.query.loanOrderId,
        showCode: false,
        codePath: ''
      }
    },
    created () {
      this.gotoRepayment()
    },
    methods: {
      hideHandle () {
        this.showCode = false
      },
      showHandle (codePath) {
        this.codePath = codePath
        this.showCode = true
      },
      gotoRepayment () {
        this.Ajax.gotoRepayment({
          loanOrderId: this.loanOrderId
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
    padding: 24px 20px 98px;
    min-height: 100vh;
    background: $bg01;
    &-top {
      position: relative;
      padding: 42px 16px 42px 42px;
      width: 100%;
      height: 355px;
      background: $bg01;
      box-shadow: 0px 6px 31px 4px rgba(151,151,151,0.17);
      border-radius: 5px;
      overflow: hidden;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 5px;
        height: 100%;
        background: $bg02;
      }
      &-name {
        margin-bottom: 52px;
        display: flex;
        align-items: center;
        font-size: 28px;
        color: $fc02;
      }
      .icon-phone {
        margin-left: 32px;
        width: 26px;
        height: 27px;
        background: url('../../assets/images/icon-phone.png') no-repeat center / 100% 100%;
      }
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        color: $fc02;
        &~& {
          margin-top: 28px;
        }
      }
      .label {
        font-size: 26px;
        color: $fc04;
      }
    }
    .pay-type {
      margin-top: 70px;
      padding: 0 12px;
      color: $fc02;
      font-size: 24px;
      &-title {
        font-size: 28px;
      }
      &-item {
        margin-top: 36px;
        padding-bottom: 50px;
        border-bottom: 1px solid #F2F2F2;
      }
      .top {
        margin-bottom: 32px;
        display: flex;
        align-items: center;
      }
      .tr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &~.tr {
          margin-top: 24px;
        }
      }
      .label {
        color: $fc04;
      }
      .icon-code {
        width: 24px;
        height: 24px;
        background: url('../../assets/images/icon-code.png') no-repeat center / 100% 100%;
      }
      .icon-wx {
        margin-right: 10px;
        width: 30px;
        height: 31px;
        background: url('../../assets/images/wx.png') no-repeat center / 100% 100%;
      }
    }
    .instructions {
      padding: 42px 12px 0;
      color: $fc02;
      font-size: 24px;
      &-title {
        font-size: 26px;
      }
      .txt {
        margin-top: 32px;
        color: $fc04;
        line-height: 1.5;
      }
    }
    &-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      width: 100vw;
      height: 98px;
      color: $fc01;
      background: #F1F1F1;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50vw;
        height: 98px;
        font-size: 30px;
      }
      .btn2 {
        color: $fc10;
        background: $bg02;
        &:active {
          background: $themeColorOpacity;
        }
      }
    }

    /deep/ .otc-modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      height: 400px;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>