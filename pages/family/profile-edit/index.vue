<template>
  <view class="page">
    <view class="card">
      <text class="title">个人资料</text>

      <text class="label">姓名</text>
      <input v-model="form.name" class="input" maxlength="50" placeholder="请输入姓名"/>

      <text class="label">手机号</text>
      <view class="readonly">{{form.phone || '未获取'}}</view>
      <text class="tip">手机号用于登录，当前版本不支持在这里直接修改。</text>

      <button class="save" :disabled="loading" @tap="save">{{loading?'保存中...':'保存资料'}}</button>
    </view>
  </view>
</template>

<script>
import { userApi } from '@/api/index.js'
export default{
  data(){return{form:{name:'',phone:''},loading:false}},
  async onLoad(){
    this.loading=true
    try{
      const data=await userApi.me()
      this.form.name=data.name||''
      this.form.phone=data.phone||''
    }finally{this.loading=false}
  },
  methods:{
    async save(){
      if(!this.form.name.trim())return uni.showToast({title:'请输入姓名',icon:'none'})
      if(this.loading)return
      this.loading=true
      try{
        const data=await userApi.update({name:this.form.name.trim()})
        const user=uni.getStorageSync('suilin_user')||{}
        uni.setStorageSync('suilin_user',{...user,name:data.name,phone:data.phone,role:data.role})
        uni.showToast({title:'保存成功',icon:'success'})
        setTimeout(()=>uni.navigateBack(),400)
      }finally{this.loading=false}
    }
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:28rpx;background:#fff9f2}.card{padding:30rpx;background:#fff;border-radius:28rpx}.title{display:block;font-size:34rpx;font-weight:900;color:#493a33}.label{display:block;margin:24rpx 0 10rpx;font-size:22rpx;color:#78675d}.input,.readonly{height:82rpx;padding:0 20rpx;border-radius:18rpx;background:#fff7ef;display:flex;align-items:center;color:#493a33}.tip{display:block;margin-top:10rpx;font-size:20rpx;line-height:1.5;color:#9a887d}.save{margin-top:34rpx;background:#2fa99a;color:#fff;border-radius:20rpx}
</style>