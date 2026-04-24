import { useMemo, useState } from 'react'
import { Clock3, Plus } from 'lucide-react'
import { useProjects } from '../../projects/hooks/use-projects'
import { CreateBoardModal } from '../../projects/components/create-project-modal'

export function HubHomeOnboardingPage() {
  const [openCreateBoard, setOpenCreateBoard] = useState(false)

  const { data, isLoading } = useProjects({
    page: 1,
    limit: 20,
  })

  const projects = useMemo(() => data?.data || [], [data])
  const recentBoards = projects.slice(0, 4)

  return (
    <>
      <div className="grid min-h-[calc(100vh-110px)] grid-cols-12 gap-8">
        <div className="col-span-12 xl:col-span-9">
          <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#efe7fa] px-6 py-8">
              <div className="mx-auto flex max-w-md items-center justify-center">
                <img
                  src="https://images.ctfassets.net/rz1oowkt5gyp/2VY6dMQt5UFJAB6xW1wMxp/d4e2d213dcab57d7f33e27e3c2ac1699/hero.svg"
                  alt="onboarding"
                  className="h-44 object-contain"
                />
              </div>
            </div>

            <div className="px-8 py-8 text-center">
              <h1 className="mb-4 text-3xl font-semibold text-slate-900">
                Tổ chức mọi thứ
              </h1>

              <p className="mx-auto mb-6 max-w-xl text-lg leading-8 text-slate-600">
                Đặt tất cả mọi thứ ở một nơi và bắt đầu di chuyển mọi thứ về phía
                trước với bảng Trello đầu tiên của bạn!
              </p>

              <button
                onClick={() => setOpenCreateBoard(true)}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Tạo một bảng Không gian làm việc
              </button>

              <button
                onClick={() => setOpenCreateBoard(true)}
                className="mt-4 block w-full text-center text-lg text-slate-600 underline underline-offset-4"
              >
                Đã hiểu! Bỏ qua điều này.
              </button>
            </div>
          </div>
        </div>

        <aside className="col-span-12 pt-8 xl:col-span-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2 text-slate-900">
              <Clock3 size={18} />
              <span className="font-semibold">Đã xem gần đây</span>
            </div>

            <div className="space-y-4">
              {isLoading && (
                <>
                  <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
                  <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
                  <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
                </>
              )}

              {!isLoading &&
                recentBoards.map((project, index) => {
                  const colors = ['#3b82f6', '#c084fc', '#ec4899', '#60a5fa']
                  return (
                    <div
                      key={project.id}
                      className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-slate-50"
                    >
                      <div
                        className="h-10 w-10 rounded-md"
                        style={{ background: colors[index % colors.length] }}
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800">
                          {project.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          Trello Không gian làm việc
                        </p>
                      </div>
                    </div>
                  )
                })}
            </div>

            <div className="mt-8">
              <p className="mb-3 font-medium text-slate-700">Liên kết</p>

              <button
                onClick={() => setOpenCreateBoard(true)}
                className="flex items-center gap-3 rounded-lg px-2 py-2 text-left text-slate-700 transition hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-slate-100">
                  <Plus size={18} />
                </div>
                <span className="font-medium">Tạo bảng mới</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      <CreateBoardModal
        open={openCreateBoard}
        onClose={() => setOpenCreateBoard(false)}
      />
    </>
  )
}