<template>
  <otc-modal :show="show" dir="none" @hide="hideHandle">
    <div class="success">
      <span class="icon"></span>
      <p class="p1">申诉成功</p>
      <p class="p2">官方正在赶来!请耐心等待</p>
      <div class="btn" @click="confirmHandle">确定</div>
    </div>
  </otc-modal>
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
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
    width: 571px;
    height: 658px;
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
      background: url('../assets/images/icon-complain.png') no-repeat center / 100% 100%;
    }
    .p1 {
      margin-top: 31px;
      font-size: 36px;
      color: $fc02;
    }
    .p2 {
      margin-top: 62px;
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
</style>