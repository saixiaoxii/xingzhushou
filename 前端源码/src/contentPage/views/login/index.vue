<template>
  <div class="login_container">
    <el-form ref="loginForms" class="login_form" :model="loginForm" :rules="rules">
      <el-form-item prop="id">
        <el-input prefix-icon="User" v-model="loginForm.id"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-button
      :loading="loading"
      class="login_btn"
      type="primary" 
      size="default" 
      @click="login" 
      color="blue" 
      :disabled="loginForm.id&&loginForm.password ? false : true">登录
    </el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import useUserStore from '../../store/modules/user'

let userStore = useUserStore()
//获取el-form组件
let loginForms = ref()
//收集账号与密码的数据
let loginForm = reactive({ id: '123456', password: '123456' })
//定义变量控制按钮加载效果
let loading = ref(false)
let router = useRouter()

// 表单校验规则
const rules = {
  id: [
    { required: true, min: 5, max: 11, message: '账号长度至少五位', trigger: 'blur' }
  ],
  password: [
  { required: true, min: 6, max: 11, message: '密码长度至少六位', trigger: 'change' }
  ]
}
//登录按钮回调
async function login() {
  //保证全部表单校验通过再发请求
  await loginForms.value.validate()
  //加载效果：开始加载
  loading.value = true
  try {
    //保证登录成功
    await userStore.userLogin(loginForm)
    router.push({ path: '/' })
    //登陆成功加载效果消失
    loading.value = false
  } catch (error) {
    // console.log(error)
    //登陆失败加载效果消失
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login_container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('../../assets/images/logo.png') no-repeat 50% top;
  .login_btn {
    width: 60%;
    border-radius: 15px;
  }
}
</style>
