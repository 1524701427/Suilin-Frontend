<template>
  <view class="page">
    <text class="title">照护任务</text>
    <text class="sub">任务由家庭成员创建，负责人和状态都保存在后端。</text>

    <view v-if="loading" class="empty">正在加载...</view>
    <view v-else-if="tasks.length">
      <view v-for="t in tasks" :key="t.id" class="card task" @tap="open(t)">
        <view>
          <text class="task-title">{{t.title}}</text>
          <text class="meta">{{t.assigneeName || '未指定负责人'}}{{t.dueAt ? ' · '+formatDue(t.dueAt) : ''}}</text>
        </view>
        <text class="status" :class="{done:t.status==='DONE'}">{{statusName(t.status)}}</text>
      </view>
    </view>
    <view v-else class="empty">还没有照护任务</view>

    <button class="add" @tap="add">+ 新增照护任务</button>
  </view>
</template>
<script>
import { taskApi } from '@/api/index.js'
export default{
  data(){return{tasks:[],loading:false}},
  onShow(){this.load()},
  methods:{
    async load(){this.loading=true;try{this.tasks=await taskApi.list()||[]}finally{this.loading=false}},
    add(){uni.navigateTo({url:'/pages/family/task-edit/index'})},
    open(t){
      const items=t.status==='DONE'?['编辑任务','删除任务']:['标记已完成','编辑任务','删除任务']
      uni.showActionSheet({itemList:items,success:async r=>{
        const action=items[r.tapIndex]
        if(action==='标记已完成'){await taskApi.complete(t.id);await this.load();uni.showToast({title:'已完成',icon:'success'})}
        else if(action==='编辑任务'){uni.navigateTo({url:`/pages/family/task-edit/index?id=${t.id}`})}
        else if(action==='删除任务'){
          uni.showModal({title:'删除任务',content:'确定删除这条照护任务吗？',success:async x=>{if(!x.confirm)return;await taskApi.remove(t.id);await this.load();uni.showToast({title:'已删除',icon:'success'})}})
        }
      }})
    },
    statusName(v){return {TODO:'待处理',DOING:'进行中',DONE:'已完成'}[v]||v},
    formatDue(v){return String(v).replace('T',' ').slice(0,16)}
  }
}
</script>
<style scoped>
.page{min-height:100vh;padding:30rpx;background:#fff9f2}.title{display:block;font-size:40rpx;font-weight:900;color:#493a33}.sub{display:block;margin:10rpx 0 26rpx;color:#88776d;font-size:21rpx;line-height:1.6}.card{background:#fff;border-radius:26rpx}.task{margin-bottom:16rpx;padding:24rpx;display:flex;justify-content:space-between;align-items:flex-start}.task-title,.meta{display:block}.task-title{font-size:27rpx;font-weight:900}.meta{margin-top:7rpx;font-size:20rpx;color:#7c867f}.status{font-size:19rpx;color:#c17b39}.status.done{color:#2f8b7d}.empty{padding:42rpx;text-align:center;background:#fff;border-radius:26rpx;color:#8b958e}.add{margin-top:18rpx;background:#2fa99a;color:#fff;border-radius:20rpx}
</style>