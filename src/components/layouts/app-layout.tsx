import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Bell,
  ChevronRight,
  ClipboardList,
  HelpCircle,
  Home,
  LayoutGrid,
  Plus,
  Search,
  Settings,
  Users,
  UserPlus,
} from 'lucide-react'
import { logoutApi } from '../../features/auth/api/auth.api'
import { useAuthStore } from '../../features/auth/store/auth-store'
import { CreateBoardModal } from '../../features/projects/components/create-project-modal'
import { InviteWorkspaceMemberModal } from '../../features/hub/components/invite-workspace-member-modal'

export function AppLayout() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const [openInviteWorkspaceModal, setOpenInviteWorkspaceModal] = useState(false)
  const [openAccountMenu, setOpenAccountMenu] = useState(false)
  const [openCreateBoard, setOpenCreateBoard] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target as Node)) {
        setOpenAccountMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  async function handleLogout() {
    try {
      await logoutApi()
    } catch {
      //
    } finally {
      clearAuth()
      navigate('/login', { replace: true })
    }
  }

  const avatarText = useMemo(() => {
    const base = user?.fullName?.trim() || user?.userName || 'U'
    return base.charAt(0).toUpperCase()
  }, [user])

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-900">
      <div className="grid min-h-screen grid-cols-[272px_minmax(0,1fr)]">
        <aside className="border-r border-slate-200 bg-white px-5 py-5">
          <Link to="/hub/home" className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <LayoutGrid size={18} />
            </div>
            <div>
              <p className="text-[28px] font-semibold tracking-tight text-slate-900">
                Trello
              </p>
            </div>
          </Link>

          <nav className="mt-8 space-y-1">
            <SidebarLink
              to="/hub/workspace-boards"
              label="Bảng"
              icon={<ClipboardList size={18} />}
            />
            <SidebarStatic
              label="Mẫu"
              icon={<Plus size={18} />}
            />
            <SidebarLink
              to="/hub/home"
              label="Trang chủ"
              icon={<Home size={18} />}
            />
          </nav>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-500">Không gian làm việc</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                T
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">
                  Trello Không gian làm việc
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <WorkspaceRowWithAction
                to="/hub/workspace-boards"
                label="Bảng"
                icon={<ClipboardList size={16} />}
              />
              <WorkspaceMembersRow
                onOpenInvite={() => setOpenInviteWorkspaceModal(true)}
                onGoMembers={() => navigate('/hub/members')}
              />
              <WorkspaceRowWithAction
                to="/hub/workspace-settings"
                label="Cài đặt"
                icon={<Settings size={16} />}
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-[#f8f7ff] p-4">
            <p className="text-base font-semibold text-slate-900">Dùng thử Trello Premium</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Nhận Trình lập kế hoạch, danh sách có thể thu gọn, bảng không giới hạn, AI và hơn thế nữa!
            </p>
            <button className="mt-4 text-sm font-semibold text-blue-700 hover:underline">
              Bắt đầu dùng thử miễn phí
            </button>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_minmax(520px,760px)_1fr] items-center gap-4 px-6 py-4">
              <div />

              <div className="relative w-full">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  placeholder="Tìm kiếm"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-400"
                />
              </div>

              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => setOpenCreateBoard(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Plus size={16} />
                  Tạo mới
                </button>

                <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                  <Bell size={18} />
                </button>

                <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
                  <HelpCircle size={18} />
                </button>

                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setOpenAccountMenu((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-500 bg-white text-sm font-bold text-emerald-700"
                  >
                    {avatarText}
                  </button>

                  {openAccountMenu && (
                    <div className="absolute right-0 top-12 w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Tài khoản
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                          {avatarText}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {user?.fullName || user?.userName}
                          </p>
                          <p className="truncate text-sm text-slate-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1 border-t border-slate-200 pt-4">
                        <AccountMenuLink
                          to="/hub/profile-display"
                          label="Hồ sơ và Hiển thị"
                          onClick={() => setOpenAccountMenu(false)}
                        />
                        <AccountMenuLink
                          to="/hub/activity"
                          label="Hoạt động"
                          onClick={() => setOpenAccountMenu(false)}
                        />
                        <AccountMenuLink
                          to="/hub/cards"
                          label="Thẻ"
                          onClick={() => setOpenAccountMenu(false)}
                        />
                        <AccountMenuLink
                          to="/hub/workspace-settings"
                          label="Cài đặt"
                          onClick={() => setOpenAccountMenu(false)}
                        />
                        <AccountMenuLink
                          to="/hub/labs"
                          label="Labs"
                          onClick={() => setOpenAccountMenu(false)}
                        />
                      </div>

                      <div className="mt-4 border-t border-slate-200 pt-4">
                        <button
                          onClick={handleLogout}
                          className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="px-8 py-8">
            <div className="mx-auto max-w-[1600px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <CreateBoardModal
        open={openCreateBoard}
        onClose={() => setOpenCreateBoard(false)}
      />
      <InviteWorkspaceMemberModal
        open={openInviteWorkspaceModal}
        onClose={() => setOpenInviteWorkspaceModal(false)}
      />
    </div>
  )
}

function SidebarLink({
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
        `flex items-center gap-3 rounded-2xl px-4 py-3 text-lg font-medium transition ${isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-700 hover:bg-slate-50'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}

// function SidebarSubLink({
//   to,
//   label,
//   icon,
// }: {
//   to: string
//   label: string
//   icon: React.ReactNode
// }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${isActive
//           ? 'bg-blue-50 text-blue-700'
//           : 'text-slate-700 hover:bg-slate-50'
//         }`
//       }
//     >
//       {icon}
//       <span>{label}</span>
//     </NavLink>
//   )
// }

function SidebarStatic({
  label,
  icon,
}: {
  label: string
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-lg font-medium text-slate-700 transition hover:bg-slate-50"
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function AccountMenuLink({
  to,
  label,
  onClick,
}: {
  to: string
  label: string
  onClick?: () => void
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
    >
      {label}
    </Link>
  )
}
function WorkspaceMembersRow({
  onOpenInvite,
  onGoMembers,
}: {
  onOpenInvite: () => void
  onGoMembers: () => void
}) {
  return (
    <button
      type="button"
      onClick={onGoMembers}
      className="group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Users size={16} />
        <span>Thành viên</span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onOpenInvite()
        }}
        className="rounded-md p-1.5 text-slate-500 opacity-0 transition hover:bg-slate-200 hover:text-slate-900 group-hover:opacity-100"
        title="Mời thành viên"
      >
        <UserPlus size={16} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onGoMembers()
        }}
        className="rounded-md p-1.5 text-slate-500 opacity-0 transition hover:bg-slate-200 hover:text-slate-900 group-hover:opacity-100"
        title="Xem trang thành viên"
      >
        <ChevronRight size={16} />
      </button>
    </button>
  )
}

function WorkspaceRowWithAction({
  to,
  label,
  icon,
}: {
  to: string
  label: string
  icon: React.ReactNode
}) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          navigate(to)
        }}
        className="rounded-md p-1.5 text-slate-500 opacity-0 transition hover:bg-slate-200 hover:text-slate-900 group-hover:opacity-100"
        title={`Xem trang ${label.toLowerCase()}`}
      >
        <ChevronRight size={16} />
      </button>
    </button>
  )
}