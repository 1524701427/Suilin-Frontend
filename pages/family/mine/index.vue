<template>
<view class="page">
  <PageHeader subtitle="我的"/>

  <view class="profile-card" @tap="go('profile-edit')">
    <view class="avatar">{{avatarText}}</view>
    <view class="profile-content">
      <text class="profile-name">{{user.name || '家人账号'}}</text>
      <text class="profile-role">家人端账号</text>
    </view>
    <text class="edit">编辑</text>
  </view>

  <view class="family-summary">
    <view>
      <text class="summary-label">我的长辈</text>
      <text class="summary-title">{{elderSummary}}</text>
    </view>
    <button class="mini-add" @tap="addElder">+ 添加长辈</button>
  </view>

  <text class="section-title">家庭管理</text>
  <view class="menu-card">
    <view class="menu-row" @tap="go('member')"><view class="menu-icon">👨‍👩‍👧</view><view class="menu-main"><text class="menu-title">长辈与家庭</text><text class="menu-desc">查看长辈资料与绑定状态</text></view><text class="arrow">→</text></view>
    <view class="menu-row" @tap="go('device')"><view class="menu-icon">⌚</view><view class="menu-main"><text class="menu-title">设备管理</text><text class="menu-desc">查看已绑定设备</text></view><text class="arrow">→</text></view>
    <view class="menu-row" @tap="go('notifications')"><view class="menu-icon">🔔</view><view class="menu-main"><text class="menu-title">通知设置</text><text class="menu-desc">异常、提醒和紧急通知</text></view><text class="arrow">→</text></view>
  </view>

  <text class="section-title">更多</text>
  <view class="menu-card">
    <view class="menu-row" @tap="go('privacy')"><view class="menu-icon">🔐</view><view class="menu-main"><text class="menu-title">隐私与授权</text></view><text class="arrow">→</text></view>
    <view class="menu-row" @tap="go('help')"><view class="menu-icon">❓</view><view class="menu-main"><text class="menu-title">帮助与反馈</text></view><text class="arrow">→</text></view>
    <view class="menu-row" @tap="go('about')"><view class="menu-icon brand-mini"><SuilinLogo size="sm"/></view><view class="menu-main"><text class="menu-title">关于岁邻</text><text class="menu-desc">让牵挂更近，让生活更安心</text></view><text class="arrow">→</text></view>
  </view>

  <button class="logout" @tap="logout">退出登录</button>
  <text class="version">岁邻 · v1.0</text>
  <FamilyTabbar active="mine"/>
</view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import FamilyTabbar from '@/components/FamilyTabbar.vue'
import SuilinLogo from '@/components/SuilinLogo.vue'
import { authApi, elderApi } from '@/api/index.js'

export default{
  components:{PageHeader,FamilyTabbar,SuilinLogo},
  data(){return{user:{},elders:[]}},
  computed:{
    avatarText(){return (this.user.name||'家').slice(-1)},
    elderSummary(){return this.elders.length ? `已添加 ${this.elders.length} 位长辈` : '还没有添加长辈'}
  },
  onShow(){
    this.user=uni.getStorageSync('suilin_user')||{}
    this.loadElders()
  },
  methods:{
    async loadElders(){
      if(!uni.getStorageSync('suilin_token')){this.elders=[];return}
      try{this.elders=await elderApi.list()||[]}catch(e){this.elders=[]}
    },
    addElder(){uni.navigateTo({url:'/pages/family/elder-add/index'})},
    async logout(){
      try{await authApi.logout()}catch(e){}
      uni.removeStorageSync('suilin_token')
      uni.removeStorageSync('suilin_user')
      uni.reLaunch({url:'/pages/login/index'})
    },
    go(name){
      const map={member:'/pages/family/member/index',device:'/pages/family/device/index',notifications:'/pages/family/notifications/index',privacy:'/pages/family/privacy/index',help:'/pages/family/help/index',about:'/pages/family/about/index','profile-edit':'/pages/family/profile-edit/index'}
      uni.navigateTo({url:map[name]})
    }
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:34rpx 28rpx 180rpx;background:radial-gradient(circle at 100% 0,rgba(255,218,179,.28),transparent 24%),linear-gradient(180deg,#fff9f2,#f8fbf8)}.profile-card,.family-summary,.menu-card{background:rgba(255,255,255,.96);border:1rpx solid #f2e5da;border-radius:30rpx;box-shadow:0 14rpx 42rpx rgba(107,78,58,.06)}.profile-card,.family-summary{display:flex;align-items:center;padding:28rpx;margin-top:24rpx}.avatar{width:82rpx;height:82rpx;display:flex;align-items:center;justify-content:center;border-radius:24rpx;background:linear-gradient(135deg,#ffe1bd,#ffd2a0);color:#8b5b35;font-weight:900}.profile-content{flex:1;margin-left:18rpx}.profile-name,.profile-role,.summary-label,.summary-title,.menu-title,.menu-desc{display:block}.profile-name{font-size:31rpx;font-weight:900;color:#493a33}.profile-role,.summary-label,.menu-desc{margin-top:6rpx;font-size:19rpx;color:#938074}.edit{color:#cf7e40;font-size:20rpx}.family-summary{justify-content:space-between;background:linear-gradient(135deg,#eaf7f3,#fffaf4)}.summary-title{margin-top:5rpx;font-size:27rpx;font-weight:900;color:#4c3d35}.mini-add{margin:0;padding:0 18rpx;height:64rpx;line-height:64rpx;border-radius:18rpx;background:#2fa99a;color:#fff;font-size:22rpx}.section-title{display:block;margin:34rpx 5rpx 14rpx;font-size:25rpx;font-weight:900;color:#5c4a40}.menu-card{padding:0 24rpx}.menu-row{min-height:112rpx;display:flex;align-items:center;border-bottom:1rpx solid #f1ebe6}.menu-row:last-child{border-bottom:none}.menu-icon{width:58rpx;height:58rpx;display:flex;align-items:center;justify-content:center;border-radius:18rpx;background:#fff6ed;overflow:hidden}.brand-mini{background:#f4fbf8}.brand-mini :deep(.suilin-logo){transform:scale(.42);transform-origin:center}.menu-main{flex:1;margin-left:16rpx}.menu-title{font-size:24rpx;font-weight:800;color:#4a3a32}.arrow{color:#d5a27b}.logout{margin-top:32rpx;background:#fff;color:#9b5f51;border:1rpx solid #eed8d0;border-radius:20rpx}.version{display:block;margin-top:24rpx;text-align:center;color:#a99486;font-size:18rpx}
</style>