export type Point = [number, number, number]

export function smoothRange(value: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)))
  return t * t * (3 - 2 * t)
}

export function journeyTransition(position: number, count: number) {
  const from = Math.floor(position)
  const to = Math.min(from + 1, count - 1)
  return { from, to, blend: from === to ? 0 : smoothRange(position - from, 0.22, 0.78) }
}
