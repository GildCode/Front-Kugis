<script setup>
import { useRoute, useRouter } from 'vue-router' // Añade useRouter
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter() // Instancia del router
const searchQuery = ref(route.query.query || '')
const movies = ref([])
const loading = ref(false)
const error = ref(null)
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

const fetchMovies = async () => {
  if (!searchQuery.value) return

  loading.value = true
  error.value = null

  try {
    console.log(`Realizando búsqueda con: ${searchQuery.value}`)

    const response = await axios.get(
      'https://kugis-production.up.railway.app/api/search/searchcontent',
      {
        params: { nameContent: searchQuery.value },
      },
    )

    console.log('Respuesta completa:', response.data)

    if (response.data && response.data.results && Array.isArray(response.data.results)) {
      movies.value = response.data.results
    } else if (Array.isArray(response.data)) {
      movies.value = response.data
    } else if (response.data && typeof response.data === 'object') {
      movies.value = [response.data]
    } else {
      movies.value = []
      console.error('Formato de respuesta no reconocido:', response.data)
    }

    console.log('Películas procesadas:', movies.value)
  } catch (err) {
    console.error('Error al cargar películas:', err)
    error.value = 'Error al cargar películas: ' + (err.message || 'Error desconocido')
  } finally {
    loading.value = false
  }
}

// Función para navegar al detalle de la película
const goToMovieDetail = (movieId) => {
  router.push({ name: 'MovieDetail', params: { id: movieId } })
}

onMounted(fetchMovies)

watch(
  () => route.query.query,
  (newQuery) => {
    searchQuery.value = newQuery || ''
    fetchMovies()
  },
)
</script>

<template>
  <div class="search-movies-view">
    <h1>Resultados de búsqueda para: "{{ searchQuery }}"</h1>

    <div v-if="loading" class="loading">Cargando películas...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="movies.length > 0" class="movies-container">
      <!-- Elimina el div duplicado y deja solo este -->
      <div v-for="movie in movies" :key="movie.id" class="card" @click="goToMovieDetail(movie.id)">
        <!-- Imagen de la película -->
        <img
          v-if="movie.poster_path"
          :src="`${imageBaseUrl}${movie.poster_path}`"
          :alt="movie.title || movie.original_title"
        />
        <div v-else class="no-poster">
          <span>Sin imagen</span>
        </div>

        <!-- Información de la película -->
        <h3>{{ movie.title || movie.original_title }}</h3>
        <div class="movie-year" v-if="movie.release_date">
          {{ new Date(movie.release_date).getFullYear() }}
        </div>
        <p class="movie-overview">{{ movie.overview || 'Sin descripción disponible' }}</p>
      </div>
    </div>

    <div v-else-if="!loading" class="no-results">
      <p>No se encontraron películas para "{{ searchQuery }}".</p>
    </div>
  </div>
</template>

<!-- Tus estilos se mantienen igual -->
<style scoped>
.search-movies-view {
  text-align: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #333;
  color: white;
  min-height: 100vh;
}

h1 {
  color: white;
  margin-bottom: 30px;
}

.loading,
.error,
.no-results {
  margin: 20px 0;
  padding: 15px;
  border-radius: 10px;
}

.loading {
  background-color: #2d3748;
  color: #63b3ed;
}

.error {
  background-color: #742a2a;
  color: #fc8181;
}

.no-results {
  background-color: #744210;
  color: #f6e05e;
}

.movies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.card {
  cursor: pointer;
  background: #222;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  color: white;
  width: 250px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.card img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 10px;
  background-color: #000;
  margin-bottom: 15px;
}

.no-poster {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #666;
  border-radius: 10px;
  margin-bottom: 15px;
}

.card h3 {
  font-size: 18px;
  margin: 10px 0 5px;
  color: #fff;
}

.movie-year {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 10px;
}

.movie-overview {
  font-size: 14px;
  color: #ccc;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}
</style>
