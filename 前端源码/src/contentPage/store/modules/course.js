import { defineStore } from 'pinia'
import { getCourses } from '@/api'

const useCoursetore = defineStore('Course', {
  state: () => {
    return {
      courses: []
    }
  },
  actions: {
    async getCourse() {
      this.courses = await getCourses()
    }
  }
})

export default useCoursetore