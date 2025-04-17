import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080/api', // Asegúrate que esta URL coincida con tu backend
  timeout: 10000,
})

export default http
