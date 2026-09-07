<template>
  <view class="page">
    <text class="title">照护任务</text>
    <text class="sub">这里只显示家人自己创建的照护待办，不预置演示任务。</text>

    <view v-if="tasks.length">
      <view v-for="t in tasks" :key="t.id" class="card task" @tap="open(t)">
        <view>
          <text class="task-title">{{t.title}}</text>
          <text class="meta">{{t.owner || '未指定负责人'}}{{t.due ? ' · '+t.due : ''}}</text>
        </view>
        <text class="status">{{t.status || '待处理'}}</text>
      </view>
    </view>
    <view v-else class="empty">还没有照护任务</view>

    <button class="add" @tap="add">+ 新增照护任务</button>
  </view>
</template>
<script>
export default{
  data(){return{tasks:[]}},
  onShow(){this.tasks=uni.getStorageSync('care_tasks_local')||[]},
  methods:{
    persist(){uni.setStorageSync('care_tasks_local',this.tasks)},
    add(){uni.navigateTo({url:'/pages/family/task-edit/index'})},
    open(t){
      uni.showActionSheet({
        itemList:['标记已完成','删除任务'],
        success:r=>{
          if(r.tapIndex===0){t.status='已完成';this.persist();uni.showToast({title:'已完成',icon:'success'})}
          else{this.tasks=this.tasks.filter(x=>x.id!==t.id);this.persist();uni.showToast({title:'已删除',icon:'none'})}
        }
      })
    }
  }
}
</script>
<style scoped>
.page{min-height:100vh;padding:30rpx;background:#f6f7f3}.title{display:block;font-size:40rpx;font-weight:900;color:#2d4338}.sub{display:block;margin:10rpx 0 26rpx;color:#7b857f;font-size:21rpx;line-height:1.6}.card{background:#fff;border-radius:26rpx}.task{margin-bottom:16rpx;padding:24rpx;display:flex;justify-content:space-between;align-items:flex-start}.task-title,.meta{display:block}.task-title{font-size:27rpx;font-weight:900}.meta{margin-top:7rpx;font-size:20rpx;color:#7c867f}.status{font-size:19rpx;color:#326a53}.empty{padding:42rpx;text-align:center;background:#fff;border-radius:26rpx;color:#8b958e}.add{margin-top:18rpx;background:#326a53;color:#fff;border-radius:20rpx}
</style>