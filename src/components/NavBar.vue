<template>
  <nav class="navbar">
    <div class="logo">KUGIS</div>
    <SearchBar />
    <div class="menu-icons">
      <button>⬜</button>
      <button>☰</button>
    </div>
  </nav>
</template>

<script setup>
import SearchBar from './SearchBar.vue'
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #222;
  color: white;
}
.logo {
  border: 2px solid white;
  padding: 5px 10px;
}
.menu-icons button {
  margin-left: 10px;
  font-size: 20px;
}
</style>
