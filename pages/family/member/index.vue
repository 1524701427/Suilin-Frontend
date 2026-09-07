<template>
<view class="page">
  <text class="title">我的长辈</text>
  <text class="sub">资料由家人录入，年龄根据出生日期实时计算</text>

  <view v-if="loading" class="empty"><text>正在加载...</text></view>
  <view v-else-if="elders.length">
    <view v-for="m in elders" :key="m.id" class="card">
      <view class="avatar">{{m.name.slice(-1)}}</view>
      <view class="main">
        <text class="name">{{m.name}} · {{m.relation}}</text>
        <text class="meta">{{m.age}}岁 · {{m.bindStatus==='BOUND'?'已绑定':'等待绑定'}}</text>
      </view>
      <view v-if="m.bindStatus==='BOUND'" class="status bound">已绑定</view>
      <button v-else class="invite-btn" @tap="invite(m)">发邀请</button>
    </view>
  </view>

  <view v-else class="empty"><text>还没有添加长辈</text></view>
  <button class="add" @tap="addElder">+ 添加长辈</button>
</view>
</template>

<script>
import { elderApi } from '@/api/index.js'
export default {
 data(){return {elders:[],loading:false}},
 onShow(){this.load()},
 methods:{
  async load(){
    this.loading=true
    try{this.elders=await elderApi.list()||[]}finally{this.loading=false}
  },
  async invite(m){
    const data=await elderApi.createInvite(m.id)
    uni.navigateTo({url:`/pages/family/elder-invite/index?elderId=${m.id}&token=${data.inviteToken}`})
  },
  addElder(){uni.navigateTo({url:'/pages/family/elder-add/index'})}
 }
}
</script>

<style scoped>
.page{min-height:100vh;padding:36rpx;background:#fff9f2}.title{display:block;font-size:42rpx;font-weight:900;color:#493a33}.sub{display:block;margin:12rpx 0 28rpx;color:#927d70}.card{background:#fff;border-radius:30rpx;padding:28rpx;display:flex;align-items:center;margin-bottom:18rpx}.avatar{width:76rpx;height:76rpx;border-radius:24rpx;background:#ffe1bd;display:flex;align-items:center;justify-content:center;font-weight:900;color:#7f5634}.main{flex:1;margin-left:20rpx}.name{display:block;font-size:30rpx;font-weight:900;color:#493a33}.meta{display:block;margin-top:8rpx;color:#88786c}.status{padding:10rpx 14rpx;border-radius:16rpx;font-size:20rpx}.status.bound{background:#e6f5f1;color:#278b7e}.invite-btn{margin:0;padding:0 18rpx;height:62rpx;line-height:62rpx;border-radius:18rpx;background:#fff1df;color:#c57834;font-size:21rpx}.empty{background:#fff;padding:50rpx;text-align:center;border-radius:30rpx;color:#99887d}.add{margin-top:30rpx;background:#2fa99a;color:#fff;border-radius:24rpx}
</style>