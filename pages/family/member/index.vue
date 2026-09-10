<template>
<view class="page">
  <text class="title">家庭与长辈</text>
  <text class="sub">家庭成员共享照护权限，长辈资料由家人维护</text>

  <view v-if="loading" class="empty"><text>正在加载...</text></view>
  <template v-else>
    <view class="section-head">
      <view><text class="section-title">家庭成员</text><text class="section-sub">{{family.name || '当前家庭'}}</text></view>
      <button v-if="canManage" class="mini" @tap="inviteMember">+ 邀请</button>
    </view>
    <view v-if="members.length">
      <view v-for="m in members" :key="m.id" class="card">
        <view class="avatar teal">{{(m.name||'家').slice(-1)}}</view>
        <view class="main"><text class="name">{{m.name || '未填写姓名'}}</text><text class="meta">{{roleName(m.memberRole)}} · {{maskPhone(m.phone)}}</text></view>
        <text v-if="m.isOwner" class="status bound">创建者</text>
        <button v-else-if="canManage" class="remove-btn" @tap="removeMember(m)">移除</button>
      </view>
    </view>
    <view v-else class="empty"><text>暂无家庭成员</text></view>

    <view class="section-head elder-head">
      <view><text class="section-title">我的长辈</text><text class="section-sub">年龄仅在填写出生日期后计算</text></view>
      <button class="mini" @tap="addElder">+ 添加</button>
    </view>
    <view v-if="elders.length">
      <view v-for="m in elders" :key="m.id" class="card">
        <view class="avatar">{{m.name.slice(-1)}}</view>
        <view class="main">
          <text class="name">{{m.name}} · {{m.relation}}</text>
          <text class="meta">{{ageText(m)}} · {{m.bindStatus==='BOUND'?'已绑定':'等待绑定'}}</text>
        </view>
        <view v-if="m.bindStatus==='BOUND'" class="actions">
          <text class="status bound">已绑定</text>
          <text class="link" @tap="unbind(m)">解除</text>
        </view>
        <button v-else class="invite-btn" @tap="inviteElder(m)">发邀请</button>
      </view>
    </view>
    <view v-else class="empty"><text>还没有添加长辈</text></view>
  </template>
</view>
</template>

<script>
import { elderApi, familyApi } from '@/api/index.js'
export default {
 data(){return {family:{},members:[],elders:[],loading:false}},
 computed:{canManage(){return ['OWNER','CAREGIVER'].includes(this.family.myRole)}},
 onShow(){this.load()},
 methods:{
  async load(){
    this.loading=true
    try{
      const [family,members,elders]=await Promise.all([familyApi.current(),familyApi.members(),elderApi.list()])
      this.family=family||{};this.members=members||[];this.elders=elders||[]
    }finally{this.loading=false}
  },
  async inviteElder(m){
    const data=await elderApi.createInvite(m.id)
    uni.navigateTo({url:`/pages/family/elder-invite/index?elderId=${m.id}&token=${data.inviteToken}`})
  },
  inviteMember(){uni.navigateTo({url:'/pages/family/member-invite/index'})},
  addElder(){uni.navigateTo({url:'/pages/family/elder-add/index'})},
  ageText(m){return m.age===null||m.age===undefined?'未填写出生日期':`${m.age}岁`},
  roleName(role){return {OWNER:'家庭创建者',CAREGIVER:'主要照护人',MEMBER:'家庭成员',EMERGENCY_CONTACT:'紧急联系人'}[role]||role},
  maskPhone(phone){if(!phone)return '未填写手机号';return phone.slice(0,3)+'****'+phone.slice(-4)},
  removeMember(m){
    uni.showModal({title:'移除家庭成员',content:`确定将 ${m.name||'该成员'} 移出当前家庭吗？`,success:async r=>{if(!r.confirm)return;await familyApi.removeMember(m.id);await this.load();uni.showToast({title:'已移除',icon:'success'})}})
  },
  unbind(m){
    uni.showModal({title:'解除长辈端绑定',content:'解除后，这台长辈设备将不能继续读取提醒，需要重新发送邀请才能再次绑定。',success:async r=>{if(!r.confirm)return;await elderApi.unbind(m.id);await this.load();uni.showToast({title:'已解除',icon:'success'})}})
  }
 }
}
</script>

<style scoped>
.page{min-height:100vh;padding:36rpx;background:#fff9f2}.title{display:block;font-size:42rpx;font-weight:900;color:#493a33}.sub{display:block;margin:12rpx 0 28rpx;color:#927d70}.section-head{display:flex;align-items:center;justify-content:space-between;margin:30rpx 4rpx 14rpx}.elder-head{margin-top:40rpx}.section-title,.section-sub{display:block}.section-title{font-size:30rpx;font-weight:900;color:#493a33}.section-sub{margin-top:5rpx;font-size:20rpx;color:#9a887d}.mini{margin:0;height:62rpx;line-height:62rpx;padding:0 18rpx;border-radius:18rpx;background:#2fa99a;color:#fff;font-size:21rpx}.card{background:#fff;border-radius:30rpx;padding:28rpx;display:flex;align-items:center;margin-bottom:18rpx}.avatar{width:76rpx;height:76rpx;border-radius:24rpx;background:#ffe1bd;display:flex;align-items:center;justify-content:center;font-weight:900;color:#7f5634}.avatar.teal{background:#e5f5f1;color:#257d72}.main{flex:1;margin-left:20rpx}.name{display:block;font-size:28rpx;font-weight:900;color:#493a33}.meta{display:block;margin-top:8rpx;color:#88786c;font-size:21rpx}.status{padding:10rpx 14rpx;border-radius:16rpx;font-size:20rpx}.status.bound{background:#e6f5f1;color:#278b7e}.invite-btn,.remove-btn{margin:0;padding:0 18rpx;height:62rpx;line-height:62rpx;border-radius:18rpx;font-size:21rpx}.invite-btn{background:#fff1df;color:#c57834}.remove-btn{background:#fff0ee;color:#ad554b}.actions{text-align:right}.link{display:block;margin-top:8rpx;font-size:19rpx;color:#a56e5d}.empty{background:#fff;padding:42rpx;text-align:center;border-radius:30rpx;color:#99887d}
</style>