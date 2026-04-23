import { api } from '../../../lib/axios'
import type { ApiResponse } from '../../auth/types/auth.types'

export type DashboardTaskStatusItem = {
  id: string
  code: string
  name: string
  color?: string | null
  position?: number
  count: number
}

export type DashboardPriorityItem = {
  id: string
  code: string
  name: string
  weight?: number
  count: number
}

export type DashboardWorkloadItem = {
  memberId: string
  user: {
    id: string
    email: string
    username: string
    fullName: string
    avatarUrl?: string | null
    isActive: boolean
  }
  role: {
    id: string
    code: string
    name: string
  }
  workload: {
    totalAssignedTasks: number
    openTasks: number
    doneTasks: number
  }
}

export type DashboardRecentActivityItem = {
  id: string
  fieldName: string
  oldValue?: string | null
  newValue?: string | null
  task: {
    id: string
    taskCode: string
    title: string
  }
  changedBy: {
    id: string
    email: string
    username: string
    fullName: string
  }
  createdAt: string
}

export type DashboardResponse = ApiResponse<{
  project: {
    id: string
    name: string
    projectKey: string
    description?: string | null
    owner?: {
      id: string
      email: string
      username: string
      fullName: string
    } | null
  }
  taskSummary: {
    totalTasks: number
    byStatus: DashboardTaskStatusItem[]
  }
  prioritySummary: DashboardPriorityItem[]
  workloadSummary: DashboardWorkloadItem[]
  dueSummary: {
    overdueTasks: number
    dueToday: number
    dueThisWeek: number
  }
  aiUsageSummary: {
    totalRecommendations: number
    latestRecommendation?: {
      id: string
      taskId: string
      taskCode: string
      recommendedUser: {
        id: string
        email: string
        username: string
        fullName: string
      }
      finalScore: number
      reasonText?: string | null
      createdAt: string
    } | null
  }
  recentActivities: DashboardRecentActivityItem[]
}>

export type AiProjectSummaryResponse = ApiResponse<{
  overallSummary: string
  projectHealth: 'good' | 'medium' | 'at_risk'
  topRisks: string[]
  teamWorkloadSummary: string
  recommendedActions: string[]
  shortPMSummary: string
}>

export type AiProjectRiskSummaryResponse = ApiResponse<{
  projectRiskLevel: 'good' | 'medium' | 'at_risk'
  topRisks: string[]
  overloadedMembers: Array<{
    fullName: string
    openTasks: number
  }>
  tasksNeedingAttention: Array<{
    taskCode: string
    title: string
    reason: string
  }>
  recommendedActions: string[]
}>

export async function getProjectDashboardApi(projectId: string) {
  const response = await api.get<DashboardResponse>(`/projects/${projectId}/dashboard`)
  return response.data
}

export async function getAiProjectSummaryApi(projectId: string) {
  const response = await api.get<AiProjectSummaryResponse>(
    `/projects/${projectId}/ai/summary`,
  )
  return response.data
}

export async function getAiProjectRiskSummaryApi(projectId: string) {
  const response = await api.get<AiProjectRiskSummaryResponse>(
    `/projects/${projectId}/ai/risk-summary`,
  )
  return response.data
}