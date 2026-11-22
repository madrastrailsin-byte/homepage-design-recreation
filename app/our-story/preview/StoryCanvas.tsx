'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Component, useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import * as T from 'three'
import { createStoryWorlds, palettes, spacing } from './storyWorlds'
import styles from './journey.module.css'

export type StoryPlayhead = { position: number; camera: number; animate: boolean }
// Each composition gets its own lens distance and focal point. Interpolate only
// along the existing playhead so reverse navigation follows the same camera path.
const shots = [
  { distance: 17.4, elevation: 4.15, target: 1.36, offset: 3.42 },
  { distance: 16.25, elevation: 4.55, target: 1.77, offset: 3.25 },
  { distance: 15.65, elevation: 3.82, target: 1.48, offset: 3.05 },
  { distance: 16.35, elevation: 3.55, target: 1.60, offset: 3.4 },
  { distance: 15.8, elevation: 3.67, target: 1.47, offset: 3.24 },
  { distance: 17.15, elevation: 4.10, target: 1.1, offset: 3.52 },
]

type Props = { playhead: RefObject<StoryPlayhead>; redraw: RefObject<(() => void) | null> }

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

function CinematicWorld({ playhead, redraw }: Props) {
  const invalidate = useThree(state => state.invalidate)
  const { worlds, dispose } = useMemo(createStoryWorlds, [])
  const sky = useMemo(() => new T.ShaderMaterial({
    uniforms: { shade: { value: new T.Color() }, light: { value: new T.Color() }, progress: { value: 0 } },
    depthWrite: false,
    depthTest: false,
    vertexShader: /* glsl */ `
      varying vec2 screenUV;
      void main() {
        screenUV = uv;
        gl_Position = vec4(position.xy, 0.999, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 screenUV;
      uniform vec3 shade;
      uniform vec3 light;
      uniform float progress;
      float cloud(vec2 p) {
        float broad = sin(p.x * 1.4 + sin(p.y * 1.6)) * sin(p.y * 1.8 - p.x * .41);
        float fine = sin(p.x * 3.4 - p.y * 2.8) * cos(p.y * 2.3 + p.x * 2.1);
        return smoothstep(.08,.91,broad + fine * .24);
      }
      void main() {
        vec2 uv = screenUV;
        float horizon = exp(-abs(uv.y - 0.52) * 4.5);
        float bloom = exp(-length((uv - vec2(0.77, 0.67)) * vec2(1.35, 1.0)) * 4.2);
        float veil = cloud(vec2(uv.x * 6.0 - progress * .35, uv.y * 13.0)) * horizon;
        float shafts = pow(max(0.0, cos((uv.x - uv.y * .72 - .39) * 6.2)), 18.0) * bloom;
        vec3 tint = shade * (0.28 + 0.61 * horizon) + light * (0.14 * bloom + 0.076 * veil + .11 * shafts);
        gl_FragColor = vec4(tint, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  }), [])
  const tone = useMemo(() => palettes.map(([shade, , sun]) => [new T.Color(shade), new T.Color(sun)]), [])
  const warmFill = useMemo(() => new T.Color('#fff0df'), [])
  const fog = useMemo(() => new T.Fog('#445771', 13, 47), [])
  const key = useRef<T.DirectionalLight>(null)
  const sun = useRef<T.Mesh<T.SphereGeometry, T.MeshBasicMaterial>>(null)
  const runtime = useMemo(() => ({ time: 0, visible: true, performances: worlds.map(() => 0) }), [worlds])

  useEffect(() => {
    redraw.current = invalidate
    return () => { redraw.current = null }
  }, [invalidate, redraw])

  useEffect(() => () => { dispose(); sky.dispose() }, [dispose, sky])

  useEffect(() => {
    const onVisibility = () => {
      runtime.visible = !document.hidden
      if (runtime.visible) invalidate()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [invalidate, runtime])

  useFrame(({ camera, size }, delta) => {
    const { position, camera: path, animate } = playhead.current
    const elapsed = delta < .25 ? delta : 0
    if (animate && runtime.visible) {
      runtime.time += elapsed
      invalidate()
    }

    const index = Math.min(worlds.length - 1, Math.floor(path))
    const next = Math.min(worlds.length - 1, index + 1)
    const fraction = path - index
    const aspect = size.width / Math.max(1, size.height)
    const narrow = aspect < 1.16
    const local = position - Math.floor(position)
    const drift = animate ? Math.sin(local * Math.PI * 2) * .38 : 0
    const advance = animate ? Math.sin(local * Math.PI) * .64 : 0
    const shot = shots[index]
    const nextShot = shots[next]
    const lerp = T.MathUtils.lerp
    const offset = narrow ? Math.max(0, (aspect - .65) * 3) : lerp(shot.offset, nextShot.offset, fraction)
    const x = path * spacing + drift
    const portraitDolly = Math.max(0, .74 - aspect) * 42

    const distance = narrow ? 22.1 + portraitDolly : lerp(shot.distance, nextShot.distance, fraction)
    const elevation = narrow ? 5.6 : lerp(shot.elevation, nextShot.elevation, fraction)
    const focus = narrow ? -.83 : lerp(shot.target, nextShot.target, fraction)
    camera.position.set(x - offset - 1.38, elevation, distance - advance)
    camera.lookAt(x - offset, focus, 0)
    sky.uniforms.shade.value.copy(tone[index][0]).lerp(tone[next][0], fraction)
    sky.uniforms.light.value.copy(tone[index][1]).lerp(tone[next][1], fraction)
    sky.uniforms.progress.value = path
    fog.color.copy(sky.uniforms.shade.value).multiplyScalar(.68)
    fog.near = 13 + portraitDolly
    fog.far = 47 + portraitDolly
    if (key.current) {
      key.current.color.copy(sky.uniforms.light.value).lerp(warmFill, .57)
      key.current.intensity = 3.1 + Math.sin(runtime.time * .22) * .18
    }
    if (sun.current) {
      sun.current.position.set(x + 3.9, 4.25 + Math.sin(path * 1.2) * .5, -14.5)
      sun.current.material.color.copy(sky.uniforms.light.value).lerp(fog.color, .16)
    }

    for (const [i, { group, motion, perform }] of worlds.entries()) {
      group.visible = Math.abs(i - path) < (narrow ? 1.05 : 1.23)
      if (group.visible) {
        for (const update of motion) update(animate ? runtime.time : 0, T.MathUtils.clamp(position - i, 0, 1))
        if (animate && runtime.visible && Math.abs(i - path) < .68) {
          runtime.performances[i] += elapsed
        }
        perform(animate ? runtime.performances[i] : 0)
      }
    }
  })

  return (
    <>
      <primitive object={fog} attach="fog" />
      <hemisphereLight args={['#dbe6f4', '#526269', 1.12]} />
      <directionalLight ref={key} position={[5, 6, -3]} color="#ffe4be" intensity={3.1} />
      <directionalLight position={[-5, 3, 6]} color="#d9ecf5" intensity={1.5} />
      <mesh renderOrder={-1000} frustumCulled={false} material={sky}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      <mesh ref={sun}>
        <sphereGeometry args={[1.22, 24, 16]} />
        <meshBasicMaterial fog={false} />
      </mesh>
      {worlds.map(({ group }, i) => <primitive key={i} object={group} />)}
    </>
  )
}

export default function StoryCanvas(props: Props) {
  return (
    <div aria-hidden="true" className={styles.canvas}>
      <CanvasBoundary>
        <Canvas
          camera={{ fov: 41, near: .1, far: 74 }}
          dpr={[1, 1.25]}
          frameloop="demand"
          gl={{ alpha: false, antialias: true, powerPreference: 'low-power' }}
          fallback={null}
        >
          <CinematicWorld {...props} />
        </Canvas>
      </CanvasBoundary>
    </div>
  )
}
