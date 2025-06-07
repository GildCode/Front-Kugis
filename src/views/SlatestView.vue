<template>
  <div class="slatest-view">
    <h1>Cartelera Actual de Series</h1>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="series-grid">
      <div v-for="series in tvSeries" :key="series.id" class="series-card">
        <router-link :to="`/series/${series.id}`" class="series-link">
          <img
            v-if="series.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${series.poster_path}`"
            :alt="series.name"
            class="series-poster"
          />
          <div v-else class="poster-placeholder">No image available</div>
          <h3 class="series-title">{{ series.name }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tvSeries = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://kugis-production.up.railway.app/api/latest/Slatest')
    if (!response.ok) throw new Error('Error al cargar las series')
    const data = await response.json()
    tvSeries.value = data.results || data // Ajuste para diferentes formatos de API
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.series-card {
  background: #333;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.series-card:hover {
  transform: scale(1.05);
}

.series-link {
  text-decoration: none;
  color: white;
  display: block;
}

.series-poster {
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

.series-title {
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
