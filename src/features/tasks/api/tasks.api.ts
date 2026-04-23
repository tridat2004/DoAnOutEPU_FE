import { api } from '../../../lib/axios'
import type {
    CreateTaskCommentPayload,
    CreateTaskPayload,
    ProjectMembersResponse,
    TaskCommentsResponse,
    TaskDetailResponse,
    TaskHistoriesResponse,
    TaskListResponse,
    TaskPriorityListResponse,
    TaskStatusListResponse,
    TaskTypeListResponse,
    UpdateTaskPayload,
} from '../types/task.types'
import type { ApiResponse } from '../../auth/types/auth.types'

export async function getTasksApi(
    projectId: string,
    params?: {
        page?: number
        limit?: number
        keyword?: string
        statusId?: string
        priorityId?: string
        assigneeUserId?: string
    },
) {
    const response = await api.get<TaskListResponse>(`/projects/${projectId}/tasks`, {
        params,
    })

    return response.data
}

export async function getTaskDetailApi(projectId: string, taskId: string) {
    const response = await api.get<TaskDetailResponse>(`/projects/${projectId}/tasks/${taskId}`)
    return response.data
}

export async function createTaskApi(projectId: string, payload: CreateTaskPayload) {
    const response = await api.post<TaskDetailResponse>(`/projects/${projectId}/tasks`, payload)
    return response.data
}

export async function updateTaskApi(projectId: string, taskId: string, payload: UpdateTaskPayload) {
    const response = await api.patch<TaskDetailResponse>(`/projects/${projectId}/tasks/${taskId}`, payload)
    return response.data
}

export async function getTaskCommentsApi(projectId: string, taskId: string) {
    const response = await api.get<TaskCommentsResponse>(`/projects/${projectId}/tasks/${taskId}/comments`);
    return response.data
}

export async function createTaskCommentApi(projectId: string, taskId: string, payload: CreateTaskCommentPayload) {
    const response = await api.post<ApiResponse<unknown>>(`/projects/${projectId}/tasks/${taskId}/comments`, payload);
    return response.data
}

export async function getTaskHistoriesApi(projectId: string, taskId: string) {
    const response = await api.get<TaskHistoriesResponse>(`/projects/${projectId}/tasks/${taskId}/histories`)
    return response.data
}

export async function getTaskTypesApi() {
    const response = await api.get<TaskTypeListResponse>(`/task-meta/types`)
    return response.data
}

export async function getTaskStatusesApi() {
    const response = await api.get<TaskStatusListResponse>('/task-meta/statuses')
    return response.data
}

export async function getTaskPrioritiesApi() {
    const response = await api.get<TaskPriorityListResponse>('/task-meta/priorities')
    return response.data
}

export async function getProjectMembersForTaskApi(projectId: string) {
    const response = await api.get<ProjectMembersResponse>(
        `/projects/${projectId}/members`,
    )
    return response.data
}