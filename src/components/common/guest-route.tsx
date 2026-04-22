import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../features/auth/store/auth-store'

export function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isBootstrapping = useAuthStore((state) => state.isBootstrapping)

  if (isBootstrapping) {
    return <div className="p-6">Loading session...</div>
  }

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />
  }

  return <Outlet />
}