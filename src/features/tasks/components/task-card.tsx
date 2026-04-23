import { Link } from 'react-router-dom'
import type { TaskItem } from '../types/task.types'

type Props = {
  projectId: string
  task: TaskItem
}

export function TaskCard({ projectId, task }: Props) {
  return (
    <Link
      to={`/projects/${projectId}/tasks/${task.id}`}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {task.taskCode}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">
            {task.title}
          </h3>
        </div>

        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {task.priority?.name || 'No priority'}
        </span>
      </div>

      <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
        {task.description || 'Chua co mo ta cho task nay.'}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <InfoBox label="Status" value={task.status?.name || '-'} />
        <InfoBox label="Assignee" value={task.assignee?.fullName || 'Unassigned'} />
        <InfoBox label="Type" value={task.taskType?.name || '-'} />
        <InfoBox label="Estimate" value={task.estimatedHours ? `${task.estimatedHours}h` : '-'} />
      </div>
    </Link>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  )
}