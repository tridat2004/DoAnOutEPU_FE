import { Link } from 'react-router-dom'
import type { ProjectItem } from '../types/project.types'

type Props = {
  project: ProjectItem
  variant?: 'primary' | 'secondary'
}

const gradients = [
  'from-sky-500 to-blue-700',
  'from-fuchsia-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-rose-600',
  'from-violet-500 to-indigo-700',
]

function getGradient(seed: string) {
  const index = seed.length % gradients.length
  return gradients[index]
}

export function BoardTile({ project, variant = 'primary' }: Props) {
  const gradient = getGradient(project.projectKey || project.name)

  return (
    <Link
      to={`/projects/${project.id}`}
      className={`group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg ${
        variant === 'primary' ? 'w-full' : ''
      }`}
    >
      <div className={`h-20 bg-gradient-to-r ${gradient}`} />
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-slate-500">{project.projectKey}</p>
      </div>
    </Link>
  )
}