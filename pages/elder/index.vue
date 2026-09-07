<template>
  <view class="page">
    <view class="topbar">
      <view class="brand-wrap">
        <SuilinLogo size="sm" />
        <view>
          <text class="brand">岁邻</text>
          <text class="date">{{dateText}}</text>
        </view>
      </view>
      <text v-if="profile" class="elder-name">{{profile.name}}</text>
    </view>

    <view v-if="loading" class="empty-card"><text>正在加载...</text></view>

    <view v-else-if="!clientToken || !profile" class="empty-card">
      <text class="empty-title">这台设备还没有绑定</text>
      <text class="empty-desc">请从家人发送的邀请进入，点击一次“接受邀请”即可使用。</text>
    </view>

    <template v-else>
      <view v-if="currentReminder" class="task-card">
        <text class="task-label">现在要做</text>
        <view class="task-main">
          <view class="medicine-icon">{{currentReminder.type==='MEDICATION'?'💊':'⏰'}}</view>
          <view class="task-copy">
            <text class="task-title">{{currentReminder.title}}</text>
            <text class="task-time">{{currentReminder.scheduleTime}}{{currentReminder.dosage ? ' · '+currentReminder.dosage : ''}}</text>
          </view>
        </view>
        <button class="primary-btn" :class="{finished:completedIds.includes(currentReminder.id)}" :disabled="completedIds.includes(currentReminder.id)" @tap="finish(currentReminder)">
          {{completedIds.includes(currentReminder.id)?'已完成 ✓':'我完成了'}}
        </button>
      </view>

      <view v-else class="empty-card">
        <text class="empty-title">今天没有提醒</text>
        <text class="empty-desc">有新的提醒时，会显示在这里。</text>
      </view>

      <button class="big-btn call-btn" @tap="callFamily">
        <text class="big-icon">☎</text>
        <view><text class="big-title">联系家人</text><text v-if="profile.familyContact?.name" class="big-sub">{{profile.familyContact.name}}</text></view>
      </button>

      <button class="big-btn assistant-btn" @tap="assistant">
        <text class="big-icon">🎙</text>
        <text class="big-title">语音助手</text>
      </button>

      <view class="sos-card" @touchstart="holdSos" @touchend="cancelSos" @touchcancel="cancelSos">
        <view class="sos-circle">SOS</view>
        <view>
          <text class="sos-title">紧急求助</text>
          <text class="sos-sub">按住 3 秒通知家人</text>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import SuilinLogo from '@/components/SuilinLogo.vue'
import { elderApi } from '@/api/index.js'

export default {
  components:{SuilinLogo},
  data(){return{clientToken:'',profile:null,reminders:[],completedIds:[],loading:true,timer:null}},
  computed:{
    dateText(){
      const d=new Date(); const days=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
      return `${d.getMonth()+1}月${d.getDate()}日 · ${days[d.getDay()]}`
    },
    currentReminder(){return this.reminders.find(r=>!this.completedIds.includes(r.id)) || null}
  },
  async onShow(){
    this.clientToken=uni.getStorageSync('suilin_elder_client_token')||''
    await this.load()
  },
  methods:{
    async load(){
      this.loading=true
      if(!this.clientToken){this.profile=null;this.reminders=[];this.loading=false;return}
      try{
        const [profile,reminders]=await Promise.all([elderApi.clientProfile(this.clientToken),elderApi.clientReminders(this.clientToken)])
        this.profile=profile
        this.reminders=reminders||[]
      }catch(e){
        this.profile=null;this.reminders=[]
        uni.removeStorageSync('suilin_elder_client_token')
        uni.removeStorageSync('suilin_bound_elder_id')
      }finally{this.loading=false}
    },
    async finish(reminder){
      if(this.completedIds.includes(reminder.id))return
      await elderApi.completeReminder(this.clientToken,reminder.id)
      this.completedIds.push(reminder.id)
      uni.showToast({title:'已记录',icon:'success'})
    },
    callFamily(){
      const phone=this.profile?.familyContact?.phone
      if(!phone)return uni.showToast({title:'家人尚未填写联系电话',icon:'none'})
      uni.makePhoneCall({phoneNumber:phone})
    },
    assistant(){
      const r=this.currentReminder
      const content=r ? `当前提醒：${r.title}，时间 ${r.scheduleTime}${r.dosage?'，'+r.dosage:''}。` : '今天暂时没有新的提醒。'
      uni.showModal({title:'岁邻语音助手',content,showCancel:false})
    },
    holdSos(){
      this.timer=setTimeout(async()=>{
        try{
          await elderApi.sos(this.clientToken)
          uni.showModal({title:'紧急求助已发出',content:'系统已经记录求助事件。',showCancel:false})
        }catch(e){}
      },3000)
    },
    cancelSos(){if(this.timer)clearTimeout(this.timer);this.timer=null}
  },
  beforeUnmount(){if(this.timer)clearTimeout(this.timer)}
}
</script>

<style scoped>
.page{min-height:100vh;padding:34rpx 32rpx 52rpx;box-sizing:border-box;background:linear-gradient(180deg,#fff9f1 0%,#fffdf9 52%,#f4faf7 100%)}.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:34rpx}.brand-wrap{display:flex;align-items:center}.brand-wrap :deep(.suilin-logo){margin-right:-8rpx}.brand{display:block;font-size:46rpx;line-height:1;font-weight:900;color:#4c3c34;letter-spacing:5rpx}.date{display:block;margin-top:12rpx;font-size:25rpx;color:#927d70}.elder-name{font-size:30rpx;font-weight:900;color:#2f756b}.empty-card,.task-card{padding:34rpx;border-radius:38rpx;background:#fff;box-shadow:0 20rpx 58rpx rgba(91,67,45,.09)}.empty-card{text-align:center;padding-top:60rpx;padding-bottom:60rpx}.empty-title{display:block;font-size:36rpx;font-weight:900;color:#4c3c34}.empty-desc{display:block;margin-top:16rpx;font-size:26rpx;line-height:1.7;color:#8d7b70}.task-label{display:block;font-size:28rpx;color:#9a8578}.task-main{display:flex;align-items:center;margin-top:18rpx}.medicine-icon{width:112rpx;height:112rpx;margin-right:26rpx;display:flex;align-items:center;justify-content:center;border-radius:30rpx;background:#fff0dc;font-size:54rpx}.task-copy{flex:1}.task-title{display:block;font-size:48rpx;font-weight:900;color:#342d29}.task-time{display:block;margin-top:10rpx;font-size:31rpx;color:#85756b}.primary-btn{height:128rpx;line-height:128rpx;margin-top:34rpx;border-radius:32rpx;background:#2fa99a;color:#fff;font-size:44rpx;font-weight:900;box-shadow:0 14rpx 30rpx rgba(47,169,154,.20)}.primary-btn.finished{background:#93a59d}.big-btn{width:100%;height:150rpx;margin-top:24rpx;padding:0 38rpx;border-radius:34rpx;display:flex;align-items:center;justify-content:flex-start;font-weight:900;text-align:left}.call-btn{background:#fff0df;color:#513d31}.assistant-btn{background:#e8f6f1;color:#244d47}.big-icon{width:84rpx;height:84rpx;margin-right:28rpx;display:flex;align-items:center;justify-content:center;border-radius:24rpx;background:rgba(255,255,255,.72);font-size:42rpx}.big-title{display:block;font-size:42rpx}.big-sub{display:block;margin-top:5rpx;font-size:24rpx;font-weight:500;color:#8a7567}.sos-card{margin-top:24rpx;min-height:132rpx;padding:24rpx 28rpx;border-radius:34rpx;display:flex;align-items:center;background:#fff1ee;border:2rpx solid #f0d2cc}.sos-circle{width:92rpx;height:92rpx;margin-right:24rpx;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#d65348;color:#fff;font-size:29rpx;font-weight:900}.sos-title{display:block;font-size:36rpx;font-weight:900;color:#7f3b35}.sos-sub{display:block;margin-top:6rpx;font-size:25rpx;color:#9a6f68}
</style>