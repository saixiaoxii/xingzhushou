<template>
  <div class="container">
    <div class="title_container">
      <h1 class="title">精品课程推荐</h1>
      <el-tooltip content="点我刷新" placement="top">
        <SvgIcon @click="coursesRefresh" class="refresh" name="refresh" width="30px" height="30px" color="blue"/>
      </el-tooltip>
    </div>
    <!-- 课程卡片 -->
    <div v-for="item in courses" :key="item.name" class="course_card">
      <a :href="item.url"  target="_blank" id="course">
        <img :src="item.picture" alt="" />
        <span>{{ item.name }}</span>
      </a>
      <div class="bubble"></div> <!-- Example of a dynamic element -->
    </div>
    <!-- 评价卡片 -->
    <div v-if="showRating" class="rate">
      <div class="text">请你为当前观看的课程进行评价</div>
      <el-rate 
        v-model="rateValue" 
        allow-half 
        size="large"
        :max="5"
        @change="rate"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import { scoreCourse } from '../../api/index'

const props = defineProps({
  courses: {
    require: true,
  },
  // isRating: {
  //   require: true
  // }
})


// 课程评价
let showRating = ref(true)
let rateValue = ref()

async function rate() {
  await scoreCourse({ score: rateValue.value })
  console.log(rateValue.value)
  setTimeout(() => {
    showRating.value = false
  },500)
}
function closeRate() {
  showRating.value = false
}

// 刷新推荐课程
const emit = defineEmits(['refreshCourses'])
function coursesRefresh() {
  emit('refreshCourses')
}

onMounted(() => {
  setTimeout(() => {
    showRating.value = true
  }, 1000);
})
</script>

<style lang="scss" scoped>
.container {
  // position: relative;
  padding: 15px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  overflow-y: auto;
  background: linear-gradient(45deg, #a47ed1, #6772e5); /* 加重的蓝紫色渐变背景 */

  .title_container {
    position: relative;
    
    .refresh {
      position: absolute;
      top: 10px;
      right: -52px;
      cursor: pointer;
    }
    .title {
      margin: 10px 0;
      position: relative;
      color: #fff;
      letter-spacing: 3px;
      font-size: 25px;
      font-weight: 700;
      font-family: 'Montserrat';

      &::after {
        content: '精品课程推荐';
        position: absolute;
        left: 0;
        color: #000;
        // transform: translate(-47px, 22px) scale(0.5) skew(50deg);
        transform: translate(-17px, 1px) scale(1) skew(50deg);
        z-index: -1;
        // filter: blur(5px);
        -webkit-mask: linear-gradient(transparent, #000)
      }
    }
  }
  
  .course_card {
    width: 250px;
    // height: 180px;
    margin: 10px 0;
    background-color: #fff;
    transition: .3s;

    #course {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: black;
      img {
        width: 70%;
      }
      span:hover {
        color: rgba(0, 0, 255, 0.599);
        // color: rgba(103, 114, 229, 0.8); /* 加重的蓝色悬停文本颜色 */
        transition: .4s;
        // text-decoration: underline;
      }
    }
  }
  .course_card:hover {
    // box-shadow: 0 0 10px rgb(21, 148, 190);
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.3); /* 浅蓝色阴影 */
    // box-shadow: 0 0 10px rgba(103, 114, 229, 0.3); /* 加重的蓝色阴影 */
    transform: scale(1.1);
  }

  .course_card:hover .bubble {
    position: absolute;
    width: 15px;
    height: 15px;
    // background-color: #ff7e5f;
    background-color: #90a4fc; /* 蓝紫色气泡 */
    // background-color: #6772e5; /* 加重的蓝紫色气泡 */
    border-radius: 50%;
    animation: move-bubble 2s infinite;
  }
  @keyframes move-bubble {
    0% { top: 15px; left: 0; }
    50% { top: 0px; left: 15px; }
    100% { top: 15px; left: 0; }
  }

  .rate {
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // transform: translate(-51.5%,-50%);
    margin-top: 20px;
    width: 240px;
    height: 100px;
    background-color: #f3eded;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-around;
    // padding: 0px 15px;
    border-radius: 7px;
    box-shadow: black 0 0 20px ;
    
    .text {
      font-size: 14px;
      color: #393535;
      padding: 20px 0 10px;
    }
    .close_rate {
      position: absolute;
      top: 5px;
      right: 5px;
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
}
</style>
