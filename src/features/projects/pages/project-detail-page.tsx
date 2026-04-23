import { Navigate, useParams } from 'react-router-dom'

export function ProjectDetailPage() {
  const { projectId = '' } = useParams()
  return <Navigate to={`/projects/${projectId}/summary`} replace />
}