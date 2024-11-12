import { createRouter, createWebHistory } from 'vue-router'
import StoryList from '../components/StoryList.vue'
import StoryDetail from '../components/StoryDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: StoryList
  },
  {
    path: '/story/:id',
    name: 'story',
    component: StoryDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router