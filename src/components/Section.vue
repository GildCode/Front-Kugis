<!-- src/components/Section.vue -->
<template>
  <section class="section">
    <h2>{{ title }}</h2>
    <slot></slot>
  </section>
</template>

<script setup>
defineProps({
  title: String,
})
</script>

<style scoped>
.section {
  margin-bottom: 40px;
}

h2 {
  color: #fff;
  margin-bottom: 10px;
}
</style>
