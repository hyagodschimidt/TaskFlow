import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

if (!apiUrl) {
  throw new Error('VITE_API_URL is not defined')
}

export const httpClient = axios.create({
  baseURL: apiUrl,
})
