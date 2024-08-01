<template>
  <div class="chat_container">
  <div class="title">智能问答助手</div>
  <!-- <div class="chat_container"> -->
    <div class="messages" ref="messages">
      <div v-if="messageList.length === 0" class="welcome">
        <div class="welcome_word">
          <span>{{ getTime() }}好呀</span>        
          <svg style="width: 80px; height: 80px; margin-left: 10px;">
              <use xlink:href="#icon-welcome"  width="80" height="80"></use>
          </svg>
        </div>
        <div class="introduce">我是小星，您的智能学习助手。</div>
      </div>
      <div class="message" v-for="(message, index) in messageList" :key="index" :class="{ 'user-message': message.type === 'user', 'robot-message': message.type === 'robot' }">
        <img v-if="message.type === 'user'"
          :src="touxiang1"
          alt=""
        />
        <img v-else
          :src="touxiang2"
          alt=""
        />
        <!-- <div class="date">{{ formatTimestamp(new Date()) }}</div> -->
        <div class="message_content">{{ message.message }}</div>
      </div>
    </div>
  <!-- </div> -->
  <div class="input_container" ref="input">
    <div class="input_box">
      <div v-show="imgSrc" class="img_input">
        <input type="file" ref="fileInput" style="display: none" @change="onChangeHandler">
        <img :src="imgSrc" alt="">
        <div class="remove_img" @click="imgRemove">×</div>
      </div>
      <textarea 
        ref="textarea"
        v-model="newMessage"
        @keydown.enter.prevent="sendMessage" 
        placeholder="请输入你的问题..." 
        rows="1"
        @input="adjustTextareaHeight"
      >
      </textarea>
      <div class="tools">
        <!-- <el-icon size="25" :color="newMessage ? 'blue' : 'grey'"><Position  /></el-icon> -->
        <!-- <SvgIcon @click="voiceInput" name="voice" width="30px" height="30px" :class="isVoicing ? 'voicing' : 'unvoicing'"/> -->
        <el-tooltip content="语音输入" placement="top" :offset="11">
          <!-- <svg @click="voiceInput" color="grey" :class="isVoicing ? 'voicing' : 'unvoicing'">
            <use xlink:href="#icon-voice"></use>
          </svg> -->
          <SvgIcon 
            name="voice" 
            :color="isVoicing ? 'blue' : 'grey'" 
            width="30px" 
            height="30px"
            @click="voiceInput"
            :class="isVoicing ? 'voicing' : 'unvoicing'"
          ></SvgIcon>
        </el-tooltip>
        <el-tooltip content="图片聊天" placement="top">
          <SvgIcon
            name="photo" 
            width="30px" 
            height="30px" 
            :color="iconColor[0]" 
            @mouseover="changeIconColor(0, 'blue')" 
            @mouseout="changeIconColor(0, 'grey')" 
            style="cursor: pointer; padding-top: 1px;" 
            @click="loadupImg"
          />
        </el-tooltip>
        <el-tooltip content="历史聊天" placement="top">
          <SvgIcon 
            @click="showHistory" 
            name="history" 
            width="30px" 
            height="30px" 
            :color="iconColor[1]" 
            @mouseover="changeIconColor(1, 'blue')" 
            @mouseout="changeIconColor(1, 'grey')" 
            style="cursor: pointer; margin-left: 3px;"
          ></SvgIcon>
        </el-tooltip>
        <el-tooltip content="新建对话" placement="top">
          <SvgIcon 
            @click="newDialog" 
            name="newdialog" 
            width="30px" 
            height="30px" 
            :color="iconColor[2]" 
            @mouseover="changeIconColor(2, 'blue')" 
            @mouseout="changeIconColor(2, 'grey')" 
            style="cursor: pointer; margin-left: 3px;"
          ></SvgIcon>
        </el-tooltip>
        <SvgIcon
          :style="{ position: 'absolute', right: '5px', cursor: newMessage ? 'pointer' : '' }" 
          name="send" 
          width="30px" 
          height="30px" 
          :color="newMessage ? 'blue' : 'lightgrey'"
          @click="sendMessage"
        />
      </div>
      <!-- <button @click="sendMessage">Send</button> -->
    </div>
  </div>
  <History v-if="isShowHistory" @unShowHistory="handleUnShowHistory" @openHistoryItem="handleOpenHistoryItem"></History>
</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick, onActivated } from 'vue';
import History from './history.vue'
import touxiang1 from '../../assets/images/image.png'
import touxiang2 from '../../assets/images/xing.png'

import { getChatHistory, newDialogAPI, getChatList, addMessage , deleteDialog, getChatReply, image } from '../../api/index'

const messages = ref();
const input = ref()
// const messageList = reactive([])
const messageList = ref([])
const newMessage = ref('')
const textarea = ref(null)
const fileInput = ref()

// 上传照片
let imgSrc = ref('')
// chat表单数据 包含三个可选字段 question history image
const formData = new FormData()

// 图标颜色
let iconColor = ref(['grey','grey','grey'])
function changeIconColor(num, color) {
  if (num === 0) {
    iconColor.value[0] = color
  } else if (num === 1) {
    iconColor.value[1] = color
  } else {
    iconColor.value[2] = color

  }
}

const getTime = () => {
  let time = ''
  const hours = new Date().getHours()
  if (hours <= 9) {
    time = '早上'
  } else if (hours <= 12) {
    time = '上午'
  } else if (hours <= 18) {
    time = '下午'
  } else {
    time = '晚上'
  }
  return time
}
let isOutputing = ref(false)
// let index = ref(1)

// 每次对话id
let themeId = Number
const sendMessage = async () => {
  if (( isOutputing.value === false)) {
    messageList.value.push({
      type: 'user',
      message: newMessage.value
    })

    let messageData = []

    messageData.push({
      type: 'user',
      message: newMessage.value
    })
    let newm = newMessage.value
    newMessage.value = ''
    imgRemove()

    // 输入框高度自适应
    textarea.value.style.height = 'auto'
    messages.value.style.height = `calc(100% - ${input.value.offsetHeight}px - 45px)`

    isOutputing.value = true

   
    formData.append('question', newm)
    let res = await getChatReply(formData)
    // 清除表单
    formData.delete('question')
    formData.delete('history')
    formData.delete('image')
    messageList.value.push({
      type: 'robot',
      message: res.answer
    })
    messageData.push({
      type: 'robot',
      message: res.answer
    })
    // 检查是否第一次发送消息，如果是，调用新建对话接口，否则调用添加消息接口
    if (messageList.value.length === 2) {
      // console.log(messageList.value.length)
      let res = await newDialogAPI(messageData)
      themeId = res.themeId
      // console.log(themeId)
      isOutputing.value = false;
    } else {
      messageData = messageData.map(item => {
        return {
          ...item,
          topicId: themeId
        }
      })
      await addMessage(messageData)
      isOutputing.value = false;
    }
  }
}
const adjustTextareaHeight = (e) => {
  // console.log(e)
  const el = textarea.value
  textarea.value.style.height = 'auto'; // 先重置高度为自动以便重新计算
  el.style.height = `${el.scrollHeight}px`; // 根据内容高度来设置 textarea 的高度
  messages.value.style.height = `calc(100% - ${input.value.offsetHeight}px - 45px)`
  scrollToBottom()
}
const scrollToBottom = () => {
  const messagesDiv = messages.value
  messagesDiv.scrollTop = messagesDiv.scrollHeight
}


watch(messageList, async () => {
    await nextTick()
    scrollToBottom()
  },
  { deep: true })


onActivated(async () => {
  await nextTick()
  scrollToBottom()
})

// 语音输入

// 语音输入状态
let isVoicing = ref()
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const voice = new webkitSpeechRecognition()
voice.lang = 'zh-CN'
voice.interimResults = false;
// 是否返回连续结果
voice.continuous = false;
voice.onresult = (event) => {
    console.log(event)
    const result = event.results[0][0].transcript
    console.log(result)
    newMessage.value += result
  }
  voice.onspeechend = (event) => {
    voice.stop()
    isVoicing.value = false
  }
  voice.onnomatch = function (event) {
    console.log("Speech recognition failed: No match", event)
    isVoicing.value = false
}
voice.onerror = (event) => {
    console.error('Speech recognition error', event);
    isVoicing.value = false;
}
function voiceInput() {
  if (isVoicing.value) {
    voice.stop()
    isVoicing.value = false
    return
  } else {
    voice.start()
    isVoicing.value = true
  }
}

// 上传图片
function loadupImg() {
  fileInput.value.click()
}
// file input
function onChangeHandler(event) {
  const file = event.target.files[0]

  const reader = new FileReader()
  reader.onload = function(event) {
    imgSrc.value = event.target.result
  }
  reader.readAsDataURL(file)

  formData.append('image', file)
}
// 删除图片
function imgRemove() {
  fileInput.value = ''; // 清空 input 的值
  imgSrc.value = ''
}
// 展开历史记录
const isShowHistory = ref(false)
function showHistory() {
  isShowHistory.value = true
}
function handleUnShowHistory() {
  // console.log(99)
  isShowHistory.value = false
}
// 显示所选择的历史记录
async function handleOpenHistoryItem(id) {
  messageList.value = []
  themeId = id
  let res = await getChatHistory(id)
  res.forEach(ele => {
    if (ele.isUser === 1) {
      messageList.value.push({
        type: 'user',
        message: ele.content
      })
    } else if (ele.isUser === 0) {
      messageList.value.push({
        type: 'robot',
        message: ele.content
      })
    }
  })
}
// 新建对话
async function newDialog() {
  if (messageList.value.length !== 0) {
    messageList.value = []
    newMessage.value = ''
    console.log(messageList.value)
  }
}
</script>

<style lang="scss" scoped>
.chat_container{
  position: relative;
  height: 100vh;
  min-width: 200px;
  background-color: rgb(244,244,244);
  .title{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;
  border-bottom: solid 1px #d0d3d4;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.messages {
  position: absolute;
  left: 0;
  top: 45px;
  // background-color: rgb(244, 244, 245);
  height: calc(100% - 200px);
  overflow-y: auto;
  width: 100%;
  padding: 0 15px 0 15px;
  scroll-behavior: smooth;

  .welcome {
    width: 90%;
    position: absolute;
    top: 50px;
    .welcome_word {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      font-weight: 700;
      span {
        margin-top: 20px;
      }
    }
    .introduce {  
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .message {
    display: flex;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

    .message_content {
      // overflow: auto;
      width: 80%;
      padding: 8px;
      margin: 8px 0;
      // background-color: #5a1f1f;
      line-height: 1.5;
      border-radius: 8px;
      word-wrap: break-word; // 或者 word-break: break-all;
    }
  }
  .user-message {
    flex-direction: row-reverse; /* 图片和文字反向排列 */
    .message_content{
      background-color: white;
    }
    img{
      margin: 8px 0 0 3px;
    }
  }

  .robot-message {
    justify-content: flex-start;
    .message_content{
      // background-color: rgb(104,65,234);
      background-color: rgb(194, 178, 248);
    }
    img{
      margin: 8px 3px 0 0;
    }
  }
}
.input_container{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  background-color: rgb(243, 243, 243);
  .input_box {
    // display: flex;
    // align-items: center;
    border-radius: 16px;
    margin: 20px 10px;
    padding: 5px 10px;
    border: 1px solid transparent;
    background-color: rgb(231,232,234);
    transition: border-color .2s;

    .img_input{
      width: 100%;
      height: 65px;
      // background-color: #d0d4d1;
      border-bottom: solid 1px #a1aaad;

      img {
        // position: relative;
        margin: 5px 10px;
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
      .remove_img {
        position: absolute;
        top: 25px;
        left: 75px;
        width: 12px;
        height: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: rgb(246, 242, 242);
        background-color: rgb(181, 167, 167);
        cursor: pointer;
      }
    }

    textarea {
      // flex: 1;
      font-size: 16px;
      width: 100%;
      // height: auto;
      min-height: 72px;
      max-height: 120px;
      resize: none;
      overflow-y: auto;
      background-color: transparent;
      border: none !important;
      box-shadow: none !important;
    }
    textarea:focus{
      border: none !important;
      box-shadow: none !important;
    }
    
    .tools {
      position: relative;
      height: 30px;
      // background-color: #fff;
      .unvoicing {
        cursor: pointer;
      }
      .voicing {
        background-color: #fff;
        // border: #127de8 1px solid;
        border-radius: 50%;
        cursor: pointer;
        animation: flashing 1s infinite;
      }
      @keyframes flashing {
      }
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 8px;
      cursor: pointer;
    }
  }
  .input_box:hover {
    border: solid #007bff 1px;
  }
  .input_box:focus-within {
    border: solid #007bff 1px;
  }

}
}
</style>
