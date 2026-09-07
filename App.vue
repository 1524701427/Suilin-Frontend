<script>
export default {
  onLaunch() {
    console.log('岁邻启动')
  }
}
</script>

<style>
page {
  --suilin-bg: #fff9f2;
  --suilin-bg-soft: #f7fbf8;
  --suilin-card: #ffffff;
  --suilin-text: #40352f;
  --suilin-muted: #8d7d73;
  --suilin-teal: #2fa99a;
  --suilin-teal-soft: #e8f6f1;
  --suilin-orange: #f39a3f;
  --suilin-orange-soft: #fff0df;
  --suilin-danger: #d65348;
  background: var(--suilin-bg);
  color: var(--suilin-text);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
}
view, text, button, input, textarea, switch { box-sizing: border-box; }
button::after { border: none; }
button { margin: 0; }

.page {
  background:
    radial-gradient(circle at 96% 4%, rgba(255,211,165,.28), transparent 24%),
    radial-gradient(circle at 2% 34%, rgba(72,183,164,.12), transparent 22%),
    linear-gradient(180deg,#fff9f2 0%,#fffdf9 58%,#f6fbf8 100%) !important;
}
.hero-title, .section-title, .card-title, .menu-title, .profile-name, .person-name {
  color: #40352f !important;
}
.hero-desc, .section-eyebrow, .eyebrow, .menu-desc, .profile-role {
  color: #8d7d73 !important;
}
.metric-card, .trend-card, .records-card, .menu-card, .profile-card, .recommend-card,
.service-card, .institution-card, .product-card, .location-card {
  background: rgba(255,255,255,.94) !important;
  border-color: rgba(236,224,214,.72) !important;
  box-shadow: 0 14rpx 42rpx rgba(102,74,51,.07) !important;
}
.add-btn, .buy-btn, .community-btn, .next-action {
  background: #2fa99a !important;
  color: #fff !important;
}
.companion-card { display: none !important; }
</style>
