import { createRouter, createWebHistory } from 'vue-router'

// Todas las vistas con lazy loading
const HomeView = () => import('../views/HomeView.vue')
const MoviesView = () => import('../views/MlatestView..vue')
const SeriesView = () => import('../views/SeriesDetail.vue')
const MovieDetail = () => import('../views/MovieDetail.vue')
const SearchMoviesView = () => import('../views/SearchMoviesView.vue')
const SeriesDetail = () => import('../views/SeriesDetail.vue')
const MlatestView = () => import('../views/MlatestView..vue')
const SlatestView = () => import('../views/SlatestView.vue')
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
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true,
  },
  {
    path: '/series/:id',
    name: 'SeriesDetail',
    component: SeriesDetail,
    props: true,
  },
  {
    path: '/mlatest',
    name: 'mlatest',
    component: MlatestView,
  },
  {
    path: '/slatest',
    name: 'slatest',
    component: SlatestView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
