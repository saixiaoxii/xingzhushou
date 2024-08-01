<template>
  <div>
    <RecVideo v-if="!isLoading" :courses="courses" @refreshCourses="handleRefresh"></RecVideo>
    <div v-if="isShow" class="interest_container">
      <div class="title">Hi! 填写兴趣可以获得更精准的内容推荐哦</div>
      <div class="interest">
        <!-- <div class="category">{{ option.category }}</div> -->
        <label class="checkbox_button" v-for="(item, index) in options" :key="index">
            <input type="checkbox" :value="item" v-model="selectedOptions">
            {{ item }}
        </label>
      </div>
      <button :class="['btn', { 'btn_inactive': !selectedNum }]" :disabled="!selectedNum" @click="submit">我选好了（已选{{ selectedNum }}个）</button>
    </div>
    <Loading v-if="isLoading"/>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue"
import RecVideo from './recVideo.vue'
import Loading from './loading.vue'
import useUserStore from "../../store/modules/user"
import { getCoursesList } from "../../api/index"

let userStore = useUserStore()
// 课程列表
let courses = ref([])
// 兴趣选择页显示与隐藏
let isShow = ref(true)
// 感兴趣选项
let options = ref([
  '中国历史概论','中华经典文化导读','食品营养学','中国近现代史',
  '古代文学名著欣赏','古典文学经典解读','唐诗宋词欣赏','现代文学发展与作家评析',
  '计算机理论','中国传统道德与伦理','微观经济学','中华传统文化与当代生活',
  '大学生职业技能','中国古代建筑欣赏','中国戏曲与舞蹈艺术',
  '大学英语创新','中国民间信仰与风俗','大学物理',
])
let selectedOptions = ref([])
// 是否显示评分
let isLoading = ref(!isShow.value)
watch(isShow, (newValue) => {
  if(newValue === false)
  isLoading.value = !newValue
})
onMounted(async() => {
  if (userStore.userInterest) {
    isShow.value = false
    let res = await getCoursesList(selectedOptions.value)
    courses.value = res.data
    isLoading.value = false
  }
})
// 提交兴趣
async function submit() {
  console.log(selectedOptions.value.length)
  isShow.value = false
  let res = await getCoursesList(selectedOptions.value)
  courses.value = res.data
  isLoading.value = false
  localStorage.setItem('userInterest',true)
}
// 已选兴趣数量
let selectedNum = computed(() => {
  return selectedOptions.value.length
})
// 子组件刷新事件
async function handleRefresh() {
  // courses.value = await getCoursesList()
  let res = await getCoursesList(selectedOptions.value)
  console.log('xin')
  courses.value = res.data
}

</script>

<style lang="scss" scoped>
.interest_container{
  position: fixed;
  top: 0px;
  width: calc(100% - 60px);
  // width: 88%;
  height: 100%;
  // overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  .title {
    // margin-top: 50px;
    width: 100%;
    height: 50px;
    padding: 7px;
    // background-color: #687ce8;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .interest {
    width: 90%;
    height: 78%;
    margin: 10px 5px;
    padding: 8px;
    border-radius: 10px;
    border: solid 2px rgb(19, 83, 244);
    overflow: auto;
  /* 自定义复选框的外观 */
    .checkbox_button {
      display: inline-block;
      position: relative;
      height: 30px;
      line-height: 30px;
      margin: 10px 5px;
      padding: 0 8px;
      border: solid 1px rgb(193, 179, 179);
      border-radius: 15px;
      color: #a89f9f;
      background-color: white;
      cursor: pointer;

      input[type="checkbox"] {
        display: none;
      }
      // sass父类选择器和css父级选择器
      &:has(input[type="checkbox"]:checked) {
        background: linear-gradient(to right, rgb(4, 28, 252), rgb(139, 143, 251));
        color: #fff;
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 35px;
    width: 70%;
    height: 40px;
    border: solid 1px transparent;
    border-radius: 20px;
    color: #fff;
    background: linear-gradient(to right, rgb(19, 16, 174), rgb(132, 116, 222));
    // background: linear-gradient(to left, rgb(255,129,3), rgb(250,190,34));
    cursor: pointer;
  }
  .btn_inactive {
    background: #b1aeae;
    cursor: auto;
  }
}

</style>
