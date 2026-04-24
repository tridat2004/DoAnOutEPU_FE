import { useMemo, useState } from 'react'
import { BoardTile } from '../../projects/components/board-title'
import { CreateBoardModal } from '../../projects/components/create-project-modal'
import { useProjects } from '../../projects/hooks/use-projects'

export function WorkspaceBoardsPage() {
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
    <div className="space-y-8">
      <section className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-900">Bảng</h1>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 md:flex-row">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none">
              <option>Hoạt động gần đây nhất</option>
            </select>

            <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none">
              <option>Chọn bộ sưu tập</option>
            </select>
          </div>

          <input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Tìm kiếm các bảng"
            className="min-w-[250px] rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
          />
        </form>
      </section>

      {isError && (
        <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
          Không thể tải danh sách bảng.
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[150px] animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="flex h-[150px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-center transition hover:bg-slate-100"
          >
            <span className="text-xl font-medium text-slate-700">Tạo bảng mới</span>
            <span className="mt-2 text-sm text-slate-500">7 còn lại</span>
          </button>

          {projects.map((project) => (
            <BoardTile key={project.id} project={project} />
          ))}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-500">
            Trang <span className="font-semibold text-slate-900">{meta.page}</span> /{' '}
            <span className="font-semibold text-slate-900">{meta.totalPages}</span>
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

      <CreateBoardModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  )
}