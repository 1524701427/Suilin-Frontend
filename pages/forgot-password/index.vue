<template>
  <view class="page">
    <text class="title">找回密码</text>
    <text class="sub">密码重置接口和短信验证码服务尚未接入。</text>
    <view class="card">
      <text class="notice">为了避免产生假的验证码和假的“重置成功”状态，当前版本暂不提供本地模拟重置。</text>
      <button class="primary" @tap="backToLogin">返回登录</button>
    </view>
  </view>
</template>
<script>
export default{methods:{backToLogin(){uni.redirectTo({url:'/pages/login/index'})}}}
</script>
<style scoped>.page{min-height:100vh;padding:80rpx 32rpx;background:#fff9f2;box-sizing:border-box}.title{display:block;font-size:44rpx;font-weight:900;color:#493a33}.sub{display:block;margin-top:12rpx;color:#8b786d;font-size:23rpx;line-height:1.6}.card{margin-top:32rpx;padding:30rpx;background:#fff;border-radius:28rpx}.notice{display:block;font-size:24rpx;line-height:1.8;color:#75655c}.primary{margin-top:28rpx;background:#2fa99a;color:#fff;border-radius:20rpx}</style>