import { useMemo, useState } from 'react'
import { useUsers } from '../../projects/hooks/use-projects'

export function WorkspaceMembersPage() {
  const [keyword, setKeyword] = useState('')

  const { data, isLoading, isError } = useUsers(keyword)
  const users = useMemo(() => data?.data || [], [data])

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-3">
          <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
            Người cộng tác
          </h1>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-lg font-semibold text-slate-700">
            {users.length} / 10
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-xl font-semibold text-slate-900">
            Nâng cấp để kiểm soát nhiều quyền hơn
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Quyết định ai có thể gửi lời mời, chỉnh sửa cài đặt Không gian làm việc và hơn thế nữa với Premium.
          </p>
          <button className="mt-4 text-sm font-semibold text-blue-700 hover:underline">
            Dùng thử Premium miễn phí trong 14 ngày
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-6 text-lg">
            <button className="font-semibold text-blue-700">Thành viên ({users.length})</button>
            <button className="text-slate-500">Khách một bảng thông tin (1)</button>
            <button className="text-slate-500">Khách đa bảng thông tin (0)</button>
            <button className="text-slate-500">Yêu cầu tham gia (0)</button>
          </div>

          <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            + Mời các thành viên Không gian làm việc
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <p className="max-w-4xl text-sm leading-6 text-slate-600">
            Các thành viên trong Không gian làm việc có thể xem và tham gia tất cả các bảng Không gian làm việc hiển thị và tạo ra các bảng mới trong Không gian làm việc.
          </p>

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Lọc theo tên"
            className="min-w-[280px] rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none"
          />
        </div>

        {isError && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            Không thể tải danh sách thành viên.
          </div>
        )}

        <div className="mt-6 divide-y divide-slate-200">
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="grid grid-cols-[1.3fr_1fr_auto] gap-4 py-4">
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-100" />
              </div>
            ))}

          {!isLoading &&
            users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-1 gap-4 py-4 xl:grid-cols-[1.4fr_1fr_auto]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    {(user.fullName || user.username).charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {user.fullName}{' '}
                      <span className="font-normal text-slate-500">@{user.username}</span>
                    </p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-500">
                  {user.isActive ? 'Đang hoạt động' : 'Tạm khóa'}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    Bảng (1)
                  </button>
                  <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    Thành viên
                  </button>
                  <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    Loại bỏ
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}