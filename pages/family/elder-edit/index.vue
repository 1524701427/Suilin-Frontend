<template>
<view class="page"><view class="card">
  <text class="title">编辑长辈资料</text><text class="tip">资料由家人维护；出生日期未填写时不显示年龄。</text>
  <text class="label">姓名</text><input v-model="form.name" class="input" placeholder="请输入长辈姓名"/>
  <text class="label">关系</text><picker :range="relations" @change="onRelationChange"><view class="input picker">{{form.relation||'请选择关系'}}</view></picker>
  <text class="label">出生日期（可选）</text><picker mode="date" :value="form.birthday" @change="onBirthdayChange"><view class="input picker">{{form.birthday||'未填写'}}</view></picker>
  <button v-if="form.birthday" class="clear" @tap="form.birthday=''">清除出生日期</button>
  <text class="label">联系电话（可选）</text><input v-model="form.phone" class="input" type="number" maxlength="11" placeholder="请输入联系电话"/>
  <text class="label">健康情况（可选）</text><view class="tags"><view v-for="tag in healthOptions" :key="tag" class="tag" :class="{active:form.healthTags.includes(tag)}" @tap="toggleTag(tag)">{{tag}}</view></view>
  <button class="save" :disabled="loading" @tap="save">{{loading?'保存中...':'保存资料'}}</button>
</view></view>
</template>
<script>
import { elderApi } from '@/api/index.js'
export default{
 data(){return{id:'',loading:false,relations:['爸爸','妈妈','爷爷','奶奶','外公','外婆','其他'],healthOptions:['高血压','糖尿病','心脏疾病','其他慢病'],form:{name:'',relation:'',birthday:'',phone:'',healthTags:[]}}},
 onLoad(options){this.id=options.id||'';if(options.data){try{const d=JSON.parse(decodeURIComponent(options.data));this.form.name=d.name||'';this.form.relation=d.relation||'';this.form.birthday=d.birthday||'';this.form.phone=d.phone||'';try{this.form.healthTags=JSON.parse(d.healthTagsJson||'[]')}catch(e){this.form.healthTags=[]}}catch(e){}}},
 methods:{
  onRelationChange(e){this.form.relation=this.relations[Number(e.detail.value)]},onBirthdayChange(e){this.form.birthday=e.detail.value},toggleTag(tag){const i=this.form.healthTags.indexOf(tag);if(i>=0)this.form.healthTags.splice(i,1);else this.form.healthTags.push(tag)},
  async save(){if(!this.id)return uni.showToast({title:'缺少长辈信息',icon:'none'});if(!this.form.name.trim())return uni.showToast({title:'请输入姓名',icon:'none'});if(!this.form.relation)return uni.showToast({title:'请选择关系',icon:'none'});if(this.form.phone&&!/^1\d{10}$/.test(this.form.phone))return uni.showToast({title:'联系电话格式不正确',icon:'none'});if(this.loading)return;this.loading=true;try{await elderApi.update(this.id,{name:this.form.name.trim(),relation:this.form.relation,birthday:this.form.birthday||null,phone:this.form.phone||null,healthTags:this.form.healthTags});uni.showToast({title:'保存成功',icon:'success'});setTimeout(()=>uni.navigateBack(),400)}finally{this.loading=false}}
 }
}
</script>
<style scoped>.page{min-height:100vh;padding:32rpx;background:#fff9f2}.card{padding:30rpx;background:#fff;border-radius:30rpx}.title{display:block;font-size:36rpx;font-weight:900;color:#493a33}.tip{display:block;margin-top:10rpx;color:#907d71;font-size:21rpx;line-height:1.6}.label{display:block;margin:22rpx 0 10rpx;color:#705f55}.input{height:84rpx;line-height:84rpx;padding:0 20rpx;background:#fff7ef;border-radius:18rpx}.clear{margin:12rpx 0 0;background:#f4f1ee;color:#78685e;border-radius:18rpx;font-size:21rpx}.tags{display:flex;flex-wrap:wrap;gap:12rpx}.tag{padding:14rpx 18rpx;background:#f5f1ed;border-radius:17rpx;color:#78685e}.tag.active{background:#e6f5f1;color:#2b877b;font-weight:800}.save{margin-top:32rpx;background:#2fa99a;color:#fff;border-radius:21rpx}</style>