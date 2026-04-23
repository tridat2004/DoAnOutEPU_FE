import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
    addProjectMemberApi,
    createProjectsApi,
    deleteProjectApi,
    deleteProjectMemberApi,
    getProjectDetailApi,
    getProjectMembersApi,
    getProjectsApi,
    getRolesApi,
    getUsersApi,
    updateProjectApi,
    updateProjectMemberApi,
} from '../api/projects.api'

export function useProjects(param?: {
    page?: number
    limit?: number
    keyword?: string
}) {
    return useQuery({
        queryKey: ['projects', param],
        queryFn: () => getProjectsApi(param)
    })
}

export function useProjectDetail(projectId: string) {
    return useQuery({
        queryKey: ['project-detail', projectId],
        queryFn: () => getProjectDetailApi(projectId!),
        enabled: !!projectId,
    })
}

export function useCreateProject() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createProjectsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects']})
        }
    })
}

export function useUpdateProject(projectId: string){
    const queryClient= useQueryClient()

    return useMutation({
        mutationFn:(payload: {name?: string; projectKey?: string; description?: string}) => updateProjectApi(projectId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects']})
            queryClient.invalidateQueries({ queryKey: ['project-detail', projectId]})
        }
    })
}
export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useProjectMembers(projectId?: string) {
  return useQuery({
    queryKey: ['project-members', projectId],
    queryFn: () => getProjectMembersApi(projectId!),
    enabled: !!projectId,
  })
}

export function useAddProjectMember(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { userId: string; roleId: string }) =>
      addProjectMemberApi(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-members', projectId] })
    },
  })
}

export function useUpdateProjectMember(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      memberId,
      roleId,
    }: {
      memberId: string
      roleId: string
    }) => updateProjectMemberApi(projectId, memberId, { roleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-members', projectId] })
    },
  })
}

export function useDeleteProjectMember(projectId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (memberId: string) => deleteProjectMemberApi(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-members', projectId] })
    },
  })
}

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getRolesApi,
  })
}

export function useUsers(keyword?: string) {
  return useQuery({
    queryKey: ['users', keyword],
    queryFn: () => getUsersApi({ keyword }),
  })
}