<template>
  <nav class="navbar">
    <!-- Logo -->
    <router-link to="/" class="logo-container">
      <img src="../assets/LOGOKUGIS.ico" alt="Logo KUGIS" class="logo" />
    </router-link>

    <!-- Buscador -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar películas..."
        class="search-input"
        @keydown.enter="performSearch"
      />
      <button class="search-button" @click="performSearch" aria-label="Buscar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5c348c">
          <path
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </div>

    <!-- Menú -->
    <div class="menu-wrapper">
      <button class="menu-button" @click="toggleMenu" aria-label="Menú">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      <!-- Menú desplegable -->
      <transition name="slide-fade">
        <div v-if="isMenuOpen" class="dropdown-menu">
          <router-link to="/mlatest" class="menu-item" @click="toggleMenu">
            Cartelera Actual Películas
          </router-link>
          <router-link to="/slatest" class="menu-item" @click="toggleMenu">
            Cartelera Actual Series
          </router-link>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const isMenuOpen = ref(false)

const performSearch = () => {
  if (searchQuery.value.trim() !== '') {
    router.push({
      name: 'search',
      query: { query: searchQuery.value },
    })
    searchQuery.value = ''
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #222;
  color: white;
  height: 60px;
  gap: 20px;
  position: relative;
  z-index: 1000;
}

/* Logo */
.logo-container {
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1001;
}

.logo {
  height: 40px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

/* Buscador */
.search-container {
  display: flex;
  flex-grow: 1;
  max-width: 600px;
  position: relative;
  margin: 0 20px;
}

.search-input {
  padding: 10px 45px 10px 15px;
  border-radius: 25px;
  border: 2px solid #444;
  width: 100%;
  font-size: 14px;
  outline: none;
  background: #333;
  color: white;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #5c348c;
  box-shadow: 0 0 0 2px rgba(92, 52, 140, 0.3);
}

.search-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button svg {
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;
}

.search-button:hover svg {
  transform: scale(1.1);
  fill: #7d5cb8;
}

/* Menú y botón */
.menu-wrapper {
  position: relative;
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.menu-button svg {
  width: 24px;
  height: 24px;
}

.menu-button:hover {
  opacity: 0.8;
}

/* Menú desplegable */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: #333;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  padding: 8px 0;
  z-index: 1002;
}

.menu-item {
  display: block;
  padding: 10px 16px;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: #5c348c;
  color: white;
}

/* Animaciones */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 10px 15px;
    gap: 10px;
  }

  .search-container {
    margin: 0 10px;
    max-width: 100%;
  }

  .search-input {
    padding: 8px 40px 8px 12px;
    font-size: 13px;
  }

  .search-button svg {
    width: 18px;
    height: 18px;
  }

  .logo {
    height: 35px;
  }

  .menu-button svg {
    width: 20px;
    height: 20px;
  }

  .dropdown-menu {
    min-width: 180px;
  }
}

@media (max-width: 480px) {
  .search-input {
    padding: 6px 35px 6px 10px;
    font-size: 12px;
  }

  .search-button {
    right: 8px;
  }

  .search-button svg {
    width: 16px;
    height: 16px;
  }

  .dropdown-menu {
    min-width: 160px;
    font-size: 14px;
  }
}
</style>
