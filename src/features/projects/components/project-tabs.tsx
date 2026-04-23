import { NavLink, useParams } from 'react-router-dom'
import {
  AlignJustify,
  BarChart3,
  CalendarRange,
  KanbanSquare,
  Users,
} from 'lucide-react'

const tabs = [
  {
    label: 'Summary',
    path: 'summary',
    icon: BarChart3,
  },
  {
    label: 'List',
    path: 'list',
    icon: AlignJustify,
  },
  {
    label: 'Board',
    path: 'board',
    icon: KanbanSquare,
  },
  {
    label: 'Timeline',
    path: 'timeline',
    icon: CalendarRange,
  },
  {
    label: 'Members',
    path: 'members',
    icon: Users,
  },
]

export function ProjectTabs() {
  const { projectId = '' } = useParams()

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon

          return (
            <NavLink
              key={tab.path}
              to={`/projects/${projectId}/${tab.path}`}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </NavLink>
          )
        })}
      </div>
    </section>
  )
}