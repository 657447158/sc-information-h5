<template>
    <transition name="fade">
        <div class="daq-dialog-wrap" v-if="show">
            <div class="daq-dialog-mask mask" @click="close"></div>
            <div class="daq-dialog">
                <div class="daq-dialog-hd" v-if="title">{{title}}</div>
                <div class="daq-dialog-bd" :style="'text-align:' + align" v-html="content" @click="ctFn"></div>
                <div class="daq-dialog-ft" v-if="showConfirm">
                    <!-- <div class="daq-dialog-cancel" v-if="cancelValue" @click="close">{{cancelValue}}</div> -->
                    <div class="daq-dialog-comfirm" @click="open">{{comfirmValue}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>

    export default {
        name: 'daq-dialog',
        props: {
            title: String,
            content: String,
            cancelValue: String,
            comfirmValue: String,
            comfirmFn: Function,
            cancelFn: Function,
            contentFn: Function,
            align: {
                type: String,
                default: 'left'
            },
            showConfirm: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                show: false
            }
        },
        methods: {
            close () {
                if (typeof this.cancelFn !== 'function') {
                    this.show = false
                } else {
                    this.cancelFn()
                }
            },
            open () {
                if (typeof this.comfirmFn !== 'function') {
                    console.log('1');
                    this.show = false
                } else {
                    this.comfirmFn(() => {
                        this.show = false
                    })
                }
            },
            ctFn () {
                if (typeof this.contentFn === 'function') {
                    this.contentFn((content) => {
                        this.content = content
                    })
                }
            }
        },
        watch: {
            show (value) {
                if (value) {
                    document.querySelector('html').style.overflow = 'hidden'
                } else {
                    document.querySelector('html').style.overflow = 'auto'
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .daq-dialog {
        padding: 80px 0 130px;
        width: 640px;
        border-radius: 10px;
        background: $bg01;
        overflow: hidden;
        &-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            z-index: 999;
        }
        &-mask {
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .4);
        }
        &-hd {
            line-height: 1.2;
            font-size: $f36;
            font-weight: bold;
            text-align: center;
        }
        &-bd {
            padding: 38px 56px 68px;
            font-size: $f30;
            color: $fc04;
        }
        &-ft {
            height: 100px;
            font-size: $f32;
            text-align: center;
            > div {
                flex: 1;
                border-left: 1px solid $bor01;
                transition: all .25s ease 0s;
                &:first-child {
                    border: none;
                }
                &:active {
                    opacity: .8;
                }
            }
        }
        &-cancel {
            color: $fc02;
        }
        &-comfirm {
            margin: 0 auto;
            width: 416px;
            height: 80px;
            font-size: $f30;
            color: #FE6E04;
            line-height: 80px;
            background: #FFE30C;
            border-radius: 40px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
