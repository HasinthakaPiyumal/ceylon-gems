import axios from 'axios'
import type { AxiosResponse } from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface UserProfile {
  id: string
  name: string
  email: string
}

export const authApi = {
  login: (data: LoginRequest): Promise<AxiosResponse<AuthResponse>> =>
    apiClient.post('/auth/login', data),
  
  signup: (data: SignupRequest): Promise<AxiosResponse<{ message: string }>> =>
    apiClient.post('/auth/signup', data),
  
  getProfile: (): Promise<AxiosResponse<UserProfile>> =>
    apiClient.get('/auth/me'),
}