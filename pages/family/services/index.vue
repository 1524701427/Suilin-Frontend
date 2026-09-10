<template>
  <view class="page">
    <PageHeader subtitle="生活服务" />
    <view class="hero">
      <text class="eyebrow">岁邻服务</text>
      <text class="hero-title">生活服务入口</text>
      <text class="hero-desc">这里先提供服务分类入口。未接入真实服务商、机构和订单接口前，不展示虚构的距离、值班或库存状态。</text>
    </view>

    <view class="notice-card">
      <text class="notice-title">当前为静态服务目录</text>
      <text class="notice-desc">上门照护、商城和养老机构页面用于产品流程展示，真实服务数据将在服务商接口接入后展示。</text>
    </view>

    <text class="section-title">常用服务</text>
    <view class="service-list">
      <view class="service-row" @tap="open('care')"><view class="service-icon orange">🤝</view><view class="service-main"><text class="service-title">上门照护</text><text class="service-desc">了解陪诊、助浴、护理等服务分类</text></view><text class="arrow">›</text></view>
      <view class="service-row" @tap="open('mall')"><view class="service-icon teal">🛍️</view><view class="service-main"><text class="service-title">岁邻好物</text><text class="service-desc">浏览适老家居、健康用品和安全设备目录</text></view><text class="arrow">›</text></view>
      <view class="service-row" @tap="open('institution')"><view class="service-icon cream">🏡</view><view class="service-main"><text class="service-title">养老机构</text><text class="service-desc">查看养老机构功能展示</text></view><text class="arrow">›</text></view>
    </view>
    <FamilyTabbar active="services" />
  </view>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
import FamilyTabbar from '@/components/FamilyTabbar.vue'
export default {
  components:{PageHeader,FamilyTabbar},
  methods:{open(type){const map={care:'/pages/family/service-detail/index',mall:'/pages/family/mall/index',institution:'/pages/family/institution/index'};uni.navigateTo({url:map[type]})}}
}
</script>
<style scoped>.page{min-height:100vh;padding:0 28rpx 180rpx}.hero{margin:44rpx 6rpx 28rpx}.eyebrow{display:block;font-size:22rpx;color:#a08270}.hero-title{display:block;margin-top:10rpx;font-size:44rpx;font-weight:900}.hero-desc{display:block;margin-top:14rpx;font-size:23rpx;line-height:1.7;color:#8d7d73}.notice-card{padding:28rpx;border-radius:30rpx;background:#fff3e6}.notice-title,.notice-desc,.service-title,.service-desc{display:block}.notice-title{font-size:27rpx;font-weight:900;color:#714f3b}.notice-desc{margin-top:9rpx;font-size:21rpx;line-height:1.65;color:#91705d}.section-title{display:block;margin:38rpx 6rpx 16rpx;font-size:31rpx;font-weight:900}.service-list{overflow:hidden;border-radius:32rpx;background:#fff}.service-row{min-height:126rpx;padding:22rpx 24rpx;display:flex;align-items:center;border-bottom:1rpx solid #f0e9e3}.service-row:last-child{border-bottom:none}.service-icon{width:72rpx;height:72rpx;display:flex;align-items:center;justify-content:center;border-radius:22rpx;font-size:34rpx}.orange{background:#fff0df}.teal{background:#e8f6f1}.cream{background:#f6eee4}.service-main{flex:1;margin-left:18rpx}.service-title{font-size:26rpx;font-weight:900;color:#493c35}.service-desc{margin-top:7rpx;font-size:20rpx;color:#8d7d73}.arrow{font-size:40rpx;color:#d6955c}</style>