import { api } from '../../../lib/axios'
import type { ApiResponse } from '../../auth/types/auth.types'

export type BoardTaskItem = {
  id: string
  taskCode: string
  title: string
  description?: string | null
  dueDate?: string | null
  estimatedHours?: number | null
  taskType: {
    id: string
    code: string
    name: string
  } | null
  priority: {
    id: string
    code: string
    name: string
    weight?: number
  } | null
  assignee: {
    id: string
    fullName: string
    avatarUrl?: string | null
  } | null
  reporter: {
    id: string
    fullName: string
  } | null
}

export type BoardColumn = {
  id: string
  code: string
  name: string
  color?: string | null
  position?: number
  tasks: BoardTaskItem[]
}

export type BoardResponse = ApiResponse<{
  project: {
    id: string
    name: string
    projectKey: string
  }
  columns: BoardColumn[]
}>

type RawBoardResponse = ApiResponse<{
  project: {
    id: string
    name: string
    projectKey: string
  }
  column?: Array<{
    status?: {
      id: string
      code: string
      name: string
      color?: string | null
      position?: number
    }
    tasks?: BoardTaskItem[]
  }>
  columns?: Array<{
    id?: string
    code?: string
    name?: string
    color?: string | null
    position?: number
    tasks?: BoardTaskItem[]
  }>
}>

export async function getBoardApi(projectId: string): Promise<BoardResponse> {
  const response = await api.get<RawBoardResponse>(`/projects/${projectId}/board`)
  const raw = response.data

  const normalizedColumns: BoardColumn[] = (raw.data.column ??
    raw.data.columns ??
    []
  ).map((item: any) => {
    const status = item.status ?? item

    return {
      id: status.id,
      code: status.code,
      name: status.name,
      color: status.color ?? null,
      position: status.position ?? 0,
      tasks: item.tasks ?? [],
    }
  })

  return {
    ...raw,
    data: {
      project: raw.data.project,
      columns: normalizedColumns,
    },
  }
}

export async function updateTaskStatusApi(
  projectId: string,
  taskId: string,
  statusId: string,
) {
  const response = await api.patch<
    ApiResponse<{
      id: string
      status: {
        id: string
        code: string
        name: string
        color?: string | null
        position?: number
      }
    }>
  >(`/projects/${projectId}/tasks/${taskId}/status`, {
    statusId,
  })

  return response.data
}