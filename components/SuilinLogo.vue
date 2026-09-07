<template>
  <view class="suilin-logo" :class="[`size-${size}`, { 'with-bg': withBg }]">
    <view class="roof"></view>
    <view class="people">
      <view class="person teal">
        <view class="head"></view>
        <view class="body"></view>
      </view>
      <view class="person orange">
        <view class="head"></view>
        <view class="body"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'md'
    },
    withBg: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.suilin-logo {
  position: relative;
  width: 112rpx;
  height: 96rpx;
  flex-shrink: 0;
}
.suilin-logo.with-bg {
  width: 132rpx;
  height: 132rpx;
  padding: 17rpx 10rpx 10rpx;
  border-radius: 36rpx;
  background: rgba(255, 255, 255, .92);
  box-shadow: 0 14rpx 40rpx rgba(124, 78, 44, .10);
}
.size-sm { transform: scale(.72); transform-origin: left center; }
.size-lg { transform: scale(1.26); transform-origin: center center; }
.roof {
  position: absolute;
  left: 8rpx;
  right: 8rpx;
  top: 4rpx;
  height: 22rpx;
  border-radius: 50% 50% 0 0;
  border-top: 9rpx solid #f39a3f;
  transform: scaleY(.56);
}
.people {
  position: absolute;
  left: 13rpx;
  right: 13rpx;
  top: 28rpx;
  bottom: 3rpx;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.person {
  position: relative;
  width: 50%;
  height: 100%;
}
.person .head {
  position: absolute;
  top: 0;
  left: 50%;
  width: 22rpx;
  height: 22rpx;
  margin-left: -11rpx;
  border-radius: 50%;
}
.person .body {
  position: absolute;
  left: 4rpx;
  right: 0;
  bottom: 0;
  height: 47rpx;
  border: 11rpx solid;
  border-bottom: 0;
  border-radius: 30rpx 30rpx 0 0;
}
.person.orange .body { left: 0; right: 4rpx; }
.person.teal .head,
.person.teal .body { border-color: #2fa99a; background: #2fa99a; }
.person.orange .head,
.person.orange .body { border-color: #f39a3f; background: #f39a3f; }
.person .body::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 22rpx 22rpx 0 0;
  background: #fffaf4;
}
.with-bg .person .body::after { background: rgba(255,255,255,.92); }
</style>
