import { FolderKanban } from 'lucide-react'
import type { ProjectItem } from '../types/project.types'

type Props = {
  project: ProjectItem
}

export function ProjectHeader({ project }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm">
            <FolderKanban size={24} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                {project.projectKey}
              </span>

              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Active workspace
              </span>
            </div>

            <h1 className="mt-3 truncate text-3xl font-semibold text-slate-900">
              {project.name}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              {project.description || 'Chua co mo ta cho project nay.'}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <div>
                Owner:{' '}
                <span className="font-medium text-slate-700">
                  {project.owner?.fullName || 'Chua ro'}
                </span>
              </div>

              <div>
                Updated:{' '}
                <span className="font-medium text-slate-700">
                  {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}