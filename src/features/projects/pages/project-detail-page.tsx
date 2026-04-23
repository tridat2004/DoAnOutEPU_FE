import { Link, useParams } from 'react-router-dom'
import { useProjectDetail, useProjectMembers } from '../hooks/use-projects'

export function ProjectDetailPage() {
  const { projectId = '' } = useParams()

  const { data, isLoading, isError } = useProjectDetail(projectId)
  const { data: membersData } = useProjectMembers(projectId)

  const project = data?.data
  const members = membersData?.data || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-40 animate-pulse rounded-3xl bg-slate-100" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="h-48 animate-pulse rounded-3xl bg-slate-100 lg:col-span-2" />
          <div className="h-48 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
        Khong the tai chi tiet project.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-slate-100">
              {project.projectKey}
            </div>
            <h1 className="mt-3 text-3xl font-semibold">{project.name}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              {project.description || 'Chua co mo ta cho project nay.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={`/projects/${project.id}/tasks`}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900"
            >
              Tasks
            </Link>
            <Link
              to={`/projects/${project.id}/dashboard`}
              className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
            >
              Dashboard
            </Link>
            <Link
              to={`/projects/${project.id}/members`}
              className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
            >
              Members
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Tong quan project</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Project key</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {project.projectKey}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Owner</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {project.owner?.fullName || 'Chua ro'}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Created at</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Updated at</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Thanh vien</h2>
            <Link
              to={`/projects/${project.id}/members`}
              className="text-sm font-medium text-slate-700 underline"
            >
              Xem tat ca
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {members.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{member.user.fullName}</p>
                  <p className="text-sm text-slate-500">{member.user.email}</p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  {member.role.name}
                </span>
              </div>
            ))}

            {members.length === 0 && (
              <p className="text-sm text-slate-500">Chua co thanh vien nao.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}