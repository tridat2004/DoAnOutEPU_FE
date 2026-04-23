import { Link, useParams } from 'react-router-dom'
import { useBoard } from '../hooks/use-board'

export function ProjectBoardPage() {
  const { projectId = '' } = useParams()
  const { data, isLoading, isError } = useBoard(projectId)

  const board = data?.data
  const columns = board?.columns ?? []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-[520px] animate-pulse rounded-3xl bg-slate-100" />
        ))}
      </div>
    )
  }

  if (isError || !board) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
        Khong the tai du lieu board.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Board</h2>
            <p className="mt-1 text-sm text-slate-500">
              Quan ly task theo status dang Kanban style.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            {board.project.name} · {board.project.projectKey}
          </div>
        </div>
      </div>

      <div className="grid min-w-full grid-cols-1 gap-5 xl:grid-cols-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                  {column.name}
                </h3>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {column.tasks.length}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {column.tasks.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-400">
                  Chua co task nao
                </div>
              )}

              {column.tasks.map((task) => (
                <Link
                  key={task.id}
                  to={`/projects/${projectId}/tasks/${task.id}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {task.taskCode}
                    </div>

                    <span className="text-xs font-medium text-slate-500">
                      {task.priority?.name || 'No priority'}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900">
                    {task.title}
                  </h4>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                    {task.description || 'Chua co mo ta'}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{task.assignee?.fullName || 'Unassigned'}</span>
                    <span>{task.estimatedHours ? `${task.estimatedHours}h` : '-'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}