<template>
  <div>
    <main>
      <Section title="PELICULAS RECOMENDADAS">
        <Slider :items="slider1" />
      </Section>

      <Section title="SERIES RECOMENDADAS">
        <Slider :items="series1" />
      </Section>
      <Section title="DESCUBRIR">
        <Slider :items="descubrir" />
      </Section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Section from '../components/Section.vue'
import Slider from '../components/Slider.vue'
import axios from 'axios'

const slider1 = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/Ptrending')
    slider1.value = response.data
  } catch (error) {
    console.error('Error al cargar las películas:', error)
  }
})

const series1 = ref([])
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/Strending')
    series1.value = response.data
  } catch (error) {
    console.error('Error al cargar las películas:', error)
  }
})

const descubrir = ref([])
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/Descubrir')
    descubrir.value = response.data
  } catch (error) {
    console.error('Error al cargar las películas:', error)
  }
})
</script>
