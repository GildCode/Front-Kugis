<template>
  <div class="swiper-container">
    <Swiper
      :modules="[Navigation]"
      :slides-per-view="slidesPerView"
      :space-between="20"
      :loop="true"
      :navigation="{
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      }"
      :pagination="{ clickable: true }"
      class="mySwiper"
      @swiper="onSwiper"
      :key="swiperKey"
    >
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <div class="card" @click="$emit('item-click', item)">
          <img
            :src="getImage(item.poster_path || item.backdrop_path)"
            :alt="item.title || item.name"
          />
          <p>{{ item.title || item.name }}</p>
        </div>
      </SwiperSlide>

      <!-- Controles de navegación personalizados -->
      <div class="custom-navigation">
        <div class="custom-prev">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#800080">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
          </svg>
        </div>
        <div class="custom-next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#800080">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </div>
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { ref, watch, computed, onMounted } from 'vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['item-click'])

const swiperInstance = ref(null)
const swiperKey = ref(0) // Clave para forzar el re-renderizado del componente

// Responsive slides per view
const slidesPerView = computed(() => {
  const width = window.innerWidth
  if (width < 640) return 2
  if (width < 1024) return 3
  return 5
})

const getImage = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : 'https://via.placeholder.com/200x300?text=Sin+Imagen'
}

const onSwiper = (swiper) => {
  swiperInstance.value = swiper

  // Inicializa la navegación inmediatamente si los items ya están cargados
  if (props.items && props.items.length > 0) {
    initNavigation()
  }
}

const initNavigation = () => {
  setTimeout(() => {
    if (swiperInstance.value) {
      swiperInstance.value.navigation.init()
      swiperInstance.value.navigation.update()
    }
  }, 100) // Pequeño tiempo de espera para asegurar que el DOM está listo
}

// Escucha cambios en los items para reinicializar el swiper cuando los datos estén disponibles
watch(
  () => props.items,
  (newItems) => {
    if (newItems && newItems.length > 0) {
      swiperKey.value += 1 // Fuerza el re-renderizado
      setTimeout(initNavigation, 100)
    }
  },
  { deep: true },
)

// También intenta inicializar después del montaje
onMounted(() => {
  window.addEventListener('resize', () => {
    swiperKey.value += 1 // Re-render en cambio de tamaño de pantalla
  })

  if (props.items && props.items.length > 0) {
    initNavigation()
  }
})
</script>

<style scoped>
.swiper-container {
  position: relative;
}

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
  object-fit: contain;
  border-radius: 10px;
  background-color: #000;
}

/* Estilos para navegación personalizada */
.custom-navigation {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;
}

.custom-prev,
.custom-next {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  transition: all 0.3s ease;
}

.custom-prev:hover,
.custom-next:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.custom-prev svg,
.custom-next svg {
  width: 24px;
  height: 24px;
}

.custom-prev {
  margin-left: 10px;
}

.custom-next {
  margin-right: 10px;
}

/* Ajustes para móviles */
@media (max-width: 768px) {
  .custom-prev,
  .custom-next {
    width: 30px;
    height: 30px;
  }

  .custom-prev svg,
  .custom-next svg {
    width: 18px;
    height: 18px;
  }
}
</style>
