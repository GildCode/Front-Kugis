import { createRouter, createWebHistory } from 'vue-router'
import SearchMoviesView from '../views/SearchMoviesView.vue'
// Vistas (lazy loading)
const HomeView = () => import('../views/HomeView.vue')
const MoviesView = () => import('../views/MoviesView.vue')
const SeriesView = () => import('../views/Series.View.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  {
    path: '/movies',
    name: 'movies',
    component: MoviesView,
  },
  {
    path: '/series',
    name: 'series',
    component: SeriesView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchMoviesView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
