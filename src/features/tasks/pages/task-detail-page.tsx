import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  useCreateTaskComment,
  useTaskComments,
  useTaskDetail,
  useTaskHistories,
} from '../hooks/use-tasks'

export function TaskDetailPage() {
  const { projectId = '', taskId = '' } = useParams()
  const [commentContent, setCommentContent] = useState('')

  const { data, isLoading, isError } = useTaskDetail(projectId, taskId)
  const { data: commentsData } = useTaskComments(projectId, taskId)
  const { data: historiesData } = useTaskHistories(projectId, taskId)
  const createCommentMutation = useCreateTaskComment(projectId, taskId)

  const task = data?.data
  const comments = commentsData?.data || []
  const histories = historiesData?.data || []

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!commentContent.trim()) return

    try {
      await createCommentMutation.mutateAsync({
        content: commentContent.trim(),
      })
      setCommentContent('')
    } catch {
      window.alert('Khong the tao comment')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 animate-pulse rounded-3xl bg-slate-100" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      </div>
    )
  }

  if (isError || !task) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
        Khong the tai chi tiet task.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
              {task.taskCode}
            </div>
            <h1 className="mt-3 text-3xl font-semibold">{task.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
              {task.description || 'Chua co mo ta cho task nay.'}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/projects/${projectId}/list`}
              className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
            >
              ← Back to list
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Thong tin task</h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard label="Status" value={task.status?.name || '-'} />
              <InfoCard label="Priority" value={task.priority?.name || '-'} />
              <InfoCard label="Task type" value={task.taskType?.name || '-'} />
              <InfoCard label="Assignee" value={task.assignee?.fullName || 'Unassigned'} />
              <InfoCard
                label="Estimate"
                value={task.estimatedHours ? `${task.estimatedHours}h` : '-'}
              />
              <InfoCard
                label="Due date"
                value={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Comments</h2>

            <form onSubmit={handleCommentSubmit} className="mt-5 space-y-3">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                rows={4}
                placeholder="Nhap comment..."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={createCommentMutation.isPending}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                  {createCommentMutation.isPending ? 'Dang gui...' : 'Gui comment'}
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              {comments.length === 0 && (
                <p className="text-sm text-slate-500">Chua co comment nao.</p>
              )}

              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-slate-900">
                        {comment.author.fullName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">History</h2>

            <div className="mt-5 space-y-4">
              {histories.length === 0 && (
                <p className="text-sm text-slate-500">Chua co lich su thay doi.</p>
              )}

              {histories.map((history) => (
                <div
                  key={history.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-medium text-slate-900">
                    {history.changedBy.fullName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Da thay doi <span className="font-medium">{history.fieldName}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {history.oldValue || 'null'} → {history.newValue || 'null'}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(history.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Meta</h2>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Reporter:</span>{' '}
                {task.reporter?.fullName || '-'}
              </p>
              <p>
                <span className="font-medium text-slate-900">Created at:</span>{' '}
                {new Date(task.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-slate-900">Updated at:</span>{' '}
                {new Date(task.updatedAt).toLocaleString()}
              </p>
              <p>
                <span className="font-medium text-slate-900">Parent task:</span>{' '}
                {task.parentTask?.title || '-'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  )
}