import { Lock } from 'lucide-react'
import { useProjects } from '../../projects/hooks/use-projects'

export function WorkspaceSettingsPage() {
  const { data } = useProjects({ page: 1, limit: 100 })
  const boardCount = data?.meta?.total || data?.data?.length || 0

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
          Các cài đặt Không gian làm việc
        </h1>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-bold text-white">
            T
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Trello Không gian làm việc
            </h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Lock size={14} />
              <span>Riêng tư</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SettingBlock
          title="Khả năng hiển thị trong Không gian làm việc"
          description="Riêng tư – Đây là Không gian làm việc riêng tư. Chỉ những người trong Không gian làm việc có thể truy cập hoặc nhìn thấy Không gian làm việc."
          action="Thay đổi"
        />

        <SettingBlock
          title="Đang liên kết các Không gian làm việc Slack"
          description="Liên kết các Không gian làm việc Slack và Trello với nhau để cộng tác trong các dự án từ Slack."
          action="Thêm vào Slack"
        />

        <div className="rounded-2xl bg-[#f3ebff] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-900">
                Nâng cấp lên gói Premium để có thêm tùy chọn cài đặt
              </p>
            </div>
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
              Nâng cấp
            </button>
          </div>

          <div className="mt-6 space-y-6">
            <SettingBlock
              title="Chính sách hạn chế từ các thành viên Không gian làm việc"
              description="Bất kỳ ai cũng có thể được thêm vào Không gian làm việc này."
              action="Thay đổi"
              muted
            />
            <SettingBlock
              title="Chính sách hạn chế tạo bảng"
              description={`Hiện có ${boardCount} bảng trong Không gian làm việc. Thiết lập quyền tạo bảng sẽ được mở khóa khi nâng cấp.`}
              action="Thay đổi"
              muted
            />
            <SettingBlock
              title="Chính sách hạn chế xóa bảng"
              description="Giới hạn này đang ở chế độ chỉ xem trong gói hiện tại."
              action="Thay đổi"
              muted
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function SettingBlock({
  title,
  description,
  action,
  muted = false,
}: {
  title: string
  description: string
  action: string
  muted?: boolean
}) {
  return (
    <div className={`border-b border-slate-200 pb-6 ${muted ? 'opacity-80' : ''}`}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-5xl">
          <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </div>

        <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          {action}
        </button>
      </div>
    </div>
  )
}