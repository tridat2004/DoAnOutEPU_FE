import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProjectDetail } from '../../projects/hooks/use-projects'
import {
  useProjectMembersForTask,
  useTaskPriorities,
  useTasks,
  useTaskStatuses,
} from '../hooks/use-tasks'
import { CreateTaskModal } from '../components/create-task-modal'
import { TaskCard } from '../components/task-card'

export function TasksPage() {
  const { projectId = '' } = useParams()

  const [page, setPage] = useState(1)
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [statusId, setStatusId] = useState('')
  const [priorityId, setPriorityId] = useState('')
  const [assigneeUserId, setAssigneeUserId] = useState('')
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const { data: projectData } = useProjectDetail(projectId)
  const { data: statusesData } = useTaskStatuses()
  const { data: prioritiesData } = useTaskPriorities()
  const { data: membersData } = useProjectMembersForTask(projectId)

  const { data, isLoading, isError } = useTasks(projectId, {
    page,
    limit: 9,
    keyword: keyword || undefined,
    statusId: statusId || undefined,
    priorityId: priorityId || undefined,
    assigneeUserId: assigneeUserId || undefined,
  })

  const project = projectData?.data
  const tasks = useMemo(() => data?.data || [], [data])
  const meta = data?.meta
  const statuses = statusesData?.data || []
  const priorities = prioritiesData?.data || []
  const members = membersData?.data || []

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPage(1)
    setKeyword(keywordInput.trim())
  }

  function handleFilterReset() {
    setKeywordInput('')
    setKeyword('')
    setStatusId('')
    setPriorityId('')
    setAssigneeUserId('')
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              List view
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {project?.name || 'Tasks'}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Quan ly task theo dang list, filter, search va phan trang.
            </p>
          </div>

          <button
            onClick={() => setOpenCreateModal(true)}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          >
            + Tao task
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <input
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Tim theo title, task code, description..."
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />

            <button
              type="submit"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
            >
              Tim kiem
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
            <select
              value={statusId}
              onChange={(e) => {
                setPage(1)
                setStatusId(e.target.value)
              }}
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="">Tat ca status</option>
              {statuses.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={priorityId}
              onChange={(e) => {
                setPage(1)
                setPriorityId(e.target.value)
              }}
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="">Tat ca priority</option>
              {priorities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={assigneeUserId}
              onChange={(e) => {
                setPage(1)
                setAssigneeUserId(e.target.value)
              }}
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="">Tat ca assignee</option>
              {members.map((member) => (
                <option key={member.user.id} value={member.user.id}>
                  {member.user.fullName}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleFilterReset}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700"
            >
              Reset filter
            </button>
          </div>
        </form>
      </section>

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-3xl border border-slate-200 bg-slate-100"
            />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
          Khong the tai danh sach task.
        </div>
      )}

      {!isLoading && !isError && tasks.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">
            Chua co task nao
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Tao task dau tien de bat dau theo doi cong viec.
          </p>
          <button
            onClick={() => setOpenCreateModal(true)}
            className="mt-5 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            Tao task
          </button>
        </div>
      )}

      {!isLoading && !isError && tasks.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} projectId={projectId} task={task} />
            ))}
          </div>

          {meta && (
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-500">
                Trang <span className="font-semibold text-slate-900">{meta.page}</span> /{' '}
                <span className="font-semibold text-slate-900">{meta.totalPages}</span>
                {' • '}
                Tong <span className="font-semibold text-slate-900">{meta.total}</span> task
              </div>

              <div className="flex items-center gap-3">
                <button
                  disabled={!meta.hasPreviousPage}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
                >
                  ← Truoc
                </button>

                <button
                  disabled={!meta.hasNextPage}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm disabled:opacity-50"
                >
                  Sau →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <CreateTaskModal
        projectId={projectId}
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  )
}