import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../features/auth/pages/login-page'
import { RegisterPage } from '../features/auth/pages/register-page'
import { ProjectsPage } from '../features/projects/pages/projects-page'
import { ProjectDetailPage } from '../features/projects/pages/project-detail-page'
import { TasksPage } from '../features/tasks/pages/tasks-page'
import { TaskDetailPage } from '../features/tasks/pages/task-detail-page'
import { ProjectDashboardPage } from '../features/dashboard/pages/project-dashboard-page'
import { ProtectedRoute } from '../components/common/protected-route'
import { GuestRoute } from '../components/common/guest-route'
import { AppLayout } from '../components/layouts/app-layout'
import { ProjectMembersPage } from '../features/projects/pages/project-members-page'
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" replace />} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/projects/:projectId/tasks" element={<TasksPage />} />
          <Route path="/projects/:projectId/tasks/:taskId" element={<TaskDetailPage />} />
          <Route path="/projects/:projectId/dashboard" element={<ProjectDashboardPage />} />
          <Route path="/projects/:projectId/members" element={<ProjectMembersPage />} />
        </Route>
      </Route>
    </Routes>
  )
}