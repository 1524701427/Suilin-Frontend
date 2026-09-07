<template>
  <view class="page">
    <view class="brand-wrap">
      <SuilinLogo size="lg" />
      <text class="brand">岁邻</text>
      <text class="title">欢迎回来</text>
      <text class="sub">看看家人的近况，也把今天的关心送到身边</text>
    </view>
    <view class="card">
      <input v-model="phone" class="input" type="number" maxlength="11" placeholder="手机号"/>
      <input v-model="password" class="input" type="password" placeholder="密码"/>
      <button class="primary" :disabled="loading" @tap="login">{{loading ? '登录中...' : '登录'}}</button>
      <view class="links"><text @tap="forgot">忘记密码</text><text @tap="register">注册账号</text></view>
    </view>
  </view>
</template>
<script>
import SuilinLogo from '@/components/SuilinLogo.vue'
import { authApi } from '@/api/index.js'
export default{
  components:{SuilinLogo},
  data(){return{phone:'',password:'',loading:false}},
  methods:{
    async login(){
      if(!/^1\d{10}$/.test(this.phone)||this.password.length<6) return uni.showToast({title:'请输入正确账号信息',icon:'none'})
      if(this.loading) return
      this.loading=true
      try{
        const data=await authApi.login({phone:this.phone,password:this.password})
        uni.setStorageSync('suilin_token',data.token)
        uni.setStorageSync('suilin_user',{userId:data.userId,name:data.name||'',phone:this.phone,role:data.role})
        uni.showToast({title:'登录成功',icon:'success'})
        setTimeout(()=>uni.reLaunch({url:'/pages/family/home/index'}),400)
      }finally{this.loading=false}
    },
    forgot(){uni.navigateTo({url:'/pages/forgot-password/index'})},
    register(){uni.navigateTo({url:'/pages/register/index'})}
  }
}
</script>
<style scoped>
.page{min-height:100vh;padding:120rpx 38rpx;background:radial-gradient(circle at 90% 6%,rgba(255,206,153,.35),transparent 28%),linear-gradient(180deg,#fff7ee,#fffdf9);box-sizing:border-box}.brand-wrap{text-align:center}.brand-wrap :deep(.suilin-logo){margin:0 auto 14rpx}.brand{display:block;font-size:58rpx;font-weight:900;letter-spacing:8rpx;color:#4b3b33}.title{display:block;margin-top:18rpx;font-size:40rpx;font-weight:900;color:#4b3b33}.sub{display:block;margin:12rpx auto 0;max-width:560rpx;color:#9a8172;font-size:24rpx;line-height:1.6}.card{margin-top:42rpx;padding:32rpx;background:rgba(255,255,255,.94);border:1rpx solid #f7e5d5;border-radius:32rpx;box-shadow:0 20rpx 56rpx rgba(123,82,52,.08)}.input{height:88rpx;margin-bottom:20rpx;padding:0 22rpx;background:#fff8f2;border-radius:20rpx;color:#493a33}.primary{background:linear-gradient(135deg,#f1a150,#ea8a3c);color:#fff;border-radius:22rpx;box-shadow:0 12rpx 28rpx rgba(225,129,50,.2)}.links{display:flex;justify-content:space-between;margin-top:24rpx;color:#8b6e5e;font-size:23rpx}
</style>