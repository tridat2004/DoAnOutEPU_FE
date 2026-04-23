import { useQuery } from '@tanstack/react-query'
import { getTimelineApi } from '../api/timeline.api'

export function useTimeline(projectId?: string) {
  return useQuery({
    queryKey: ['timeline', projectId],
    queryFn: () => getTimelineApi(projectId!),
    enabled: !!projectId,
  })
}