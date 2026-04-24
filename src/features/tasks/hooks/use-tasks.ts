import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    createTaskApi,
    createTaskCommentApi,
    getProjectMembersForTaskApi,
    getTaskCommentsApi,
    getTaskDetailApi,
    getTaskHistoriesApi,
    getTaskPrioritiesApi,
    getTaskStatusesApi,
    getTasksApi,
    getTaskTypesApi,
    updateTaskApi,
} from '../api/tasks.api'

export function useTasks(
    projectId?: string,
    params?: {
        page?: number
        limit?: number
        keyword?: string
        statusId?: string
        priorityId?: string
        assigneeUserId?: string
    },
) {
    return useQuery({
        queryKey: ['tasks', projectId, params],
        queryFn: () => getTasksApi(projectId!, params),
        enabled: !!projectId,
    })
}

export function useTaskDetail(projectId?: string, taskId?: string) {
    return useQuery({
        queryKey: ['task-detail', projectId, taskId],
        queryFn: () => getTaskDetailApi(projectId!, taskId!),
        enabled: !!projectId && !!taskId,
    })
}

export function useCreateTask(projectId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createTaskApi.bind(null, projectId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
            queryClient.invalidateQueries({ queryKey: ['board', projectId] })
            queryClient.invalidateQueries({ queryKey: ['timeline', projectId] })
            queryClient.invalidateQueries({ queryKey: ['dashboard', projectId] })
        },
    })
}

export function useUpdateTask(projectId: string, taskId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: any) => updateTaskApi(projectId, taskId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks', projectId] })
            queryClient.invalidateQueries({ queryKey: ['task-detail', projectId, taskId] })
            queryClient.invalidateQueries({ queryKey: ['task-histories', projectId, taskId] })
            queryClient.invalidateQueries({ queryKey: ['board', projectId] })
            queryClient.invalidateQueries({ queryKey: ['timeline', projectId] })
            queryClient.invalidateQueries({ queryKey: ['dashboard', projectId] })
        },
    })
}

export function useTaskComments(projectId?: string, taskId?: string) {
    return useQuery({
        queryKey: ['task-comments', projectId, taskId],
        queryFn: () => getTaskCommentsApi(projectId!, taskId!),
        enabled: !!projectId && !!taskId,
    })
}

export function useCreateTaskComment(projectId: string, taskId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: { content: string }) =>
            createTaskCommentApi(projectId, taskId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task-comments', projectId, taskId] })
            queryClient.invalidateQueries({ queryKey: ['dashboard', projectId] })
        },
    })
}

export function useTaskHistories(projectId?: string, taskId?: string) {
    return useQuery({
        queryKey: ['task-histories', projectId, taskId],
        queryFn: () => getTaskHistoriesApi(projectId!, taskId!),
        enabled: !!projectId && !!taskId,
    })
}

export function useTaskTypes() {
    return useQuery({
        queryKey: ['task-types'],
        queryFn: getTaskTypesApi,
    })
}

export function useTaskStatuses() {
    return useQuery({
        queryKey: ['task-statuses'],
        queryFn: getTaskStatusesApi,
    })
}

export function useTaskPriorities() {
    return useQuery({
        queryKey: ['task-priorities'],
        queryFn: getTaskPrioritiesApi,
    })
}

export function useProjectMembersForTask(projectId?: string) {
    return useQuery({
        queryKey: ['project-members-for-task', projectId],
        queryFn: () => getProjectMembersForTaskApi(projectId!),
        enabled: !!projectId,
    })
}