<template>
  <view class="page">
    <PageHeader subtitle="上门照护" />
    <view class="hero"><text class="eyebrow">静态服务目录</text><text class="hero-title">有些事不好做，就找人搭把手</text><text class="hero-desc">本页仅展示服务类型示例，暂未接入真实服务商、地址、价格和订单。</text></view>
    <text class="section-title">服务类型示例</text>
    <view v-for="item in services" :key="item.id" class="service-card" @tap="selectService(item)">
      <view class="service-icon" :class="item.className">{{ item.icon }}</view>
      <view class="service-main"><text class="service-title">{{ item.title }}</text><text class="service-desc">{{ item.desc }}</text><view class="tags"><text v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</text></view></view><text class="arrow">›</text>
    </view>
    <view class="safe-card"><text class="safe-title">岁邻服务说明</text><text class="safe-desc">真实服务需要后端服务商、地址、订单、人员资质和支付接口接入后才能上线。</text></view>
  </view>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
export default{components:{PageHeader},data(){return{services:[{id:1,title:'陪诊服务',desc:'陪同就医、检查引导和取药等服务类型',icon:'🧑‍⚕️',className:'orange',tags:['服务目录']},{id:2,title:'上门助浴',desc:'协助洗浴、穿衣和基础清洁等服务类型',icon:'🛁',className:'teal',tags:['服务目录']},{id:3,title:'康复陪练',desc:'按专业方案进行康复动作陪练的服务类型',icon:'🧘',className:'cream',tags:['服务目录']}]}},methods:{selectService(item){uni.showModal({title:item.title,content:item.desc+'\n当前仅为静态服务目录，尚不能预约。',showCancel:false})}}}
</script>
<style scoped>.page{min-height:100vh;padding:0 28rpx 60rpx}.hero{margin:44rpx 6rpx 28rpx}.eyebrow{display:block;font-size:22rpx;color:#a08270;letter-spacing:2rpx}.hero-title{display:block;margin-top:10rpx;font-size:43rpx;line-height:1.3;font-weight:900}.hero-desc{display:block;margin-top:14rpx;font-size:23rpx;line-height:1.7;color:#8d7d73}.section-title{display:block;margin:36rpx 6rpx 16rpx;font-size:31rpx;font-weight:900}.service-card{display:flex;align-items:center;margin-top:16rpx;padding:22rpx;border-radius:28rpx;background:#fff}.service-icon{width:72rpx;height:72rpx;display:flex;align-items:center;justify-content:center;border-radius:22rpx;font-size:34rpx}.orange{background:#fff0df}.teal{background:#e8f6f1}.cream{background:#f6eee4}.service-main{flex:1;margin-left:18rpx}.service-title,.service-desc,.safe-title,.safe-desc{display:block}.service-title{font-size:26rpx;font-weight:900}.service-desc{margin-top:7rpx;font-size:20rpx;line-height:1.55;color:#8d7d73}.tags{display:flex;gap:8rpx;margin-top:10rpx}.tag{padding:5rpx 9rpx;border-radius:12rpx;background:#f2f7f5;color:#607b72;font-size:17rpx}.arrow{margin-left:10rpx;font-size:38rpx;color:#d5965d}.safe-card{margin-top:22rpx;padding:24rpx 26rpx;border-radius:28rpx;background:#fff2e5}.safe-title{font-size:24rpx;font-weight:900;color:#704e3a}.safe-desc{margin-top:8rpx;font-size:20rpx;line-height:1.6;color:#94725e}</style>