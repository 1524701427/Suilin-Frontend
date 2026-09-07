<template>
  <view class="page">
    <PageHeader subtitle="健康记录" />

    <view class="hero">
      <text class="eyebrow">真实数据</text>
      <text class="hero-title">每条健康记录都有来源</text>
      <text class="hero-desc">家人手工录入、设备、长辈录入或医疗机构数据会分别标记，不再显示没有出处的“正常/异常”。</text>
    </view>

    <view v-if="loading" class="empty-card"><text>正在加载...</text></view>
    <view v-else-if="!elders.length" class="empty-card">
      <text class="empty-title">还没有长辈资料</text>
      <text class="empty-desc">先添加长辈，之后才能录入健康数据。</text>
    </view>

    <template v-else>
      <scroll-view scroll-x class="elder-tabs">
        <view class="elder-tabs-inner">
          <view v-for="e in elders" :key="e.id" class="elder-tab" :class="{active:selected&&selected.id===e.id}" @tap="selectElder(e)">{{e.name}}</view>
        </view>
      </scroll-view>

      <view class="add-card">
        <text class="card-title">手工录入一条健康记录</text>
        <text class="source-note">来源会记录为“家人手工录入”</text>
        <picker :range="metricLabels" @change="e=>metricIndex=e.detail.value"><view class="input">{{metricLabels[metricIndex]}}</view></picker>
        <input v-model="form.valueText" class="input" placeholder="测量值，例如 128/78" />
        <input v-model="form.unit" class="input" placeholder="单位，例如 mmHg、次/分、%" />
        <button class="save" :disabled="saving" @tap="saveRecord">{{saving?'保存中...':'保存记录'}}</button>
      </view>

      <view class="section-head">
        <view><text class="section-eyebrow">历史记录</text><text class="section-title">{{selected?.name}}的健康数据</text></view>
        <text class="count">{{records.length}} 条</text>
      </view>

      <view v-if="records.length" class="records">
        <view v-for="r in records" :key="r.id" class="record-card">
          <view class="record-main">
            <text class="record-type">{{metricName(r.metricType)}}</text>
            <text class="record-value">{{r.valueText}}{{r.unit?' '+r.unit:''}}</text>
            <text class="record-time">{{formatTime(r.measuredAt)}}</text>
          </view>
          <view class="source-badge">{{sourceName(r.sourceType)}}</view>
        </view>
      </view>
      <view v-else class="empty-card"><text class="empty-title">暂无健康记录</text><text class="empty-desc">这里不会自动生成任何健康数值。</text></view>
    </template>

    <FamilyTabbar active="health" />
  </view>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import FamilyTabbar from '@/components/FamilyTabbar.vue'
import { elderApi, healthApi } from '@/api/index.js'

function localDateTime(){
  const d=new Date(),p=n=>String(n).padStart(2,'0')
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

export default{
  components:{PageHeader,FamilyTabbar},
  data(){return{
    elders:[],selected:null,records:[],loading:true,saving:false,metricIndex:0,
    metricTypes:['BLOOD_PRESSURE','HEART_RATE','BLOOD_OXYGEN','BLOOD_GLUCOSE','WEIGHT','OTHER'],
    metricLabels:['血压','心率','血氧','血糖','体重','其他'],
    form:{valueText:'',unit:''}
  }},
  async onShow(){await this.load()},
  methods:{
    async load(){
      this.loading=true
      try{
        this.elders=await elderApi.list()||[]
        if(this.elders.length){
          const current=this.selected?.id
          this.selected=this.elders.find(e=>e.id===current)||this.elders[0]
          await this.loadRecords()
        }else{this.selected=null;this.records=[]}
      }finally{this.loading=false}
    },
    async selectElder(e){this.selected=e;await this.loadRecords()},
    async loadRecords(){this.records=this.selected?(await healthApi.list(this.selected.id)||[]):[]},
    async saveRecord(){
      if(!this.selected)return
      if(!this.form.valueText.trim())return uni.showToast({title:'请输入测量值',icon:'none'})
      if(this.saving)return
      this.saving=true
      try{
        await healthApi.create(this.selected.id,{
          metricType:this.metricTypes[this.metricIndex],
          valueText:this.form.valueText.trim(),
          unit:this.form.unit.trim()||null,
          sourceType:'FAMILY_MANUAL',
          sourceRef:null,
          measuredAt:localDateTime()
        })
        this.form.valueText='';this.form.unit=''
        await this.loadRecords()
        uni.showToast({title:'已保存',icon:'success'})
      }finally{this.saving=false}
    },
    metricName(type){const i=this.metricTypes.indexOf(type);return i>=0?this.metricLabels[i]:type},
    sourceName(type){return {FAMILY_MANUAL:'家人手工录入',ELDER_MANUAL:'长辈录入',DEVICE:'设备',HOSPITAL:'医疗机构'}[type]||type},
    formatTime(v){return v?String(v).replace('T',' ').slice(0,16):''}
  }
}
</script>

<style scoped>
.page{min-height:100vh;padding:0 28rpx 180rpx;background:linear-gradient(180deg,#fff9f2,#f5faf7)}.hero{margin:42rpx 6rpx 28rpx}.eyebrow,.section-eyebrow{display:block;font-size:22rpx;color:#998579}.hero-title{display:block;margin-top:9rpx;font-size:42rpx;font-weight:900;color:#493a33}.hero-desc{display:block;margin-top:14rpx;font-size:23rpx;line-height:1.7;color:#89776c}.elder-tabs{white-space:nowrap;margin-bottom:22rpx}.elder-tabs-inner{display:flex;gap:12rpx}.elder-tab{padding:16rpx 24rpx;border-radius:20rpx;background:#fff;color:#806e62}.elder-tab.active{background:#2fa99a;color:#fff;font-weight:800}.add-card,.record-card,.empty-card{background:#fff;border:1rpx solid #f0e5dc;border-radius:28rpx;box-shadow:0 12rpx 36rpx rgba(100,73,54,.05)}.add-card{padding:28rpx}.card-title{display:block;font-size:29rpx;font-weight:900;color:#493a33}.source-note{display:block;margin-top:7rpx;font-size:20rpx;color:#958277}.input{min-height:82rpx;line-height:82rpx;margin-top:18rpx;padding:0 20rpx;border-radius:18rpx;background:#fff7ef;color:#4b3b33}.save{margin-top:22rpx;background:#2fa99a;color:#fff;border-radius:20rpx}.section-head{display:flex;justify-content:space-between;align-items:flex-end;margin:34rpx 4rpx 16rpx}.section-title{display:block;margin-top:5rpx;font-size:30rpx;font-weight:900;color:#493a33}.count{font-size:21rpx;color:#958277}.records{display:flex;flex-direction:column;gap:14rpx}.record-card{display:flex;justify-content:space-between;align-items:center;padding:25rpx}.record-type{display:block;font-size:23rpx;color:#8c796e}.record-value{display:block;margin-top:5rpx;font-size:31rpx;font-weight:900;color:#493a33}.record-time{display:block;margin-top:6rpx;font-size:20rpx;color:#a08f84}.source-badge{padding:10rpx 14rpx;border-radius:16rpx;background:#e9f6f2;color:#2c887c;font-size:19rpx}.empty-card{padding:46rpx 30rpx;text-align:center}.empty-title{display:block;font-size:31rpx;font-weight:900;color:#493a33}.empty-desc{display:block;margin-top:12rpx;line-height:1.6;color:#8d7b70}
</style>