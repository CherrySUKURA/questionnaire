<template>
    <div class="menuList">
        <mt-header class="a1" fixed title="表单">
            <router-link to="/" slot="right">
                <mt-button>分享</mt-button>
            </router-link>
        </mt-header>
        <form-choice v-if="option.length != 0" :list = option @childByValue = 'childByValue'></form-choice>
    </div>
</template>

<script>
import formChoice from '../components/formChoice'
import { aiAddress,Questionnaireinfo } from '../request/api';
import {Toast} from 'mint-ui'
export default {
    name: 'menuList',
    components: {
        formChoice
    },
    created(){
        this.onLoad()
    },
    computed:{
        
    },
    data(){
        return {
            option: []
        }
    },
    methods: {
        onLoad() {
            aiAddress({topic_no: 1}).then( res => {
                let data = res     
                let add = [
                    {
                        topic_no: '',
                        title_desc: '姓名',
                        title_no: '',
                        title_type: 'username',
                        list: []
                    },
                    {
                        topic_no: '',
                        title_desc: '手机号',
                        title_no: '',
                        title_type: 'phone',
                        list: []
                    },
                    {
                        topic_no: '',
                        title_desc: '地址',
                        title_no: '',
                        title_type: 'address',
                        list: []
                    }
                ]                       
                data.forEach( (item) => {
                    let optionData = []
                    if(item.list != null){
                        item.list.forEach( (optionItem) => {
                            optionData.push({
                                label : optionItem.titleOptionDesc,
                                value : JSON.stringify(optionItem.titleOptionNo)
                            })
                        })
                        item.list = optionData
                    }else{
                        item.list = []
                    }
                })
                add.forEach( (item) => {
                    data.push(item)
                })
                this.option = data
            })
        },
        childByValue(childValue){
            let a = JSON.parse(JSON.stringify(childValue))
            a[0].list.splice(a[0].list.length-3,3)
            this.$store.commit('userInfoValue',{
                username: a[0].username,
                phone: a[0].phone,
                address: a[0].address,
                topic_no: a[0].topic_no
            })
            Questionnaireinfo(JSON.stringify(a)).then(
                res => {
                    Toast({
                        message: res.msg,
                        position: 'bottom',
                        duration: 5000
                    })
                    if(res.data.status){ 
                        this.$router.push('/dial')
                    }
                }
            )
            
        }
    }
}
</script>

<style scoped>

.menuList{
    padding: 40px 10px 30px 10px;
}
.mint-header{
    background: rgb(4, 194, 252);
}
</style>