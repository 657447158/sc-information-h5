<template>
  <div class="banner">
    <img :src="detail.channelImage" v-if="detail.channelImage" />
    <p>{{detail.name}}</p>
  </div>
</template>
<script>
export default {
  props: {
    code: ''
  },
  data () {
    return {
      detail: {}
    }
  },
  mounted () {
    this.Ajax.getChannelDetail({
      channelCode: this.code
    }).then(res => {
      if (res.code === 0) {
        this.detail = res.data
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.banner {
    width: 100%;
    height: 460px;
    position: relative;
    img {
      display: block;
      font-size: 0;
      width: 100%;
      height: 100%;
    }
    p {
      position: absolute;
      bottom: 70px;
      width: 100%;
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 3px 0 5px rgba(0, 0, 0, .2);
    }
}
</style>