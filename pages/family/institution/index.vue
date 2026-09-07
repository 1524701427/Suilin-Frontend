<template>
  <view class="page">
    <PageHeader subtitle="养老机构" />
    <view class="hero"><text class="eyebrow">静态信息模板</text><text class="hero-title">以后可以在这里比较养老机构</text><text class="hero-desc">真实机构名称、距离、价格、评分和护理能力必须由机构数据接口提供。本页暂不展示虚构的实时机构信息。</text></view>

    <view class="empty-card">
      <text class="empty-title">机构数据尚未接入</text>
      <text class="empty-desc">后续可接入养老院、护理院、社区日托和康养机构数据，并明确数据更新时间与来源。</text>
    </view>

    <text class="section-title">计划支持的筛选维度</text>
    <view class="grid"><view v-for="item in dimensions" :key="item.title" class="item"><text class="icon">{{item.icon}}</text><text class="item-title">{{item.title}}</text><text class="item-desc">{{item.desc}}</text></view></view>
  </view>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
export default{components:{PageHeader},data(){return{dimensions:[{icon:'📍',title:'距离',desc:'基于真实机构地址计算'},{icon:'🩺',title:'护理能力',desc:'来自机构服务项目'},{icon:'🏠',title:'机构类型',desc:'养老院、护理院、日托等'},{icon:'💰',title:'费用',desc:'以机构发布的有效价格为准'}]}}}
</script>
<style scoped>.page{min-height:100vh;padding:0 28rpx 60rpx}.hero{margin:44rpx 6rpx 26rpx}.eyebrow{display:block;font-size:22rpx;color:#a08270;letter-spacing:2rpx}.hero-title{display:block;margin-top:10rpx;font-size:43rpx;line-height:1.3;font-weight:900}.hero-desc{display:block;margin-top:14rpx;font-size:23rpx;line-height:1.7;color:#8d7d73}.empty-card{padding:42rpx 30rpx;border-radius:30rpx;background:#fff;text-align:center}.empty-title{display:block;font-size:30rpx;font-weight:900;color:#493c35}.empty-desc{display:block;margin-top:12rpx;font-size:21rpx;line-height:1.7;color:#8d7d73}.section-title{display:block;margin:36rpx 6rpx 16rpx;font-size:30rpx;font-weight:900}.grid{display:grid;grid-template-columns:1fr 1fr;gap:16rpx}.item{padding:24rpx;border-radius:26rpx;background:#fff}.icon{font-size:34rpx}.item-title{display:block;margin-top:12rpx;font-size:25rpx;font-weight:900}.item-desc{display:block;margin-top:7rpx;font-size:19rpx;line-height:1.5;color:#8f8178}</style>