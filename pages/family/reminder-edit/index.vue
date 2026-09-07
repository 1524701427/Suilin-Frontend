<template>
<view class="page">
  <view class="form card">
    <text class="label">提醒类型</text>
    <picker :range="typeLabels" @change="onTypeChange"><view class="input">{{typeLabels[typeIndex]}}</view></picker>

    <text class="label">提醒名称</text>
    <input class="input" v-model="form.title" placeholder="例如：吃早饭、服用药物"/>

    <text class="label">时间</text>
    <picker mode="time" :value="form.scheduleTime" @change="onTimeChange"><view class="input">{{form.scheduleTime}}</view></picker>

    <text class="label">剂量 / 内容（可选）</text>
    <input class="input" v-model="form.dosage" placeholder="例如：1片"/>

    <text class="label">未确认多久通知家人</text>
    <picker :range="notifyLabels" @change="onNotifyChange"><view class="input">{{notifyLabels[notifyIndex]}}</view></picker>

    <view class="switch-row"><text>启用提醒</text><switch :checked="form.enabled" color="#2fa99a" @change="onEnabledChange"/></view>
    <button class="save" :disabled="loading" @tap="save">{{loading?'保存中...':'保存提醒'}}</button>
  </view>
</view>
</template>

<script>
import { reminderApi } from '@/api/index.js'
export default{
  data(){return{
    elderId:'',loading:false,typeIndex:0,notifyIndex:0,
    types:['MEDICATION','MEAL','MEASUREMENT','APPOINTMENT','OTHER'],
    typeLabels:['用药提醒','吃饭提醒','测量提醒','复诊提醒','其他'],
    notifyValues:[null,15,30,60],
    notifyLabels:['不通知','15分钟','30分钟','60分钟'],
    form:{title:'',scheduleTime:'08:00',dosage:'',enabled:true}
  }},
  onLoad(options){this.elderId=options.elderId||''},
  methods:{
    onTypeChange(e){this.typeIndex=Number(e.detail.value)},
    onTimeChange(e){this.form.scheduleTime=e.detail.value},
    onNotifyChange(e){this.notifyIndex=Number(e.detail.value)},
    onEnabledChange(e){this.form.enabled=e.detail.value},
    async save(){
      if(!this.elderId)return uni.showToast({title:'缺少长辈信息',icon:'none'})
      if(!this.form.title.trim())return uni.showToast({title:'请输入提醒名称',icon:'none'})
      if(this.loading)return
      this.loading=true
      try{
        await reminderApi.create(this.elderId,{
          title:this.form.title.trim(),
          type:this.types[this.typeIndex],
          scheduleTime:this.form.scheduleTime,
          dosage:this.form.dosage.trim()||null,
          repeatRule:'DAILY',
          notifyAfterMinutes:this.notifyValues[this.notifyIndex],
          enabled:this.form.enabled
        })
        uni.showToast({title:'保存成功',icon:'success'})
        setTimeout(()=>uni.navigateBack(),400)
      }finally{this.loading=false}
    }
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:28rpx;background:#fff9f2}.card{background:#fff;border-radius:28rpx}.form{padding:28rpx}.label{display:block;margin:22rpx 0 10rpx;font-size:23rpx;color:#6f6259}.input{height:82rpx;line-height:82rpx;padding:0 22rpx;border-radius:18rpx;background:#fff7ef;font-size:25rpx}.switch-row{display:flex;justify-content:space-between;align-items:center;margin-top:26rpx}.save{margin-top:35rpx;height:82rpx;line-height:82rpx;border-radius:20rpx;background:#2fa99a;color:#fff;font-size:28rpx;font-weight:900}
</style>