
<template>
  <input
    type="text"
    placeholder="Buscador"
    class="search"
    v-model="query"
    @keydown.enter="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

const handleSearch = () => {
  if (query.value.trim() !== '') {
    router.push({ name: 'search', query: { query: query.value } })
  }
}
</script>

<style scoped>
.search {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
  width: 200px;
}
</style>
