import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../features/auth/pages/login-page'
import { RegisterPage } from '../features/auth/pages/register-page'
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

import { HubHomeOnboardingPage } from '../features/hub/pages/hub-home-onboarding-page'
import { WorkspaceBoardsPage } from '../features/hub/pages/workspace-boards-page'
import { WorkspaceMembersPage } from '../features/hub/pages/workspace-members-page'
import { WorkspaceSettingsPage } from '../features/hub/pages/workspace-settings-page'
import { ProfileDisplayPage } from '../features/hub/pages/profile-display-page'
import { ActivityPage } from '../features/hub/pages/activity-page'
import { CardsPage } from '../features/hub/pages/cards-page'
import { LabsPage } from '../features/hub/pages/labs-page'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/hub/home" replace />} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/hub/home" element={<HubHomeOnboardingPage />} />
          <Route path="/hub/workspace-boards" element={<WorkspaceBoardsPage />} />
          <Route path="/hub/members" element={<WorkspaceMembersPage />} />
          <Route path="/hub/workspace-settings" element={<WorkspaceSettingsPage />} />
          <Route path="/hub/profile-display" element={<ProfileDisplayPage />} />
          <Route path="/hub/activity" element={<ActivityPage />} />
          <Route path="/hub/cards" element={<CardsPage />} />
          <Route path="/hub/labs" element={<LabsPage />} />

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

      <Route path="*" element={<Navigate to="/hub/home" replace />} />
    </Routes>
  )
}