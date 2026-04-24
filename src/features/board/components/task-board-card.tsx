import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { Link, useParams } from 'react-router-dom'
import type { BoardTaskItem } from '../api/board.api'

type Props = {
  task: BoardTaskItem
}

export function TaskBoardCard({ task }: Props) {
  const { projectId = '' } = useParams()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Link
        to={`/projects/${projectId}/tasks/${task.id}`}
        className={`block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition ${
          isDragging ? 'opacity-60' : 'hover:-translate-y-0.5 hover:shadow-md'
        }`}
      >
        <div
          {...attributes}
          {...listeners}
          onClick={(e) => e.preventDefault()}
          className="mb-3 cursor-grab rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 active:cursor-grabbing"
        >
          Drag
        </div>

        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            {task.taskCode}
          </div>

          <span className="text-xs font-medium text-slate-500">
            {task.priority?.name || 'No priority'}
          </span>
        </div>

        <h4 className="text-sm font-semibold text-slate-900">{task.title}</h4>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {task.description || 'Chua co mo ta'}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>{task.assignee?.fullName || 'Unassigned'}</span>
          <span>{task.estimatedHours ? `${task.estimatedHours}h` : '-'}</span>
        </div>
      </Link>
    </div>
  )
}