import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginApi } from '../api/auth.api'
import { useAuthStore } from '../store/auth-store'

const loginSchema = z.object({
    email: z.string().min(1, 'Email khong duoc de trong').email('Email khong hop le'),
    password: z.string().min(1, 'Password khong duoc de trong'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const setUser = useAuthStore((state) => state.setUser)

    const [serverError, setServerError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: LoginFormValues) {
        try {
            setServerError('')
            const response = await loginApi(values)
            setUser(response.data) // Cookie đã được set tự động bởi browser
            // Xóa hết phần lấy accessToken - không cần nữa

            const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
            navigate(redirectTo || '/hub/home', { replace: true })
        } catch (error: any) {
            setServerError(
                error?.response?.data?.message || 'Dang nhap that bai. Vui long thu lai.',
            )
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold mb-2">Dang nhap</h1>
                <p className="text-sm text-slate-500 mb-6">
                    Dang nhap de vao he thong quan ly du an
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                            placeholder="Nhap email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
                            placeholder="Nhap password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    {serverError && (
                        <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                            {serverError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
                    >
                        {isSubmitting ? 'Dang xu ly...' : 'Dang nhap'}
                    </button>
                </form>

                <p className="mt-4 text-sm text-slate-600">
                    Chua co tai khoan?{' '}
                    <Link to="/register" className="font-medium text-slate-900 underline">
                        Dang ky
                    </Link>
                </p>
            </div>
        </div>
    )
}