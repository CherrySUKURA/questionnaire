<template>
  <div class="formChoice" >
    <div v-for=" (item,index) in formList" :key="index" >
      <div class="title">
        {{index + 1 + '、'}}{{item.title_desc}} 
        <span class="title-tost">{{item.title_type == '1' ? '(单选)' : item.title_type == '2' ? '(多选)' : item.title_type == '5' ? '(填空)' : item.title_type == '3' ? '(单选+填空)' : item.title_type == '4' ? '(多选+填空)' : '(该信息为必要信息，请正确填写)'}}</span>
      </div>
      <div  v-if="item.title_type == 1" class="checkbox">
        <mt-radio align="right" v-model="param[0].list[index].title_option_no[0]" :options = item.list></mt-radio>
      </div>
      <div  v-if="item.title_type == 2"  class="checkbox">
        <mt-checklist align="right" v-model="param[0].list[index].title_option_no" :options = item.list></mt-checklist>
      </div>
      <div v-if="item.title_type == 5"  class="checkbox">
        <mt-field placeholder="请输入" v-model="param[0].list[index].content"></mt-field>
      </div>
      <div  v-if="item.title_type == 3"  class="checkbox">
        <mt-radio align="right" v-model="param[0].list[index].title_option_no[0]" :options = item.list></mt-radio>
        <mt-field placeholder="请提出您的建议" v-model="param[0].list[index].content"></mt-field>
      </div>
      <div  v-if="item.title_type == 4"  class="checkbox">
        <mt-checklist align="right" v-model="param[0].list[index].title_option_no" :options = item.list></mt-checklist>
        <mt-field placeholder="请提出您的建议" v-model="param[0].list[index].content"></mt-field>
      </div>
      <div v-if="item.title_type == 'username'"  class="checkbox">
        <mt-field placeholder="请输入姓名" v-model="param[0].username"></mt-field>
      </div>
      <div v-if="item.title_type == 'phone'"  class="checkbox">
        <mt-field placeholder="请输入手机号" v-model="param[0].phone"></mt-field>
      </div>
      <div v-if="item.title_type == 'address'"  class="checkbox">
        <mt-field placeholder="请输入地址" v-model="param[0].address"></mt-field>
      </div>
    </div>
    <mt-button size="large" @click="submitFun">提交</mt-button>
  </div>

</template>

<script>
import {Toast} from 'mint-ui'
export default {
  name: 'formChoice',
  props: {
    list: {
      type: Array,
      default(){
        return []
      }
    }
  },
  created(){
    this.param = this.listObject
  },
  computed: {
    listObject: function (){
      let arr = [
        {
          phone: "",
          topic_no: this.list[0].topic_no,
          username: "",
          address:"",
          list: []
        }
      ]
      this.list.forEach( (item) => {
        arr[0].list.push(
          {
            title_no: item.title_no,
            title_option_no: [],
            content: '',
            id: ''
          }
        )
      })
      return arr
    }
  },
  data(){
    return {
       formList: JSON.parse(JSON.stringify( this.list )),
       param: []
    }
  },
  methods: {
    submitFun(){
      if(this.param[0].username == ""){
        Toast({
            message: '请填写姓名',
            position: 'bottom',
            duration: 5000
        });
        return false
      }
      if(this.param[0].phone == ""){
        Toast({
            message: '请填写手机号',
            position: 'bottom',
            duration: 5000
        });
        return false
      }
      if(this.param[0].address == ""){
        Toast({
            message: '请填写地址',
            position: 'bottom',
            duration: 5000
        });
        return false
      }
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.param[0].phone))) {
          Toast({
            message: '手机号格式有误',
            position: 'bottom',
            duration: 5000
        });
        return false;
      }
      this.$emit('childByValue',this.param)
    },
    clear(){
      this.param[0].username = ""
      this.param[0].phone = ""
      this.param[0].address = ""
      this.param[0].list.forEach( item => {
        item.title_option_no = []
        item.content = ""
      })
    }
  }
}
</script>

<style>
  .formChoice{
    margin-top: 20px;
  }
  .title{
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .checkbox{
    margin-bottom: 40px;
  }
  .title-tost{
    color: rgba(0, 0, 0, 0.23);
    font-size: 12px;
    margin-left: 5px;
  }
  .mint-cell-wrapper{
    padding: 0;
  }
  .mint-button--large{
    background: #1724A9;
    color: #E6E6FA;
  }
</style>
