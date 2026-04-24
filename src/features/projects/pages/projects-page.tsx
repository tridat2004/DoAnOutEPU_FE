import { useMemo, useState } from 'react'
import { Lock, UserCircle2, Users } from 'lucide-react'
import { useProjects } from '../hooks/use-projects'
import { CreateProjectModal } from '../components/create-project-modal'
import { BoardTile } from '../components/board-title'

export function ProjectsPage() {
  const [page, setPage] = useState(1)
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const { data, isLoading, isError } = useProjects({
    page,
    limit: 12,
    keyword: keyword || undefined,
  })

  const projects = useMemo(() => data?.data || [], [data])
  const meta = data?.meta

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPage(1)
    setKeyword(keywordInput.trim())
  }

  return (
    <div className="mx-auto max-w-6xl">
      <section className="border-b border-slate-200 pb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white">
            T
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                Trello Không gian làm việc
              </h1>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Lock size={14} />
              <span>Riêng tư</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2">
          <UserCircle2 size={20} className="text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">Các bảng của bạn</h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
              />
            ))}

          {!isLoading &&
            projects.slice(0, 3).map((project) => (
              <BoardTile key={project.id} project={project} variant="primary" />
            ))}

          {!isLoading && (
            <button
              onClick={() => setOpenCreateModal(true)}
              className="flex h-[160px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-center transition hover:bg-slate-100"
            >
              <span className="text-lg font-medium text-slate-700">Tạo bảng mới</span>
              <span className="mt-2 text-sm text-slate-500">7 còn lại</span>
            </button>
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">
            Tất cả các bảng trong Không gian làm việc này
          </h2>
        </div>

        <form onSubmit={handleSearchSubmit} className="mt-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Tìm bảng theo tên hoặc mã project..."
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Tìm kiếm
            </button>
          </div>
        </form>

        {isError && (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
            Không thể tải danh sách bảng.
          </div>
        )}

        {!isLoading && !isError && projects.length === 0 && (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="text-xl font-semibold text-slate-900">Chưa có bảng nào</h3>
            <p className="mt-2 text-sm text-slate-500">
              Tạo bảng đầu tiên để bắt đầu quản lý dự án.
            </p>
            <button
              onClick={() => setOpenCreateModal(true)}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Tạo bảng
            </button>
          </div>
        )}

        {!isLoading && !isError && projects.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <BoardTile key={project.id} project={project} />
            ))}

            <button
              onClick={() => setOpenCreateModal(true)}
              className="flex h-[160px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-center transition hover:bg-slate-100"
            >
              <span className="text-lg font-medium text-slate-700">Tạo bảng mới</span>
              <span className="mt-2 text-sm text-slate-500">7 còn lại</span>
            </button>
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm text-slate-500">
              Trang <span className="font-semibold text-slate-900">{meta.page}</span> /{' '}
              <span className="font-semibold text-slate-900">{meta.totalPages}</span>
              {' · '}
              Tổng <span className="font-semibold text-slate-900">{meta.total}</span> bảng
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={!meta.hasPreviousPage}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
              >
                ← Trước
              </button>

              <button
                disabled={!meta.hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
              >
                Sau →
              </button>
            </div>
          </div>
        )}
      </section>

      <CreateProjectModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  )
}