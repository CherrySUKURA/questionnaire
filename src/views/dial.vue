<template>
  <div id="app" class="dial" :style="{backgroundImage:'url('+img+')'}">
    <!-- 以下是默认配置参数, 可以根据个人需要进行修改 -->
    <div class="header">
        <mt-header title="" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
    </div>
    <div class="content">
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
            @before-start="DrawingProcessa"
            ref="luckDraw"
            />
        <div class="prize">
            <h2>奖项设置</h2>
            <div v-for = "(item,index) in Ruler" :key="index" class="Rule">
                {{item.prizeLevel}}:{{item.prizeRule}}({{item.amount}})
            
            </div>
            <p>如已中奖请联系蓝色烟囱官方客服：0571-56072990</p>
        </div>
    </div>
  </div>
</template>
<script>
import {MessageBox,Toast} from 'mint-ui'
import {prizeInfo,PrizeRuleInfo,Random,UserInfoPhone} from '../request/api'
import {mapState} from 'vuex'
export default {
    created(){
        this.Request();
        this.RequestRule();
    },
    computed:{
        ...mapState( {//填表人信息
            userInfo : state => state.userInfo
        }),
    },
    data () {
        return {
            img: require("../assets/bg.jpg"),
            Ruler: [],
            currIndex: 0,  
            async: true,             // 奖品的索引
            rate: 80,                   // 转盘速率
            radius: (document.body.clientWidth-48)/2,                // 转盘半径
            textFontSize: '12px',       // 文字大小
            lineHeight: 20,             // 文字行高
            textColor: '#E6E6FA',       // 文字颜色
            textMargin: 30,             // 文字距离边框距离
            textPadding: 0,             // 文字补偿宽度
            btnFontSize: '20px',        // 按钮文字大小
            btnColor: '#E6E6FA',        // 按钮文件颜色
            btnBorderColor1: '#3760d1', // 按钮外边框颜色
            btnBorderColor2: '#ffffff', // 按钮内边框颜色
            btnBorderColor3: '#b1b7f1', // 按钮指针颜色
            btnBgColor: '#1724A9',      // 按钮背景颜色
            btnText: '抽奖',            // 按钮内容
            btnRadius: (document.body.clientWidth-48)/6,              // 按钮半径
            borderColor: '#1724A9',     // 边框颜色
            awards: [],                   // 奖品
            topicNoParam: {
                topic_no: ""
            }
        }
    },
    methods: {
        handleStart () {
            //开始回调

        },
        DrawingProcessa() {//异步开始回调
            let param = {
                topic_no: this.userInfo.topic_no,
                phone: this.userInfo.phone
            }
            UserInfoPhone(param).then(
                res => {
                    if(!res.data.status){
                        Toast({
                            message: "您已经抽过奖了",
                            position: 'bottom',
                            duration: 5000
                        })
                        return false
                    }
                    Random(param).then(
                        reses => {
                            this.$refs.luckDraw.play(reses.data.win)
                            this.RequestRule();
                        }
                    )
                }
            )
        },
        handleEnd () {
            MessageBox({
                title: '抽奖结果',
                message: '您抽到的结果是：'+ this.awards[this.currIndex].name,
                showCancelButton: true
            });
        },
        Request(){//请求奖品列表
            prizeInfo({topic_no : this.userInfo.topic_no}).then(
                res => {
                    let data = res
                    // let arr = new Array()
                    data.forEach( (item,index) => {
                        if( index % 2 == 0 || index == 0){
                            this.awards.push({
                                name: item.prizeDesc,
                                color: '#3760d1'
                            })
                        }else{
                            this.awards.push({
                                name: item.prizeDesc,
                                color: '#1724A9'
                            })
                        }
                    })
                    this.$refs.luckDraw.initCanvas()
                }
                
            )
        },
        RequestRule(){//请求奖品规则
            PrizeRuleInfo({topic_no : this.userInfo.topic_no}).then(
                res => {
                    let data = res;
                    this.Ruler = data
                }
            )
        }
    }
}
</script>

<style scoped>
    .dial{
        background:no-repeat;
        background-size: cover;
    }
    .content{
        position: relative;
        width: 100%;
        /* height: 100vh; */
        padding: 60px 0 60px 0;
        box-sizing: border-box;
    }   
    .ldq-luck{
        margin: 0 20px 0 20px;
    }
    .mint-header{
        background: transparent;
    }
    .prize{
        color: #E6E6FA;
        border: 5px dotted #3760d1;
        box-sizing: border-box;
        background: #1724A9;
        margin: 40px 20px 0 20px;
        min-height: 200px;
        padding: 20px 20px;
        line-height: 40px;
        text-align: center;
        position: relative;
        padding: 0 0 60px 0;
    }
    .prize h2{
        font-size: 18px;

    }
    .prize p{
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        font-size: 3px;
        line-height: 15px;
        display: block;
        width: 80%;
    }
    .Rule{
        font-size: 16px;
    }
</style>