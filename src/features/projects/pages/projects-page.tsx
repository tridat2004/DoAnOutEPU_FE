import { useMemo, useState } from 'react'
import { useProjects } from '../hooks/use-projects'
import { CreateProjectModal } from '../components/create-project-modal'
import { ProjectCard } from '../components/project-card'

export function ProjectsPage() {
  const [page, setPage] = useState(1)
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const { data, isLoading, isError } = useProjects({
    page,
    limit: 9,
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
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Workspace
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Projects</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Quan ly tat ca project, theo doi tien do, mo board, dashboard va AI features.
            </p>
          </div>

          <button
            onClick={() => setOpenCreateModal(true)}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            + Tao project moi
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col gap-3 md:flex-row"
        >
          <input
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Tim theo ten project, project key..."
            className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
          />

          <button
            type="submit"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            Tim kiem
          </button>
        </form>
      </section>

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-3xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
          Khong the tai danh sach project.
        </div>
      )}

      {!isLoading && !isError && projects.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">
            Chua co project nao
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Tao project dau tien de bat dau quan ly cong viec.
          </p>
          <button
            onClick={() => setOpenCreateModal(true)}
            className="mt-5 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            Tao project
          </button>
        </div>
      )}

      {!isLoading && !isError && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {meta && (
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-500">
                Trang <span className="font-semibold text-slate-900">{meta.page}</span> /{' '}
                <span className="font-semibold text-slate-900">{meta.totalPages}</span>
                {' • '}
                Tong <span className="font-semibold text-slate-900">{meta.total}</span> project
              </div>

              <div className="flex items-center gap-3">
                <button
                  disabled={!meta.hasPreviousPage}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
                >
                  ← Truoc
                </button>

                <button
                  disabled={!meta.hasNextPage}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
                >
                  Sau →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <CreateProjectModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  )
}