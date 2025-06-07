<template>
  <div class="mlatest-view">
    <h1>Cartelera Actual de Películas</h1>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="movies-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <router-link :to="`/movie/${movie.id}`" class="movie-link">
          <img
            v-if="movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="movie-poster"
          />
          <div v-else class="poster-placeholder">No image available</div>
          <h3 class="movie-title">{{ movie.title }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const movies = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://kugis-production.up.railway.app/api/latest/Mlatest')
    if (!response.ok) throw new Error('Error al cargar las películas')
    const data = await response.json()
    movies.value = data.results || data // Ajuste para diferentes formatos de API
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.movie-card {
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-link {
  text-decoration: none;
  color: white;
  display: block;
}

.movie-poster {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.poster-placeholder {
  width: 100%;
  height: 300px;
  background: #444;
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-title {
  padding: 10px;
  margin: 0;
  font-size: 16px;
  text-align: center;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
}
</style>
