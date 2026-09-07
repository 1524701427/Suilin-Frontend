<template>
  <view class="page">
    <view class="brand"><SuilinLogo size="lg"/><text class="name">岁邻</text></view>
    <view v-if="loading" class="card"><text class="center">正在读取邀请...</text></view>
    <view v-else-if="invite" class="card">
      <text class="title">家人邀请您加入岁邻</text>
      <text class="hello">您好，{{invite.name}}</text>
      <text class="desc">确认后，这台设备会进入简洁的长辈端。以后不需要注册，也不用输入密码。</text>
      <view class="info"><text>家人填写的关系</text><text class="strong">{{invite.relation}}</text></view>
      <button class="accept" :disabled="accepting" @tap="accept">{{accepting?'绑定中...':'接受邀请'}}</button>
    </view>
    <view v-else class="card"><text class="center">邀请已失效，请让家人重新发送。</text></view>
  </view>
</template>
<script>
import SuilinLogo from '@/components/SuilinLogo.vue'
import { elderApi } from '@/api/index.js'

function getClientId(){
  let id=uni.getStorageSync('suilin_elder_client_id')
  if(!id){
    id='elder_'+Date.now()+'_'+Math.random().toString(36).slice(2,10)
    uni.setStorageSync('suilin_elder_client_id',id)
  }
  return id
}

export default{
  components:{SuilinLogo},
  data(){return{token:'',invite:null,loading:true,accepting:false}},
  async onLoad(options){
    this.token=options.token||''
    if(!this.token){this.loading=false;return}
    try{this.invite=await elderApi.invitePreview(this.token)}finally{this.loading=false}
  },
  methods:{
    async accept(){
      if(this.accepting)return
      this.accepting=true
      try{
        const data=await elderApi.acceptInvite(this.token,getClientId())
        uni.setStorageSync('suilin_bound_elder_id',data.elderId)
        uni.setStorageSync('suilin_elder_client_token',data.clientToken)
        uni.showToast({title:'绑定成功',icon:'success'})
        setTimeout(()=>uni.reLaunch({url:'/pages/elder/index'}),400)
      }finally{this.accepting=false}
    }
  }
}
</script>
<style scoped>
.page{min-height:100vh;padding:90rpx 34rpx;background:linear-gradient(180deg,#fff8ef,#f2faf6);box-sizing:border-box}.brand{text-align:center}.brand :deep(.suilin-logo){margin:0 auto}.name{display:block;margin-top:6rpx;font-size:48rpx;font-weight:900;letter-spacing:6rpx;color:#493a33}.card{margin-top:38rpx;padding:42rpx 34rpx;border-radius:36rpx;background:#fff;box-shadow:0 18rpx 50rpx rgba(104,76,57,.08)}.title,.hello,.desc{display:block}.title{font-size:38rpx;font-weight:900;color:#463831}.hello{margin-top:30rpx;font-size:46rpx;font-weight:900;color:#2f5f57}.desc{margin-top:18rpx;font-size:28rpx;line-height:1.8;color:#806f64}.info{display:flex;justify-content:space-between;margin-top:30rpx;padding:24rpx;background:#fff8ef;border-radius:22rpx;color:#756359}.strong{font-weight:900;color:#493a33}.accept{height:112rpx;line-height:112rpx;margin-top:32rpx;border-radius:28rpx;background:#2fa99a;color:#fff;font-size:36rpx;font-weight:900}.center{display:block;text-align:center;color:#806f64}
</style>