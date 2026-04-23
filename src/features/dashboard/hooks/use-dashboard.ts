import { useQuery } from '@tanstack/react-query'
import {
  getAiProjectRiskSummaryApi,
  getAiProjectSummaryApi,
  getProjectDashboardApi,
} from '../api/dashboard.api'

export function useProjectDashboard(projectId?: string) {
  return useQuery({
    queryKey: ['dashboard', projectId],
    queryFn: () => getProjectDashboardApi(projectId!),
    enabled: !!projectId,
  })
}

export function useAiProjectSummary(projectId?: string) {
  return useQuery({
    queryKey: ['ai-project-summary', projectId],
    queryFn: () => getAiProjectSummaryApi(projectId!),
    enabled: !!projectId,
  })
}

export function useAiProjectRiskSummary(projectId?: string) {
  return useQuery({
    queryKey: ['ai-project-risk-summary', projectId],
    queryFn: () => getAiProjectRiskSummaryApi(projectId!),
    enabled: !!projectId,
  })
}