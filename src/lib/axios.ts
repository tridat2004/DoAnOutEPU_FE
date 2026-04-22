import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

let isRefreshing = false
let pendingQueue: Array<() => void> = []

async function refreshAccessToken() {
  try {
    const response = await api.post('/auth/refresh')
    return response.data
  } catch (error) {
    console.error('Token refresh failed:', error)
    throw error
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/register') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true

      if (isRefreshing) {
        await new Promise<void>((resolve) => {
          pendingQueue.push(resolve)
        })

        return api(originalRequest)
      }

      isRefreshing = true

      try {
        await refreshAccessToken()

        pendingQueue.forEach((resolve) => resolve())
        pendingQueue = []

        return api(originalRequest)
      } catch (refreshError) {
        pendingQueue = []
        console.error('Failed to refresh token, redirecting to login')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)