import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateProject } from '../hooks/use-projects'

const projectSchema = z.object({
    name: z.string().min(1, 'Ten project khong duoc de trong'),
    projectKey: z
        .string()
        .min(1, 'Project key khong duoc de trong')
        .max(20, 'Project key toi da 20 ky tu'),
    description: z.string().optional()
})

type ProjectFormValues = z.infer<typeof projectSchema>

type Props = {
    open: boolean
    onClose: () => void
}

export function CreateProjectModal({ open, onClose }: Props) {
    const [serverError, setServerError] = useState('')
    const createProjectMutation = useCreateProject()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: '',
            projectKey: '',
            description: '',
        },
    })

    if (!open) return null

    async function onSubmit(values: ProjectFormValues) {
        try {
            setServerError('')
            await createProjectMutation.mutateAsync({
                name: values.name.trim(),
                projectKey: values.projectKey.trim().toUpperCase(),
                description: values.description?.trim() || '',
            })
            reset()
            onClose()
        } catch (error: any) {
            setServerError(
                error?.response?.data?.message || 'Khong the tao project. Vui long thu lai.',
            )
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">Tao project moi</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Tao project de quan ly task, board va dashboard.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl border px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                        Dong
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Ten project
                        </label>
                        <input
                            {...register('name')}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                            placeholder="VD: Task Management Graduation Project"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Project key
                        </label>
                        <input
                            {...register('projectKey')}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 uppercase outline-none focus:border-slate-400"
                            placeholder="VD: MAY_2004"
                        />
                        {errors.projectKey && (
                            <p className="mt-1 text-sm text-red-500">{errors.projectKey.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Mo ta
                        </label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                            placeholder="Mo ta ngan ve project"
                        />
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
                            {isSubmitting ? 'Dang tao...' : 'Tao project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}