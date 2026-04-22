import { Outlet, useNavigate } from 'react-router-dom'
import { logoutApi } from '../../features/auth/api/auth.api'
import { useAuthStore } from '../../features/auth/store/auth-store'

export function AppLayout() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  async function handleLogout() {
    try {
      await logoutApi()
    } catch {
      // bỏ qua lỗi logout phía server
    } finally {
      clearAuth()
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-lg font-semibold">Task Management</p>
            <p className="text-sm text-slate-500">
              Xin chao, {user?.fullName || user?.userName}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border px-4 py-2 text-sm font-medium"
          >
            Dang xuat
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}