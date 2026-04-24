import { useAuthStore } from '../../auth/store/auth-store'

export function ProfileDisplayPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
          Hồ sơ và hiển thị
        </h1>
      </section>

      <section className="overflow-hidden rounded-2xl bg-[#f3ebff]">
        <div className="h-28 bg-gradient-to-r from-purple-100 via-violet-100 to-pink-100" />
      </section>

      <section className="rounded-2xl bg-[#f4f1fb] p-6">
        <h2 className="text-3xl font-semibold text-slate-900">
          Quản lý thông tin cá nhân của bạn
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Đây là giao diện hồ sơ cá nhân kiểu Trello. Ở phase này mình đang hiển thị dữ liệu từ tài khoản hiện tại, chưa nối API cập nhật hồ sơ.
        </p>
      </section>

      <section className="space-y-6">
        <div>
          <h3 className="text-3xl font-semibold text-slate-900">Về chúng tôi</h3>
          <p className="mt-3 text-sm text-slate-500">
            Các trường bắt buộc được đánh dấu bằng dấu hoa thị *
          </p>
        </div>

        <ProfileField
          label="Tên người dùng *"
          value={user?.userName || ''}
          helper="Luôn công khai. Hiển thị cho bất kỳ ai trên Internet."
        />

        <ProfileTextarea
          label="Lý lịch"
          value=""
          helper="Luôn công khai. Hiển thị cho bất kỳ ai trên Internet."
        />
      </section>
    </div>
  )
}

function ProfileField({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-slate-900">{label}</label>
      <input
        defaultValue={value}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
      />
      <p className="text-sm text-slate-500">{helper}</p>
    </div>
  )
}

function ProfileTextarea({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper: string
}) {
  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-slate-900">{label}</label>
      <textarea
        defaultValue={value}
        rows={4}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
      />
      <p className="text-sm text-slate-500">{helper}</p>
    </div>
  )
}