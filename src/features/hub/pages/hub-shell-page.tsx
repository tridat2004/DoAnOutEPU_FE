import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  ClipboardList,
  FlaskConical,
  History,
  LayoutGrid,
  Settings,
  UserCircle2,
  Users,
  X,
} from 'lucide-react'

export function HubShellPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="grid min-h-screen grid-cols-[276px_minmax(0,1fr)]">
        <aside className="border-r border-slate-200 bg-white px-6 py-8">
          <div>
            <p className="text-lg font-semibold text-slate-900">Cài đặt cá nhân</p>
          </div>

          <nav className="mt-6 space-y-1">
            <HubNavLink
              to="/hub/profile-display"
              label="Hồ sơ và hiển thị"
              icon={<UserCircle2 size={18} />}
            />
            <HubNavLink
              to="/hub/activity"
              label="Hoạt động"
              icon={<History size={18} />}
            />
            <HubNavLink
              to="/hub/cards"
              label="Thẻ"
              icon={<ClipboardList size={18} />}
            />
            <HubNavLink
              to="/hub/workspace-settings"
              label="Cài đặt"
              icon={<Settings size={18} />}
            />
            <HubNavLink
              to="/hub/labs"
              label="Labs"
              icon={<FlaskConical size={18} />}
            />
          </nav>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <p className="text-lg font-semibold text-slate-900">Không gian làm việc</p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                T
              </div>
              <span className="font-medium text-slate-800">Trello Không gian làm việc</span>
            </div>

            <nav className="mt-5 space-y-1">
              <HubNavLink
                to="/hub/boards"
                label="Bảng"
                icon={<LayoutGrid size={18} />}
              />
              <HubNavLink
                to="/hub/members"
                label="Thành viên"
                icon={<Users size={18} />}
              />
              <HubNavLink
                to="/hub/workspace-settings"
                label="Cài đặt"
                icon={<Settings size={18} />}
              />
            </nav>
          </div>
        </aside>

        <main className="relative px-10 py-10">
          <button
            onClick={() => navigate('/hub/boards')}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <X size={20} />
          </button>

          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

function HubNavLink({
  to,
  label,
  icon,
}: {
  to: string
  label: string
  icon: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
          isActive
            ? 'border border-blue-400 bg-blue-50 text-blue-700'
            : 'text-slate-700 hover:bg-slate-50'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}