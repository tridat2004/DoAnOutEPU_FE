import { Clock3, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useProjects } from '../../projects/hooks/use-projects'
import { BoardTile } from '../../projects/components/board-title'
import { CreateBoardModal } from '../../projects/components/create-project-modal'

export function HubHomePage() {
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const { data, isLoading, isError } = useProjects({
    page: 1,
    limit: 20,
  })

  const projects = useMemo(() => data?.data || [], [data])

  const recentBoards = projects.slice(0, 4)
  const workspaceBoards = projects.slice(0, 2)
  const guestBoards = projects.slice(2, 6)

  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <section>
        <div className="flex items-center gap-3">
          <Clock3 size={24} className="text-slate-700" />
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            Đã xem gần đây
          </h2>
        </div>

        {isLoading && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[140px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
              />
            ))}
          </div>
        )}

        {!isLoading && !isError && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {recentBoards.map((project) => (
              <BoardTile key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-semibold uppercase tracking-wide text-slate-800">
          Các không gian làm việc của bạn
        </h2>

        <div className="mt-6 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white">
              T
            </div>

            <div>
              <p className="text-2xl font-semibold text-slate-900">
                Trello Không gian làm việc
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/hub/workspace-boards"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-200"
            >
              Bảng
            </Link>
            <Link
              to="/hub/members"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-200"
            >
              Thành viên
            </Link>
            <Link
              to="/hub/workspace-settings"
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-200"
            >
              Cài đặt
            </Link>
            <button
              className="rounded-xl bg-[#f3ebff] px-4 py-2.5 text-sm font-medium text-violet-700"
              type="button"
            >
              Nâng cấp
            </button>
          </div>
        </div>

        {!isLoading && !isError && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workspaceBoards.map((project) => (
              <BoardTile key={project.id} project={project} />
            ))}

            <button
              onClick={() => setOpenCreateModal(true)}
              className="flex h-[140px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-center transition hover:bg-slate-100"
            >
              <span className="text-xl font-medium text-slate-700">Tạo bảng mới</span>
              <span className="mt-2 text-sm text-slate-500">7 còn lại</span>
            </button>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-semibold uppercase tracking-wide text-slate-800">
            Các không gian làm việc khác
          </h2>
          <Info size={18} className="text-blue-600" />
        </div>

        {!isLoading && !isError && (
          <div className="mt-6 space-y-8">
            {guestBoards.map((project) => (
              <div key={project.id}>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
                    T
                  </div>
                  <span className="text-2xl font-semibold text-slate-900">
                    Trello Không gian làm việc
                  </span>
                </div>

                <div className="max-w-[220px]">
                  <BoardTile project={project} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <CreateBoardModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  )
}