<template>
  <Swiper
    :modules="[Navigation, Pagination]"
    :slides-per-view="5"
    :space-between="20"
    :loop="true"
    navigation
    pagination
    class="mySwiper"
  >
    <SwiperSlide v-for="(item, index) in items" :key="index">
      <div class="card">
        <img :src="getImage(item.poster_path || item.backdrop_path)" :alt="item.title" />
        <p>{{ item.title || item.name }}</p>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineProps({
  items: Array,
})

// Si el path es solo la ruta que devuelve la API (ej. `/abc123.jpg`)
const getImage = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : 'https://via.placeholder.com/200x300?text=Sin+Imagen'
}
</script>

<style scoped>
.card {
  background: #222;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  color: white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.card img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain; /* ← para no recortar nada */
  border-radius: 10px;
  background-color: #000; /* si quieres fondo negro para rellenar */
}
</style>
