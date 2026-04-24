import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCreateProject } from '../hooks/use-projects'
import { generateProjectKey } from '../utils/generate-project-key'

type CreateBoardModalProps = {
  open: boolean
  onClose: () => void
}

const imageBackgrounds = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
]

const colorBackgrounds = [
  '#dbeafe',
  '#67e8f9',
  '#2563eb',
  '#7c3aed',
  '#e879f9',
]

export function CreateBoardModal({
  open,
  onClose,
}: CreateBoardModalProps) {
  const navigate = useNavigate()
  const createProjectMutation = useCreateProject()

  const [title, setTitle] = useState('')
  const [visibility, setVisibility] = useState('workspace')
  const [selectedImage, setSelectedImage] = useState(imageBackgrounds[0])
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const previewStyle = useMemo(() => {
    if (selectedColor) {
      return { background: selectedColor }
    }

    return {
      backgroundImage: `url(${selectedImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }, [selectedImage, selectedColor])

  if (!open) return null

  const handleCreate = async () => {
    if (!title.trim()) return

    try {
      const payload = {
        name: title.trim(),
        projectKey: generateProjectKey(title),
        description: 'Board được tạo từ modal Trello-style',
      }

      const result = await createProjectMutation.mutateAsync(payload)
      const projectId = result.data.id

      onClose()
      setTitle('')

      if (projectId) {
        navigate(`/projects/${projectId}/board`)
      }
    } catch (error) {
      console.error('Create board failed', error)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
        >
          <X size={18} />
        </button>

        <h2 className="mb-4 text-center text-xl font-semibold text-slate-900">
          Tạo bảng
        </h2>

        <div className="mb-4 flex justify-center">
          <div
            className="h-32 w-64 rounded-xl p-3 shadow-inner"
            style={previewStyle}
          >
            <div className="flex h-full items-center justify-center gap-3 rounded-lg bg-white/20 backdrop-blur-[1px]">
              <div className="h-20 w-14 rounded bg-white/90" />
              <div className="h-20 w-14 rounded bg-white/90" />
              <div className="h-20 w-14 rounded bg-white/90" />
            </div>
          </div>
        </div>

        <p className="mb-2 text-sm font-medium text-slate-700">Phông nền</p>

        <div className="mb-3 grid grid-cols-4 gap-2">
          {imageBackgrounds.map((bg) => (
            <button
              key={bg}
              type="button"
              onClick={() => {
                setSelectedImage(bg)
                setSelectedColor(null)
              }}
              className={`h-12 rounded-lg border-2 bg-cover bg-center ${
                !selectedColor && selectedImage === bg
                  ? 'border-slate-900'
                  : 'border-transparent'
              }`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
        </div>

        <div className="mb-5 grid grid-cols-6 gap-2">
          {colorBackgrounds.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`h-10 rounded-lg border-2 ${
                selectedColor === color ? 'border-slate-900' : 'border-transparent'
              }`}
              style={{ background: color }}
            />
          ))}

          <button
            type="button"
            className="h-10 rounded-lg bg-slate-100 text-lg font-bold text-slate-500"
          >
            ...
          </button>
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Tiêu đề bảng <span className="text-red-500">*</span>
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề bảng"
          className="mb-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {!title.trim() && (
          <p className="mb-4 text-sm text-amber-600">
            👋 Tiêu đề bảng là bắt buộc
          </p>
        )}

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Quyền xem
        </label>

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="mb-4 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none"
        >
          <option value="workspace">Không gian làm việc</option>
          <option value="private">Riêng tư</option>
          <option value="public">Công khai</option>
        </select>

        <div className="mb-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
          Không gian làm việc này còn 7 bảng. Các không gian làm việc miễn phí
          chỉ có thể có 10 bảng mở.
        </div>

        <button
          type="button"
          className="mb-3 flex w-full items-center justify-center rounded-xl bg-violet-100 px-4 py-2.5 font-medium text-violet-700"
        >
          🎒 Bắt đầu dùng thử miễn phí
        </button>

        <button
          type="button"
          onClick={handleCreate}
          disabled={!title.trim() || createProjectMutation.isPending}
          className="mb-3 w-full rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          {createProjectMutation.isPending ? 'Đang tạo...' : 'Tạo mới'}
        </button>

        <button
          type="button"
          className="w-full rounded-xl bg-slate-100 px-4 py-2.5 font-medium text-slate-700"
        >
          Bắt đầu với Mẫu
        </button>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          Bằng cách sử dụng hình ảnh từ Unsplash, bạn đồng ý với giấy phép và điều
          khoản dịch vụ.
        </p>
      </div>
    </div>
  )
}

/**
 * Alias để tương thích với các file cũ đang import CreateProjectModal
 */
export { CreateBoardModal as CreateProjectModal }