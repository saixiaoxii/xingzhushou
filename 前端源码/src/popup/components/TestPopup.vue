<template>
  <div class="popup">
    <div class="title">
      <img src="../../assets/touxiang2.png" alt="">
      <div class="name">智能小星</div>
    </div>
    <div class="tool">
      <div class="welcome">欢迎来到小星学习助手</div>
      <button @click="comeon" class="btn">开始使用</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
function comeon() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'insert', data: 'message.data' });
  });
}
</script>

<style lang="scss" scoped>
.popup {
  // position: relative;
  width: 300px;
  .title {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      margin: 10px;
    }
    .name {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .tool {
    display: flex;
    flex-direction: column;
    align-items: center;
    .welcome {
    margin: 15px ;
    font-size: 18px;
    color: rgb(7, 8, 8);
    }
    .btn {
      width: 80%;
      height: 30px;
      color: beige;
      background: linear-gradient(to right, rgb(17, 112, 237), rgb(5, 5, 218));
      border: none;
      border-radius: 15px;
      cursor: pointer;
    }
  }
}
</style>
