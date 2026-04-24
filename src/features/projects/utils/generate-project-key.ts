export function generateProjectKey(name: string) {
  const cleaned = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()

  const parts = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part.toUpperCase().slice(0, 3))

  const prefix = parts.join('') || 'BOARD'
  const random = Math.floor(100 + Math.random() * 900)

  return `${prefix}_${random}`
}