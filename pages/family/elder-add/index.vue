<template>
  <view class="page">
    <text class="title">添加长辈</text>
    <text class="tip">资料由家人填写，保存后生成专属邀请，长辈点击即可绑定</text>
    <view class="card">
      <text class="label">姓名</text>
      <input v-model="form.name" class="input" placeholder="请输入长辈姓名" />

      <text class="label">关系</text>
      <picker :range="relations" @change="onRelationChange">
        <view class="picker">{{form.relation || '请选择关系'}}</view>
      </picker>

      <text class="label">出生日期</text>
      <picker mode="date" :value="form.birthday" @change="e=>form.birthday=e.detail.value">
        <view class="picker">{{form.birthday || '请选择出生日期'}}</view>
      </picker>

      <text class="label">联系电话（可选）</text>
      <input v-model="form.phone" class="input" type="number" maxlength="11" placeholder="请输入长辈联系电话" />

      <text class="label">健康情况（可选）</text>
      <view class="tags">
        <view v-for="tag in healthOptions" :key="tag" class="tag" :class="{active:form.healthTags.includes(tag)}" @tap="toggleTag(tag)">{{tag}}</view>
      </view>

      <button class="save" :disabled="loading" @tap="save">{{loading ? '保存中...' : '保存并生成邀请'}}</button>
    </view>
  </view>
</template>

<script>
import { elderApi } from '@/api/index.js'
export default {
  data(){return{
    relations:['爸爸','妈妈','爷爷','奶奶','外公','外婆','其他'],
    healthOptions:['高血压','糖尿病','心脏疾病','其他慢病'],
    form:{name:'',relation:'',birthday:'',phone:'',healthTags:[]},
    loading:false
  }},
  methods:{
    onRelationChange(e){this.form.relation=this.relations[e.detail.value]},
    toggleTag(tag){
      const i=this.form.healthTags.indexOf(tag)
      if(i>=0)this.form.healthTags.splice(i,1)
      else this.form.healthTags.push(tag)
    },
    async save(){
      if(!this.form.name.trim()) return uni.showToast({title:'请输入长辈姓名',icon:'none'})
      if(!this.form.relation) return uni.showToast({title:'请选择关系',icon:'none'})
      if(!this.form.birthday) return uni.showToast({title:'请选择出生日期',icon:'none'})
      if(this.form.phone && !/^1\d{10}$/.test(this.form.phone)) return uni.showToast({title:'联系电话格式不正确',icon:'none'})
      if(this.loading)return
      this.loading=true
      try{
        const data=await elderApi.create({...this.form,name:this.form.name.trim()})
        uni.navigateTo({url:`/pages/family/elder-invite/index?elderId=${data.elderId}&token=${data.inviteToken}`})
      }finally{this.loading=false}
    }
  }
}
</script>

<style scoped>
.page{padding:40rpx;background:#fff9f2;min-height:100vh}.title{display:block;font-size:42rpx;font-weight:900;color:#493a33}.tip{display:block;margin:15rpx 0 28rpx;color:#8d786b;line-height:1.5}.card{background:#fff;border-radius:30rpx;padding:30rpx}.label{display:block;margin:22rpx 0 10rpx;color:#715f54;font-size:24rpx}.input,.picker{min-height:88rpx;padding:0 22rpx;background:#fff7ef;border-radius:18rpx;display:flex;align-items:center;color:#4b3b33}.tags{display:flex;flex-wrap:wrap;gap:14rpx}.tag{padding:16rpx 20rpx;border-radius:18rpx;background:#f7f3ef;color:#78695f}.tag.active{background:#e5f5f1;color:#278c7f;font-weight:800}.save{margin-top:34rpx;background:#2fa99a;color:#fff;border-radius:22rpx}
</style>