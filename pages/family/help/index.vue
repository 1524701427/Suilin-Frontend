<template>
<view class="page">
  <text class="title">帮助与反馈</text>
  <view class="card">
    <view v-for="q in faqs" :key="q.q" class="faq" @tap="q.open=!q.open">
      <view class="head"><text class="q">{{q.q}}</text><text>⌄</text></view>
      <text v-if="q.open" class="a">{{q.a}}</text>
    </view>
  </view>
  <text class="label">意见反馈</text>
  <textarea v-model="feedback" class="textarea" maxlength="1000" placeholder="告诉我们哪里不好用，或希望增加什么功能"/>
  <input v-model="contact" class="contact" maxlength="100" placeholder="联系方式（可选）"/>
  <button class="save" :disabled="saving" @tap="submit">{{saving?'提交中...':'提交反馈'}}</button>
  <text class="tip">反馈会保存到岁邻服务端，便于后续跟进。</text>
</view>
</template>
<script>
import { feedbackApi } from '@/api/index.js'
export default{
  data(){return{feedback:'',contact:'',saving:false,faqs:[
    {q:'长辈端怎么使用？',a:'家人先添加长辈并发送邀请。长辈打开邀请后点击“接受邀请”，无需注册账号。',open:false},
    {q:'如何邀请其他家人？',a:'进入“我的 → 长辈与家庭”，点击邀请，填写被邀请人的手机号和成员角色。',open:false},
    {q:'为什么没有微信通知？',a:'真实微信订阅消息需要在微信公众平台配置模板和凭证。目前后端已保存通知偏好和 SOS 事件，但不会声称已经推送成功。',open:false}
  ]}},
  methods:{
    async submit(){
      if(!this.feedback.trim())return uni.showToast({title:'请先填写反馈',icon:'none'})
      if(this.saving)return
      this.saving=true
      try{
        await feedbackApi.create({content:this.feedback.trim(),contact:this.contact.trim()||null})
        this.feedback='';this.contact=''
        uni.showToast({title:'感谢反馈',icon:'success'})
      }finally{this.saving=false}
    }
  }
}
</script>
<style scoped>.page{min-height:100vh;padding:30rpx;background:#fff9f2}.title{display:block;font-size:40rpx;font-weight:900;color:#493a33;margin-bottom:24rpx}.card{padding:0 24rpx;background:#fff;border-radius:28rpx}.faq{padding:24rpx 0;border-bottom:1rpx solid #f0e7df}.head{display:flex;justify-content:space-between}.q{font-size:25rpx;font-weight:800}.a{display:block;margin-top:12rpx;color:#88776c;font-size:21rpx;line-height:1.7}.label{display:block;margin:30rpx 0 12rpx;font-size:25rpx;font-weight:800}.textarea,.contact{width:100%;box-sizing:border-box;padding:22rpx;background:#fff;border-radius:24rpx}.textarea{height:220rpx}.contact{height:82rpx;margin-top:14rpx}.save{margin-top:22rpx;background:#2fa99a;color:#fff;border-radius:20rpx}.tip{display:block;margin-top:12rpx;color:#9b887d;font-size:20rpx;line-height:1.5}</style>