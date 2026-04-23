import { api } from '../../../lib/axios'
import type {
  AddProjectMemberPayload,
  CreateProjectPayload,
  ProjectDetailResponse,
  ProjectListResponse,
  ProjectMembersReponse,
  RolesResponse,
  UpdateProjectMemberPayload,
  UpdateProjectPayload,
  UserOptionResponse,
} from '../types/project.types'
import type { ApiResponse } from '../../auth/types/auth.types'

export async function getProjectsApi(params?: {
    page?: number
    limit?: number
    keyword?: string
}){
    const response = await api.get<ProjectListResponse>('/projects',{ params })
    return response.data
}

export async function createProjectsApi(payload : CreateProjectPayload){
    const response = await api.post<ProjectDetailResponse>('/projects', payload)
    return response.data
}

export async function getProjectDetailApi(projectId: string){
    const response = await api.get<ProjectDetailResponse>(`/projects/${projectId}`)
    return response.data
}

export async function updateProjectApi( projectId: string, payload: UpdateProjectPayload){
    const response = await api.patch<ProjectDetailResponse>(`/projects/${projectId}`, payload)
    return response.data
}

export async function deleteProjectApi(projectId: string){
    const response = await api.delete<ProjectDetailResponse>(`/projects/${projectId}`)
    return response.data
}

export async function getProjectMembersApi(projectId: string){
    const response = await api.get<ProjectMembersReponse>(`/projects/${projectId}/members`);
    return response.data
}

export async function addProjectMemberApi(projectId: string, payload: AddProjectMemberPayload){
    const response = await api.post<ApiResponse<unknown>>(`/projects/${projectId}/members`, payload)
    return response.data
}

export async function updateProjectMemberApi(projectId: string, memberId: string, payload: UpdateProjectMemberPayload){
    const response = await api.patch<ApiResponse<unknown>>(`/projects/${projectId}/members/${memberId}`, payload)
    return response.data
}

export async function deleteProjectMemberApi(projectId: string, memberId: string){
    const response = await api.delete<ApiResponse<unknown>>(`/projects/${projectId}/members/${memberId}`)
    return response.data
}

export async function getRolesApi() {
  const response = await api.get<RolesResponse>('/roles')
  return response.data
}

export async function getUsersApi(params?: { keyword?: string }) {
  const response = await api.get<UserOptionResponse>('/users', { params })
  return response.data
}