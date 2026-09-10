<template>
<view class="page">
  <view class="card" v-if="loading"><text class="center">正在读取家庭邀请...</text></view>
  <view class="card" v-else-if="invite">
    <text class="title">加入岁邻家庭</text>
    <text class="desc">{{invite.inviterName}} 邀请手机号 {{maskPhone(invite.phone)}} 加入家庭。</text>
    <view class="role-box"><text>成员角色</text><text class="role">{{roleName(invite.memberRole)}}</text></view>
    <button v-if="hasLogin" class="primary" :disabled="accepting" @tap="accept">{{accepting?'加入中...':'确认加入家庭'}}</button>
    <template v-else>
      <text class="login-tip">请使用被邀请的手机号登录后接受邀请。</text>
      <button class="primary" @tap="goLogin">去登录</button>
      <button class="secondary" @tap="goRegister">还没有账号，去注册</button>
    </template>
  </view>
  <view class="card" v-else><text class="center">邀请已失效，请让家人重新发送。</text></view>
</view>
</template>

<script>
import { familyApi } from '@/api/index.js'
export default{
  data(){return{token:'',invite:null,loading:true,accepting:false}},
  computed:{hasLogin(){return !!uni.getStorageSync('suilin_token')}},
  async onLoad(options){
    this.token=options.token||''
    if(!this.token){this.loading=false;return}
    try{this.invite=await familyApi.invitePreview(this.token)}finally{this.loading=false}
  },
  methods:{
    maskPhone(v){return v?v.slice(0,3)+'****'+v.slice(-4):''},
    roleName(v){return {MEMBER:'家庭成员',CAREGIVER:'主要照护人',EMERGENCY_CONTACT:'紧急联系人'}[v]||v},
    goLogin(){const redirect=encodeURIComponent(`/pages/family-invite/index?token=${this.token}`);uni.navigateTo({url:`/pages/login/index?redirect=${redirect}`})},
    goRegister(){const redirect=encodeURIComponent(`/pages/family-invite/index?token=${this.token}`);uni.navigateTo({url:`/pages/register/index?redirect=${redirect}`})},
    async accept(){
      if(this.accepting)return
      this.accepting=true
      try{
        await familyApi.acceptInvite(this.token)
        uni.showToast({title:'已加入家庭',icon:'success'})
        setTimeout(()=>uni.reLaunch({url:'/pages/family/home/index'}),450)
      }finally{this.accepting=false}
    }
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:70rpx 34rpx;background:linear-gradient(180deg,#fff9f2,#f3faf7);box-sizing:border-box}.card{padding:40rpx 34rpx;background:#fff;border-radius:34rpx;box-shadow:0 16rpx 48rpx rgba(94,70,52,.07)}.title{display:block;font-size:40rpx;font-weight:900;color:#493a33}.desc{display:block;margin-top:20rpx;color:#806e63;font-size:25rpx;line-height:1.7}.role-box{display:flex;justify-content:space-between;margin-top:30rpx;padding:24rpx;background:#fff7ef;border-radius:20rpx;color:#756359}.role{font-weight:900;color:#2e776c}.primary,.secondary{margin-top:28rpx;border-radius:22rpx}.primary{background:#2fa99a;color:#fff}.secondary{background:#fff0df;color:#815937}.login-tip{display:block;margin-top:28rpx;color:#9a8172;font-size:22rpx;line-height:1.6}.center{display:block;text-align:center;color:#8d7b70}
</style>