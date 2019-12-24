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
    <div class="pay-btn" @click="showPayModal">我已付款</div>
    <!-- 二维码弹窗 -->
    <otc-modal :show="showCode" @hide="hideHandle" dir="none">
      <img :src="codePath" />
    </otc-modal>
    <!-- 确认付款弹框 -->
    <otc-modal :show="showPay" @hide="hideHandle" dir="none" class="pay-modal">
      <img class="pay-modal-img" src="../../assets/images/icon-repayment.png" />
      <p class="p1">确认付款</p>
      <p class="p2">恶意提交未打款将限制法币交易</p>
      <p class="p3">我确认已经打款到对方的收款账号</p>
      <div class="btn confirm" @click="finishPay">确定</div>
      <div class="btn cancel" @click="hideHandle">取消</div>
    </otc-modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loanOrderId: this.$route.query.loanOrderId,
        showCode: false,
        showPay: false,
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
        this.showPay = false
      },
      showHandle (codePath) {
        this.codePath = codePath
        this.showCode = true
      },
      showPayModal () {
        this.hideHandle()
        this.showPay = true
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
      },
      finishPay () {
        this.Ajax.finishPay({
          loanOrderId: this.loanOrderId
        }).then(res => {
          this.hideHandle()
          this.Toast({
            message: res.message
          })
          if (res.success) {
            setTimeout(() => {
              this.$router.push({path: '/pay-detail', query: {loanOrderId: this.loanOrderId}})
            }, 2000)
          }
        }).catch(err => {
          this.hideHandle()
          this.Toast({
            message: err.message
          })
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
    &-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height:98px;
      font-size: 30px;
      color: $fc10;
      background:rgba(56,138,244,1);
      border:0px solid rgba(0,0,0,1);
      &:active {
        opacity: .8;
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
    /deep/ .pay-modal {
      .otc-modal-content {
        padding: 55px 0 0 0;
        width: 571px;
        height: 711px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
      }
      &-img.pay-modal-img {
        width: 129px;
        height: 129px;
      }
      .p1 {
        margin-top: 5px;
        font-size: 36px;
        color: $fc02;
      }
      .p2 {
        margin-top: 50px;
        font-size: 24px;
        color: #FF4848;
      }
      .p3 {
        margin-top: 28px;
        font-size: 28px;
        color: $fc03;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width:422px;
        height:90px;
        font-size: 28px;
        color: $fc10;
        border-radius:45px;
      }
      .confirm {
        margin-top: 48px;
        background:#388AF4;
        box-shadow:0px 8px 11px 0px rgba(56,138,244,0.21);
      }
      .cancel {
        margin-top: 34px;
        color: $fc02;
        border: 1px solid #E4E4E4;
      }
    }
  }
</style>