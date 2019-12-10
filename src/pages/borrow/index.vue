<template>
  <div class="borrow">
    <div class="borrow-top-wrap">
      <div class="borrow-top">
        <div class="left">
          <div class="left-top">
            <span class="title">发布借入单</span>
            <span>（缺钱借入）</span>
          </div>
          <p class="intro">找不到合适的订单，发布借入单让借出人来找你!</p>
        </div>
        <router-link class="right" to='/public-borrow'>发布借入单</router-link>
      </div>
    </div>
    <div class="borrow-total">
      <div class="borrow-total-top">
        <span class="title">我要借入</span>
        <div class="icon-box" @click="showModalHandle">
          <span class="icon"></span>
          <span>筛选</span>
        </div>
      </div>
      <div class="borrow-total-ct">
        <div class="tr">
          <span class="td">当前借款金额(CNY)</span>
          <span class="icon-eye" :class="{active: showSum}" @click="showOrHideSum"></span>
          <span class="td total-td">累计借款金额(CNY)</span>
        </div>
        <div class="tr tr-nums" v-if="showSum">
          <span class="current">{{totalDesc.nowLoanNum}}</span>
          <span>{{totalDesc.totalLoanNum}}</span>
        </div>
        <div class="tr tr-nums" v-else>
          <span class="current">******</span>
          <span>******</span>
        </div>
        <div class="tr tr-sub-title">
          <span>累计利息</span>
          <span>最近还款日</span>
        </div>
        <div class="tr tr-sub-ct">
          <span v-if="showSum">≈{{totalDesc.totalLoanInterest}}{{totalDesc.loanCoinName}}</span>
          <span v-else>******</span>
          <span>{{totalDesc.soonEndDate}}</span>
        </div>
        <ul class="nav-list">
          <router-link class="nav-list-item" tag="li" to="/my-borrow/current">
            <span class="icon icon1"></span>
            <span>当前借入单</span>
          </router-link>
          <router-link class="nav-list-item" tag="li" to="/my-borrow/history">
            <span class="icon icon2"></span>
            <span>历史借入单</span>
          </router-link>
          <router-link class="nav-list-item" tag="li" to="/my-borrow/public">
            <span class="icon icon3"></span>
            <span>我发布的借入单</span>
          </router-link>
          <router-link class="nav-list-item" tag="li" to="">
            <span class="icon icon4"></span>
            <span>补仓记录</span>
          </router-link>
        </ul>
      </div>
    </div>
    <scroll-load requestName="getLoanList" @list="getList" :params="params">
      <ul class="borrow-list" slot="list">
        <li
          class="borrow-list-item"
          v-for="item in list"
          :key="item.id"
        >
          <div class="top">
            <span class="box box1">借出人</span>
            <span class="box box2">{{item.userName}}</span>
            <span class="box box3">已实名</span>
            <span class="icon-wx" v-if="item.wxPayFlag === 1"></span>
            <span class="icon-alipay" v-if="item.aliPayFlag === 1"></span>
            <span class="icon-card" v-if="item.bankPayFlag === 1"></span>
            <router-link class="btn" :to="{path: '/borrow-order', query: {loanId: item.loanId}}">借入</router-link>
          </div>
          <p class="time">{{item.LoginDateDesc}}</p>
          <div class="title-box">
            <div class="title-box-item">
              <span class="p1">可借金额</span>
              <p class="p2">¥<span>{{item.loanRestNum}}</span></p>
            </div>
            <div class="title-box-item">
              <span class="p1">参考年华</span>
              <span class="p3">{{item.annualizedRateDesc}}</span>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom-item">
              <span class="p1">到期利息</span>
              <span>¥ {{item.loanInterest}}</span>
            </div>
            <div class="bottom-item">
              <span class="p1">借贷周期（天）</span>
              <span>{{item.loanPeriod}}</span>
            </div>
            <div class="bottom-item">
              <span class="p1">日息</span>
              <span>{{item.dailyRateDesc}}</span>
            </div>
          </div>
        </li>
      </ul>
    </scroll-load>
    <!-- 筛选框 -->
    <otc-modal :show="showFilterList" dir="top" @hide="hidePop">
      <div class="filter-modal-box">
        <p class="filter-modal-box-title">排序</p>
        <ul class="filter-modal-box-list">
          <li
            class="item"
            :class="{active: rankIndex === index}"
            v-for="(item, index) in rankList"
            :key="index"
            @click="chooseRankType(index)"
          >{{item.name}}</li>
        </ul>
        <p class="filter-modal-box-title">借款周期</p>
        <ul class="filter-modal-box-list">
          <li
            class="item"
            :class="{active: periodIndex === index}"
            v-for="(item, index) in periodList"
            :key="item.id"
            @click="choosePeriodType(index)"
          >{{item.configValueName}}</li>
        </ul>
        <p class="filter-modal-box-title">支付方式</p>
        <ul class="filter-modal-box-list">
          <li class="item" :class="{active: wxPayFlag === 1}" @click="choosePayType('wxPayFlag')">银行卡</li>
          <li class="item" :class="{active: aliPayFlag === 1}" @click="choosePayType('aliPayFlag')">支付宝</li>
          <li class="item" :class="{active: bankPayFlag === 1}" @click="choosePayType('bankPayFlag')">微信</li>
        </ul>
        <div class="filter-modal-box-bottom">
          <span class="btn" @click="reset">重置</span>
          <span class="btn active" @click="filterConfirm">确定</span>
        </div>
      </div>
    </otc-modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        totalDesc: {},
        list: [],
        showFilterList: false,
        showSum: true,
        params: {
          loanType: 'LEND',
          sortType: 10,
          loanPeriod: '',
          wxPayFlag: 0,
          aliPayFlag: 0,
          bankPayFlag: 0
        },
        periodList: [],
        rankList: [{
          name: '年华增序',
          type: 10
        }, {
          name: '金额降序',
          type: 20
        }, {
          name: '金额增序',
          type: 30
        }],
        rankIndex: 0,
        periodIndex: 0,
        wxPayFlag: 0,
        aliPayFlag: 0,
        bankPayFlag: 0
      }
    },
    created () {
      this.getUserCumulative()
      this.getLoanPeriod()
    },
    methods: {
      // 我要借入累计
      getUserCumulative () {
        this.Ajax.getUserCumulative({
          loanType: 'BORROW'
        }).then(res => {
          if (res.success) {
            this.totalDesc = res.data
          }
        })
      },
      // 获取借贷周期
      getLoanPeriod () {
        this.Ajax.getLoanPeriod()
          .then(res => {
            if (res.success) {
              let all = {
                configValue: '',
                configValueName: '全部'
              }
              this.periodList = [all].concat(res.data)
            }
          })
      },
      getList (val) {
        this.list = this.list.concat(val)
      },
      // 显示隐藏金额
      showOrHideSum () {
        this.showSum = !this.showSum
      },
      showModalHandle () {
        this.showFilterList = true
      },
      hidePop () {
        this.showFilterList = false
      },
      chooseRankType (index) {
        this.rankIndex = index
      },
      choosePeriodType (index) {
        this.periodIndex = index
      },
      choosePayType (type) {
        if (this[type] === 1) {
          this[type] = 0
        } else {
          this[type] = 1
        }
      },
      reset () {
        this.rankIndex = 0
        this.periodIndex = 0
        this.wxPayFlag = 0
        this.aliPayFlag = 0
        this.bankPayFlag = 0
      },
      isObjectValueEqual (a, b) {
        let aProps = Object.getOwnPropertyNames(a)
        let bProps = Object.getOwnPropertyNames(b)
        if (aProps.length !== bProps.length) {
          return false
        }
        for (let i = 0; i < aProps.length; i++) {
          let propName = aProps[i]
          let propA = a[propName]
          let propB = b[propName]
          if (propA !== propB) {
            return false
          }
        }
        return true
      },
      filterConfirm () {
        const oldParams = Object.assign({}, this.params)
        const newParams = Object.assign({}, {
          sortType: this.rankList[this.rankIndex].type,
          loanPeriod: this.periodList[this.periodIndex].configValue,
          wxPayFlag: this.wxPayFlag,
          aliPayFlag: this.aliPayFlag,
          bankPayFlag: this.bankPayFlag
        })
        this.hidePop()
        if (this.isObjectValueEqual(oldParams, newParams)) return
        this.list = []
        this.params = newParams
      }
    }
  }
</script>
<style lang="scss" scoped>
  .borrow {
    width: 100vw;
    background: #F8F8FA;
    &-top-wrap {
      padding: 0 32px 50px;
      background: $bg01;
    }
    &-top {
      padding: 0 20px 0 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 252px;
      color: $fc10;
      font-size: $f24;
      background:#2DC7B2;
      box-shadow: 0px 6px 26px 3px rgba(45, 199, 178, .5);
      border-radius: 10px;
      .left {
        flex: 1;
        &-top {
          margin-bottom: 34px;
          display: flex;
          align-items: center;
        }
        .title {
          margin-right: 32px;
          font-size: 36px;
        }
        .intro {
          line-height: 46px;
        }
      }
      .right {
        margin-left: 74px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 168px;
        height: 80px;
        color: $fc01;
        background: $bg01;
        border-radius: 40px;
        &:active {
          opacity: .8;
        }
      }
    }
    &-total {
      margin-top: 20px;
      padding: 0 32px;
      background: $bg01;
      &-top {
        padding: 42px 0 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(167, 167, 167, .15);
        .title {
          font-size: $f30;
          font-weight: bold;
          color: $fc02;
        }
        .icon-box {
          display: flex;
          align-items: center;
          color: #19CCC1;
          font-size: 24px;
        }
        .icon {
          margin-right: 5px;
          width: 30px;
          height: 28px;
          background: url('../../assets/images/icon-screening.png') no-repeat center / 100% 100%;
        }
      }
      &-ct {
        padding: 32px 0 38px;
        .tr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .icon-eye {
            margin-left: 20px;
            width: 35px;
            height: 35px;
            background: url('../../assets/images/eye-close.png') no-repeat center / 100% 100%;
            &.active {
              background: url('../../assets/images/eye-open.png') no-repeat center / 100% 100%;
            }
          }
          .td {
            font-size: $f28;
            font-weight: bold;
            color: $fc02;
          }
          .total-td {
            flex: 1;
            text-align: right;
          }
        }
        .tr-nums {
          padding: 38px 0;
          font-size: 32px;
          font-weight: bold;
          .current {
            color: #FF4D07;
          }
        }
        .tr-sub-title {
          font-size: $f24;
          color: $fc04;
        }
        .tr-sub-ct {
          margin-top: 22px;
          font-size: $f24;
        }
      }
      .nav-list {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: $f24;
          color: $fc02;
        }
        .icon {
          width: 98px;
          height: 96px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          &1 { background-image: url('../../assets/images/borrow-icon1.png') }
          &2 { background-image: url('../../assets/images/borrow-icon2.png') }
          &3 { background-image: url('../../assets/images/borrow-icon3.png') }
          &4 { background-image: url('../../assets/images/borrow-icon4.png') }
        }
      }
    }
    &-list {
      margin-top: 20px;
      padding: 0 28px;
      background: $bg01;
      &-item {
        padding: 38px 0 42px;
        font-size: $f18;
        border-bottom: 1px solid rgba(167, 167, 167, .2);
        &:last-child {
          border-bottom: none;
        }
      }
      .top {
        display: flex;
        align-items: center;
        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          color: $fc01;
        }
        .box1 {
          padding: 0 8px;
          height: 36px;
          color: $fc10;
          background: $fc01;
          border-radius: 5px 0 0 5px;
        }
        .box2 {
          margin-right: 10px;
          padding: 0 14px;
          height: 36px;
          border: 1px solid $fc01;
          border-radius: 0 5px 5px 0;
        }
        .box3 {
          padding: 0 8px;
          height: 36px;
          border: 1px solid $fc01;
          border-radius: 5px;
        }
        .icon-wx {
          margin-left: 16px;
          width: 30px;
          height: 31px;
          background: url('../../assets/images/wx.png') no-repeat center / 100% 100%;
        }
        .icon-alipay {
          margin-left: 8px;
          width: 32px;
          height: 32px;
          background: url('../../assets/images/alipay.png') no-repeat center / 100% 100%;
        }
        .icon-card {
          margin-left: 8px;
          width: 42px;
          height: 32px;
          background: url('../../assets/images/card.png') no-repeat center / 100% 100%;
        }
        .btn {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          color: $fc10;
          width: 85px;
          height: 40px;
          font-size: 24px;
          background: $btn01;
          box-shadow: 0px 1px 6px 0px rgba(45,199,178,0.52);
          border-radius: 20px;
        }
      }
      .time {
        margin: 16px 0 30px;
        font-size: 18px;
        color: $fc03;
      }
      .title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-item {
          display: flex;
          flex-direction: column;
          color: $fc02;
          font-size: 24px;
          font-weight: bold;
        }
        .p1 {
          margin-bottom: 20px;
        }
        .p2 {
          color: #FF4D07;
          span {
            font-size: 36px;
          }
        }
        .p3 {
          font-size: 36px;
        }
      }
      .bottom {
        margin-top: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-item {
          display: flex;
          flex-direction: column;
          font-size: 24px;
          color: $fc02;
        }
        .p1 {
          margin-bottom: 16px;
          color: $fc05;
        }
      }
    }
  }
  .filter-modal-box {
    padding: 40px 26px 0 26px;
    background: $bg01;
    &-title {
      margin-bottom: 34px;
      font-size: 30px;
      color: $fc02;
      font-weight: bold;
    }
    &-list {
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    &-bottom {
      display: flex;
      height: 92px;
      border-top: 1px solid #F7F7F7;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 100%;
      font-size: 30px;
      color: $fc02;
      &.active {
        color: $fc01;
        font-weight: bold;
      }
    }
    .item {
      margin-bottom: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 222px;
      height: 80px;
      font-size: 24px;
      color: $fc03;
      background:rgba(247,247,247,1);
      border-radius:8px;
      &.active {
        color: $fc01;
        border: 1px solid $fc01;
      }
    }
  }
</style>