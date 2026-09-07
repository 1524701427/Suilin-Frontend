<template>
  <view class="page">
    <text class="hero">设备管理</text>
    <text class="sub">这里只展示实际绑定到长辈的设备，不再预置演示设备。</text>

    <view v-if="loading" class="empty"><text>正在加载...</text></view>
    <view v-else-if="!elders.length" class="empty"><text>请先添加长辈</text></view>

    <template v-else>
      <scroll-view scroll-x class="elder-tabs">
        <view class="elder-tabs-inner">
          <view v-for="e in elders" :key="e.id" class="elder-tab" :class="{active:selected&&selected.id===e.id}" @tap="selectElder(e)">{{e.name}}</view>
        </view>
      </scroll-view>

      <view v-if="devices.length">
        <view v-for="d in devices" :key="d.id" class="card">
          <view class="top">
            <view>
              <text class="name">{{typeName(d.deviceType)}}</text>
              <text class="desc">设备码：{{d.deviceSn}}</text>
            </view>
            <text class="status" :class="{online:d.status==='ONLINE'}">{{d.status==='ONLINE'?'在线':'离线'}}</text>
          </view>
          <text class="meta">最近在线：{{d.lastOnlineAt?formatTime(d.lastOnlineAt):'暂无记录'}}</text>
        </view>
      </view>
      <view v-else class="empty"><text>这位长辈还没有绑定设备</text></view>

      <view class="add-card">
        <text class="add-title">手动添加设备</text>
        <picker :range="typeLabels" @change="onTypeChange"><view class="input">{{typeLabels[typeIndex]}}</view></picker>
        <input v-model="deviceSn" class="input" placeholder="请输入设备码 / SN" />
        <button class="add" :disabled="saving" @tap="addDevice">{{saving?'添加中...':'+ 添加设备'}}</button>
      </view>
    </template>
  </view>
</template>

<script>
import { elderApi, deviceApi } from '@/api/index.js'
export default{
  data(){return{
    elders:[],selected:null,devices:[],loading:true,saving:false,deviceSn:'',typeIndex:0,
    types:['WATCH','SENSOR','CALL_BUTTON','OTHER'],
    typeLabels:['智能手环','活动感知设备','紧急呼叫设备','其他设备']
  }},
  async onShow(){await this.load()},
  methods:{
    onTypeChange(e){this.typeIndex=Number(e.detail.value)},
    async load(){
      this.loading=true
      try{
        this.elders=await elderApi.list()||[]
        if(this.elders.length){
          const current=this.selected?.id
          this.selected=this.elders.find(e=>e.id===current)||this.elders[0]
          await this.loadDevices()
        }else{this.selected=null;this.devices=[]}
      }finally{this.loading=false}
    },
    async selectElder(e){this.selected=e;await this.loadDevices()},
    async loadDevices(){this.devices=this.selected?(await deviceApi.list(this.selected.id)||[]):[]},
    async addDevice(){
      if(!this.selected)return
      if(!this.deviceSn.trim())return uni.showToast({title:'请输入设备码',icon:'none'})
      if(this.saving)return
      this.saving=true
      try{
        await deviceApi.create(this.selected.id,{deviceType:this.types[this.typeIndex],deviceSn:this.deviceSn.trim()})
        this.deviceSn=''
        await this.loadDevices()
        uni.showToast({title:'添加成功',icon:'success'})
      }finally{this.saving=false}
    },
    typeName(type){const i=this.types.indexOf(type);return i>=0?this.typeLabels[i]:type},
    formatTime(v){return String(v).replace('T',' ').slice(0,16)}
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:30rpx;background:#fff9f2}.hero{display:block;font-size:40rpx;font-weight:900;color:#493a33}.sub{display:block;margin:10rpx 0 28rpx;color:#8b786d;font-size:22rpx;line-height:1.6}.elder-tabs{white-space:nowrap;margin-bottom:22rpx}.elder-tabs-inner{display:flex;gap:12rpx}.elder-tab{padding:16rpx 24rpx;border-radius:20rpx;background:#fff;color:#806e62}.elder-tab.active{background:#2fa99a;color:#fff;font-weight:800}.card,.empty,.add-card{background:#fff;border-radius:26rpx;border:1rpx solid #f0e5dc;box-shadow:0 12rpx 36rpx rgba(100,73,54,.05)}.card{margin-bottom:18rpx;padding:26rpx}.top{display:flex;justify-content:space-between}.name,.desc,.meta{display:block}.name{font-size:27rpx;font-weight:900;color:#493a33}.desc,.meta{margin-top:6rpx;font-size:20rpx;color:#8c796e}.status{color:#9c7f6f;font-size:20rpx}.status.online{color:#2f8e80}.empty{padding:44rpx;text-align:center;color:#99877b}.add-card{margin-top:24rpx;padding:26rpx}.add-title{display:block;font-size:28rpx;font-weight:900;color:#493a33}.input{height:82rpx;line-height:82rpx;margin-top:16rpx;padding:0 20rpx;border-radius:18rpx;background:#fff7ef}.add{margin-top:20rpx;background:#2fa99a;color:#fff;border-radius:20rpx}
</style>