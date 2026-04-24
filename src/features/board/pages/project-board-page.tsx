import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

import { useBoard, useUpdateTaskStatus } from '../hooks/use-board'
import type { BoardColumn, BoardTaskItem } from '../api/board.api'
import { BoardColumnComponent } from '../components/board-column'

export function ProjectBoardPage() {
  const { projectId = '' } = useParams()
  const { data, isLoading, isError } = useBoard(projectId)
  const updateTaskStatusMutation = useUpdateTaskStatus(projectId)

  const board = data?.data

  const [activeTask, setActiveTask] = useState<BoardTaskItem | null>(null)
  const [localColumns, setLocalColumns] = useState<BoardColumn[]>([])

  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    if (board?.columns) {
      setLocalColumns(board.columns)
    }
  }, [board])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[520px] animate-pulse rounded-3xl bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (isError || !board) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
        Khong the tai du lieu board.
      </div>
    )
  }

  function findTask(taskId: string) {
    for (const column of localColumns) {
      const task = column.tasks.find((item) => item.id === taskId)
      if (task) return { task, column }
    }
    return null
  }

  function handleDragStart(event: DragStartEvent) {
    const found = findTask(String(event.active.id))
    setActiveTask(found?.task || null)
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null)

    const { active, over } = event

    if (!over) return

    const activeTaskId = String(active.id)
    const overId = String(over.id)

    const source = findTask(activeTaskId)
    if (!source) return

    let targetColumn: BoardColumn | undefined

    targetColumn = localColumns.find((column) => column.id === overId)

    if (!targetColumn) {
      targetColumn = localColumns.find((column) =>
        column.tasks.some((task) => task.id === overId),
      )
    }

    if (!targetColumn) return
    if (source.column.id === targetColumn.id) return

    const prevColumns = structuredClone(localColumns)

    const nextColumns = localColumns.map((column) => {
      if (column.id === source.column.id) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== source.task.id),
        }
      }

      if (column.id === targetColumn.id) {
        return {
          ...column,
          tasks: [source.task, ...column.tasks],
        }
      }

      return column
    })

    setLocalColumns(nextColumns)

    try {
      await updateTaskStatusMutation.mutateAsync({
        taskId: source.task.id,
        statusId: targetColumn.id,
      })
    } catch {
      setLocalColumns(prevColumns)
      window.alert('Khong the cap nhat status task')
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Board</h2>
            <p className="mt-1 text-sm text-slate-500">
              Quan ly task theo status dang Kanban style.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            {board.project.name} · {board.project.projectKey}
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid min-w-full grid-cols-1 gap-5 xl:grid-cols-4">
          {localColumns.map((column) => (
            <BoardColumnComponent key={column.id} column={column} />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="w-[280px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {activeTask.taskCode}
              </div>
              <h4 className="mt-3 text-sm font-semibold text-slate-900">
                {activeTask.title}
              </h4>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}