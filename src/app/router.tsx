import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../features/auth/pages/login-page'
import { RegisterPage } from '../features/auth/pages/register-page'
import { ProjectsPage } from '../features/projects/pages/projects-page'
import { ProtectedRoute } from '../components/common/protected-route'
import { GuestRoute } from '../components/common/guest-route'
import { AppLayout } from '../components/layouts/app-layout'

import { ProjectShellPage } from '../features/projects/pages/project-shell-page'
import { ProjectSummaryPage } from '../features/dashboard/pages/project-summary-page'
import { TasksPage } from '../features/tasks/pages/tasks-page'
import { ProjectBoardPage } from '../features/board/pages/project-board-page'
import { ProjectTimelinePage } from '../features/timeline/pages/project-timeline-page'
import { ProjectMembersPage } from '../features/projects/pages/project-members-page'
import { TaskDetailPage } from '../features/tasks/pages/task-detail-page'

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

          <Route path="/projects/:projectId" element={<ProjectShellPage />}>
            <Route index element={<Navigate to="summary" replace />} />
            <Route path="summary" element={<ProjectSummaryPage />} />
            <Route path="list" element={<TasksPage />} />
            <Route path="board" element={<ProjectBoardPage />} />
            <Route path="timeline" element={<ProjectTimelinePage />} />
            <Route path="members" element={<ProjectMembersPage />} />
            <Route path="tasks/:taskId" element={<TaskDetailPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/projects" replace />} />
    </Routes>
  )
}