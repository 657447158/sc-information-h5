<template>
 <transition name="fade">
   <div class="daq-video-popup" v-show="show" @click="closePopup" >
     <div class="video" @click.stop="">
       <div id="players"></div>
     </div>
   </div>
 </transition>
</template>
<script>
export default {
  name: 'VideoPopup',
  props: ['isShow', 'url'],
  data () {
    return {
        show: this.isShow
    }
  },
  methods: {
    closePopup () {
       this.show = false
       this.$emit('closePopup', this.show)
       document.getElementById('players').innerHTML = ''
    }
  },
  mounted () {
    let popup = document.getElementsByClassName('daq-video-popup')[0]
    popup.addEventListener('touchmove', function (event) {
      event.preventDefault()
    }, false)
  },
  watch: {
    isShow (value) {
      this.show = value
    },
    url (value) {
      let flashvars = {
        // 需引入m3u8播放器
        f: 'https://filealiyun.geeker.com.cn/ued/ckplayer/m3u8.swf',
        // 流媒体地址
        a: value,
        c: 1,
        s: 4,
        lv: 0,
        p: 1
      }
      let params = {bgcolor: '#FFF', allowFullScreen: false, allowScriptAccess: 'always', wmode: 'transparent'}
      let video = [value]
      /* eslint-disable */
      CKobject.embed('https://filealiyun.geeker.com.cn/ued/ckplayer/ckplayer.swf', 'players', 'ck-video', '100%', '100%', false, flashvars, video, params)
      let playerbox = document.getElementById('players')
      playerbox.style.width = '100vw'
      playerbox.style.height = '100%'
    }
  }
}
</script>
<style lang="scss">
  .fade-enter, .fade-leave-active, .fade-enter-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .daq-video-popup {
     width: 100%;
     height: 100%;
     background: rgba(0,0,0,.6);
     top: 0;
     left: 0;
     position: fixed;
     z-index: 9999;
    .video {
      position: absolute;
      top: 50%;
      width: 750px;
      height: 540px;
      transform: translateY(-50%);
      #player {
        height: 100%;
        max-width: 750px;
      }
    }
  }
</style>
