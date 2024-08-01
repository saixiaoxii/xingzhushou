<template>
  <div class="view">
    <!-- <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <sideBar></sideBar>
</template>

<script setup>
import sideBar from './views/sidebar/index.vue'
</script>

<style lang="scss">
.view{
  position: relative;
  left: 0;
  top: 0;
  width: calc(100% - 60px);
  height: 100vh;
  // z-index: 100;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
