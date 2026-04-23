import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useCreateTask,
  useProjectMembersForTask,
  useTaskPriorities,
  useTaskStatuses,
  useTaskTypes,
} from '../hooks/use-tasks'

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title khong duoc de trong'),
  description: z.string().optional(),
  taskTypeId: z.string().min(1, 'Task type khong duoc de trong'),
  statusId: z.string().min(1, 'Status khong duoc de trong'),
  priorityId: z.string().min(1, 'Priority khong duoc de trong'),
  assigneeUserId: z.string().optional(),
  estimatedHours: z.string().optional(),
  dueDate: z.string().optional(),
})

type FormValues = z.infer<typeof createTaskSchema>

type Props = {
  projectId: string
  open: boolean
  onClose: () => void
}

export function CreateTaskModal({ projectId, open, onClose }: Props) {
  const [serverError, setServerError] = useState('')
  const createTaskMutation = useCreateTask(projectId)

  const { data: typesData } = useTaskTypes()
  const { data: statusesData } = useTaskStatuses()
  const { data: prioritiesData } = useTaskPriorities()
  const { data: membersData } = useProjectMembersForTask(projectId)

  const types = typesData?.data || []
  const statuses = statusesData?.data || []
  const priorities = prioritiesData?.data || []
  const members = membersData?.data || []

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      taskTypeId: '',
      statusId: '',
      priorityId: '',
      assigneeUserId: '',
      estimatedHours: '',
      dueDate: '',
    },
  })

  useEffect(() => {
    if (!open) return

    if (types[0]) setValue('taskTypeId', types[0].id)
    if (statuses[0]) setValue('statusId', statuses[0].id)
    if (priorities[0]) setValue('priorityId', priorities[0].id)
  }, [open, priorities, setValue, statuses, types])

  if (!open) return null

  async function onSubmit(values: FormValues) {
    try {
      setServerError('')

      await createTaskMutation.mutateAsync({
        title: values.title.trim(),
        description: values.description?.trim() || '',
        taskTypeId: values.taskTypeId,
        statusId: values.statusId,
        priorityId: values.priorityId,
        assigneeUserId: values.assigneeUserId || undefined,
        estimatedHours: values.estimatedHours ? Number(values.estimatedHours) : undefined,
        dueDate: values.dueDate || undefined,
      })

      reset()
      onClose()
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message || 'Khong the tao task. Vui long thu lai.',
      )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Tao task moi</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tao task moi cho project, gan assignee, priority va estimate.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border px-3 py-2 text-sm text-slate-600"
          >
            Dong
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              {...register('title')}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="VD: Build login page"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              placeholder="Mo ta task"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Task type
              </label>
              <select
                {...register('taskTypeId')}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              >
                {types.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.taskTypeId && (
                <p className="mt-1 text-sm text-red-500">{errors.taskTypeId.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                {...register('statusId')}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              >
                {statuses.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.statusId && (
                <p className="mt-1 text-sm text-red-500">{errors.statusId.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Priority
              </label>
              <select
                {...register('priorityId')}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              >
                {priorities.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.priorityId && (
                <p className="mt-1 text-sm text-red-500">{errors.priorityId.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Assignee
              </label>
              <select
                {...register('assigneeUserId')}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none"
              >
                <option value="">Chua gan</option>
                {members.map((member) => (
                  <option key={member.user.id} value={member.user.id}>
                    {member.user.fullName} - {member.role.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Estimated hours
              </label>
              <input
                type="number"
                min={0}
                {...register('estimatedHours')}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                placeholder="VD: 8"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Due date
              </label>
              <input
                type="date"
                {...register('dueDate')}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
              />
            </div>
          </div>

          {serverError && (
            <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium"
            >
              Huy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {isSubmitting ? 'Dang tao...' : 'Tao task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}