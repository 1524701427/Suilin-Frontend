<template>
  <view class="page">
    <view class="brand-block">
      <SuilinLogo size="lg" />
      <text class="logo">岁邻</text>
      <text class="slogan">让牵挂更近，让生活更安心</text>
      <text class="desc">家人先创建账号并添加长辈，再把邀请发给长辈。长辈点一下即可绑定，无需注册。</text>
    </view>

    <view class="role family" @tap="goFamily">
      <view>
        <text class="tag">子女 / 家属使用</text>
        <text class="title">进入家人端</text>
        <text class="sub">添加长辈、设置提醒、查看健康与照护信息</text>
      </view>
      <text class="arrow">→</text>
    </view>

    <view v-if="hasBoundElder" class="role elder" @tap="goElder">
      <view>
        <text class="tag">本机已绑定</text>
        <text class="title">继续使用长辈端</text>
        <text class="sub">大字、清楚、少操作</text>
      </view>
      <text class="arrow elder-arrow">→</text>
    </view>

    <view v-else class="elder-tip">
      <text class="elder-tip-title">长辈怎么使用？</text>
      <text class="elder-tip-desc">请打开家人发送的邀请。接受后，这台设备会自动进入长辈端。</text>
    </view>

    <view class="auth">
      <text @tap="goLogin">账号登录</text>
      <text class="dot">·</text>
      <text class="link" @tap="goRegister">家人注册</text>
    </view>
  </view>
</template>

<script>
import SuilinLogo from '@/components/SuilinLogo.vue'
export default {
  components:{SuilinLogo},
  data(){return{hasBoundElder:false}},
  onShow(){this.hasBoundElder=!!uni.getStorageSync('suilin_elder_client_token')},
  methods:{
    goElder(){uni.reLaunch({url:'/pages/elder/index'})},
    goFamily(){
      if(uni.getStorageSync('suilin_token')) uni.reLaunch({url:'/pages/family/home/index'})
      else uni.navigateTo({url:'/pages/login/index'})
    },
    goLogin(){uni.navigateTo({url:'/pages/login/index'})},
    goRegister(){uni.navigateTo({url:'/pages/register/index'})}
  }
}
</script>

<style scoped>
.page{min-height:100vh;box-sizing:border-box;padding:118rpx 44rpx 60rpx;background:radial-gradient(circle at 92% 10%,rgba(255,212,166,.38),transparent 28%),radial-gradient(circle at 2% 38%,rgba(102,194,177,.18),transparent 24%),linear-gradient(180deg,#fff8ef 0%,#fffdf9 58%,#f7fbf8 100%)}.brand-block{text-align:center}.brand-block :deep(.suilin-logo){margin:0 auto 18rpx}.logo{display:block;font-size:68rpx;font-weight:900;color:#4b3b33;letter-spacing:10rpx}.slogan{display:block;margin-top:14rpx;font-size:30rpx;font-weight:800;color:#6e5548}.desc{display:block;margin:18rpx auto 0;max-width:600rpx;font-size:24rpx;line-height:1.75;color:#9a8172}.role{margin-top:46rpx;min-height:210rpx;padding:36rpx;border-radius:36rpx;display:flex;align-items:center;justify-content:space-between;border:1rpx solid rgba(255,255,255,.9);box-shadow:0 18rpx 52rpx rgba(104,74,50,.08)}.family{background:linear-gradient(135deg,#e8f6f1,#f4fbf8)}.elder{margin-top:24rpx;background:linear-gradient(135deg,#fff0df,#fff8ee)}.tag,.title,.sub{display:block}.tag{font-size:22rpx;color:#a07e68}.title{margin-top:14rpx;font-size:39rpx;font-weight:900;color:#493a33}.sub{margin-top:10rpx;font-size:24rpx;color:#8c796d}.arrow{font-size:48rpx;color:#45a994}.elder-arrow{color:#e59850}.elder-tip{margin-top:24rpx;padding:30rpx;border-radius:30rpx;background:rgba(255,255,255,.72);border:1rpx solid #f0e4da}.elder-tip-title{display:block;font-size:26rpx;font-weight:900;color:#5b493f}.elder-tip-desc{display:block;margin-top:10rpx;font-size:23rpx;line-height:1.6;color:#907d71}.auth{margin-top:34rpx;display:flex;justify-content:center;gap:12rpx;font-size:24rpx;color:#8d796d}.link{color:#d98039;font-weight:800}.dot{color:#cbb8aa}
</style>