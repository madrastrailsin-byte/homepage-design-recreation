import { useCallback, useEffect, useRef, type RefObject } from 'react'
import styles from './Destinations.module.css'

export function useIntelCircuit(
  layout: RefObject<HTMLDivElement | null>,
  stage: RefObject<HTMLDivElement | null>,
  panel: RefObject<HTMLElement | null>,
  svg: RefObject<SVGSVGElement | null>,
  overview: RefObject<HTMLDivElement | null>,
  clearance: RefObject<HTMLDivElement | null>,
) {
  const trace = useRef<SVGPathElement>(null)
  const branches = useRef<SVGPathElement>(null)
  const junctions = useRef<SVGCircleElement[]>([])
  const geometry = useRef<{ frame: DOMRect; canvas: DOMRect; stage: DOMRect; panel: DOMRect; overlay: SVGSVGElement }>(null)

  useEffect(() => {
    const root = layout.current
    const globe = stage.current
    const hud = panel.current
    const overlay = svg.current
    const brief = overview.current
    const spacer = clearance.current
    if (!root || !globe || !hud || !overlay || !brief || !spacer) return
    const desktop = window.matchMedia('(min-width: 1021px)')
    trace.current = overlay.querySelector('#atlas-intel-trace')
    branches.current = overlay.querySelector('#atlas-intel-branches')
    junctions.current = [...overlay.querySelectorAll<SVGCircleElement>('[data-intel-junction]')]

    let canvas: HTMLCanvasElement | null = null
    const measure = () => {
      if (!canvas) return
      const frame = root.getBoundingClientRect()
      if (desktop.matches) {
        const top = Math.ceil(brief.getBoundingClientRect().bottom - frame.top + 16)
        const offset = `${top}px`
        if (hud.style.getPropertyValue('--intel-dock-top') !== offset) hud.style.setProperty('--intel-dock-top', offset)
        const openingBottom = root.parentElement?.getBoundingClientRect().bottom ?? frame.bottom
        const height = `${Math.max(0, Math.ceil(frame.top + top + hud.offsetHeight + 16 - openingBottom))}px`
        if (spacer.style.height !== height) spacer.style.setProperty('height', height)
      }
      geometry.current = {
        frame, canvas: canvas.getBoundingClientRect(),
        stage: globe.getBoundingClientRect(), panel: hud.getBoundingClientRect(), overlay,
      }
    }
    const resize = new ResizeObserver(measure)
    resize.observe(root)
    resize.observe(globe)
    resize.observe(hud)
    resize.observe(brief)
    desktop.addEventListener('change', measure)
    const findCanvas = () => {
      const next = globe.querySelector('canvas')
      if (next !== canvas) {
        if (canvas) resize.unobserve(canvas)
        canvas = next
        if (canvas) resize.observe(canvas)
      }
      measure()
    }
    const canvasObserver = new MutationObserver(findCanvas)
    canvasObserver.observe(globe, { childList: true, subtree: true })
    findCanvas()
    return () => {
      resize.disconnect()
      canvasObserver.disconnect()
      desktop.removeEventListener('change', measure)
      geometry.current = null
    }
  }, [layout, stage, panel, svg, overview, clearance])

  return useCallback((u?: number, v?: number) => {
    const bounds = geometry.current
    if (!bounds) return
    const { frame, canvas, stage, panel, overlay } = bounds
    const markerX = u === undefined ? NaN : canvas.left + canvas.width * u
    const markerY = v === undefined ? NaN : canvas.top + canvas.height * v
    const visible = markerX >= stage.left && markerX <= stage.right
      && markerY >= stage.top && markerY <= stage.bottom
    const connected = String(visible && panel.width > 0)
    if (overlay.dataset.connected !== connected) overlay.setAttribute('data-connected', connected)
    if (connected === 'false') return

    const x = Math.round(markerX - frame.left)
    const y = Math.round(markerY - frame.top)
    const sidePort = panel.right < stage.left
    let d: string
    let spur: string
    let relays: [number, number][]
    if (sidePort) {
      const endX = Math.round(panel.right - frame.left)
      const endY = Math.round(panel.top + panel.height * .36 - frame.top)
      const lane = Math.round(stage.left - frame.left - 6)
      const turn = Math.sign(endY - y)
      const bevel = Math.max(0, Math.min(18, (x - lane) / 2, Math.abs(endY - y) / 2))
      const elbow = Math.round((x + lane + bevel) / 2)
      d = `M${x} ${y} H${lane + bevel} l${-bevel} ${bevel * turn} V${endY - bevel * turn} l${-bevel} ${bevel * turn} H${endX}`
      spur = `M${elbow} ${y} l-9 -9 h-20 l-6 -6 h-15 M${elbow - 15} ${y - 9} l-6 6 h-14 M${lane} ${endY - 28 * turn} l-9 ${-9 * turn} v${-16 * turn} l-7 ${-7 * turn} h-12 M${endX + 23} ${endY} l-9 9 h-8 l-6 6 h-6`
      relays = [[elbow, y], [lane, endY - 28 * turn], [endX + 23, endY]]
    } else {
      const endX = Math.round(panel.left + panel.width * .79 - frame.left)
      const endY = Math.round(panel.top - frame.top)
      const turn = Math.sign(endX - x)
      const bevel = Math.min(22, Math.max(0, (endY - y - 12) / 2), Math.abs(endX - x) / 2)
      const bend = endY - 2 * bevel - 8
      const mid = Math.round((bend + y) / 2)
      const cross = Math.round((endX + x) / 2)
      d = `M${x} ${y} V${bend} l${bevel * turn} ${bevel} H${endX - bevel * turn} l${bevel * turn} ${bevel} V${endY}`
      spur = `M${x} ${mid} l-9 9 v10 l-6 6 h-12 M${cross} ${bend + bevel} l7 -7 h18 l7 -7 h9 M${endX} ${endY - 8} l8 -8 h8 m0 -2 v4 M${endX} ${endY - 5} l-6 -6 h-6`
      relays = [[x, mid], [cross, bend + bevel], [endX, endY - 8]]
    }

    junctions.current.forEach((node, index) => {
      const [cx, cy] = relays[index]
      if (node.getAttribute('cx') !== String(cx)) node.setAttribute('cx', String(cx))
      if (node.getAttribute('cy') !== String(cy)) node.setAttribute('cy', String(cy))
    })
    if (trace.current?.getAttribute('d') !== d) trace.current?.setAttribute('d', d)
    if (branches.current?.getAttribute('d') !== spur) branches.current?.setAttribute('d', spur)
  }, [])
}

export function IntelCircuit({ svg, ready, closing, onSignalComplete, onRetractionComplete }: {
  svg: RefObject<SVGSVGElement | null>
  ready: boolean
  closing: boolean
  onSignalComplete: () => void
  onRetractionComplete: () => void
}) {
  return (
    <svg ref={svg} className={styles.intelCircuit} data-ready={ready} data-closing={closing} aria-hidden="true">
      <defs>
        <path id="atlas-intel-trace" pathLength="1" />
        <path id="atlas-intel-branches" pathLength="1" />
        <marker id="atlas-intel-terminal" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" markerUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="3.4" fill="#071521" stroke="#cbb27e" />
          <circle cx="4.5" cy="4.5" r="1.5" fill="#ffe1a2" />
        </marker>
      </defs>
      <use href="#atlas-intel-branches" className={styles.intelBranches} />
      <use href="#atlas-intel-branches" className={styles.intelBranchSignal} onAnimationEnd={onSignalComplete} />
      <use href="#atlas-intel-trace" className={styles.intelWire} onTransitionEnd={event => {
        if (closing && event.propertyName === 'stroke-dashoffset'
          && parseFloat(getComputedStyle(event.currentTarget).strokeDashoffset) >= .99) onRetractionComplete()
      }} />
      <use href="#atlas-intel-trace" className={styles.intelOrigin}
        markerStart="url(#atlas-intel-terminal)" />
      <use href="#atlas-intel-trace" className={styles.intelTerminal}
        markerEnd="url(#atlas-intel-terminal)" />
      <g className={styles.intelJunctions}>
        <circle data-intel-junction r="2" />
        <circle data-intel-junction r="2" />
        <circle data-intel-junction r="2" />
      </g>
      <use href="#atlas-intel-trace" className={styles.intelSignal} />
      <use href="#atlas-intel-trace" className={styles.intelEcho} />
    </svg>
  )
}
