import { Link2, X } from 'lucide-react'
import { useState } from 'react'

type InviteWorkspaceMemberModalProps = {
  open: boolean
  onClose: () => void
}

export function InviteWorkspaceMemberModal({
  open,
  onClose,
}: InviteWorkspaceMemberModalProps) {
  const [value, setValue] = useState('')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-[580px] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-[34px] font-semibold tracking-tight text-slate-900">
            Mời vào Không gian làm việc
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Địa chỉ email hoặc tên"
          className="w-full rounded-md border border-blue-500 px-4 py-3 text-lg outline-none ring-2 ring-blue-100"
        />

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-lg text-slate-700">
            Mời ai đó vào Không gian làm việc này bằng liên kết:
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-4 py-3 text-lg font-medium text-slate-800 transition hover:bg-slate-200"
          >
            <Link2 size={20} />
            Tạo liên kết
          </button>
        </div>
      </div>
    </div>
  )
}