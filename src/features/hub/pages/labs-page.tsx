export function LabsPage() {
  const items = [
    {
      title: 'AI card suggestions',
      description: 'Đề xuất nội dung thẻ và tóm tắt task bằng AI.',
    },
    {
      title: 'Smart timeline',
      description: 'Tự động nhóm task theo độ ưu tiên và thời hạn.',
    },
    {
      title: 'Board insights',
      description: 'Phân tích sức khỏe bảng và điểm nghẽn công việc.',
    },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900">Labs</h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
          Khu vực thử nghiệm tính năng mới. Phase này là UI mô phỏng, sau đó có thể gắn AI summary, AI risk, smart board action vào đây.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            <button className="mt-5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
              Bật thử nghiệm
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}