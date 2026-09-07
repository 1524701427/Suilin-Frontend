<template>
  <view class="page">
    <PageHeader subtitle="照护管理" />

    <view class="hero">
      <text class="eyebrow">家庭照护</text>
      <text class="hero-title">把每天的事情安排清楚</text>
      <text class="hero-desc">这里只展示家人实际创建的提醒，不再使用写死的演示数据。</text>
    </view>

    <view v-if="loading" class="empty-card"><text>正在加载...</text></view>

    <view v-else-if="!elders.length" class="empty-card">
      <text class="empty-title">还没有长辈资料</text>
      <text class="empty-desc">先到“我的”添加长辈，再设置提醒。</text>
      <button class="primary" @tap="addElder">添加长辈</button>
    </view>

    <template v-else>
      <scroll-view scroll-x class="elder-tabs">
        <view class="elder-tabs-inner">
          <view v-for="e in elders" :key="e.id" class="elder-tab" :class="{active:selected&&selected.id===e.id}" @tap="selectElder(e)">{{e.name}}</view>
        </view>
      </scroll-view>

      <view class="toolbar">
        <view>
          <text class="toolbar-title">{{selected?.name}}的提醒</text>
          <text class="toolbar-desc">{{reminders.length}} 条记录</text>
        </view>
        <button class="add-btn" @tap="addReminder">+ 新建提醒</button>
      </view>

      <view v-if="reminders.length" class="list">
        <view v-for="r in reminders" :key="r.id" class="card">
          <view class="icon">{{iconFor(r.type)}}</view>
          <view class="main">
            <text class="title">{{r.title}}</text>
            <text class="meta">{{r.scheduleTime}}{{r.dosage?' · '+r.dosage:''}}</text>
            <text class="source">由家人创建 · {{r.enabled?'已启用':'已停用'}}</text>
          </view>
        </view>
      </view>
      <view v-else class="empty-card"><text class="empty-title">还没有提醒</text><text class="empty-desc">点击“新建提醒”添加用药、吃饭、测量或复诊事项。</text></view>
    </template>

    <FamilyTabbar active="care" />
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import FamilyTabbar from '@/components/FamilyTabbar.vue'
import { elderApi, reminderApi } from '@/api/index.js'

export default{
  components:{PageHeader,FamilyTabbar},
  data(){return{elders:[],selected:null,reminders:[],loading:true}},
  async onShow(){await this.load()},
  methods:{
    async load(){
      this.loading=true
      try{
        this.elders=await elderApi.list()||[]
        if(this.elders.length){
          const current=this.selected?.id
          this.selected=this.elders.find(e=>e.id===current)||this.elders[0]
          await this.loadReminders()
        }else{this.selected=null;this.reminders=[]}
      }finally{this.loading=false}
    },
    async selectElder(e){this.selected=e;await this.loadReminders()},
    async loadReminders(){this.reminders=this.selected?(await reminderApi.list(this.selected.id)||[]):[]},
    addReminder(){
      if(!this.selected)return
      uni.navigateTo({url:`/pages/family/reminder-edit/index?elderId=${this.selected.id}`})
    },
    addElder(){uni.navigateTo({url:'/pages/family/elder-add/index'})},
    iconFor(type){return {MEDICATION:'💊',MEAL:'🍚',MEASUREMENT:'🩺',APPOINTMENT:'📅'}[type]||'⏰'}
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:0 28rpx 180rpx;background:linear-gradient(180deg,#fff9f2,#f7faf7)}.hero{margin:42rpx 6rpx 28rpx}.eyebrow{display:block;font-size:22rpx;color:#998579}.hero-title{display:block;margin-top:9rpx;font-size:43rpx;font-weight:900;color:#493a33}.hero-desc{display:block;margin-top:14rpx;font-size:24rpx;line-height:1.7;color:#8a786d}.elder-tabs{white-space:nowrap;margin-bottom:22rpx}.elder-tabs-inner{display:flex;gap:12rpx}.elder-tab{padding:16rpx 24rpx;border-radius:20rpx;background:#fff;color:#806e62}.elder-tab.active{background:#2fa99a;color:#fff;font-weight:800}.toolbar{display:flex;align-items:center;justify-content:space-between;margin:24rpx 2rpx 18rpx}.toolbar-title{display:block;font-size:30rpx;font-weight:900;color:#4b3b33}.toolbar-desc{display:block;margin-top:5rpx;font-size:20rpx;color:#9b897e}.add-btn{margin:0;height:66rpx;line-height:66rpx;padding:0 20rpx;border-radius:18rpx;background:#f39a3f;color:#fff;font-size:22rpx}.list{display:flex;flex-direction:column;gap:15rpx}.card,.empty-card{background:#fff;border:1rpx solid #f0e5dc;border-radius:28rpx;box-shadow:0 12rpx 36rpx rgba(100,73,54,.05)}.card{display:flex;align-items:center;padding:26rpx}.icon{width:72rpx;height:72rpx;display:flex;align-items:center;justify-content:center;border-radius:22rpx;background:#fff2df;font-size:34rpx}.main{flex:1;margin-left:18rpx}.title{display:block;font-size:28rpx;font-weight:900;color:#493a33}.meta{display:block;margin-top:6rpx;color:#806f64}.source{display:block;margin-top:7rpx;font-size:19rpx;color:#a08f84}.empty-card{padding:46rpx 30rpx;text-align:center}.empty-title{display:block;font-size:31rpx;font-weight:900;color:#493a33}.empty-desc{display:block;margin-top:12rpx;line-height:1.6;color:#8d7b70}.primary{margin-top:24rpx;background:#2fa99a;color:#fff;border-radius:20rpx}
</style>