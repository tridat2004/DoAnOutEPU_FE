import { api } from '../../../lib/axios'
import type {
  ApiResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from '../types/auth.types'

export async function loginApi(payload: LoginPayload) {
  const response = await api.post<ApiResponse<AuthUser>>('/auth/login', payload)
  return response.data
}

export async function registerApi(payload: RegisterPayload){
    const response = await api.post<ApiResponse<AuthUser>>('/auth/register', payload)
    return response.data
}

export async function getMeApi(){
    const response = await api.get<ApiResponse<AuthUser>>('/auth/me')
    return response.data
}

export async function logoutApi(){
    const response = await api.post<ApiResponse<null>>('/auth/logout')
    return response.data
}

export async function refreshApi(){
    const response = await api.post('/auth/refresh')
    return response.data
}