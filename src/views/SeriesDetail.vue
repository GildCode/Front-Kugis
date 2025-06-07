<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const movie = ref(null)
const loading = ref(false)
const error = ref(null)
const noTrailerAvailable = ref(false)
const imageBaseUrl = 'https://image.tmdb.org/t/p/w1280'
const videoUrl = ref('')

const fetchMovieDetails = async () => {
  loading.value = true
  error.value = null
  noTrailerAvailable.value = false
  videoUrl.value = ''

  try {
    // Llamadas paralelas para mejor rendimiento
    const [detailsRes, videosRes] = await Promise.all([
      axios.get(`https://kugis-production.up.railway.app/api/view/Sdetails?id=${route.params.id}`),
      axios.get(`https://kugis-production.up.railway.app/api/view/Svideos?id=${route.params.id}`),
    ])

    // Procesar detalles principales
    movie.value =
      typeof detailsRes.data === 'string' ? JSON.parse(detailsRes.data) : detailsRes.data

    if (!movie.value || !movie.value.id) {
      throw new Error('No se encontraron datos válidos para esta película')
    }

    // Procesar videos
    const videosData =
      typeof videosRes.data === 'string' ? JSON.parse(videosRes.data) : videosRes.data

    // Buscar tráiler (soporta YouTube y Vimeo)
    const trailer = videosData.results?.find(
      (v) => v.type === 'Trailer' && (v.site === 'YouTube' || v.site === 'Vimeo'),
    )

    if (trailer?.key) {
      videoUrl.value =
        trailer.site === 'YouTube'
          ? `https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0`
          : `https://player.vimeo.com/video/${trailer.key}`
    } else {
      noTrailerAvailable.value = true
    }
  } catch (err) {
    console.error('Error:', err)
    error.value =
      err.response?.data?.message || err.message || 'Error al cargar los detalles de la película'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

onMounted(fetchMovieDetails)
</script>

<template>
  <div class="movie-detail">
    <!-- Botón de volver mejorado -->
    <button @click="goBack" class="back-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>
      Volver
    </button>

    <div v-if="loading" class="loading-container">
      <div class="skeleton-loading poster-skeleton"></div>
      <div class="skeleton-loading title-skeleton"></div>
      <div class="skeleton-loading text-skeleton"></div>
      <div class="skeleton-loading text-skeleton"></div>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
      <button @click="fetchMovieDetails" class="retry-button">Reintentar</button>
    </div>

    <template v-else-if="movie">
      <div class="movie-header">
        <h1>{{ movie.title || movie.original_title }}</h1>
        <div class="movie-meta">
          <span>{{ new Date(movie.release_date).getFullYear() }}</span>
          <span> • </span>
          <span>{{ movie.runtime }} minutos</span>
          <span> • </span>
          <span>{{ movie.vote_average }}/10</span>
        </div>
      </div>

      <div class="movie-content">
        <div class="poster-section">
          <img
            :src="movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '/placeholder.jpg'"
            :alt="movie.title"
            class="poster"
            loading="lazy"
          />
        </div>

        <div class="info-section">
          <div class="genres" v-if="movie.genres">
            <span v-for="genre in movie.genres" :key="genre.id" class="genre-tag">
              {{ genre.name }}
            </span>
          </div>

          <h3>Sinopsis</h3>
          <p class="overview">{{ movie.overview || 'No hay sinopsis disponible.' }}</p>

          <div class="crew" v-if="movie.credits">
            <div v-if="movie.credits.crew.find((p) => p.job === 'Director')">
              <h4>Director</h4>
              <p>{{ movie.credits.crew.find((p) => p.job === 'Director').name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="video-section" v-if="videoUrl">
        <h2>Tráiler</h2>
        <div class="video-container">
          <iframe
            width="100%"
            height="500"
            :src="videoUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            title="Tráiler de la película"
          ></iframe>
        </div>
      </div>

      <div v-else-if="noTrailerAvailable" class="no-video">
        <p>No hay tráiler disponible para esta Serie</p>
        <button @click="fetchMovieDetails" class="retry-button">Reintentar</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.movie-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: white;
  background-color: #333;
  min-height: 100vh;
  position: relative;
}

/* Botón de volver */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  margin: 0 0 20px 0;
  background-color: #5c348c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  position: sticky;
  top: 20px;
  z-index: 10;
}

.back-button:hover {
  background-color: #5c348c;
  transform: translateX(-3px);
}

.back-button svg {
  transition: transform 0.3s ease;
}

.back-button:hover svg {
  transform: translateX(-3px);
}

/* Estructura principal */
.movie-header {
  margin-bottom: 30px;
}

.movie-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  line-height: 1.2;
}

.movie-meta {
  color: #aaa;
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.movie-content {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

/* Sección del póster */
.poster-section {
  flex: 0 0 300px;
}

.poster {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.poster:hover {
  transform: scale(1.03);
}

/* Sección de información */
.info-section {
  flex: 1;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.genre-tag {
  background-color: #5c348c;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.overview {
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #ddd;
}

/* Sección de video */
.video-section {
  margin-top: 40px;
}

.video-section h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 10px;
  background: #000;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Estados */
.loading-container {
  display: grid;
  gap: 20px;
  margin-top: 30px;
}

.skeleton-loading {
  background: #444;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

.poster-skeleton {
  height: 450px;
  width: 300px;
}

.title-skeleton {
  height: 40px;
  width: 70%;
}

.text-skeleton {
  height: 20px;
  width: 100%;
}

.error-container,
.no-video {
  background-color: #222;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
  margin-top: 40px;
}

.error-container p,
.no-video p {
  margin-bottom: 15px;
  color: white;
  font-size: 1.1rem;
}

.retry-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #5c348c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.retry-button:hover {
  background-color: #7e5ab3;
}

/* Responsive */
@media (max-width: 768px) {
  .movie-content {
    flex-direction: column;
  }

  .poster-section {
    flex: 0 0 auto;
    text-align: center;
  }

  .poster {
    max-width: 250px;
  }

  .movie-header h1 {
    font-size: 2rem;
  }

  .video-section h2 {
    font-size: 1.5rem;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
