import { Link } from 'react-router-dom'
import type { ProjectItem } from '../types/project.types'

type Props = {
  project: ProjectItem
}

export function ProjectCard({ project }: Props) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {project.projectKey}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-slate-700">
            {project.name}
          </h3>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 px-3 py-2 text-xs font-medium text-white">
          Open
        </div>
      </div>

      <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
        {project.description || 'Chua co mo ta cho project nay.'}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="text-xs text-slate-500">
          Owner:{' '}
          <span className="font-medium text-slate-700">
            {project.owner?.fullName || 'Chua ro'}
          </span>
        </div>

        <span className="text-sm font-medium text-slate-900">Chi tiet →</span>
      </div>
    </Link>
  )
}