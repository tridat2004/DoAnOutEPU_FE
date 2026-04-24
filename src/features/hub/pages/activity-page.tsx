import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { History, Users } from 'lucide-react'
import { useProjects } from '../../projects/hooks/use-projects'
import { getProjectDashboardApi } from '../../dashboard/api/dashboard.api'

export function ActivityPage() {
  const { data: projectsData, isLoading: projectsLoading } = useProjects({
    page: 1,
    limit: 100,
  })

  const projects = projectsData?.data || []

  const dashboardQueries = useQueries({
    queries: projects.map((project) => ({
      queryKey: ['hub-activity-dashboard', project.id],
      queryFn: () => getProjectDashboardApi(project.id),
      enabled: projects.length > 0,
    })),
  })

  const activities = useMemo(() => {
    const merged = dashboardQueries.flatMap((query) => query.data?.data?.recentActivities || [])

    return merged.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }, [dashboardQueries])

  const isLoading = projectsLoading || dashboardQueries.some((query) => query.isLoading)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900">Hoạt động</h1>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Users size={20} className="text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">Các Không gian làm việc</h2>
        </div>

        <div className="border-b border-slate-200 pb-4 text-lg text-slate-700">
          Trello Không gian làm việc
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <History size={20} className="text-slate-700" />
          <h2 className="text-2xl font-semibold text-slate-900">Hoạt động</h2>
        </div>

        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-14 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        )}

        {!isLoading && activities.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Chưa có hoạt động nào.
          </div>
        )}

        {!isLoading && activities.length > 0 && (
          <div className="space-y-4">
            {activities.slice(0, 30).map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                  {item.changedBy.fullName.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1 text-base leading-7 text-slate-700">
                  <span className="font-semibold text-slate-900">
                    {item.changedBy.fullName}
                  </span>{' '}
                  đã thay đổi{' '}
                  <span className="font-medium text-blue-700">{item.fieldName}</span>{' '}
                  trong thẻ{' '}
                  <span className="font-medium text-blue-700">{item.task.title}</span>
                  <div className="text-sm text-slate-500">
                    {new Date(item.createdAt).toLocaleString()} · trên bảng {item.task.taskCode}
                  </div>
                </div>
              </div>
            ))}

            <button className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-700">
              Tải thêm hoạt động
            </button>
          </div>
        )}
      </section>
    </div>
  )
}