<template>
  <view class="page">
    <view class="card">
      <text class="title">{{id?'编辑照护任务':'新增照护任务'}}</text>
      <text class="label">任务名称</text>
      <input v-model="form.title" class="input" placeholder="请输入任务名称"/>

      <text class="label">关联长辈（可选）</text>
      <picker :range="elderLabels" @change="onElderChange"><view class="input picker">{{elderLabels[elderIndex]}}</view></picker>

      <text class="label">负责人（可选）</text>
      <picker :range="memberLabels" @change="onMemberChange"><view class="input picker">{{memberLabels[memberIndex]}}</view></picker>

      <text class="label">截止日期（可选）</text>
      <picker mode="date" :value="form.date" @change="onDateChange"><view class="input picker">{{form.date || '请选择日期'}}</view></picker>
      <picker v-if="form.date" mode="time" :value="form.time" @change="onTimeChange"><view class="input picker time">{{form.time}}</view></picker>

      <text class="label">状态</text>
      <picker :range="statusLabels" @change="onStatusChange"><view class="input picker">{{statusLabels[statusIndex]}}</view></picker>

      <text class="label">备注（可选）</text>
      <textarea v-model="form.note" class="textarea" placeholder="补充任务说明"/>
      <button class="save" :disabled="loading" @tap="save">{{loading?'保存中...':'保存任务'}}</button>
    </view>
  </view>
</template>
<script>
import { taskApi, familyApi, elderApi } from '@/api/index.js'
export default{
  data(){return{
    id:'',loading:false,members:[],elders:[],memberIndex:0,elderIndex:0,statusIndex:0,
    statuses:['TODO','DOING','DONE'],statusLabels:['待处理','进行中','已完成'],
    form:{title:'',date:'',time:'18:00',note:''}
  }},
  computed:{
    memberLabels(){return ['不指定负责人',...this.members.map(m=>m.name||'未填写姓名')]},
    elderLabels(){return ['不关联长辈',...this.elders.map(e=>e.name)]}
  },
  async onLoad(options){
    this.id=options.id||''
    this.loading=true
    try{
      const [members,elders]=await Promise.all([familyApi.members(),elderApi.list()])
      this.members=members||[];this.elders=elders||[]
      if(this.id){
        const t=await taskApi.detail(this.id)
        this.form.title=t.title||'';this.form.note=t.note||''
        this.memberIndex=t.assigneeUserId?Math.max(0,this.members.findIndex(m=>m.userId===t.assigneeUserId)+1):0
        this.elderIndex=t.elderId?Math.max(0,this.elders.findIndex(e=>e.id===t.elderId)+1):0
        this.statusIndex=Math.max(0,this.statuses.indexOf(t.status))
        if(t.dueAt){const s=String(t.dueAt);this.form.date=s.slice(0,10);this.form.time=s.slice(11,16)||'18:00'}
      }
    }finally{this.loading=false}
  },
  methods:{
    onDateChange(e){this.form.date=e.detail.value},onTimeChange(e){this.form.time=e.detail.value},
    onMemberChange(e){this.memberIndex=Number(e.detail.value)},onElderChange(e){this.elderIndex=Number(e.detail.value)},onStatusChange(e){this.statusIndex=Number(e.detail.value)},
    async save(){
      const title=this.form.title.trim()
      if(!title)return uni.showToast({title:'请输入任务名称',icon:'none'})
      if(this.loading)return
      const payload={
        title,
        elderId:this.elderIndex?this.elders[this.elderIndex-1].id:null,
        assigneeUserId:this.memberIndex?this.members[this.memberIndex-1].userId:null,
        dueAt:this.form.date?`${this.form.date}T${this.form.time}:00`:null,
        note:this.form.note.trim()||null,
        status:this.statuses[this.statusIndex]
      }
      this.loading=true
      try{
        if(this.id)await taskApi.update(this.id,payload);else await taskApi.create(payload)
        uni.showToast({title:'保存成功',icon:'success'})
        setTimeout(()=>uni.navigateBack(),400)
      }finally{this.loading=false}
    }
  }
}
</script>
<style scoped>.page{min-height:100vh;padding:28rpx;background:#fff9f2}.card{padding:30rpx;background:#fff;border-radius:28rpx}.title{display:block;font-size:34rpx;font-weight:900;color:#493a33}.label{display:block;margin:22rpx 0 10rpx;color:#6f6259;font-size:22rpx}.input{height:82rpx;line-height:82rpx;padding:0 20rpx;background:#fff7ef;border-radius:18rpx}.time{margin-top:12rpx}.picker{line-height:82rpx}.textarea{width:100%;height:180rpx;padding:20rpx;box-sizing:border-box;background:#fff7ef;border-radius:18rpx}.save{margin-top:32rpx;background:#2fa99a;color:#fff;border-radius:20rpx}</style>