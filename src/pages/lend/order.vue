<template>
  <div class="order">
    <div class="order-top">
      <div class="order-top-box">
        <p class="title">借出金额CNY</p>
        <input class="total" type="number" v-model="total">
        <div class="controls">
          <div class="controls-item left">
            <span class="icon icon-minus" @click="minusTotal"></span>
            <span>最低{{detail.minQuota}}</span>
          </div>
          <div class="controls-item">
            <span class="icon icon-plus" @click="plusTotal"></span>
            <span>最高{{detail.maxQuota}}</span>
          </div>
        </div>
        <div class="infos">
          <div class="infos-item left">
            <p>到期收益(CNY)</p>
            <p class="val">{{calculateInterest}}</p>
          </div>
          <div class="infos-item">
            <p>到期应收本息(CNY)</p>
            <p class="val">{{total + calculateInterest}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="order-notice">
      <img class="icon-notice" src="../../assets/images/icon-notice.png" />
      <span>TA已质押{{detail.pledgeCoinName}}</span>
    </div>
    <div class="order-form">
      <div class="order-form-td order-form-td2">
        <div class="item1">
          <span>折合年化（%）</span>
          <span class="val">{{detail.annualizedRateDesc}}</span>
        </div>
        <div class="item1">
          <span>日息（%）</span>
          <span class="val">{{detail.dailyRateDesc}}</span>
        </div>
        <div class="item1">
          <span>借款周期（天）</span>
          <span class="val">{{detail.loanPeriod}}天</span>
        </div>
      </div>
      <div class="order-form-td order-form-td1">
        <div class="item">
          <span class="icon-select active" style="margin: 0 8px 0 0;"></span>
          <div>
            <span>我已阅读并同意</span>
            <a class="agreement" href="javascript:;">《LME法币借贷协议》</a>
          </div>
        </div>
      </div>
    </div>
    <div class="order-btn" @click="confirmOrder">借出</div>
    <!-- 确认借出订单信息 -->
    <transition name="fade">
      <div class="order-modal" v-show="orderShow">
        <div class="mask" @click="hideHandle"></div>
        <div class="order-modal-wrap">
          <p class="order-modal-title">确认借出订单信息</p>
          <div class="order-modal-item">
            <span class="label">借出金额：</span>
            <span class="val">{{total}}CNY</span>
          </div>
          <div class="order-modal-item">
            <span class="label">参考年化：</span>
            <span class="val">{{detail.annualizedRateDesc}}</span>
          </div>
          <div class="order-modal-item">
            <span class="label">参考日息：</span>
            <span class="val">{{detail.dailyRateDesc}}</span>
          </div>
          <div class="order-modal-item">
            <span class="label">借款周期：</span>
            <span class="val">{{detail.loanPeriod}}天</span>
          </div>
          <div class="order-modal-item">
            <span class="label">到期利息：</span>
            <span class="val">{{calculateInterest}}CNY</span>
          </div>
          <div class="order-modal-item">
            <span class="label">到期应收本息：</span>
            <span class="val">{{total + calculateInterest}}CNY</span>
          </div>
          <div class="order-modal-item">
            <span class="label">收款方式：</span>
            <span class="val">{{payTypeList}}</span>
          </div>
          <div class="order-modal-btn" @click="showPswHandle">确定</div>
          <p class="order-modal-tips">市场有风险投资需谨慎</p>
        </div>
      </div>
    </transition>
    <!-- 密码框 -->
    <otc-modal :show="showPwd" @hide="hideHandle" className="pwd-modal" dir="none">
      <div class="pass-box">
        <h5>请输入支付密码</h5>
        <!-- <p>共需支付<span>{{pledge}}</span><span class="coin-name">{{loanCoinList[coinIndex] && loanCoinList[coinIndex].coinName}}</span></p> -->
        <password-box @getPwd="checkPassword"></password-box>
        <p class="tips">忘记密码？</p>
      </div>
    </otc-modal>
  </div>
</template>
<script>
  import PwdBox from '../../widget/passwordBox'
  export default {
    components: {
      'password-box': PwdBox
    },
    data () {
      return {
        loanId: this.$route.query.loanId,
        orderShow: false,
        showPwd: false,
        total: 0,
        loanCoinList: [],
        coinIndex: 0,
        detail: {},
        pledge: 0,
        wxPayFlag: 1,
        aliPayFlag: 0,
        bankPayFlag: 0,
        payTypeList: ''
      }
    },
    computed: {
      /**
       * 利息 = 借贷金额 * 日利率 * 借贷周期
       */
      calculateInterest () {
        if (!Object.keys(this.detail).length) return 0
        return Number((this.total * this.detail.dailyRate * this.detail.loanPeriod).toFixed(2))
      }
    },
    created () {
      this.getLoanDetail()
    },
    methods: {
      hideHandle () {
        this.orderShow = false
        this.showPwd = false
      },
      showOrderHandle () {
        this.hideHandle()
        let arr = []
        if (this.wxPayFlag === 1) {
          arr.push('微信')
        }
        if (this.aliPayFlag === 1) {
          arr.push('支付宝')
        }
        if (this.bankPayFlag === 1) {
          arr.push('银行卡')
        }
        this.payTypeList = arr.join('，')
        this.orderShow = true
      },
      showPswHandle () {
        this.hideHandle()
        this.showPwd = true
      },
      freshPage () {
        this.hideHandle()
      },
      getLoanDetail () {
        this.Ajax.getLoanDetail({
          loanId: this.loanId
        }).then(res => {
          if (res.success) {
            this.detail = res.data
            this.total = res.data.maxQuota
            this.loanCoinList = res.data.loanCoinList
          }
        })
      },
      // 借入金额减法
      minusTotal () {
        if (this.total === this.detail.minQuota) {
          this.Toast({
            message: `借入金额不得低于${this.detail.minQuota}`
          })
          return
        }
        this.total -= 1000
      },
      // 借入金额加法
      plusTotal () {
        if (this.total === this.detail.maxQuota) {
          this.Toast({
            message: `借入金额不得大于${this.detail.maxQuota}`
          })
          return
        }
        this.total += 1000
      },
      // 确认订单
      confirmOrder () {
        this.showOrderHandle()
      },
      // 获取支付凭证
      checkPassword (pwd) {
        this.Ajax.checkUserPayPassword({
          payPassword: pwd
        }).then(res => {
          if (res.success) {
            this.lendOrder(res.data)
          }
        }).catch(err => {
          console.log('err', err);
        })
      },
      // 发布借贷单
      lendOrder ({ payCertificate, payTimestamps }) {
        this.Ajax.lendOrder({
          requestNo: new Date().getTime(),
          loanId: this.loanId,
          borrowMoney: this.total,
          payCertificate,
          payTimestamps
        }).then(res => {
          if (res.success) {
            this.$router.push({path: '/pay-detail', query: {loanOrderId: res.data}})
          } else {
            this.Toast({
              message: res.message
            })
          }
        }).catch(err => {
          console.log('err', err);
        })
      }
    },
    watch: {
      total (val, preVal) {
        val = Number(val)
        preVal = Number(preVal)
        if (val < this.detail.minQuota) {
          this.total = this.detail.minQuota
        }
        if (val > this.detail.maxQuota) {
          this.total = this.detail.maxQuota
        }
        if (preVal === this.detail.maxQuota || val === this.detail.maxQuota) return
      }
    }
  }
</script>
<style lang="scss" scoped>
  .order {
    padding-bottom: 98px;
    .icon-minus {
      background: url('../../assets/images/icon-minus.png') no-repeat center / 100% 100%;
    }
    .icon-plus {
      background: url('../../assets/images/icon-plus.png') no-repeat center / 100% 100%;
    }
    .icon-select {
      margin-left: 8px;
      position: relative;
      width: 20px;
      height: 20px;
      background: #D9D9D9;
      border-radius: 50%;
      &::before {
        content: '';
        position: absolute;
        top: 6px;
        left: 6px;
        display: block;
        width: 8px;
        height: 8px;
        background: #fff;
        border-radius: 50%;
      }
      &.active {
        background: #757F7E;
      }
    }
    &-top {
      width: 100vw;
      height: 410px;
      background: url('../../assets/images/top-bg-lend.png') no-repeat top center / 100% 315px;
      overflow: hidden;
      &-box {
        margin: 56px auto 0;
        padding: 42px 34px 0 34px;
        width: 710px;
        height: 354px;
        background: $bg01;
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
      .controls {
        display: flex;
        align-items: center;
        &-item {
          display: flex;
          align-items: center;
          font-size: 24px;
          color: $fc03;
        }
      }
      .left {
        width: 60%;
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
        font-size: 24px;
        color: $fc04;
        .val {
          margin-top: 18px;
          color: #FF4D07;
        }
      }
    }
    &-notice {
      padding: 34px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: $fc02;
      .icon-notice {
        margin-right: 6px;
        width: 33px;
        height: 33px;
      }
    }
    &-form {
      padding: 0 20px;
      &-td {
        padding: 0 32px 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 90px;
        font-size: 28px;
        color: $fc02;
        background: $bg01;
      }
      &-td1 {
        color: $fc03;
        font-size: 22px;
        background: none;
      }
      &-td2 {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 20px;
        height: 232px;
        .item1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: calc(232px / 3);
          font-size: 28px;
          color: $fc02;
          .val {
            font-size: 24px;
          }
        }
      }
      &-td3 {
        padding: 0 32px 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28px;
        color: $fc02;
        background: $bg01;
        .pay-item {
          padding: 32px 0;
          display: flex;
          align-items: center;
          font-size: 22px;
          color: $fc03;
        }
      }
      .item {
        display: flex;
        align-items: center;
      }
      .t1 {
        width: 160px;
      }
      .t2 {
        flex: 1;
        margin: 0 74px 0 0;
      }
      .agreement {
        color: #4491F3;
        text-decoration: underline;
      }
    }
    &-btn {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 98px;
      font-size: 30px;
      color: $fc10;
      background: #4491F3;
      &:active {
        background: $themeColorOpacity;
      }
    }
    /deep/ .otc-modal-content {
      border-radius: 20px 20px 0 0;
      color: $fc02;
      font-size: 28px;
      .coin-modal {
        padding: 0 20px;
        &-title {
          width: 100%;
          line-height: 110px;
          font-size: 36px;
          text-align: center;
          border-bottom: 1px solid #F2F2F2;
        }
        &-list {
          padding: 24px 0;
        }
        &-item {
          padding: 24px 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .order-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .3);
    }
    &-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 99;
      padding-top: 56px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 571px;
      height: 767px;
      transform: translate(-50%, -50%);
      background: url('../../assets/images/confirm-bg-lend.png') no-repeat center / 100% 100%;
    }
    &-title {
      margin-bottom: 70px;
      font-size: 36px;
      color: $fc10;
    }
    &-item {
      margin-bottom: 26px;
      padding: 0 32px 0 120px;
      display: flex;
      align-items: flex-start;
      width: 100%;
      font-size: 24px;
      color: $fc02;
      .label {
        width: 220px;
      }
      .val {
        flex: 1;
        line-height: 1.2;
      }
    }
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width:422px;
      height:90px;
      font-size: 28px;
      color: $fc10;
      background:rgba(56,138,244,1);
      box-shadow:0px 8px 11px 0px rgba(56,138,244,0.21);
      border-radius:45px;
    }
    &-tips {
      margin-top: 28px;
      font-size: 24px;
      color: $fc04;
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
        margin-bottom: 66px;
        font-size: 40px;
        color: $fc02;
      }
      p {
        margin-bottom: 66px;
        font-size: 30px;
        color: #181818;
      }
      .coin-name {
        color: #4491F3;
      }
      .tips {
        margin-top: 56px;
        font-size: 26px;
        color: $fc03;
      }
    }
  }
  .success-modal {
    /deep/ .otc-modal-content {
      position: absolute;
      top: 50%;
      left: 50%;
      padding: 80px 0 96px;
      width: 571px;
      height: 585px;
      text-align: center;
      background: $bg01;
      border-radius: 20px;
      transform: translate(-50%, -50%);
    }
    /deep/ .success-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        width: 130px;
        height: 130px;
        background: url('../../assets/images/icon-success-borrow.png') no-repeat center / 100% 100%;
      }
      .p1 {
        margin-top: 6px;
        font-size: 36px;
        color: $fc02;
      }
      .p2 {
        margin-top: 28px;
        font-size: 28px;
        color: $fc03;
      }
      .btn {
        margin-top: 93px;
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
    }
  }
</style>