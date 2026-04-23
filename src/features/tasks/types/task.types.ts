import type { ApiResponse } from '../../auth/types/auth.types'

export interface PaginationMeta {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface TaskMetaItem {
    id: string
    code: string
    name: string
}

export type TaskStatusItem = TaskMetaItem & {
    color?: string | null
    position?: number
}

export type TaskPriorityItem = TaskMetaItem & {
    weight?: number
}

export interface TaskUser {
    id: string
    email: string
    username: string
    fullName: string
    avatarUrl?: string | null
    isActive: boolean
}

export interface TaskParent {
    id: string
    taskCode: string
    title: string
}

export interface TaskItem {
    id: string
    taskCode: string
    title: string
    description?: string | null
    dueDate?: string | null
    estimatedHours?: number | null
    createdAt: string
    updatedAt: string
    taskType: TaskMetaItem | null
    status: TaskStatusItem | null
    priority: TaskPriorityItem | null
    reporter: TaskUser | null
    assignee: TaskUser | null
    parentTask: TaskParent | null
}

export type TaskListResponse = ApiResponse<TaskItem[]> & {
    meta?: PaginationMeta
}
export type TaskDetailResponse = ApiResponse<TaskItem>
export type CreateTaskPayload = {
    title: string
    description?: string
    taskTypeId: string
    statusId: string
    priorityId: string
    assigneeUserId?: string
    estimatedHours?: number
    dueDate?: string
    parentTaskId?: string
}

export type UpdateTaskPayload = Partial<CreateTaskPayload> & {
    title?: string
}

export type TaskCommentItem = {
    id: string
    content: string
    createdAt: string
    updatedAt?: string
    author: TaskUser
}

export type TaskCommentsResponse = ApiResponse<TaskCommentItem[]>

export type CreateTaskCommentPayload = {
    content: string
}

export type TaskHistoryItem = {
    id: string
    fieldName: string
    oldValue?: string | null
    newValue?: string | null
    createdAt: string
    changedBy: TaskUser
}

export type TaskHistoriesResponse = ApiResponse<TaskHistoryItem[]>

export type TaskTypeListResponse = ApiResponse<TaskMetaItem[]>
export type TaskStatusListResponse = ApiResponse<TaskStatusItem[]>
export type TaskPriorityListResponse = ApiResponse<TaskPriorityItem[]>

export type ProjectMemberRole = {
    id: string
    code: string
    name: string
}

export type ProjectMemberItem = {
    id: string
    user: TaskUser
    role: ProjectMemberRole
    joinedAt: string
}

export type ProjectMembersResponse = ApiResponse<ProjectMemberItem[]>