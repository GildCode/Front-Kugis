<template>
  <div>
    <main>
      <Section title="PELICULAS RECOMENDADAS">
        <Slider :items="slider1" @item-click="handleMovieClick" />
      </Section>

      <Section title="SERIES RECOMENDADAS">
        <Slider :items="series1" @item-click="handleSeriesClick" />
      </Section>

      <Section title="DESCUBRIR">
        <Slider :items="descubrir" @item-click="handleMovieClick" />
      </Section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // ✅ Importamos el router
import Section from '../components/Section.vue'
import Slider from '../components/Slider.vue'
import axios from 'axios'

const router = useRouter() // ✅ Lo usamos

// Referencias para cada slider
const slider1 = ref([])
const series1 = ref([])
const descubrir = ref([])

onMounted(async () => {
  try {
    // Cargar todo en paralelo
    const [peliculasRes, seriesRes, descubrirRes] = await Promise.all([
      axios.get('https://kugis-production.up.railway.app/api/Ptrending'),
      axios.get('https://kugis-production.up.railway.app/api/Strending'),
      axios.get('https://kugis-production.up.railway.app/api/Descubrir'),
    ])

    slider1.value = peliculasRes.data
    series1.value = seriesRes.data
    descubrir.value = descubrirRes.data
  } catch (error) {
    console.error('Error al cargar los datos:', error)
  }
})

// ✅ Manejo del click en las carátulas
const handleMovieClick = (item) => {
  router.push({ name: 'MovieDetail', params: { id: item.id } })
}
const handleSeriesClick = (item) => {
  router.push({ name: 'SeriesDetail', params: { id: item.id } })
}
</script>
