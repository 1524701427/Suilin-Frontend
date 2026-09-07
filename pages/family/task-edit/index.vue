<template>
  <view class="page">
    <view class="card">
      <text class="title">新增照护任务</text>
      <text class="label">任务名称</text>
      <input v-model="form.title" class="input" placeholder="请输入任务名称"/>
      <text class="label">负责人（可选）</text>
      <input v-model="form.owner" class="input" placeholder="请输入负责人姓名"/>
      <text class="label">截止日期（可选）</text>
      <picker mode="date" :value="form.date" @change="onDateChange"><view class="input picker">{{form.date || '请选择日期'}}</view></picker>
      <text class="label">备注（可选）</text>
      <textarea v-model="form.note" class="textarea" placeholder="补充任务说明"/>
      <button class="save" @tap="save">保存任务</button>
    </view>
  </view>
</template>
<script>
export default{
  data(){return{form:{title:'',owner:'',date:'',note:''}}},
  methods:{
    onDateChange(e){this.form.date=e.detail.value},
    save(){
      const title=this.form.title.trim()
      if(!title)return uni.showToast({title:'请输入任务名称',icon:'none'})
      const list=uni.getStorageSync('care_tasks_local')||[]
      list.push({id:Date.now(),title,owner:this.form.owner.trim(),due:this.form.date,status:'待处理',note:this.form.note.trim()})
      uni.setStorageSync('care_tasks_local',list)
      uni.showToast({title:'保存成功',icon:'success'})
      setTimeout(()=>uni.navigateBack(),400)
    }
  }
}
</script>
<style scoped>.page{min-height:100vh;padding:28rpx;background:#f6f7f3}.card{padding:30rpx;background:#fff;border-radius:28rpx}.title{display:block;font-size:34rpx;font-weight:900}.label{display:block;margin:22rpx 0 10rpx;color:#66766d;font-size:22rpx}.input{height:82rpx;padding:0 20rpx;background:#f4f6f3;border-radius:18rpx}.picker{line-height:82rpx}.textarea{width:100%;height:180rpx;padding:20rpx;box-sizing:border-box;background:#f4f6f3;border-radius:18rpx}.save{margin-top:32rpx;background:#326a53;color:#fff;border-radius:20rpx}</style>