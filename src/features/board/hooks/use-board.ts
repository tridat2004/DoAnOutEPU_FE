import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBoardApi, updateTaskStatusApi } from '../api/board.api'

export function useBoard(projectId?: string) {
  return useQuery({
    queryKey: ['board', projectId],
    queryFn: () => getBoardApi(projectId!),
    enabled: !!projectId,
  })
}

export function useUpdateTaskStatus(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      taskId,
      statusId,
    }: {
      taskId: string
      statusId: string
    }) => updateTaskStatusApi(projectId, taskId, statusId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['board', projectId] })
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
      queryClient.invalidateQueries({ queryKey: ['dashboard', projectId] })
      queryClient.invalidateQueries({ queryKey: ['timeline', projectId] })
    },
  })
}