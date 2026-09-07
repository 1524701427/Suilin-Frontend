<template>
  <view class="page">
    <view class="card">
      <text class="title">邀请长辈绑定岁邻</text>
      <text class="desc">把这个邀请发送给长辈。长辈点开后，只需要确认一次，就会进入简洁的长辈端。</text>

      <view class="status-row">
        <text class="status-label">绑定状态</text>
        <text class="status waiting">等待长辈确认</text>
      </view>

      <view class="code-box">
        <text class="code-label">邀请口令</text>
        <text class="code">{{token}}</text>
      </view>

      <button class="share" open-type="share">发送给微信好友</button>
      <button class="copy" @tap="copy">复制邀请口令</button>
      <button class="done" @tap="done">完成</button>
    </view>
  </view>
</template>

<script>
export default {
  data(){return{token:'',elderId:''}},
  onLoad(options){
    this.token=options.token||''
    this.elderId=options.elderId||''
  },
  onShareAppMessage(){
    return {
      title:'家人邀请你使用岁邻',
      path:`/pages/elder-bind/index?token=${this.token}`
    }
  },
  methods:{
    copy(){
      uni.setClipboardData({data:this.token,success:()=>uni.showToast({title:'已复制',icon:'success'})})
    },
    done(){uni.reLaunch({url:'/pages/family/mine/index'})}
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:70rpx 32rpx;background:linear-gradient(180deg,#fff8ef,#f6fbf8);box-sizing:border-box}.card{background:#fff;border-radius:36rpx;padding:40rpx;box-shadow:0 18rpx 50rpx rgba(104,76,57,.08)}.title{display:block;font-size:40rpx;font-weight:900;color:#463831}.desc{display:block;margin-top:18rpx;font-size:25rpx;line-height:1.7;color:#8c786b}.status-row{display:flex;align-items:center;justify-content:space-between;margin-top:34rpx;padding:24rpx;border-radius:22rpx;background:#fff8ef}.status-label{color:#6d5b50}.status{font-weight:800}.waiting{color:#d78338}.code-box{margin-top:22rpx;padding:28rpx;border-radius:22rpx;background:#eff8f5}.code-label{display:block;font-size:22rpx;color:#778a83}.code{display:block;margin-top:12rpx;word-break:break-all;font-size:28rpx;font-weight:800;color:#2b7167}.share,.copy,.done{margin-top:24rpx;border-radius:22rpx}.share{background:#2fa99a;color:#fff}.copy{background:#fff1df;color:#7c5636}.done{background:#f5f2ef;color:#66574d}
</style>