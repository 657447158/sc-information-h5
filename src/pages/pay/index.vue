<template>
  <div class="pay">
    <p class="pay-tips">为保障转账顺利成功,请勿备注比特币,虚拟币等信息,扫码支付时,请留意对方收款码与姓名昵称与本页面一致</p>
    <div class="pay-title">
      <span class="select-icon active"></span>
      <span>付款方式</span>
    </div>
    <p class="pay-sub-title">请通过以下方式向对方付款</p>
    <div class="pay-list">
      <div class="pay-list-item" v-if="detail.bankPayFlag === 1">
        <div class="top">
          <span class="icon-card"></span>
          <span>银行卡</span>
        </div>
        <div class="bottom" @click="choosePayType(0)">
          <span class="select-icon" :class="typeIndex === 0 && 'active'"></span>
          <div class="bottom-info bottom-card">
            <div class="bottom-info-item">
              <span class="label">对方姓名：</span>
              <span>{{detail.bankRealName}}</span>
            </div>
            <div class="bottom-info-item">
              <span class="label">银行名：</span>
              <span>{{detail.bankSubBranch}}</span>
            </div>
            <div class="bottom-info-item">
              <span class="label">银行卡号：</span>
              <span>{{detail.bankCardNumber}}</span>
            </div>
            <div class="bottom-info-item">
              <span class="label">转帐金额：</span>
              <span>{{detail.loanAllNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pay-list-item" v-if="detail.aliPayFlag === 1">
        <div class="top">
          <span class="icon-alipay"></span>
          <span>支付宝</span>
        </div>
        <div class="bottom" @click="choosePayType(1)">
          <span class="select-icon" :class="typeIndex === 1 && 'active'"></span>
          <div class="bottom-info bottom-alipay">
            <div class="bottom-info-item">
              <span class="label">对方姓名：</span>
              <span>{{detail.aliRealName}}</span>
            </div>
            <div class="bottom-info-item">
              <span class="label">支付宝号：</span>
              <span>{{detail.aliNo}}</span>
            </div>
            <div class="bottom-info-item">
              <span class="label">转帐金额：</span>
              <span>{{detail.loanAllNum}}</span>
            </div>
            <span class="code-img" @click.stop="showHandle(detail.aliPaymentCode)"></span>
          </div>
        </div>
      </div>
      <div class="pay-list-item" v-if="detail.wxPayFlag === 1">
        <div class="top">
          <span class="icon-wx"></span>
          <span>微信</span>
        </div>
        <div class="bottom" @click="choosePayType(2)">
          <span class="select-icon" :class="typeIndex === 2 && 'active'"></span>
          <div class="bottom-info bottom-wx">
            <div class="bottom-info-item">
              <span class="label">对方姓名：</span>
              <span>{{detail.wxRealName}}</span>
            </div>
            <div class="bottom-info-item">
              <span class="label">微信账号：</span>
              <span>{{detail.wxNo}}</span>
            </div>
            <div class="bottom-info-item">
              <span class="label">转帐金额：</span>
              <span>{{detail.loanAllNum}}</span>
            </div>
            <span class="code-img" @click.stop="showHandle(detail.wxPaymentCode)"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 二维码弹窗 -->
    <otc-modal :show="showCode" @hide="hideHandle" dir="none">
      <img :src="codePath" />
    </otc-modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loanOrderId: this.$route.query.loanOrderId,
        showCode: false,
        codePath: '',
        typeIndex: 0,
        detail: {}
      }
    },
    created () {
      this.gotoPay()
    },
    methods: {
      hideHandle () {
        this.showCode = false
      },
      showHandle (codePath) {
        this.codePath = codePath
        this.showCode = true
      },
      choosePayType (index) {
        this.typeIndex = index
      },
      gotoPay () {
        this.Ajax.gotoPay({
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
  .pay {
    padding: 40px 30px 48px 24px;
    .select-icon {
      position: relative;
      margin-right: 12px;
      width: 20px;
      height: 20px;
      background: #D9D9D9;
      border-radius: 50%;
      &::after {
        content: '';
        position: absolute;
        top: 6px;
        left: 6px;
        display: block;
        width: 8px;
        height: 8px;
        background: $bg01;
        border-radius: 50%;
      }
      &.active {
        background: #757F7E;
      }
    }
    &-tips {
      font-size: 22px;
      color: #FE4D4D;
      line-height: 1.5;
    }
    &-title {
      margin-top: 38px;
      display: flex;
      align-items: center;
      font-size: 28px;
      color: $fc02;
    }
    &-sub-title {
      margin-top: 24px;
      font-size: 24px;
      color: $fc04;
    }
    &-list {
      margin-top: 68px;
      &-item {
        margin-bottom: 35px;
        &:last-child { margin-bottom: 0; }
      }
      .top {
        margin-bottom: 36px;
        display: flex;
        align-items: flex-start;
        font-size: 28px;
        color: $fc02;
      }
      .icon-card {
        margin-right: 22px;
        width: 42px;
        height: 32px;
        background: url('../../assets/images/card.png') no-repeat center / 100% 100%;
      }
      .icon-alipay {
        margin-right: 22px;
        width: 32px;
        height: 32px;
        background: url('../../assets/images/alipay.png') no-repeat center / 100% 100%;
      }
      .icon-wx {
        margin-right: 22px;
        width: 31px;
        height: 32px;
        background: url('../../assets/images/wx.png') no-repeat center / 100% 100%;
      }
      .bottom {
        position: relative;
        display: flex;
        align-items: center;
        &-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px 0 0 54px;
          width: 643px;
          height: 281px;
          font-size: 24px;
          color: $fc10;
          &-item {
            margin-bottom: 30px;
            &:last-child { margin-bottom: 30px; }
          }
        }
        &-card {
          background: url('../../assets/images/pay-card-bg.png') no-repeat center / 100% 100%;
        }
        &-alipay {
          background: url('../../assets/images/pay-alipay-bg.png') no-repeat center / 100% 100%;
        }
        &-wx {
          background: url('../../assets/images/pay-wx-bg.png') no-repeat center / 100% 100%;
        }
        .label {
          color: rgba(255, 255, 255, .5);
        }
      }
      .code-img {
        position: absolute;
        top: 95px;
        right: 58px;
        width: 85px;
        height: 85px;
        background: url('../../assets/images/pay-type-code.png') no-repeat center / 100% 100%;
      }
    }
    /deep/ .otc-modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 647px;
      // height: 400px;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>