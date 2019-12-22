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
        <span class="label">拾合年华(%)</span>
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
    <div class="detail-complaint">
      <span class="label">申诉</span>
      <span class="link" @click="appeal">去申诉</span>
    </div>
    <div class="detail-btn" @click="showModalHandle" v-if="loanStatus === 1">撤销</div>
    <!-- 撤销订单弹窗 -->
    <otc-modal :show="showModal" @hide="hideModalHandle" dir="none" className="cancel-modal">
      <div class="cancel">
        <span class="icon"></span>
        <p class="p1">撤销挂单</p>
        <p class="p2">撤单后交易取消</p>
        <div class="confirm-btn btn" @click="cancelMyPublishBorrow">确定</div>
        <div class="cancel-btn btn" @click="hideModalHandle">取消</div>
      </div>
    </otc-modal>
    <!-- 成功 -->
    <success-modal
      :show="showSuccess"
      p1="撤销成功"
      p2="老板继续再来一单"
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
  import SuccessModal from '@/widget/success.vue';
  import complain from '@/widget/complain.vue';
  export default {
    components: {
      SuccessModal,
      complain
    },
    data () {
      return {
        borrowId: this.$route.query.loanId,
        detail: {},
        loanStatus: '',
        showModal: false,
        showSuccess: false,
        showComplain: false
      }
    },
    created () {
      this.getMyPublishBorrowDetail()
    },
    methods: {
      showModalHandle () {
        this.showModal = true
      },
      hideModalHandle () {
        this.showModal = false
        this.showSuccess = false
        this.showComplain = false
      },
      confirmHandle () {
        this.showSuccess = false
        this.$router.go(-1)
      },
      showComplainModal () {
        this.hideModalHandle()
        this.showComplain = true
      },
      getMyPublishBorrowDetail () {
        this.Ajax.getMyPublishBorrowDetail({
          borrowId: this.borrowId
        }).then(res => {
          if (res.success) {
            this.detail = res.data
            this.loanStatus = res.data.loanStatus
          }
        })
      },
      // 撤销订单
      cancelMyPublishBorrow () {
        this.Ajax.cancelMyPublishBorrow({
          borrowId: this.borrowId
        }).then(res => {
          if (res.success) {
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
      // 申诉
      appeal () {
        this.Ajax.appeal({
          loanId: this.borrowId,
          appealType: '10'
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
    .cancel-modal {
      /deep/ .otc-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 570px;
        height: 640px;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        .cancel {
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon {
            margin-top: 53px;
            width: 131px;
            height: 131px;
            background: url('../../assets/images/icon-cancel.png') no-repeat center / 100% 100%;
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
            width: 422px;
            height: 90px;
            font-size: 28px;
            border-radius: 45px;
            &:active {
              opacity: .8;
            }
          }
          .confirm-btn {
            margin-top: 47px;
            color: $fc10;
            background:rgba(25,204,193,1);
            box-shadow: 0px 8px 11px 0px rgba(25,204,193,0.21);
          }
          .cancel-btn {
            margin-top: 34px;
            color: $fc02;
            background:rgba(255,255,255,1);
            border:1px solid rgba(228, 228, 228, 1);
          }
        }
      }
    }
  }
</style>