import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  useDeleteProjectMember,
  useProjectDetail,
  useProjectMembers,
} from '../hooks/use-projects'
import { AddMemberModal } from '../components/add-member-modal'

export function ProjectMembersPage() {
  const { projectId = '' } = useParams()
  const [openAddModal, setOpenAddModal] = useState(false)

  const { data: projectData } = useProjectDetail(projectId)
  const { data: membersData, isLoading, isError } = useProjectMembers(projectId)
  const deleteMemberMutation = useDeleteProjectMember(projectId)

  const project = projectData?.data
  const members = membersData?.data || []

  async function handleDelete(memberId: string) {
    const confirmed = window.confirm('Ban co chac chan muon xoa thanh vien nay?')
    if (!confirmed) return

    try {
      await deleteMemberMutation.mutateAsync(memberId)
    } catch {
      window.alert('Khong the xoa thanh vien')
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Project members
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              {project?.name || 'Project'}
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Quan ly thanh vien va vai tro trong project.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/projects/${projectId}`}
              className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
            >
              ← Quay lai
            </Link>
            <button
              onClick={() => setOpenAddModal(true)}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900"
            >
              + Them thanh vien
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {isLoading && <p className="text-slate-500">Dang tai thanh vien...</p>}

        {!isLoading && isError && (
          <p className="text-red-500">Khong the tai danh sach thanh vien.</p>
        )}

        {!isLoading && !isError && members.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <p className="text-slate-500">Chua co thanh vien nao trong project.</p>
          </div>
        )}

        {!isLoading && !isError && members.length > 0 && (
          <div className="overflow-hidden rounded-3xl border border-slate-100">
            <div className="hidden grid-cols-12 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 md:grid">
              <div className="col-span-4">Thanh vien</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Joined at</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <div className="divide-y divide-slate-100">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-4">
                    <p className="font-medium text-slate-900">{member.user.fullName}</p>
                    <p className="text-sm text-slate-500">@{member.user.username}</p>
                  </div>

                  <div className="text-sm text-slate-600 md:col-span-3">
                    {member.user.email}
                  </div>

                  <div className="md:col-span-2">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {member.role.name}
                    </span>
                  </div>

                  <div className="text-sm text-slate-500 md:col-span-2">
                    {new Date(member.joinedAt).toLocaleDateString()}
                  </div>

                  <div className="md:col-span-1 md:text-right">
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600"
                    >
                      Xoa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <AddMemberModal
        projectId={projectId}
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </div>
  )
}