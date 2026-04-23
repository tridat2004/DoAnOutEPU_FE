import { Outlet, useParams } from 'react-router-dom'
import { useProjectDetail } from '../hooks/use-projects'
import { ProjectHeader } from '../components/project-header'
import { ProjectTabs } from '../components/project-tabs'

export function ProjectShellPage() {
  const { projectId = '' } = useParams()
  const { data, isLoading, isError } = useProjectDetail(projectId)

  const project = data?.data

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-20 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-[500px] animate-pulse rounded-3xl bg-slate-100" />
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
        Khong the tai du lieu project.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ProjectHeader project={project} />
      <ProjectTabs />

      <div className="min-h-[400px]">
        <Outlet />
      </div>
    </div>
  )
}