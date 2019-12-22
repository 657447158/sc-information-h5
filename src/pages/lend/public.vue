<template>
  <div class="public">
    <div class="public-top">
      <div class="public-top-box">
        <p class="title">借出金额CNY</p>
        <input class="total" type="number" v-model="total">
        <div class="controls">
          <div class="controls-item left">
            <span class="icon icon-minus" @click="minusTotal"></span>
            <span>最低{{min}}</span>
          </div>
          <div class="controls-item">
            <span class="icon icon-plus" @click="plusTotal"></span>
            <span>最高{{max}}</span>
          </div>
        </div>
        <div class="infos">
          <div class="infos-item left">
            <p>到期收益(CNY)</p>
            <p class="val">{{calculateInterest}}</p>
          </div>
          <div class="infos-item">
            <p>到期应收本息(CNY)</p>
            <p class="val">{{(total + calculateInterest).toFixed(2)}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="public-form">
      <div class="public-form-td">
        <span class="t1">日利率(%)</span>
        <div class="control-box">
          <span class="icon icon-minus" @click="minusDailyRate"></span>
          <input type="text" v-model="dailyRateDesc" />
          <span class="icon icon-plus" @click="plusDailyRate"></span>
        </div>
      </div>
      <div class="public-form-td public-form-td1">
        <span class="t1">拾合年华(%): </span>
        <span class="t2">{{detail.annualizedRateDesc}}</span>
      </div>
      <div class="public-form-td">
        <span class="t1">借款周期</span>
        <div class="item" @click="showPeriodModalHandle">
          <span>{{periodList[periodIndex] && periodList[periodIndex].configValueName}}</span>
          <span class="triangle"></span>
        </div>
      </div>
      <div class="public-form-td public-form-td2">
        <span class="t1">单笔限额</span>
        <input type="number" v-model="limitMin">
        <span>～</span>
        <input type="number" v-model="limitMax">
        <span>CNY</span>
      </div>
      <div class="public-form-td public-form-td2">
        <div>
          <span>支付方式</span>
          <span class="tips">(必须为本人账户支付)</span>
        </div>
      </div>
      <div class="public-form-td3">
        <div class="pay-item" @click="choosePayType('wxPayFlag')">
          <span class="icon-wx"></span>
          <span>微信支付</span>
          <span class="icon-select" :class="wxPayFlag === 1 && 'active'"></span>
        </div>
        <div class="pay-item" @click="choosePayType('aliPayFlag')">
          <span class="icon-alipay"></span>
          <span>支付宝支付</span>
          <span class="icon-select" :class="aliPayFlag === 1 && 'active'"></span>
        </div>
        <div class="pay-item" @click="choosePayType('bankPayFlag')">
          <span class="icon-card"></span>
          <span>银行卡支付</span>
          <span class="icon-select" :class="bankPayFlag === 1 && 'active'"></span>
        </div>
      </div>
      <div class="public-form-td public-form-td1">
        <span>手续费：{{detail.serviceCharge}}</span>
      </div>
      <div class="public-form-td public-form-td1">
        <div class="item">
          <span class="icon-select active" style="margin: 0 8px 0 0;"></span>
          <div>
            <span>我已阅读并同意</span>
            <a class="agreement" href="javascript:;">《LME法币借贷协议》</a>
          </div>
        </div>
      </div>
    </div>
    <div class="public-btn" @click="confirmOrder">立即发布</div>
    <!-- 币种选择 -->
    <otc-modal :show="showCoinModal" @hide="hideHandle">
      <div class="coin-modal">
        <p class="coin-modal-title">币种选择</p>
        <ul class="coin-modal-list">
          <li
            class="coin-modal-item"
            v-for="(item, index) in loanCoinList"
            :key="item.id"
            @click="chooseCoin(index)"
          >
            <span>{{item.coinName}}</span>
            <span class="icon-select" :class="coinIndex === index && 'active'"></span>
          </li>
        </ul>
      </div>
    </otc-modal>
    <!-- 借款周期 -->
    <otc-modal :show="showPeriodModal" @hide="hideHandle">
      <div class="coin-modal">
        <p class="coin-modal-title">借款周期</p>
        <ul class="coin-modal-list">
          <li
            class="coin-modal-item"
            v-for="(item, index) in periodList"
            :key="item.id"
            @click="choosePeriod(index)"
          >
            <span>{{item.configValueName}}</span>
            <span class="icon-select" :class="periodIndex === index && 'active'"></span>
          </li>
        </ul>
      </div>
    </otc-modal>
    <!-- 确认借入订单信息 -->
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
            <span class="label">参考年华：</span>
            <span class="val">{{detail.annualizedRateDesc}}</span>
          </div>
          <div class="order-modal-item">
            <span class="label">参考日息：</span>
            <span class="val">{{dailyRateDesc}}</span>
          </div>
          <div class="order-modal-item">
            <span class="label">借款周期：</span>
            <span class="val">{{periodList[periodIndex] && periodList[periodIndex].configValueName}}</span>
          </div>
          <div class="order-modal-item">
            <span class="label">到期利息：</span>
            <span class="val">{{calculateInterest}}CNY</span>
          </div>
          <div class="order-modal-item">
            <span class="label">到期应收本息：</span>
            <span class="val">{{(total + calculateInterest).toFixed(2)}}CNY</span>
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
        <p>共需支付<span>{{total}}</span><span class="coin-name">CNY</span></p>
        <password-box @getPwd="checkPassword"></password-box>
        <p class="tips">忘记密码？</p>
      </div>
    </otc-modal>
    <!-- 发布成功 -->
    <otc-modal :show="showSuccess" @hide="hideHandle" className="success-modal" dir="none">
      <div class="success-box">
        <span class="icon"></span>
        <p class="p1">发布借出单成功！</p>
        <p class="p2">轻松借贷，财富增值！</p>
        <div class="btn" @click="freshPage">继续发布</div>
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
    inject: ['reload'],
    data () {
      return {
        showCoinModal: false,
        showPeriodModal: false,
        orderShow: false,
        showPwd: false,
        showSuccess: false,
        detail: {},
        coinIndex: 0,
        periodIndex: 0,
        loanCoinList: [],
        periodList: [],
        total: 1000,
        min: 1000,
        max: 1000000,
        // 利息
        interest: 0,
        // 需要抵押
        pledge: 0,
        // 日利率
        dailyRate: 0,
        dailyRateDesc: 0,
        // 单笔限额
        limitMin: 1000,
        limitMax: 1000000,
        wxPayFlag: 1,
        aliPayFlag: 0,
        bankPayFlag: 0,
        payTypeList: '',
        // 是否可以请求需抵押标记
        requestFlag: false
      }
    },
    computed: {
      /**
       * 利息 = 借贷金额 * 日利率 * 借贷周期
       */
      calculateInterest () {
        if (!this.periodList[this.periodIndex]) return 0
        return Number((this.total * this.dailyRate * this.periodList[this.periodIndex].configValue).toFixed(2))
      }
    },
    created () {
      this.publishLoanParam()
      this.getLoanPeriod()
    },
    methods: {
      // 借入金额减法
      minusTotal () {
        if (this.total === this.min) {
          this.Toast({
            message: `借入金额不得低于${this.min}`
          })
          return
        }
        this.total -= 1000
      },
      // 借入金额加法
      plusTotal () {
        if (this.total === this.max) {
          this.Toast({
            message: `借入金额不得大于${this.max}`
          })
          return
        }
        this.total += 1000
      },
      // 日利率减法
      minusDailyRate () {
        let rate = parseFloat(this.dailyRateDesc) * 100
        rate--
        if (rate <= 0) {
          rate = 0
          this.dailyRateDesc = '0%'
        } else {
          let r1 = rate.toString().split('.')[1] ? rate.toString().split('.')[1].length : 0
          let m = Math.pow(10, r1)
          this.dailyRateDesc = ((rate * m) / (100 * m)).toFixed(2) + '%'
        }
      },
      // 日利率加法
      plusDailyRate () {
        let rate = parseFloat(this.dailyRateDesc) * 100
        rate++
        let r1 = rate.toString().split('.')[1] ? rate.toString().split('.')[1].length : 0
        let m = Math.pow(10, r1)
        this.dailyRateDesc = ((rate * m) / (100 * m)).toFixed(2) + '%'
      },
      hideHandle () {
        this.showCoinModal = false
        this.showPeriodModal = false
        this.orderShow = false
        this.showPwd = false
        this.showSuccess = false
      },
      showCoinModalHandle () {
        this.hideHandle()
        this.showCoinModal = true
      },
      showPeriodModalHandle () {
        this.showPeriodModal = true
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
      showSuccessHandle () {
        this.hideHandle()
        this.showSuccess = true
      },
      freshPage () {
        this.hideHandle()
        this.reload()
      },
      // 选择币种
      chooseCoin (index) {
        this.hideHandle()
        if (this.coinIndex === index) return
        this.coinIndex = index
        this.getLoanPledgeCoinNum()
      },
      // 选择借款周期
      choosePeriod (index) {
        this.hideHandle()
        if (this.periodIndex === index) return
        this.periodIndex = index
        this.getLoanPledgeCoinNum()
      },
      // 选择支付方式
      choosePayType (type) {
        if (this[type] === 1) {
          this[type] = 0
        } else {
          this[type] = 1
        }
      },
      // 获取借贷周期
      getLoanPeriod () {
        this.Ajax.getLoanPeriod()
          .then(res => {
            if (res.success) {
              if (this.loanCoinList.length) {
                this.requestFlag = true
              }
              this.periodList = res.data
            }
          })
      },
      publishLoanParam () {
        this.Ajax.publishLoanParam()
          .then(res => {
            if (res.success) {
              if (this.periodList.length) {
                this.requestFlag = true
              }
              this.detail = res.data
              this.dailyRate = res.data.dailyRate
              this.dailyRateDesc = res.data.dailyRateDesc
              this.loanCoinList = res.data.loanCoinList
            }
          })
      },
      /**
       * 计算需要抵押的数量
       * params:
       *  borrowMoney: 借贷金额
       *  pledgeCoinId: 抵押币种id
       *  dailyRate: 日利率
       *  loanPeriod: 周期
       */
      getLoanPledgeCoinNum () {
        this.Ajax.getLoanPledgeCoinNum({
          borrowMoney: this.total,
          pledgeCoinId: this.loanCoinList[this.coinIndex].coinId,
          dailyRate: this.dailyRate,
          loanPeriod: this.periodList[this.periodIndex].configValue
        }).then(res => {
          if (res.success) {
            this.pledge = res.data
          }
        })
      },
      // 确认订单
      confirmOrder () {
        if (this.wxPayFlag === 0 && this.aliPayFlag === 0 && this.bankPayFlag === 0) {
          this.Toast({
            message: '请选择支付方式'
          })
          return
        }
        this.showOrderHandle()
      },
      // 获取支付凭证
      checkPassword (pwd) {
        this.Ajax.checkUserPayPassword({
          payPassword: pwd
        }).then(res => {
          if (res.success) {
            this.publishLoan(res.data)
          }
        }).catch(err => {
          console.log('err', err);
        })
      },
      // 发布借贷单
      publishLoan ({ payCertificate, payTimestamps }) {
        this.Ajax.publishLoan({
          requestNo: new Date().getTime(),
          loanType: 'LEND',
          loanMoney: this.total,
          dailyRate: this.dailyRate,
          lendPeriod: this.periodList[this.periodIndex].configValue,
          minQuota: this.limitMin,
          maxQuota: this.limitMax,
          wxPayFlag: this.wxPayFlag,
          aliPayFlag: this.aliPayFlag,
          bankPayFlag: this.bankPayFlag,
          payCertificate,
          payTimestamps
        }).then(res => {
          if (res.success) {
            this.showSuccessHandle()
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
        if (val < this.min) {
          this.total = this.min
        }
        if (val > this.max) {
          this.total = this.max
        }
        if (preVal === this.max || val === this.max) return
        this.getLoanPledgeCoinNum()
      },
      limitMin (val) {
        val = Number(val)
        if (val < this.min) {
          this.limitMin = this.min
        }
        if (val > this.limitMax) {
          this.limitMin = this.limitMax
        }
      },
      limitMax (val) {
        val = Number(val)
        if (val < this.limitMin) {
          this.limitMax = this.limitMin
        }
        if (val > this.max) {
          this.limitMax = this.max
        }
      },
      requestFlag (flag) {
        if (flag) {
          this.getLoanPledgeCoinNum()
        }
      },
      dailyRateDesc (val) {
        this.dailyRate = parseFloat(val) / 100
        this.dailyRateDesc = parseFloat(val) + '%'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .public {
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
    &-form {
      margin-top: 36px;
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
        margin-top: 20px;
        input {
          width: 150px;
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
      .control-box {
        display: flex;
        align-items: center;
        .icon {
          width: 44px;
          height: 44px;
        }
        input {
          width: 200px;
          height: 40px;
          text-align: center;
          color: $fc02;
          font-size: 24px;
        }
      }
      .t1 {
        width: 160px;
      }
      .t2 {
        flex: 1;
        margin: 0 74px 0 0;
      }
      .triangle {
        margin-left: 12px;
        width: 14px;
        height: 12px;
        background: url('../../assets/images/triangle-down.png') no-repeat center / 100% 100%;
      }
      .tips {
        font-size: 24px;
        color: $fc04;
      }
      .item {
        display: flex;
        align-items: center;
      }
      .icon-wx {
        margin-right: 7px;
        width: 30px;
        height: 31px;
        background: url('../../assets/images/wx.png') no-repeat center / 100% 100%;
      }
      .icon-alipay {
        margin-right: 7px;
        width: 32px;
        height: 32px;
        background: url('../../assets/images/alipay.png') no-repeat center / 100% 100%;
      }
      .icon-card {
        margin-right: 7px;
        width: 42px;
        height: 32px;
        background: url('../../assets/images/card.png') no-repeat center / 100% 100%;
      }
      .agreement {
        color: #388AF4;
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
      background: #388AF4;
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
      background:#388AF4;
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
        color: #388AF4;
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
        background: url('../../assets/images/icon-success-lend.png') no-repeat center / 100% 100%;
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
        background:#388AF4;
        box-shadow:0px 8px 11px 0px rgba(56,138,244,0.21);
        border-radius:45px;
      }
    }
  }
</style>