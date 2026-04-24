import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import type { BoardColumn } from '../api/board.api'
import { TaskBoardCard } from './task-board-card'

type Props = {
  column: BoardColumn
}

export function BoardColumnComponent({ column }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  })

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            {column.name}
          </h3>
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
            {column.tasks.length}
          </span>
        </div>
      </div>

      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`min-h-[420px] space-y-3 rounded-2xl p-1 transition ${
            isOver ? 'bg-slate-100' : ''
          }`}
        >
          {column.tasks.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-400">
              Chua co task nao
            </div>
          )}

          {column.tasks.map((task) => (
            <TaskBoardCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}