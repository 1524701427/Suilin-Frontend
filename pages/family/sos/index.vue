<template>
<view class="page">
  <text class="title">紧急求助记录</text>
  <text class="sub">这里只显示长辈端真实发起并写入后端的 SOS 事件。</text>

  <view v-if="loading" class="empty">正在加载...</view>
  <view v-else-if="events.length">
    <view v-for="e in events" :key="e.id" class="card">
      <view class="head"><text class="elder">{{e.elderName || '长辈'}}</text><text class="status" :class="e.status.toLowerCase()">{{statusName(e.status)}}</text></view>
      <text class="time">发起时间：{{formatTime(e.createdAt)}}</text>
      <text v-if="e.latitude!==null&&e.latitude!==undefined" class="location">位置：{{e.latitude}}, {{e.longitude}}</text>
      <text v-if="e.handledAt" class="time">处理时间：{{formatTime(e.handledAt)}}</text>
      <view class="actions">
        <button v-if="e.status==='OPEN'" class="handle" @tap="handle(e)">我来处理</button>
        <button v-if="e.status!=='CLOSED'" class="close" @tap="close(e)">确认已解决</button>
      </view>
    </view>
  </view>
  <view v-else class="empty">暂无紧急求助记录</view>

  <view class="tip">当前已完成 SOS 事件记录和家属处理闭环；微信订阅消息、短信或电话自动通知需要平台凭证后再接入。</view>
</view>
</template>
<script>
import { sosApi } from '@/api/index.js'
export default{
  data(){return{events:[],loading:false}},
  onShow(){this.load()},
  methods:{
    async load(){this.loading=true;try{this.events=await sosApi.list()||[]}finally{this.loading=false}},
    statusName(v){return {OPEN:'待处理',HANDLING:'处理中',CLOSED:'已解决'}[v]||v},
    formatTime(v){return v?String(v).replace('T',' ').slice(0,16):''},
    async handle(e){await sosApi.handle(e.id);await this.load();uni.showToast({title:'已标记处理中',icon:'success'})},
    close(e){uni.showModal({title:'确认已解决',content:'确认这次紧急求助已经处理完成吗？',success:async r=>{if(!r.confirm)return;await sosApi.close(e.id);await this.load();uni.showToast({title:'已关闭',icon:'success'})}})}
  }
}
</script>
<style scoped>.page{min-height:100vh;padding:34rpx;background:#fff9f2}.title{display:block;font-size:40rpx;font-weight:900;color:#493a33}.sub{display:block;margin:10rpx 0 28rpx;color:#8c796e;line-height:1.6}.card{margin-bottom:18rpx;padding:28rpx;background:#fff;border-radius:28rpx}.head{display:flex;justify-content:space-between;align-items:center}.elder{font-size:29rpx;font-weight:900;color:#493a33}.status{padding:8rpx 13rpx;border-radius:14rpx;font-size:19rpx}.status.open{background:#fff0ee;color:#b4554c}.status.handling{background:#fff1df;color:#bd7635}.status.closed{background:#e8f6f1;color:#29897d}.time,.location{display:block;margin-top:11rpx;color:#88786e;font-size:21rpx}.actions{display:flex;gap:14rpx;margin-top:20rpx}.handle,.close{flex:1;margin:0;border-radius:18rpx}.handle{background:#f39a3f;color:#fff}.close{background:#2fa99a;color:#fff}.empty{padding:46rpx;text-align:center;background:#fff;border-radius:28rpx;color:#928178}.tip{margin-top:24rpx;padding:22rpx;background:#fff3e6;border-radius:22rpx;color:#896f5d;font-size:20rpx;line-height:1.7}</style>