import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTimeline } from '../hooks/use-timeline'

const DAY_WIDTH = 56

export function ProjectTimelinePage() {
  const { projectId = '' } = useParams()
  const { data, isLoading, isError } = useTimeline(projectId)

  const timeline = data?.data
  const items = timeline?.items || []

  const bounds = useMemo(() => {
    const validDates = items.flatMap((item) => {
      const start = new Date(item.startDate)
      const end = item.dueDate ? new Date(item.dueDate) : null
      return end ? [start, end] : [start]
    })

    if (validDates.length === 0) {
      const today = new Date()
      return {
        start: startOfDay(today),
        end: addDays(startOfDay(today), 13),
      }
    }

    const min = new Date(Math.min(...validDates.map((date) => date.getTime())))
    const max = new Date(Math.max(...validDates.map((date) => date.getTime())))

    return {
      start: startOfDay(addDays(min, -2)),
      end: startOfDay(addDays(max, 2)),
    }
  }, [items])

  const days = useMemo(() => {
    const result: Date[] = []
    let current = new Date(bounds.start)

    while (current <= bounds.end) {
      result.push(new Date(current))
      current = addDays(current, 1)
    }

    return result
  }, [bounds])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-24 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-[520px] animate-pulse rounded-3xl bg-slate-100" />
      </div>
    )
  }

  if (isError || !timeline) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600 shadow-sm">
        Khong the tai du lieu timeline.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Timeline</h2>
            <p className="mt-1 text-sm text-slate-500">
              View task theo thoi gian dang gantt-lite style.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            {timeline.project.name} · {timeline.project.projectKey}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[260px_minmax(0,1fr)]">
          <div className="border-r border-slate-200 bg-slate-50 p-4">
            <div className="h-14 border-b border-slate-200 pb-3 text-sm font-semibold text-slate-700">
              Task
            </div>

            <div className="space-y-3 pt-4">
              {items.length === 0 && (
                <div className="rounded-2xl bg-white p-4 text-sm text-slate-500">
                  Chua co task nao de hien thi timeline.
                </div>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-white px-4 py-3"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item.taskCode}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{item.title}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {item.assignee?.fullName || 'Unassigned'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div
              className="min-w-max"
              style={{ width: `${days.length * DAY_WIDTH}px` }}
            >
              <div className="grid h-14 border-b border-slate-200 bg-slate-50">
                <div
                  className="grid"
                  style={{ gridTemplateColumns: `repeat(${days.length}, ${DAY_WIDTH}px)` }}
                >
                  {days.map((day) => (
                    <div
                      key={day.toISOString()}
                      className="flex flex-col items-center justify-center border-r border-slate-100 text-xs text-slate-600"
                    >
                      <span>{formatDayLabel(day)}</span>
                      <span className="text-[10px] text-slate-400">
                        {formatDateLabel(day)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 p-4">
                {items.length === 0 && (
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                    Timeline trong.
                  </div>
                )}

                {items.map((item) => {
                  const bar = getTimelineBar(item.startDate, item.dueDate, bounds.start)

                  return (
                    <div
                      key={item.id}
                      className="relative h-16 rounded-2xl bg-slate-50"
                    >
                      <div
                        className="absolute inset-0 grid"
                        style={{
                          gridTemplateColumns: `repeat(${days.length}, ${DAY_WIDTH}px)`,
                        }}
                      >
                        {days.map((day) => (
                          <div
                            key={`${item.id}-${day.toISOString()}`}
                            className="border-r border-slate-100"
                          />
                        ))}
                      </div>

                      <div
                        className="absolute top-1/2 h-9 -translate-y-1/2 rounded-xl bg-slate-900 px-3 text-white shadow-sm"
                        style={{
                          left: `${bar.left * DAY_WIDTH + 4}px`,
                          width: `${Math.max(bar.width * DAY_WIDTH - 8, 48)}px`,
                        }}
                      >
                        <div className="flex h-full items-center text-xs font-medium">
                          {item.taskCode}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function dayDiff(from: Date, to: Date) {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

function getTimelineBar(startDate: string, dueDate: string | null | undefined, minDate: Date) {
  const start = new Date(startDate)
  const end = dueDate ? new Date(dueDate) : new Date(startDate)

  const left = Math.max(dayDiff(minDate, start), 0)
  const width = Math.max(dayDiff(start, end) + 1, 1)

  return { left, width }
}

function formatDayLabel(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: 'short' })
}

function formatDateLabel(date: Date) {
  return date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })
}