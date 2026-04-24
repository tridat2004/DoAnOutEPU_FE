import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { useProjects } from '../../projects/hooks/use-projects'
import { getTasksApi } from '../../tasks/api/tasks.api'

export function CardsPage() {
  const { data: projectsData, isLoading: projectsLoading } = useProjects({
    page: 1,
    limit: 100,
  })

  const projects = projectsData?.data || []

  const taskQueries = useQueries({
    queries: projects.map((project) => ({
      queryKey: ['hub-cards-tasks', project.id],
      queryFn: () => getTasksApi(project.id, { page: 1, limit: 100 }),
      enabled: projects.length > 0,
    })),
  })

  const cards = useMemo(() => {
    return taskQueries.flatMap((query, index) => {
      const project = projects[index]
      const tasks = query.data?.data || []

      return tasks.map((task) => ({
        ...task,
        boardName: project?.name || '',
        boardKey: project?.projectKey || '',
      }))
    })
  }, [projects, taskQueries])

  const isLoading = projectsLoading || taskQueries.some((query) => query.isLoading)

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900">Thẻ</h1>

        <div className="flex flex-wrap gap-3">
          <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none">
            <option>Sắp xếp theo ngày đến hạn</option>
          </select>

          <button className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700">
            Lọc thẻ
          </button>

          <button className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-400">
            Xóa bộ lọc
          </button>
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1.2fr] gap-4 border-b border-slate-200 px-6 py-4 text-sm font-semibold text-slate-600">
          <div>Thẻ</div>
          <div>Danh sách</div>
          <div>Nhãn</div>
          <div>Ngày đến hạn</div>
          <div>Bảng thông tin</div>
        </div>

        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1.2fr] gap-4 border-b border-slate-100 px-6 py-5"
            >
              <div className="h-6 animate-pulse rounded bg-slate-100" />
              <div className="h-6 animate-pulse rounded bg-slate-100" />
              <div className="h-6 animate-pulse rounded bg-slate-100" />
              <div className="h-6 animate-pulse rounded bg-slate-100" />
              <div className="h-6 animate-pulse rounded bg-slate-100" />
            </div>
          ))}

        {!isLoading && cards.length === 0 && (
          <div className="px-6 py-10 text-sm text-slate-500">Chưa có thẻ nào.</div>
        )}

        {!isLoading &&
          cards.map((card) => (
            <div
              key={card.id}
              className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1.2fr] gap-4 border-b border-slate-100 px-6 py-5 text-sm"
            >
              <div className="font-medium text-slate-800">{card.title}</div>
              <div className="text-slate-600">{card.status?.name || '-'}</div>
              <div className="text-slate-500">{card.priority?.name || '-'}</div>
              <div>
                {card.dueDate ? (
                  <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold text-lime-700">
                    {new Date(card.dueDate).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-slate-400">Không có</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-blue-600" />
                <div>
                  <p className="font-medium text-slate-800">{card.boardName}</p>
                  <p className="text-xs text-slate-500">Trello Không gian làm việc</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}