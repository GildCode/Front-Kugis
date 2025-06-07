<template>
  <div id="app">
    <Navbar />

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style>
/* Reset y estilo base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #121212;
  color: white;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}

/* Aquí puedes incluir tu media query global si deseas */
@media screen and (max-width: 768px) {
  .main-content {
    padding: 10px;
  }
}
</style>
