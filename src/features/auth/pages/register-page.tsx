import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../api/auth.api'

const registerSchema = z.object({
  email: z.string().min(1, 'Email khong duoc de trong').email('Email khong hop le'),
  fullName: z.string().min(1, 'Full name khong duoc de trong'),
  username: z.string().min(1, 'Username khong duoc de trong'),
  password: z.string().min(8, 'Password toi thieu 8 ky tu'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      fullName: '',
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    try {
      setServerError('')
      await registerApi(values)
      navigate('/login', { replace: true })
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message || 'Dang ky that bai. Vui long thu lai.',
      )
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-2">Dang ky</h1>
        <p className="text-sm text-slate-500 mb-6">
          Tao tai khoan moi de su dung he thong
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
            <label className="mb-1 block text-sm font-medium">Full name</label>
            <input
              type="text"
              {...register('fullName')}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Nhap ho ten"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <input
              type="text"
              {...register('username')}
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Nhap username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
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
            {isSubmitting ? 'Dang xu ly...' : 'Dang ky'}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Da co tai khoan?{' '}
          <Link to="/login" className="font-medium text-slate-900 underline">
            Dang nhap
          </Link>
        </p>
      </div>
    </div>
  )
}