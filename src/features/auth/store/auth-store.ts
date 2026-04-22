import { create } from 'zustand'
import type { AuthUser } from '../types/auth.types'

type AuthState = {
    user: AuthUser | null
    isAuthenticated: boolean
    isBootstrapping: boolean
    setUser: (user: AuthUser | null) => void
    setBootstrapping: (value: boolean) => void
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user : null,
    isAuthenticated: false,
    isBootstrapping: true,

    setUser: (user) => 
        set({
            user,
            isAuthenticated: !!user,
        }),
    setBootstrapping: (value) => 
        set({
            isBootstrapping: value,
        }),
    clearAuth: () => 
        set({
            user: null,
            isAuthenticated: false,
        })
}))