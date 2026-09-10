<template>
<view class="page">
  <view class="card">
    <text class="title">邀请家庭成员</text>
    <text class="sub">被邀请人使用这个手机号登录后，即可加入当前家庭并共同照护。</text>

    <template v-if="!inviteToken">
      <text class="label">被邀请人手机号</text>
      <input v-model="phone" class="input" type="number" maxlength="11" placeholder="请输入手机号"/>
      <text class="label">成员角色</text>
      <picker :range="roleLabels" @change="onRoleChange"><view class="input picker">{{roleLabels[roleIndex]}}</view></picker>
      <text class="tip">主要照护人可邀请或移除其他成员；普通家庭成员和紧急联系人仅参与当前家庭。</text>
      <button class="save" :disabled="loading" @tap="submit">{{loading?'生成中...':'生成邀请'}}</button>
    </template>

    <template v-else>
      <view class="success"><text class="success-title">邀请已生成</text><text class="success-desc">有效期 7 天，仅被邀请手机号登录后可以接受。</text></view>
      <view class="token-box"><text class="token-label">邀请口令</text><text class="token">{{inviteToken}}</text></view>
      <button class="share" open-type="share">发送给微信好友</button>
      <button class="copy" @tap="copy">复制邀请口令</button>
      <button class="back" @tap="done">完成</button>
    </template>
  </view>
</view>
</template>

<script>
import { familyApi } from '@/api/index.js'
export default{
  data(){return{phone:'',roles:['MEMBER','CAREGIVER','EMERGENCY_CONTACT'],roleLabels:['家庭成员','主要照护人','紧急联系人'],roleIndex:0,inviteToken:'',loading:false}},
  onShareAppMessage(){return{title:'家人邀请你加入岁邻家庭',path:`/pages/family-invite/index?token=${this.inviteToken}`}},
  methods:{
    onRoleChange(e){this.roleIndex=Number(e.detail.value)},
    async submit(){
      if(!/^1\d{10}$/.test(this.phone))return uni.showToast({title:'请输入正确手机号',icon:'none'})
      if(this.loading)return
      this.loading=true
      try{
        const data=await familyApi.invite({phone:this.phone,memberRole:this.roles[this.roleIndex]})
        this.inviteToken=data.inviteToken
      }finally{this.loading=false}
    },
    copy(){uni.setClipboardData({data:this.inviteToken,success:()=>uni.showToast({title:'已复制',icon:'success'})})},
    done(){uni.navigateBack()}
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:34rpx;background:#fff9f2}.card{padding:32rpx;background:#fff;border-radius:30rpx}.title{display:block;font-size:36rpx;font-weight:900;color:#493a33}.sub{display:block;margin:12rpx 0 28rpx;color:#89776c;font-size:22rpx;line-height:1.65}.label{display:block;margin:22rpx 0 10rpx;color:#6f6057;font-size:22rpx}.input{height:84rpx;line-height:84rpx;padding:0 20rpx;background:#fff7ef;border-radius:18rpx}.tip{display:block;margin-top:18rpx;color:#9b887d;font-size:20rpx;line-height:1.6}.save,.share,.copy,.back{margin-top:28rpx;border-radius:20rpx}.save,.share{background:#2fa99a;color:#fff}.copy{background:#fff0df;color:#855b39}.back{background:#f4f1ee;color:#66574e}.success{padding:24rpx;border-radius:22rpx;background:#eaf7f3}.success-title,.success-desc,.token-label,.token{display:block}.success-title{font-size:28rpx;font-weight:900;color:#2c776d}.success-desc{margin-top:7rpx;color:#6f857e;font-size:20rpx}.token-box{margin-top:22rpx;padding:24rpx;border-radius:20rpx;background:#fff8ef}.token-label{font-size:20rpx;color:#9a877a}.token{margin-top:9rpx;word-break:break-all;font-size:26rpx;font-weight:900;color:#493a33}
</style>