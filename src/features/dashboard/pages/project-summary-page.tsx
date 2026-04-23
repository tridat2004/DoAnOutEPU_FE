import { AlertTriangle, CheckCircle2, Clock3, ListTodo } from 'lucide-react'
import { useParams } from 'react-router-dom'
import {
  useAiProjectRiskSummary,
  useAiProjectSummary,
  useProjectDashboard,
} from '../hooks/use-dashboard'

export function ProjectSummaryPage() {
  const { projectId = '' } = useParams()

  const { data: dashboardData, isLoading, isError } = useProjectDashboard(projectId)
  const { data: aiSummaryData } = useAiProjectSummary(projectId)
  const { data: aiRiskData } = useAiProjectRiskSummary(projectId)

  const dashboard = dashboardData?.data
  const aiSummary = aiSummaryData?.data
  const aiRisk = aiRiskData?.data

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="h-80 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-80 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      </div>
    )
  }

  if (isError || !dashboard) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
        Khong the tai dashboard project.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={String(dashboard.taskSummary.totalTasks)}
          subtitle="Tong so task trong project"
          icon={<ListTodo size={18} />}
        />
        <StatCard
          title="In Progress"
          value={String(
            dashboard.taskSummary.byStatus.find((item) => item.code === 'in_progress')
              ?.count || 0,
          )}
          subtitle="Task dang xu ly"
          icon={<Clock3 size={18} />}
        />
        <StatCard
          title="Done"
          value={String(
            dashboard.taskSummary.byStatus.find((item) => item.code === 'done')?.count || 0,
          )}
          subtitle="Task da hoan thanh"
          icon={<CheckCircle2 size={18} />}
        />
        <StatCard
          title="Overdue"
          value={String(dashboard.dueSummary.overdueTasks)}
          subtitle="Task qua han"
          icon={<AlertTriangle size={18} />}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">AI Project Summary</h2>

            {aiSummary ? (
              <div className="mt-4 space-y-4">
                <BadgeTone value={aiSummary.projectHealth} />

                <p className="text-sm leading-7 text-slate-600">
                  {aiSummary.overallSummary}
                </p>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Top risks</h3>
                  <ul className="mt-3 space-y-2">
                    {aiSummary.topRisks.map((risk, index) => (
                      <li
                        key={index}
                        className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                      >
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Recommended actions</h3>
                  <ul className="mt-3 space-y-2">
                    {aiSummary.recommendedActions.map((action, index) => (
                      <li
                        key={index}
                        className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
                      >
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">Chua co du lieu AI summary.</p>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Workload Summary</h2>

            <div className="mt-5 space-y-3">
              {dashboard.workloadSummary.map((item) => (
                <div
                  key={item.memberId}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">{item.user.fullName}</p>
                      <p className="text-sm text-slate-500">{item.role.name}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-slate-500">Open</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {item.workload.openTasks}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">AI Risk Summary</h2>

            {aiRisk ? (
              <div className="mt-4 space-y-4">
                <BadgeTone value={aiRisk.projectRiskLevel} />

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Tasks needing attention</h3>
                  <div className="mt-3 space-y-3">
                    {aiRisk.tasksNeedingAttention.map((item, index) => (
                      <div
                        key={`${item.taskCode}-${index}`}
                        className="rounded-2xl bg-amber-50 p-4"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          {item.taskCode} · {item.title}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Overloaded members</h3>
                  <div className="mt-3 space-y-2">
                    {aiRisk.overloadedMembers.map((member, index) => (
                      <div
                        key={`${member.fullName}-${index}`}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                      >
                        <span className="text-sm font-medium text-slate-900">
                          {member.fullName}
                        </span>
                        <span className="text-sm text-slate-500">
                          {member.openTasks} open tasks
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">Chua co du lieu AI risk summary.</p>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>

            <div className="mt-5 space-y-3">
              {dashboard.recentActivities.length === 0 && (
                <p className="text-sm text-slate-500">Chua co activity nao.</p>
              )}

              {dashboard.recentActivities.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-medium text-slate-900">
                    {item.changedBy.fullName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Da thay doi <span className="font-medium">{item.fieldName}</span> trong{' '}
                    <span className="font-medium">{item.task.taskCode}</span>
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{title}</p>
        <div className="rounded-xl bg-slate-100 p-2 text-slate-700">{icon}</div>
      </div>

      <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  )
}

function BadgeTone({ value }: { value: 'good' | 'medium' | 'at_risk' }) {
  const styles =
    value === 'good'
      ? 'bg-emerald-50 text-emerald-700'
      : value === 'medium'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-red-50 text-red-700'

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  )
}