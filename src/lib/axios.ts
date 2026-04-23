import axios from 'axios'
import { useAuthStore } from '../features/auth/store/auth-store'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // tự động gửi cookie mỗi request
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let pendingQueue: Array<{ resolve: () => void; reject: (err: unknown) => void }> = []

function processQueue(error: unknown) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve()
  })
  pendingQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error?.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error)
    }

    originalRequest._retry = true
    if (isRefreshing) {
      return new Promise<void>((resolve, reject) => {
        pendingQueue.push({ resolve, reject })
      })
        .then(() => api(originalRequest))
        .catch((err) => Promise.reject(err))
    }

    isRefreshing = true

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      )

      processQueue(null)
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError)
      useAuthStore.getState().clearAuth()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)