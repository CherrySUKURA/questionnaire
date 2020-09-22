<template>
    <div class="menuList" >
        <mt-header v-if="option[0]" fixed :title="option[0].topic_desc">
        </mt-header>
        <form-choice ref="formchoice" v-if="option.length != 0" :list = option @childByValue = 'childByValue'></form-choice>
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
            option: [],
            add : [
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
        }
    },
    methods: {
        onLoad() {
            aiAddress({topic_no: 1}).then( res => {    
                let data = this.changeOrder(res);
                this.option = data
                this.option = this.addOrder(data)
            })
        },
        changeOrder(data){
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
            return data
        },
        addOrder(data){
            this.add.forEach( (item) => {
                data.push(item)
            })
            return data
        },
        childByValue(childValue){
            let changeChildValue = JSON.parse(JSON.stringify(childValue))
            changeChildValue[0].list.splice(changeChildValue[0].list.length-3,3)
            this.storeSaveValue(changeChildValue)
            Questionnaireinfo(JSON.stringify(changeChildValue)).then(
                res => {
                    Toast({
                        message: res.msg,
                        position: 'bottom',
                        duration: 5000
                    })
                    this.$refs.formchoice.clear()
                    this.$router.push('/img')
                    if(res.data.status){ 
                        this.$router.push('/dial')
                    }
                }
            )
            
        },
        storeSaveValue(changeChildValue){
            this.$store.commit('userInfoValue',{
                username: changeChildValue[0].username,
                phone: changeChildValue[0].phone,
                address: changeChildValue[0].address,
                topic_no: changeChildValue[0].topic_no
            })
        }
    }
}
</script>

<style scoped>
.menuList{
    padding: 40px 10px 30px 10px;
}
.mint-header{
    background: #1724A9;
}
</style>
<style>
.mint-header-title{
    overflow: visible;
}
</style>