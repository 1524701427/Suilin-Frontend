<template>
  <view class="page">
    <PageHeader subtitle="生活服务" />

    <view class="hero">
      <text class="eyebrow">岁邻服务</text>
      <text class="hero-title">家里需要帮忙，附近就有人</text>
      <text class="hero-desc">社区服务、上门照护、适老好物和养老机构，都集中放在这里。</text>
    </view>

    <view class="community-card">
      <view class="community-copy">
        <text class="small">妈妈所在社区</text>
        <text class="community-name">紫花社区守护站</text>
        <text class="muted">距离家 420 米 · 今日有人值班</text>
      </view>
      <button class="contact" @tap="contactCommunity">联系社区</button>
    </view>

    <text class="section-title">常用服务</text>
    <view class="service-list">
      <view class="service-row" @tap="open('care')">
        <view class="service-icon orange">🤝</view>
        <view class="service-main"><text class="service-title">上门照护</text><text class="service-desc">陪诊、助浴、护理和生活照料</text></view>
        <text class="arrow">›</text>
      </view>
      <view class="service-row" @tap="open('mall')">
        <view class="service-icon teal">🛍️</view>
        <view class="service-main"><text class="service-title">岁邻好物</text><text class="service-desc">适老家居、健康用品和安全设备</text></view>
        <text class="arrow">›</text>
      </view>
      <view class="service-row" @tap="open('institution')">
        <view class="service-icon cream">🏡</view>
        <view class="service-main"><text class="service-title">养老机构</text><text class="service-desc">查询附近养老院、护理院和短托机构</text></view>
        <text class="arrow">›</text>
      </view>
    </view>

    <view class="promise">
      <text class="promise-title">岁邻服务保障</text>
      <text class="promise-desc">服务信息清楚可查，重要进度及时同步给家人。</text>
    </view>

    <FamilyTabbar active="services" />
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import FamilyTabbar from '@/components/FamilyTabbar.vue'
export default {
  components: { PageHeader, FamilyTabbar },
  methods: {
    contactCommunity() {
      uni.showActionSheet({ itemList: ['电话联系', '在线咨询'] })
    },
    open(type) {
      const map = {
        care: '/pages/family/service-detail/index',
        mall: '/pages/family/mall/index',
        institution: '/pages/family/institution/index'
      }
      uni.navigateTo({ url: map[type] })
    }
  }
}
</script>

<style scoped>
.page { min-height:100vh; padding:0 28rpx 180rpx; }
.hero { margin:44rpx 6rpx 28rpx; }
.eyebrow { display:block; font-size:22rpx; color:#a08270; letter-spacing:2rpx; }
.hero-title { display:block; margin-top:10rpx; font-size:44rpx; line-height:1.28; font-weight:900; }
.hero-desc { display:block; margin-top:14rpx; font-size:23rpx; line-height:1.7; color:#8d7d73; }
.community-card { display:flex; align-items:center; gap:20rpx; padding:28rpx; border-radius:34rpx; background:linear-gradient(135deg,#e8f6f1,#f7fbf8); }
.community-copy { flex:1; }
.small,.community-name,.muted,.service-title,.service-desc,.promise-title,.promise-desc { display:block; }
.small { font-size:19rpx; color:#7e9189; }
.community-name { margin-top:5rpx; font-size:29rpx; font-weight:900; color:#35554d; }
.muted { margin-top:6rpx; font-size:20rpx; color:#7b8d86; }
.contact { min-width:150rpx; height:68rpx; line-height:68rpx; padding:0 18rpx; border-radius:20rpx; background:#2fa99a; color:#fff; font-size:21rpx; font-weight:800; }
.section-title { display:block; margin:38rpx 6rpx 16rpx; font-size:31rpx; font-weight:900; }
.service-list { overflow:hidden; border-radius:32rpx; background:#fff; }
.service-row { min-height:126rpx; padding:22rpx 24rpx; display:flex; align-items:center; border-bottom:1rpx solid #f0e9e3; }
.service-row:last-child { border-bottom:none; }
.service-icon { width:72rpx; height:72rpx; display:flex; align-items:center; justify-content:center; border-radius:22rpx; font-size:34rpx; }
.orange { background:#fff0df; }.teal{background:#e8f6f1}.cream{background:#f6eee4}
.service-main { flex:1; margin-left:18rpx; }
.service-title { font-size:26rpx; font-weight:900; color:#493c35; }
.service-desc { margin-top:7rpx; font-size:20rpx; color:#8d7d73; }
.arrow { font-size:40rpx; color:#d6955c; }
.promise { margin-top:22rpx; padding:26rpx 28rpx; border-radius:30rpx; background:#fff3e6; }
.promise-title { font-size:25rpx; font-weight:900; color:#704b35; }
.promise-desc { margin-top:8rpx; font-size:20rpx; line-height:1.6; color:#98755f; }
</style>