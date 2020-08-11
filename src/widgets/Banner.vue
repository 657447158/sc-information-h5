<template>
  <div class="banner">
    <img :src="detail.channelImage" v-if="detail.channelImage" />
    <p>{{title || detail.name}}</p>
  </div>
</template>
<script>
export default {
  props: {
    code: {
      default: ''
    },
    title: {
      default: ''
    }
  },
  data () {
    return {
      detail: {}
    }
  },
  mounted () {
    this.getBanner()
  },
  methods: {
    getBanner (code = this.code) {
      this.Ajax.getChannelDetail({
        channelCode: code
      }).then(res => {
        if (res.code === 0) {
          this.detail = res.data
        }
      })
    }
  },
  watch: {
    $route (to) {
      this.getBanner(to.query.code)
    }
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