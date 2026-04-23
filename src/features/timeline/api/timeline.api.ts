import { api } from '../../../lib/axios'
import type { ApiResponse } from '../../auth/types/auth.types'

export type TimelineItem = {
  id: string
  taskCode: string
  title: string
  startDate: string
  dueDate?: string | null
  estimatedHours?: number | null
  status: {
    id: string
    code: string
    name: string
    color?: string | null
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
  taskType: {
    id: string
    code: string
    name: string
  } | null
}

export type TimelineResponse = ApiResponse<{
  project: {
    id: string
    name: string
    projectKey: string
  }
  items: TimelineItem[]
}>

export async function getTimelineApi(projectId: string) {
  const response = await api.get<TimelineResponse>(
    `/projects/${projectId}/timeline`,
  )
  return response.data
}