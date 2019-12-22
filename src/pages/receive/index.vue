<template>
  <div class="receive">
    <div class="receive-top">
      <div class="receive-top-item receive-top-item1">
        <span>单号：{{detail.orderId}}</span>
        <span>对方姓名：{{detail.userName}}</span>
      </div>
      <div class="receive-top-item receive-top-item2">
        <span>借入总额(CNY)</span>
        <span>利息(CNY)</span>
        <span>应还本息(CNY)</span>
      </div>
      <div class="receive-top-item receive-top-item3">
        <span>{{detail.loanNum}}</span>
        <span>{{detail.loanInterest}}</span>
        <span>{{detail.loanAllNum}}</span>
      </div>
    </div>
    <div class="receive-box">
      <div class="receive-box-item">
        <span>质押率</span>
        <span class="val">{{detail.pledgeRateDesc}}</span>
      </div>
      <div class="receive-box-item">
        <span>日息率</span>
        <span class="val">{{detail.dailyRateDesc}}</span>
      </div>
      <div class="receive-box-item">
        <span>参考年华</span>
        <span class="val">{{detail.annualizedRateDesc}}</span>
      </div>
    </div>
    <div class="receive-bottom">
      <div class="receive-bottom-title">
        <span class="icon"></span>
        <span>借款周期</span>
        <span class="period">{{detail.loanPeriod}}天</span>
      </div>
      <div class="receive-bottom-box">
        <p>待收款</p>
        <div class="progress" :style="`--percent: ${detail.passDay / detail.loanPeriod * 100}%`">
          <span class="dot-active"></span>
          <span class="dot dot1"></span>
          <span class="line"></span>
          <span class="dot dot2"></span>
        </div>
      </div>
      <div class="receive-bottom-label">
        <span>借贷成交时间</span>
        <span>借贷还款时间</span>
      </div>
    </div>
    <div class="receive-confirm" @click="showPswHandle">确认收款</div>
    <div class="receive-btn-box">
      <div class="btn" @click="appeal">我要申诉</div>
      <div class="btn" @click="showModalHandle">撤销订单</div>
    </div>
    <!-- 密码框 -->
    <otc-modal :show="showPwdModal" @hide="hideModalHandle" dir="none" className="pwd-modal">
      <div class="pass-box">
        <h5>请输入支付密码</h5>
        <p>确认收款后，抵押资产将释放给对方</p>
        <PasswordBox @getPwd="checkPassword"/>
        <p class="tips">忘记密码？</p>
      </div>
    </otc-modal>
    <!-- 撤销订单弹窗 -->
    <otc-modal :show="showModal" @hide="hideModalHandle" dir="none" className="cancel-modal">
      <div class="cancel">
        <span class="icon"></span>
        <p class="p1">撤销订单</p>
        <p class="p2">撤单后交易取消</p>
        <p class="p3">我确定没有付款,撤单后也没有付款</p>
        <div class="confirm-btn btn" @click="borrowOrderCancel">确定</div>
        <div class="cancel-btn btn" @click="hideModalHandle">取消</div>
      </div>
    </otc-modal>
    <!-- 成功 -->
    <success-modal
      :show="showSuccess"
      :p1="p1"
      :p2="p2"
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
        showModal: false,
        showSuccess: false,
        showComplain: false,
        p1: '撤销成功',
        p2: '老板继续再来一单'
      }
    },
    created () {
      this.getBorrowReceivableDetail()
    },
    methods: {
      hideModalHandle () {
        this.showPwdModal = false
        this.showModal = false
        this.showSuccess = false
        this.showComplain = false
      },
      showPswHandle () {
        this.hideModalHandle()
        this.showPwdModal = true
      },
      showModalHandle () {
        this.hideModalHandle()
        this.showModal = true
      },
      showComplainModal () {
        this.hideModalHandle()
        this.showComplain = true
      },
      confirmHandle () {
        this.hideModalHandle()
        this.$router.go(-1)
      },
      // 获取支付凭证
      checkPassword (pwd) {
        this.Ajax.checkUserPayPassword({
          payPassword: pwd
        }).then(res => {
          if (res.success) {
            this.sureBorrowReceivable(res.data)
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
      getBorrowReceivableDetail () {
        this.Ajax.getBorrowReceivableDetail({
          loanOrderId: this.loanOrderId
        }).then(res => {
          if (res.success) {
            this.detail = res.data
          }
        })
      },
      // 确认收款
      sureBorrowReceivable ({payCertificate, payTimestamps}) {
        this.Ajax.sureBorrowReceivable({
          loanOrderId: this.loanOrderId,
          payCertificate,
          payTimestamps
        }).then(res => {
          if (res.success) {
            this.hideModalHandle()
            this.p1 = '收款成功'
            this.p2 = '恭喜老板坐等财富增值'
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
      // 撤销订单
      borrowOrderCancel () {
        this.Ajax.borrowOrderCancel({
          loanOrderId: this.loanOrderId
        }).then(res => {
          if (res.success) {
            this.p1 = '撤销成功'
            this.p2 = '老板继续再来一单'
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
  .receive {
    min-height: 100vh;
    background: $bg01;
    &-top {
      padding: 42px 20px 0; 
      width: 100vw;
      height: 323px;
      color: $fc10;
      font-size: 24px;
      background:rgba(25,204,193,1);
      box-shadow: 0px 3px 7px 0px rgba(25,204,193,0.52);
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &2 {
          margin-top: 52px;
        }
        &3 {
          margin-top: 36px;
          font-size: 36px;
        }
      }
    }
    &-box {
      margin: -84px auto 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 710px;
      height: 163px;
      background: $bg01;
      box-shadow:0px 4px 7px 1px rgba(90,90,90,0.06);
      border-radius:10px;
      &-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(100% / 3);
        font-size: 24px;
        color: $fc03;
        &~& {
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            display: block;
            width: 2px;
            height: 56px;
            transform: translateY(-50%);
            background: $fc04;
            opacity: .35;
          }
        }
      }
      .val {
        margin-top: 30px;
        font-size: 30px;
        color: $fc02;
      }
    }
    &-bottom {
      margin-top: 70px;
      padding: 0 20px;
      &-title {
        display: flex;
        align-items: center;
        font-size: 28px;
        color: $fc02;
        .icon {
          position: relative;
          margin-right: 12px;
          width: 20px;
          height: 20px;
          background: #757F7E;
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
        }
        .period {
          margin-left: 24px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          color: $fc10;
          font-size: 20px;
          background: $fc01;
          border-radius: 16px 16px 16px 0;
        }
      }
      &-box {
        margin-top: 36px;
        padding: 0 36px;
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 74px;
          height: 40px;
          font-size: 20px;
          color: $fc10;
          background: $bg02;
          border-radius: 8px;
        }
        .progress {
          position: relative;
          margin-top: 32px;
          display: flex;
          align-items: center;
        }
        .dot {
          position: absolute;
          width: 16px;
          height: 16px;
          background: #D8D8D8;
          border-radius: 50%;
          &1 {
            left: 0;
            background: $bg02;
          }
          &2 {
            right: 0;
          }
        }
        .line {
          position: relative;
          width: 100%;
          height: 2px;
          background: #D8D8D8;
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: var(--percent);
            height: 2px;
            background: $bg02;
          }
        }
        .dot-active {
          position: absolute;
          top: 50%;
          left: calc(var(--percent) - 18px);
          z-index: 9;
          display: block;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid $fc01;
          transform: translateY(-50%);
          background: $bg01;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            width: 20px;
            height: 20px;
            background: $bg02;
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      &-label {
        margin-top: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 22px;
        color: $fc02;
      }
    }
    &-confirm {
      margin: 58px auto 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      width:710px;
      height: 80px;
      color: $fc10;
      font-size: 30px;
      background: $bg02;
      border-radius: 10px;
      &:active {
        opacity: .8;
      }
    }
    &-btn-box {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 316px;
        height: 80px;
        background: $bg01;
        font-size: 30px;
        color: $fc03;
        border: 1px solid #E8E8E8;
        border-radius: 10px;
      }
    }
    .cancel-modal {
      /deep/ .otc-modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 570px;
        height: 710px;
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
          font-size: 26px;
          color: $fc03;
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