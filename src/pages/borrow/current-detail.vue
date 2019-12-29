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
        <div
          class="cover"
          v-if="detail.coverFlag === '1' && (detail.loanStatus === 3 || detail.loanStatus === 4 || detail.loanStatus === 9)"
          @click="showCoverModalHandle"
        >去补仓</div>
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
    <div class="detail-complaint">
      <span class="label">申诉</span>
      <span class="link" @click="appeal">去申诉</span>
    </div>
    <router-link
      class="detail-btn"
      :to="{path: '/repayment', query: {loanOrderId}}"
      v-if="detail.loanStatus === 3 || detail.loanStatus === 4 || detail.loanStatus === 9"
    >去还款</router-link>
    <!-- 补仓弹窗 -->
    <otc-modal :show="showCoverModal" @hide="hideModalHandle" dir="none" class="cover-modal">
      <div class="cover-modal-ct">
        <p class="cover-modal-ct-title">去补仓</p>
        <p class="cover-modal-ct-sub-title">由于市场币价格波动，需要您补仓！</p>
        <div class="cover-modal-ct-box">
          <p>{{coverAmount}}</p>
          <span>{{detail.pledgeName}}</span>
        </div>
        <div class="cover-modal-ct-btn" @click="showPswHandle">确认补仓</div>
        <p class="cover-modal-ct-tips">市场有风险投资需谨慎</p>
      </div>
    </otc-modal>
    <!-- 密码框 -->
    <otc-modal :show="showPwdModal" @hide="hideModalHandle" dir="none" className="pwd-modal">
      <div class="pass-box">
        <h5>请输入支付密码</h5>
        <p>共需支付<span>{{coverAmount}}</span><span class="coin-name">{{detail.pledgeName}}</span></p>
        <PasswordBox @getPwd="checkPassword"/>
        <p class="tips">忘记密码？</p>
      </div>
    </otc-modal>
    <!-- 成功 -->
    <success-modal
      :show="showSuccess"
      p1="补仓成功"
      p2="恭喜老板坐等财富增值"
      @hideHandle="hideModalHandle"
      @confirmHandle="confirmHandle"
    />
    <!-- 申诉成功 -->
    <complain
      :show="showComplain"
      @confirmHandle="hideModalHandle"
    />
  </div>
</template>
<script>
  import PasswordBox from '@/widget/passwordBox.vue';
  import SuccessModal from '@/widget/success.vue';
  import complain from '@/widget/complain.vue';
  export default {
    components: {
      PasswordBox,
      SuccessModal,
      complain
    },
    data () {
      return {
        loanOrderId: this.$route.query.loanOrderId,
        detail: {},
        showPwdModal: false,
        showCoverModal: false,
        showSuccess: false,
        showComplain: false,
        coverAmount: 0
      }
    },
    created () {
      this.getMyBorrowOrderDetail()
    },
    methods: {
      hideModalHandle () {
        this.showPwdModal = false
        this.showCoverModal = false
        this.showSuccess = false
        this.showComplain = false
      },
      confirmHandle () {
        this.hideModalHandle()
      },
      showPswHandle () {
        this.hideModalHandle()
        this.showPwdModal = true
      },
      showCoverModalHandle () {
        this.hideModalHandle()
        this.getCoverCoinNum()
        this.showCoverModal = true
      },
      showComplainModal () {
        this.hideModalHandle()
        this.showComplain = true
      },
      getMyBorrowOrderDetail () {
        this.Ajax.getMyBorrowOrderDetail({
          loanOrderId: this.loanOrderId
        }).then(res => {
          if (res.success) {
            this.detail = res.data
          }
        })
      },
      // 获取补仓金额
      getCoverCoinNum () {
        this.Ajax.getCoverCoinNum({
          loanOrderId: this.loanOrderId
        }).then(res => {
          if (res.success) {
            this.coverAmount = res.data
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
      },
      // 确认补仓
      gotoCover ({payCertificate, payTimestamps}) {
        this.Ajax.gotoCover({
          loanOrderId: this.loanOrderId,
          coverAmount: this.coverAmount,
          payCertificate,
          payTimestamps
        }).then(res => {
          if (res.success) {
            this.hideModalHandle()
            this.showSuccess = true
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
      },
      // 获取支付凭证
      checkPassword (pwd) {
        this.Ajax.checkUserPayPassword({
          payPassword: pwd
        }).then(res => {
          if (res.success) {
            this.gotoCover(res.data)
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
    padding-bottom: 95px;
    min-height: 100vh;
    &-top {
      width: 100vw;
      height: 370px;
      background: url('../../assets/images/top-bg.png') no-repeat top center / 100% 315px;
      overflow: hidden;
      &-box {
        position: relative;
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
      .cover {
        position: absolute;
        top: 48px;
        right: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        width:140px;
        height:60px;
        color: $fc10;
        font-size: 24px;
        background:rgba(25,204,193,1);
        box-shadow:0px 1px 6px 0px rgba(45,199,178,0.52);
        border-radius:30px;
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
      .label {
        font-size: 28px;
        color: $fc02;
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
    &-complaint {
      margin: 32px auto 0;
      padding: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 710px;
      font-size: 28px;
      color: $fc02;
      background: $bg01;
      border-radius: 5px;
      .link {
        color: $fc01;
      }
    }
    &-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width:750px;
      height:95px;
      font-size: 30px;
      color: $fc10;
      background: $bg02;
      &:active {
        background: $themeColorOpacity;
      }
    }
    .cover-modal {
      /deep/ .otc-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 571px;
        height: 644px;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        background: url('../../assets/images/cover-modal-bg.png') no-repeat center / 100% 100%;
      }
      &-ct {
        padding: 56px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-title {
          font-size: 36px;
          color: $fc10;
        }
        &-sub-title {
          margin-top: 108px;
          font-size: 24px;
          color: $fc03;
        }
        &-box {
          margin-top: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 60px;
          width:496px;
          height:85px;
          font-size: 24px;
          color: $fc03;
          background:#F4F4F4;
          input {
            width: 300px;
            height: 100%;
          }
        }
        &-btn {
          margin-top: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          width:422px;
          height:90px;
          font-size: 28px;
          color: $fc10;
          background:rgba(45,199,177,1);
          box-shadow:0px 8px 11px 0px rgba(45,199,177,0.21);
          border-radius:45px;
        }
        &-tips {
          margin-top: 50px;
          font-size: 24px;
          color: $fc04;
        }
      }
    }
    .pwd-modal {
      /deep/ .otc-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        padding-top: 80px;
        width: 671px;
        height: 520px;
        text-align: center;
        background: $bg01;
        border-radius: 20px;
        transform: translate(-50%, -50%);
      }
      /deep/ .pass-box {
        h5 {
          margin-bottom: 46px;
          font-size: 40px;
          color: $fc02;
        }
        p {
          margin-bottom: 66px;
          font-size: 30px;
          color: #181818;
        }
        .coin-name {
          color: $fc01;
        }
        .tips {
          margin-top: 56px;
          font-size: 26px;
          color: $fc03;
        }
      }
    }
  }
</style>