<template>
  <div class="drawer_container">
    <el-drawer
      v-model="drawer"
      title="历史会话记录"
      direction="btt"
      @close="handleClose"
      :size="600"
    >

      <div @click="toThisHistory(item)" v-for="item in chatListItems" :key="item.id" class="history_item">
        <div class="title">{{ item.topicName }}</div>
        <div class="time">
          <div>{{ formatTime(item.updateTime) }}</div>
          <div>{{ formatTime2(item.updateTime) }}</div>
        </div>
        <div class="content">{{ item.summary }}</div>
        <div @click.stop="delChatItem(item.id)" class="delete">
          <svg width="17px" height="17px">
            <use xlink:href="#icon-delete" width="17px" height="17px"></use>
          </svg>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getChatHistory, newDialogAPI, getChatList, deleteDialog } from '../../api/index'

const drawer = ref(true)
const chatListItems = ref([])

const emit = defineEmits(['unShowHistory', 'openHistoryItem'])
function handleClose() {
  emit('unShowHistory')
}


// 格式化时间
function formatTime(timeString) {
  const date = new Date(timeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}
function formatTime2(timeString) {
  const date = new Date(timeString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function toThisHistory(item) {
  // console.log(item,item.id)
  emit('unShowHistory')
  emit('openHistoryItem', item.id)
}

// 删除对话
async function delChatItem(id) {
  await deleteDialog(id)
  chatListItems.value = await getChatList()
}
onMounted(async () => {
  let res = await getChatList()
  chatListItems.value = res
})

</script>

<style lang="scss">
.drawer_container {
  .el-overlay {
    position: absolute;
    .el-drawer {
      border-radius: 18px 18px 0 0;
    }
    .history_item {
      position: relative;
      height: 90px;
      padding: 8px 5px;
      border-radius: 10px;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        background-color: #f1eaea;
        .delete {
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 5px;
          bottom: 5px;
          &:hover {
            background-color: #dfd1d1;
            border-radius: 8px;
          }
        }
      }
      .title {
        height: 25px;
        width: 60%;
        line-height: 25px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: black;
        font-size: 16px;
        font-weight: 700;
      }
      .time{
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: 9px;
        right: 0;
        width: 44%;
        font-size: 12px;
        color: rgb(170, 170, 170);
      }
      .content {
        margin-top: 12px;
        width: 90%;
        height: 25px;
        line-height: 25px;
        font-size: 15px;
        color: rgb(137, 117, 117);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .delete {
        display: none;
        // display: block;
        //   position: absolute;
        //   right: 12px;
        //   bottom: 5px;
        //   &:hover {
        //     background-color: #f4efef;
        //     border-radius: 5px;
        //   }
      }
    }
  }
}

</style>
