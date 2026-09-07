<template>
  <view class="tabbar-wrap">
    <view class="tabbar">
      <view v-for="item in tabs" :key="item.key" class="tab-item" :class="{ active: active === item.key }" @tap="go(item)">
        <view class="tab-icon-wrap"><text class="tab-icon">{{ item.icon }}</text></view>
        <text class="tab-label">{{ item.label }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: { active: { type: String, default: 'home' } },
  data() {
    return {
      tabs: [
        { key: 'home', label: '首页', icon: '⌂', url: '/pages/family/home/index' },
        { key: 'health', label: '健康', icon: '♡', url: '/pages/family/health/index' },
        { key: 'care', label: '照护', icon: '✓', url: '/pages/family/care/index' },
        { key: 'services', label: '服务', icon: '◇', url: '/pages/family/services/index' },
        { key: 'mine', label: '我的', icon: '○', url: '/pages/family/mine/index' }
      ]
    }
  },
  methods: {
    go(item) {
      if (item.key === this.active) return
      uni.redirectTo({ url: item.url })
    }
  }
}
</script>

<style scoped>
.tabbar-wrap{position:fixed;left:0;right:0;bottom:0;z-index:999;padding:0 22rpx calc(16rpx + env(safe-area-inset-bottom));pointer-events:none}.tabbar{height:104rpx;display:flex;align-items:center;justify-content:space-around;padding:0 8rpx;border-radius:30rpx;background:rgba(255,253,250,.97);border:1rpx solid rgba(244,224,207,.95);box-shadow:0 14rpx 45rpx rgba(107,76,54,.12);pointer-events:auto}.tab-item{position:relative;width:20%;height:90rpx;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#a5968d}.tab-icon-wrap{width:48rpx;height:44rpx;display:flex;align-items:center;justify-content:center;border-radius:15rpx}.tab-icon{font-size:29rpx;line-height:1}.tab-label{margin-top:6rpx;font-size:18rpx;line-height:1}.tab-item.active{color:#d77f3f}.tab-item.active .tab-icon-wrap{background:linear-gradient(135deg,#fff0df,#eaf8f3)}.tab-item.active .tab-icon,.tab-item.active .tab-label{font-weight:900}.tab-item.active::after{content:'';position:absolute;bottom:2rpx;width:22rpx;height:5rpx;border-radius:5rpx;background:linear-gradient(90deg,#e89a54,#49a994)}</style>
