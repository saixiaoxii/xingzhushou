import { defineStore } from 'pinia'

import { login } from '../../api/index'

const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('userToken'),
      userInterest: localStorage.getItem('userInterest'),
      userName: '',
    }
  },
  actions: {
    async userLogin(data) {
      const result = await login(data)
      this.token = result.data
      // this.userInterest = result.message
      localStorage.setItem('userToken', result.data)
      // localStorage.setItem('userInterest', result.message)
      chrome.runtime.sendMessage({ type: 'login', data: this.token })
    }
  }
})

export default useUserStore