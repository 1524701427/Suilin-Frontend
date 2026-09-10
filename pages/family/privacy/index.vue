<template>
<view class="page">
  <text class="title">隐私与授权</text>
  <text class="sub">这些偏好会保存到账号，用于控制家人端是否展示相应类型的数据。</text>
  <view v-if="loading" class="empty">正在加载...</view>
  <view v-else class="card">
    <view v-for="item in items" :key="item.key" class="row">
      <view><text class="name">{{item.name}}</text><text class="desc">{{item.desc}}</text></view>
      <switch :checked="settings[item.key]" color="#2fa99a" @change="onChange(item.key,$event)"/>
    </view>
  </view>
  <button class="save" :disabled="saving" @tap="save">{{saving?'保存中...':'保存设置'}}</button>
  <view class="tip">健康、位置与设备数据只有在获得实际来源和相应授权后才会进入系统；设置本身不会自动生成任何个人数据。</view>
</view>
</template>
<script>
import { privacyApi } from '@/api/index.js'
export default{
  data(){return{loading:true,saving:false,settings:{healthVisible:true,locationVisible:false,deviceVisible:true},items:[
    {key:'healthVisible',name:'健康数据展示',desc:'允许当前账号展示已授权的健康记录'},
    {key:'locationVisible',name:'位置数据展示',desc:'仅在接入真实位置来源后生效'},
    {key:'deviceVisible',name:'设备数据展示',desc:'仅显示已绑定设备实际上报的数据'}
  ]}},
  async onLoad(){try{const data=await privacyApi.get();this.settings={...this.settings,...data}}finally{this.loading=false}},
  methods:{onChange(key,e){this.settings[key]=e.detail.value},async save(){if(this.saving)return;this.saving=true;try{await privacyApi.update(this.settings);uni.showToast({title:'已保存',icon:'success'})}finally{this.saving=false}}}
}
</script>
<style scoped>.page{min-height:100vh;padding:30rpx;background:#fff9f2}.title{display:block;font-size:40rpx;font-weight:900;color:#493a33}.sub{display:block;margin:10rpx 0 28rpx;color:#8b786d;line-height:1.6}.card{padding:0 24rpx 24rpx;background:#fff;border-radius:28rpx}.row{min-height:116rpx;display:flex;align-items:center;justify-content:space-between;border-bottom:1rpx solid #f0e7df}.name,.desc{display:block}.name{font-size:25rpx;font-weight:800}.desc{margin-top:6rpx;color:#928077;font-size:19rpx}.save{margin-top:24rpx;background:#2fa99a;color:#fff;border-radius:20rpx}.tip{margin-top:24rpx;padding:24rpx;border-radius:22rpx;background:#eff8f5;color:#637d76;font-size:21rpx;line-height:1.7}.empty{padding:40rpx;text-align:center;background:#fff;border-radius:26rpx;color:#918178}</style>