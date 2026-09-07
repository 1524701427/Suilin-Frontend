<template>
  <view class="page">
    <PageHeader subtitle="家人端" />

    <view class="hero">
      <text class="eyebrow">家庭关怀</text>
      <text class="hero-title">{{heroTitle}}</text>
      <text class="hero-desc">{{heroDesc}}</text>
    </view>

    <view v-if="loading" class="empty-card"><text>正在加载...</text></view>

    <view v-else-if="!elders.length" class="empty-card">
      <text class="empty-title">先添加一位长辈</text>
      <text class="empty-desc">姓名、关系和出生日期都由家人填写。保存后再邀请长辈一键绑定。</text>
      <button class="primary" @tap="addElder">添加长辈</button>
    </view>

    <template v-else>
      <scroll-view scroll-x class="elder-tabs">
        <view class="elder-tabs-inner">
          <view v-for="e in elders" :key="e.id" class="elder-tab" :class="{active:selected&&selected.id===e.id}" @tap="selectElder(e)">
            <text>{{e.name}}</text>
          </view>
        </view>
      </scroll-view>

      <view v-if="selected" class="profile-card">
        <view class="profile-main">
          <view class="avatar">{{selected.name.slice(-1)}}</view>
          <view class="profile-copy">
            <text class="person-name">{{selected.name}}</text>
            <text class="person-meta">{{selected.relation}} · {{selected.age}}岁</text>
            <text class="source-tip">年龄由出生日期计算</text>
          </view>
          <text class="bind" :class="{bound:selected.bindStatus==='BOUND'}">{{selected.bindStatus==='BOUND'?'已绑定':'等待绑定'}}</text>
        </view>
      </view>

      <view class="section-head">
        <view><text class="section-eyebrow">提醒</text><text class="section-title">长辈的提醒事项</text></view>
        <text class="more" @tap="goCare">管理 →</text>
      </view>

      <view v-if="reminders.length" class="reminder-list">
        <view v-for="r in reminders" :key="r.id" class="reminder-card">
          <view class="reminder-icon">{{r.type==='MEDICATION'?'💊':'⏰'}}</view>
          <view class="reminder-copy">
            <text class="reminder-title">{{r.title}}</text>
            <text class="reminder-meta">{{r.scheduleTime}}{{r.dosage?' · '+r.dosage:''}}</text>
          </view>
          <text class="enabled">{{r.enabled?'启用':'停用'}}</text>
        </view>
      </view>
      <view v-else class="small-empty"><text>还没有设置提醒</text></view>

      <view class="quick-grid">
        <view class="quick-card" @tap="goHealth"><view class="quick-icon">❤️</view><text class="quick-title">健康数据</text><text class="quick-desc">只展示真实录入或设备来源</text></view>
        <view class="quick-card" @tap="goCare"><view class="quick-icon">💊</view><text class="quick-title">提醒管理</text><text class="quick-desc">由家人创建提醒</text></view>
        <view class="quick-card" @tap="goServices"><view class="quick-icon">🏡</view><text class="quick-title">生活服务</text><text class="quick-desc">社区与养老服务</text></view>
        <view class="quick-card" @tap="goMine"><view class="quick-icon">👨‍👩‍👧</view><text class="quick-title">家庭管理</text><text class="quick-desc">添加长辈与查看绑定</text></view>
      </view>
    </template>

    <FamilyTabbar active="home" />
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import FamilyTabbar from '@/components/FamilyTabbar.vue'
import { elderApi, reminderApi } from '@/api/index.js'

export default {
  components:{PageHeader,FamilyTabbar},
  data(){return{elders:[],selected:null,reminders:[],loading:true}},
  computed:{
    heroTitle(){return this.selected ? `关心 ${this.selected.name}` : '把长辈添加到岁邻'},
    heroDesc(){
      if(!this.selected)return '长辈不需要注册。家人添加资料后发送邀请，长辈点击即可绑定。'
      return this.selected.bindStatus==='BOUND' ? '长辈设备已完成绑定，下面的数据来自你创建的提醒和后端记录。' : '资料已保存，等待长辈通过邀请完成绑定。'
    }
  },
  async onShow(){await this.load()},
  methods:{
    async load(){
      this.loading=true
      try{
        this.elders=await elderApi.list()||[]
        if(this.elders.length){
          const currentId=this.selected?.id
          this.selected=this.elders.find(e=>e.id===currentId)||this.elders[0]
          await this.loadReminders()
        }else{this.selected=null;this.reminders=[]}
      }finally{this.loading=false}
    },
    async selectElder(e){this.selected=e;await this.loadReminders()},
    async loadReminders(){this.reminders=this.selected ? (await reminderApi.list(this.selected.id)||[]) : []},
    addElder(){uni.navigateTo({url:'/pages/family/elder-add/index'})},
    goHealth(){uni.redirectTo({url:'/pages/family/health/index'})},
    goCare(){uni.redirectTo({url:'/pages/family/care/index'})},
    goServices(){uni.redirectTo({url:'/pages/family/services/index'})},
    goMine(){uni.redirectTo({url:'/pages/family/mine/index'})}
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:0 28rpx 180rpx;background:linear-gradient(180deg,#fff9f2,#f6faf7)}.hero{margin:40rpx 6rpx 28rpx}.eyebrow,.section-eyebrow{display:block;font-size:22rpx;color:#998579}.hero-title{display:block;margin-top:10rpx;font-size:46rpx;font-weight:900;color:#473931}.hero-desc{display:block;margin-top:14rpx;font-size:24rpx;line-height:1.7;color:#89766a}.empty-card,.profile-card,.reminder-card,.quick-card,.small-empty{background:#fff;border:1rpx solid #f1e5dc;border-radius:30rpx;box-shadow:0 14rpx 40rpx rgba(100,73,54,.06)}.empty-card{padding:48rpx 32rpx;text-align:center}.empty-title{display:block;font-size:34rpx;font-weight:900;color:#4b3b33}.empty-desc{display:block;margin-top:14rpx;line-height:1.7;color:#8d796e}.primary{margin-top:26rpx;background:#2fa99a;color:#fff;border-radius:22rpx}.elder-tabs{white-space:nowrap;margin-bottom:20rpx}.elder-tabs-inner{display:flex;gap:12rpx}.elder-tab{padding:16rpx 24rpx;border-radius:20rpx;background:#fff;color:#816f63}.elder-tab.active{background:#2fa99a;color:#fff;font-weight:800}.profile-card{padding:28rpx}.profile-main{display:flex;align-items:center}.avatar{width:84rpx;height:84rpx;display:flex;align-items:center;justify-content:center;border-radius:26rpx;background:#ffe0bb;color:#855d39;font-weight:900;font-size:30rpx}.profile-copy{flex:1;margin-left:18rpx}.person-name{display:block;font-size:32rpx;font-weight:900;color:#473931}.person-meta{display:block;margin-top:7rpx;color:#806e62}.source-tip{display:block;margin-top:6rpx;font-size:19rpx;color:#a39287}.bind{padding:10rpx 15rpx;border-radius:16rpx;background:#fff0dd;color:#c57834;font-size:20rpx}.bind.bound{background:#e5f5f1;color:#278b7e}.section-head{display:flex;justify-content:space-between;align-items:flex-end;margin:34rpx 4rpx 15rpx}.section-title{display:block;margin-top:5rpx;font-size:30rpx;font-weight:900;color:#4b3b33}.more{color:#2d9184;font-size:22rpx}.reminder-list{display:flex;flex-direction:column;gap:14rpx}.reminder-card{padding:24rpx;display:flex;align-items:center}.reminder-icon{width:66rpx;height:66rpx;display:flex;align-items:center;justify-content:center;border-radius:20rpx;background:#fff2df;font-size:32rpx}.reminder-copy{flex:1;margin-left:16rpx}.reminder-title{display:block;font-size:27rpx;font-weight:900;color:#4b3b33}.reminder-meta{display:block;margin-top:6rpx;color:#8b786d}.enabled{font-size:20rpx;color:#398d80}.small-empty{padding:30rpx;text-align:center;color:#958277}.quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:16rpx;margin-top:30rpx}.quick-card{padding:26rpx}.quick-icon{font-size:34rpx}.quick-title{display:block;margin-top:14rpx;font-size:27rpx;font-weight:900;color:#4b3b33}.quick-desc{display:block;margin-top:8rpx;font-size:21rpx;line-height:1.5;color:#918075}
</style>