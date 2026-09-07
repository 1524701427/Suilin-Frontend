<template>
  <view class="page">
    <view class="brand-wrap">
      <SuilinLogo size="lg"/>
      <text class="brand">岁邻</text>
      <text class="title">创建家人账号</text>
      <text class="sub">注册后，在家人端添加长辈资料</text>
    </view>

    <view class="card">
      <text class="label">手机号</text>
      <input v-model="form.phone" class="input" type="number" maxlength="11" placeholder="请输入手机号"/>
      <text class="label">姓名</text>
      <input v-model="form.name" class="input" maxlength="20" placeholder="请输入您的姓名"/>
      <text class="label">密码</text>
      <input v-model="form.password" class="input" type="password" placeholder="至少6位"/>
      <text class="tip">注册完成后，可在“我的 → 添加长辈”中录入父母信息</text>
      <button class="primary" :disabled="loading" @tap="submit">{{loading ? '注册中...' : '注册'}}</button>
      <view class="links"><text @tap="goLogin">已有账号，去登录</text><text @tap="goBack">返回首页</text></view>
    </view>
  </view>
</template>

<script>
import SuilinLogo from '@/components/SuilinLogo.vue'
import { authApi } from '@/api/index.js'

export default {
  components:{SuilinLogo},
  data(){return{form:{phone:'',name:'',password:''},loading:false}},
  methods:{
    async submit(){
      const f=this.form
      if(!/^1\d{10}$/.test(f.phone)) return uni.showToast({title:'请输入正确手机号',icon:'none'})
      if(!f.name.trim()) return uni.showToast({title:'请输入姓名',icon:'none'})
      if(f.password.length<6) return uni.showToast({title:'密码至少6位',icon:'none'})
      if(this.loading) return
      this.loading=true
      try{
        const data=await authApi.register({phone:f.phone,name:f.name.trim(),password:f.password})
        uni.setStorageSync('suilin_token',data.token)
        uni.setStorageSync('suilin_user',{userId:data.userId,name:f.name.trim(),phone:f.phone,role:data.role})
        uni.showToast({title:'注册成功',icon:'success'})
        setTimeout(()=>uni.reLaunch({url:'/pages/family/home/index'}),400)
      }finally{this.loading=false}
    },
    goLogin(){uni.navigateTo({url:'/pages/login/index'})},
    goBack(){uni.reLaunch({url:'/pages/entry/index'})}
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:90rpx 36rpx;background:linear-gradient(180deg,#fff7ee,#fffdf9);box-sizing:border-box}.brand-wrap{text-align:center}.brand{display:block;font-size:52rpx;font-weight:900;letter-spacing:8rpx;color:#4b3b33}.title{display:block;margin-top:14rpx;font-size:40rpx;font-weight:900;color:#4b3b33}.sub{display:block;margin-top:10rpx;color:#9a8172;font-size:23rpx}.card{margin-top:30rpx;padding:30rpx;background:#fff;border-radius:32rpx;box-shadow:0 18rpx 50rpx rgba(116,75,47,.07)}.label{display:block;margin:20rpx 0 10rpx;color:#7e675a}.input{height:82rpx;padding:0 20rpx;background:#fff8f2;border-radius:18rpx}.tip{display:block;margin-top:24rpx;color:#9a8172;font-size:24rpx;line-height:1.5}.primary{margin-top:30rpx;background:#f39a3f;color:#fff;border-radius:20rpx}.links{display:flex;justify-content:space-between;margin-top:22rpx;color:#82695b;font-size:22rpx}
</style>