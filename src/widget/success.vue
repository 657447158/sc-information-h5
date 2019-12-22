<template>
  <otc-modal :show="show" dir="none" @hide="hideHandle" :className="type">
    <div class="success">
      <span class="icon"></span>
      <p class="p1" v-if="p1">{{p1}}</p>
      <p class="p2" v-if="p2">{{p2}}</p>
      <div class="btn" @click="confirmHandle">{{btnText}}</div>
    </div>
  </otc-modal>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'borrow'
      },
      show: {
        type: Boolean,
        default: false
      },
      p1: String,
      p2: String,
      btnText: {
        type: String,
        default: '确定'
      }
    },
    methods: {
      hideHandle () {
        this.$emit('hideHandle')
      },
      confirmHandle () {
        this.$emit('confirmHandle')
      }
    }
  }
</script>
<style lang="scss" scoped>
  /deep/ .otc-modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 570px;
    height: 585px;
    transform: translate(-50%, -50%);
    border-radius: 20px;
  }
  .success {
    padding: 80px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 130px;
      height: 130px;
      background: url('../assets/images/icon-success-borrow.png') no-repeat center / 100% 100%;
    }
    .p1 {
      margin-top: 6px;
      font-size: 36px;
      color: $fc02;
    }
    .p2 {
      margin-top: 26px;
      font-size: 28px;
      color: $fc04;
    }
    .btn {
      margin-top: 92px;
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
      &:active {
        opacity: .8;
      }
    }
  }
  .lend {
    .success {
      .icon {
        background: url('../assets/images/icon-success-lend.png') no-repeat center / 100% 100%;
      }
      .btn {
        background:rgba(56,138,244,1);
        box-shadow:0px 8px 11px 0px rgba(56,138,244,0.21);
      }
    }  
  }
</style>