import { useMemo, useState } from 'react'
import { useAddProjectMember, useRoles, useUsers } from '../hooks/use-projects'

type Props = {
  projectId: string
  open: boolean
  onClose: () => void
}

export function AddMemberModal({ projectId, open, onClose }: Props) {
  const [keyword, setKeyword] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedRoleId, setSelectedRoleId] = useState('')
  const [serverError, setServerError] = useState('')

  const { data: usersData, isLoading: usersLoading } = useUsers(keyword)
  const { data: rolesData, isLoading: rolesLoading } = useRoles()
  const addMemberMutation = useAddProjectMember(projectId)

  const users = useMemo(() => usersData?.data || [], [usersData])
  const roles = useMemo(() => rolesData?.data || [], [rolesData])

  if (!open) return null

  async function handleSubmit() {
    try {
      setServerError('')

      if (!selectedUserId || !selectedRoleId) {
        setServerError('Vui long chon user va role')
        return
      }

      await addMemberMutation.mutateAsync({
        userId: selectedUserId,
        roleId: selectedRoleId,
      })

      setKeyword('')
      setSelectedUserId('')
      setSelectedRoleId('')
      onClose()
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message || 'Khong the them thanh vien',
      )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Them thanh vien</h2>
            <p className="mt-1 text-sm text-slate-500">
              Chon user va role de them vao project
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border px-3 py-2 text-sm text-slate-600"
          >
            Dong
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Tim user
            </label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhap ten, email, username..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Chon user
            </label>
            <div className="max-h-60 space-y-2 overflow-auto rounded-2xl border border-slate-200 p-2">
              {usersLoading ? (
                <p className="p-3 text-sm text-slate-500">Dang tai users...</p>
              ) : users.length === 0 ? (
                <p className="p-3 text-sm text-slate-500">Khong co user nao</p>
              ) : (
                users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => setSelectedUserId(user.id)}
                    className={`flex w-full items-start justify-between rounded-2xl px-4 py-3 text-left transition ${
                      selectedUserId === user.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-sm opacity-80">{user.email}</p>
                    </div>
                    <div className="text-xs opacity-80">@{user.username}</div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Chon role
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {rolesLoading ? (
                <p className="text-sm text-slate-500">Dang tai roles...</p>
              ) : (
                roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRoleId(role.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      selectedRoleId === role.id
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-900'
                    }`}
                  >
                    <p className="font-medium">{role.name}</p>
                    <p className="text-xs opacity-80">{role.code}</p>
                  </button>
                ))
              )}
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
              type="button"
              onClick={handleSubmit}
              disabled={addMemberMutation.isPending}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
            >
              {addMemberMutation.isPending ? 'Dang them...' : 'Them thanh vien'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}