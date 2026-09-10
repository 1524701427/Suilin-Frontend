<template>
<view class="page">
  <text class="title">通知设置</text>
  <text class="sub">偏好会保存到账号。微信订阅消息接入后，将按这些设置决定是否推送。</text>
  <view v-if="loading" class="empty">正在加载...</view>
  <view v-else class="card">
    <view v-for="item in items" :key="item.key" class="row">
      <view><text class="name">{{item.name}}</text><text class="desc">{{item.desc}}</text></view>
      <switch :checked="settings[item.key]" color="#2fa99a" @change="onChange(item.key,$event)"/>
    </view>
  </view>
  <button class="save" :disabled="saving" @tap="save">{{saving?'保存中...':'保存设置'}}</button>
  <text class="tip">注意：目前已完成通知偏好和 SOS 事件闭环；真正的微信消息推送仍需配置小程序订阅消息模板和平台凭证。</text>
</view>
</template>
<script>
import { notificationApi } from '@/api/index.js'
export default{
  data(){return{
    loading:true,saving:false,
    settings:{sosEnabled:true,reminderEnabled:true,healthEnabled:true,deviceEnabled:true,serviceEnabled:false},
    items:[
      {key:'sosEnabled',name:'紧急求助',desc:'SOS 求助事件提醒'},
      {key:'reminderEnabled',name:'提醒事项',desc:'长辈提醒和未确认事项'},
      {key:'healthEnabled',name:'健康记录',desc:'健康数据相关通知'},
      {key:'deviceEnabled',name:'设备状态',desc:'设备上下线等状态通知'},
      {key:'serviceEnabled',name:'服务进度',desc:'后续服务订单状态通知'}
    ]
  }},
  async onLoad(){try{const data=await notificationApi.get();this.settings={...this.settings,...data}}finally{this.loading=false}},
  methods:{
    onChange(key,e){this.settings[key]=e.detail.value},
    async save(){if(this.saving)return;this.saving=true;try{await notificationApi.update(this.settings);uni.showToast({title:'已保存',icon:'success'})}finally{this.saving=false}}
  }
}
</script>
<style scoped>.page{min-height:100vh;padding:30rpx;background:#fff9f2}.title{display:block;font-size:40rpx;font-weight:900;color:#493a33}.sub{display:block;margin:10rpx 0 28rpx;color:#8b786d;line-height:1.6}.card{padding:0 24rpx;background:#fff;border-radius:28rpx}.row{min-height:116rpx;display:flex;align-items:center;justify-content:space-between;border-bottom:1rpx solid #f0e7df}.row:last-child{border-bottom:none}.name,.desc{display:block}.name{font-size:25rpx;font-weight:800}.desc{margin-top:6rpx;color:#928077;font-size:19rpx}.save{margin-top:26rpx;background:#2fa99a;color:#fff;border-radius:20rpx}.tip{display:block;margin-top:20rpx;padding:20rpx;background:#fff3e6;border-radius:20rpx;color:#8d735f;font-size:20rpx;line-height:1.6}.empty{padding:40rpx;text-align:center;background:#fff;border-radius:26rpx;color:#8f8178}</style>