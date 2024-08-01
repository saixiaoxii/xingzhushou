<template>
  <div class="navigation">
    <ul >
      <router-link :to="item.path" v-for="item in showRoutes" :key="item.path">
      <li :class="isActive(item)">
        <el-tooltip :content="item.meta.title" placement="left">
          <svg style="width: 40px; height: 40px;">
            <use :xlink:href="'#icon-' + item.meta.icon" :fill="iconColor(item)" width="40" height="40"></use>
          </svg>
        </el-tooltip>
      </li>
    </router-link>
    </ul>
    <div class="user">
      <SvgIcon name="user1" width="30px" height="30px" color="blue"/>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
let route = useRoute()
let router = useRouter()
let routes = router.options.routes[0].children

let showRoutes = computed(() => {
  return routes.filter((item) => {
    return item.meta.isHidden === false
  })
})
function isActive(item) {
  return item.path === route.path ? 'active' : '';
}
function iconColor(item) {
  return item.path === route.path ? 'rgb(103,64,232)' : 'grey';
}
</script>

<style lang="scss">

.navigation {
  position: fixed;
  right: 0;
  top: 0;
  background: rgb(236,236,238);
  width: 60px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  // transition: 0.5s;
  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40%;
    justify-content: space-around;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
      height: 60px;
      // margin: 20px 0;
      border-radius: 12px;
      border: 4px solid transparent;
      transition: .3s;
    }
    li.active {
      transform: translateX(-15px);
      background: rgb(255,255,255);
      border-top-right-radius: 40%;
      border-bottom-right-radius: 40%;
    }
    li.active::after{
      content: '';
      position: absolute;
      top: 18px;
      right: -18px;
      width: 12px;
      height: 12px;
      border: 6px solid rgb(187, 0, 255);
      border-radius: 50%;
    }
    li:hover {
      background-color: lightgrey;
    }
  }
  .user {
    position: absolute;
    bottom: 40px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgb(182, 210, 211);
    cursor: pointer;
  }
}
</style>
