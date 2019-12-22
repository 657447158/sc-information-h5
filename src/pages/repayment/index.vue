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
      <span @click="appeal">申诉</span>
      <span class="btn2" @click="showRepaymentModal">我已还款</span>
    </div>
    <!-- 二维码弹框 -->
    <otc-modal :show="showCode" @hide="hideHandle" dir="none" className="code-modal">
      <img class="code-img" :src="codePath" />
    </otc-modal>
    <!-- 确认还款弹框 -->
    <otc-modal :show="showRepayment" @hide="hideHandle" dir="none" class="repayment-modal">
      <img class="repayment-modal-img" src="../../assets/images/icon-repayment.png" />
      <p class="p1">确认还款</p>
      <p class="p2">恶意提交未打款将限制法币交易</p>
      <p class="p3">我确认已经打款到对方的收款账号</p>
      <div class="btn confirm" @click="alreadyRepayment">确定</div>
      <div class="btn cancel" @click="hideHandle">取消</div>
    </otc-modal>
    <!-- 还款成功弹框 -->
    <success-modal
      :show="showSuccess"
      p1="还款成功"
      p2="轻松借贷，财富增值"
      @hideHandle="hideHandle"
      @confirmHandle="confirmHandle"
    />
    <!-- 申诉成功 -->
    <complain
      :show="showComplain"
      @confirmHandle="hideHandle"
    />
  </div>
</template>
<script>
  import SuccessModal from '@/widget/success.vue';
  import complain from '@/widget/complain.vue';
  export default {
    components: {
      SuccessModal,
      complain
    },
    data () {
      return {
        detail: {},
        loanOrderId: this.$route.query.loanOrderId,
        showCode: false,
        codePath: '',
        showRepayment: false,
        showSuccess: false,
        showComplain: false
      }
    },
    created () {
      this.gotoRepayment()
    },
    methods: {
      hideHandle () {
        this.showCode = false
        this.showRepayment = false
        this.showSuccess = false
        this.showComplain = false
      },
      showHandle (codePath) {
        this.codePath = codePath
        this.showCode = true
      },
      showRepaymentModal () {
        this.showRepayment = true
      },
      showComplainModal () {
        this.hideHandle()
        this.showComplain = true
      },
      confirmHandle () {
        this.$router.push('/index/borrow')
      },
      gotoRepayment () {
        this.Ajax.gotoRepayment({
          loanOrderId: this.loanOrderId
        }).then(res => {
          if (res.success) {
            this.detail = res.data
          }
        })
      },
      // 我已还款
      alreadyRepayment () {
        this.Ajax.alreadyRepayment({
          loanOrderId: this.loanOrderId
        }).then(res => {
          if (res.success) {
            this.hideHandle()
            this.showSuccess = true
          }
        }).catch(err => {
          this.Toast({
            message: err.message
          })
        })
      },
      // 申诉
      appeal () {
        this.Ajax.appeal({
          loanOrderId: this.loanOrderId,
          appealType: '20'
        }).then(res => {
          if (res.success) {
            this.showComplainModal()
          } else {
            this.Toast({
              message: res.message
            })
          }
        }).catch(err => {
          this.Toast({
            message: err.message
          })
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
      .icon-alipay {
        margin-right: 10px;
        width: 32px;
        height: 32px;
        background: url('../../assets/images/alipay.png') no-repeat center / 100% 100%;
      }
      .icon-card {
        margin-right: 10px;
        width: 42px;
        height: 32px;
        background: url('../../assets/images/card.png') no-repeat center / 100% 100%;
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
      transform: translate(-50%, -50%);
    }
    /deep/ .code-modal {
      .otc-modal-content {
        max-width: 647px;
      }
      .code-img {
        width: 100%;
        height: 100%;
      }
    }
    /deep/ .repayment-modal {
      .otc-modal-content {
        padding: 55px 0 0 0;
        width: 571px;
        height: 711px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
      }
      &-img {
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
        background:rgba(25,204,193,1);
        box-shadow: 0px 8px 11px 0px rgba(25,204,193,0.21);
      }
      .cancel {
        margin-top: 34px;
        color: $fc02;
        border: 1px solid #E4E4E4;
      }
    }
  }
</style>