import { NavLink, Outlet, useNavigate } from 'react-router-dom'
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
      // ignore
    } finally {
      clearAuth()
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Team workspace
            </p>
            <h1 className="text-lg font-semibold text-slate-900">Project Management</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">
                {user?.fullName || user?.userName}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Dang xuat
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <nav className="space-y-2">
            <NavItem to="/projects" label="Projects" />
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
          isActive
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-50'
        }`
      }
    >
      {label}
    </NavLink>
  )
}