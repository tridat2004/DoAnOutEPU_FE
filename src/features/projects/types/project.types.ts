import type { ApiResponse } from '../../auth/types/auth.types'

export interface PaginationMeta{
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface ProjectOwner{
    id: string
    email: string
    username: string
    fullName: string
    avatarUrl?: string | null
    isActive?: boolean
}

export interface ProjectItem{
    id: string
    createdAt: string
    updatedAt: string
    name: string
    projectKey: string
    description?: string | null
    owner?: ProjectOwner | null
}

export type ProjectListResponse = ApiResponse<ProjectItem[]> & {
    meta?: PaginationMeta
}

export type ProjectDetailResponse = ApiResponse<ProjectItem>

export interface CreateProjectPayload {
    name: string
    projectKey : string
    description? : string
}

export interface UpdateProjectPayload {
    name?: string
    projectKey?: string
    description?: string
}

export interface ProjectMemberRole{
    id : string
    code : string
    name: string
}

export interface ProjectMemberUser{
    id: string
    email: string
    username : string
    fullName: string
    avatarUrl?: string | null
    isActive: boolean
}

export interface ProjectMember {
    id: string
    user: ProjectMemberUser
    role: ProjectMemberRole
    joinedAt: string
}

export type ProjectMembersReponse = ApiResponse<ProjectMember[]>

export interface AddProjectMemberPayload {
    userId: string
    roleId: string
}

export interface UpdateProjectMemberPayload {
    roleId: string
}

export interface RoleItem{
    id: string
    code: string
    name: string
}

export type RolesResponse = ApiResponse<RoleItem[]>

export interface UserOption{
    id: string
    email: string
    username: string
    fullName: string
    avatarUrl?: string | null
    isActive: boolean
}
export type UserOptionResponse = ApiResponse<UserOption[]>