<template>
  <div id="app">
    <!-- 以下是默认配置参数, 可以根据个人需要进行修改 -->
    <div class="a1">
        <LuckDraw
            v-model="currIndex"
            :awards="awards"
            :rate="rate"
            :radius="radius"
            :textFontSize="textFontSize"
            :lineHeight="lineHeight"
            :textColor="textColor"
            :textMargin="textMargin"
            :textPadding="textPadding"
            :btnFontSize="btnFontSize"
            :btnColor="btnColor"
            :btnBorderColor1="btnBorderColor1"
            :btnBorderColor2="btnBorderColor2"
            :btnBorderColor3="btnBorderColor3"
            :btnBgColor="btnBgColor"
            :btnText="btnText"
            :btnRadius="btnRadius"
            :borderColor="borderColor"
            :async="async"
            @start="handleStart"
            @end="handleEnd"
            @before-start="a"
            ref="luckDraw"
            />
    </div>
  </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
export default {
    created(){
        if(this.currIndex > this.awards.length){
            this.currIndex = 0
        }
    },
    data () {
        return {
            currIndex: 0,  
            async: true,             // 奖品的索引
            rate: 80,                   // 转盘速率
            radius: (document.body.clientWidth-8)/2,                // 转盘半径
            textFontSize: '12px',       // 文字大小
            lineHeight: 20,             // 文字行高
            textColor: '#d64737',       // 文字颜色
            textMargin: 30,             // 文字距离边框距离
            textPadding: 0,             // 文字补偿宽度
            btnFontSize: '26px',        // 按钮文字大小
            btnColor: '#d64737',        // 按钮文件颜色
            btnBorderColor1: '#d64737', // 按钮外边框颜色
            btnBorderColor2: '#ffffff', // 按钮内边框颜色
            btnBorderColor3: '#f6c66f', // 按钮指针颜色
            btnBgColor: '#ffdea0',      // 按钮背景颜色
            btnText: '抽奖',            // 按钮内容
            btnRadius: 60,              // 按钮半径
            borderColor: '#d64737',     // 边框颜色
            awards: [                   // 奖品
            { name: '没抽中', color: '#f9e3bb' },
            { name: '价值398元车载空气净化器', color: '#f8d384' },
            { name: '价值25元百叶帘遮阳挡', color: '#f9e3bb' },
            { name: '16元油卡套餐红包', color: '#f8d384' },
            { name: '5元油卡直冲红包', color: '#f9e3bb' },
            { name: '3元话费直冲红包', color: '#f8d384' },
            { name: '价值32元重力感应手机支架', color: '#f9e3bb' },
            { name: '3元话费直冲红包', color: '#f8d384' },
            ],
        }
    },
    methods: {
        handleStart () {
            console.log('开始抽奖',this.currIndex)
        },
        a() {
            this.$refs.luckDraw.play("2")
        },
        handleEnd () {
        //   alert('恭喜您抽到大奖, 奖品为' + this.awards[this.currIndex].name)
            if(this.currIndex == 0){
            MessageBox({
                title: '抽奖结果',
                message: '很遗憾你没有抽中',
                showCancelButton: true
            });
            return
            }
            MessageBox({
                title: '抽奖结果',
                message: '恭喜您抽到大奖, 奖品为' + this.awards[this.currIndex].name,
                showCancelButton: true
            });
        }
    }
}
</script>

<style>
    .a1{
        position: relative;
        width: 100%;
        height: 100vh;
    }
    .ldq-luck{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
</style>