import axios from 'axios'

const http = axios.create({
  baseURL: 'https://kugis-production.up.railway.app/api', // Asegúrate que esta URL coincida con tu backend
  timeout: 10000,
})

export default http
