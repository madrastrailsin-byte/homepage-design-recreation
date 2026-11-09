import * as THREE from 'three'
import type { JourneyWorld } from './ExperienceWorldScene'
import type { Point } from './journeyMotion'

type Animate = (time: number) => void
type Wisp = { at: Point; width: number; opacity: number; rise?: number }

export function createLivingWorld(world: JourneyWorld, mist: THREE.Texture, mote: THREE.Texture) {
  const group = new THREE.Group()
  const animations: Animate[] = []
  const resources = new Set<THREE.Material | THREE.BufferGeometry | THREE.InstancedMesh>()

  function add<T extends THREE.Object3D & { material: THREE.Material; geometry?: THREE.BufferGeometry }>(object: T) {
    resources.add(object.material)
    if (object.geometry) resources.add(object.geometry)
    group.add(object)
    return object
  }

  function wisps(specs: Wisp[], color = world.accent) {
    specs.forEach(({ at, width, opacity, rise = 0 }, i) => {
      const material = new THREE.SpriteMaterial({ map: mist, color, transparent: true, depthWrite: false })
      const sprite = new THREE.Sprite(material)
      // Three's sprite quad is shared internally.
      resources.add(material)
      group.add(sprite)
      animations.push(time => {
        const phase = (time * 0.23 + i * 0.618) % 1
        const drift = Math.sin(time * 0.45 + i)
        sprite.position.set(at[0] + drift * width * 0.22, at[1] + phase * rise, at[2])
        const spread = rise ? width * (0.72 + phase * 0.5) : width
        sprite.scale.set(spread, spread * (rise ? 0.75 : 0.34), 1)
        material.opacity = opacity * (rise ? Math.sin(phase * Math.PI) : 0.88 + drift * 0.12)
      })
    })
  }

  function instances(
    geometry: THREE.BufferGeometry,
    colors: string[],
    count: number,
    pose: (object: THREE.Object3D, i: number, time: number) => void,
  ) {
    const mesh = add(new THREE.InstancedMesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), count))
    resources.add(mesh)
    const object = new THREE.Object3D()
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false
    for (let i = 0; i < count; i++) mesh.setColorAt(i, new THREE.Color(colors[i % colors.length]))
    animations.push(time => {
      for (let i = 0; i < count; i++) {
        pose(object, i, time)
        object.updateMatrix()
        mesh.setMatrixAt(i, object.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true
    })
  }

  function surface(geometry: THREE.BufferGeometry, color: string, mode: 'pool' | 'pond' | 'fall') {
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uTint: { value: new THREE.Color(color) },
      },
      defines: { [mode.toUpperCase()]: 1 },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uTint;
        void main() {
          vec2 p = vUv;
          float opacity;
          #ifdef FALL
            float edge = smoothstep(0.0, 0.18, p.x) * smoothstep(0.0, 0.18, 1.0 - p.x);
            float stream = 0.5 + 0.5 * sin(p.x * 52.0 + sin(p.y * 15.0 + p.x * 8.0));
            float run = 0.5 + 0.5 * sin(p.y * 46.0 + uTime * 4.5 + p.x * 11.0);
            opacity = edge * smoothstep(0.0, 0.12, p.y) * (0.4 + 0.25 * stream + 0.18 * run);
          #else
            float wave = sin(p.y * 56.0 + sin(p.x * 17.0 + uTime * 0.54) * 1.8 - uTime * 1.24);
            float crest = smoothstep(0.6, 1.0, wave);
            #ifdef POOL
              float pane = pow(0.5 + 0.5 * cos((p.x + wave * 0.027) * 22.0), 2.0);
              opacity = (0.12 + 0.29 * pane) * (0.35 + crest * 0.65) * (1.0 - p.y);
            #else
              float r = length((p - 0.5) * vec2(1.0, 0.75));
              float ring = smoothstep(0.72, 1.0, sin(r * 83.0 - uTime * 1.5));
              opacity = (0.10 * crest + 0.22 * ring) * smoothstep(0.0, 0.10, r) * (1.0 - smoothstep(0.30, 0.49, r));
            #endif
          #endif
          gl_FragColor = vec4(uTint, opacity);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    })
    const mesh = add(new THREE.Mesh(geometry, material))
    animations.push(time => { material.uniforms.uTime.value = time })
    return mesh
  }

  function lanterns(positions: Point[], colors: string[], hanging: boolean) {
    instances(new THREE.SphereGeometry(1, 8, 5), colors, positions.length, (object, i, time) => {
      const [x, y, z] = positions[i]
      const sway = Math.sin(time * 1.12 + i * 0.8)
      const flicker = 1 + Math.sin(time * 2.1 + i * 1.7) * 0.09
      object.position.set(x + sway * (hanging ? 0.032 : 0.006), y + sway * 0.009, z)
      object.rotation.z = sway * 0.18
      object.scale.set(0.052 * flicker, (hanging ? 0.073 : 0.052) * flicker, 0.043 * flicker)
    })
  }

  switch (world.id) {
    case 'local-flavours': {
      const positions: Point[] = Array.from({ length: 13 }, (_, i) => {
        const offset = (i - 6) / 6
        return [offset * 1.74, 0.22 + 0.85 + offset * offset * 0.25, -0.07]
      })
      lanterns(positions, ['#ff9c48', '#ffd7a2'], true)
      wisps([
        { at: [0.14, 0.29, 0.39], width: 0.8, opacity: 0.58, rise: 0.67 },
        { at: [0.14, 0.26, 0.39], width: 0.63, opacity: 0.50, rise: 0.57 },
        { at: [-1.12, 0.83, -0.74], width: 1.0, opacity: 0.38, rise: 0.73 },
        { at: [0.58, 1.32, -1.46], width: 0.86, opacity: 0.30, rise: 0.65 },
      ])
      break
    }
    case 'luxury-escapes': {
      const pool = surface(new THREE.PlaneGeometry(2.3, 0.85), '#ffcd9a', 'pool')
      pool.rotation.x = -Math.PI / 2
      pool.position.set(0, 0.217, 0.91)
      wisps([
        { at: [-1.6, 0.29, -1.31], width: 1.65, opacity: 0.24 },
        { at: [1.64, 0.13, 0.85], width: 1.05, opacity: 0.22 },
      ])
      break
    }
    case 'adventure': {
      const ribbon = new THREE.PlaneGeometry(1, 1, 1, 8)
      const vertices = ribbon.getAttribute('position')
      const uv = ribbon.getAttribute('uv')
      for (let i = 0; i < vertices.count; i++) {
        const down = 1 - uv.getY(i)
        vertices.setXYZ(i, 0.49 + down * 0.31 + vertices.getX(i) * (0.11 + down * 0.24),
          1.65 - down * 1.56, -0.16 + down * 0.86)
      }
      surface(ribbon, '#eed9b9', 'fall')
      wisps([
        { at: [0.81, 0.19, 0.72], width: 1.48, opacity: 0.63 },
        { at: [1.41, 0.33, 0.98], width: 1.84, opacity: 0.39 },
        { at: [-1.21, 0.65, -0.21], width: 1.83, opacity: 0.30 },
      ], '#eed9b9')
      break
    }
    case 'cultural-connections':
      lanterns([[-1.15, 0.48, 0.93], [1.15, 0.48, 0.93], [-0.28, 0.19, 0.79], [0.28, 0.19, 0.79]], ['#ebc28a', '#dbaf63'], false)
      wisps([
        { at: [-1.15, 0.51, 0.93], width: 0.62, opacity: 0.44, rise: 0.58 },
        { at: [1.15, 0.51, 0.93], width: 0.62, opacity: 0.44, rise: 0.58 },
      ])
      break
    case 'romance':
      instances(new THREE.SphereGeometry(1, 6, 4), ['#cc797c', '#e4a6a0', '#edb8c2'], 21, (object, i, time) => {
        const phase = (time * (0.09 + i % 3 * 0.012) + i * 0.618) % 1
        const sway = Math.sin(time * 1.2 + i)
        const size = (0.049 + i % 4 * 0.012) * Math.min(1, phase * 10, (1 - phase) * 10)
        object.position.set((i * 13 % 23) / 8 - 1.64 + phase * 0.65 + sway * 0.12,
          1.93 - phase * 1.7, -0.62 + (i * 7 % 13) * 0.19)
        object.rotation.set(time * 1.5 + i, sway, time * 0.6 + i)
        object.scale.set(size, size * 0.61, size * 0.18)
      })
      break
    case 'wellness': {
      const pond = surface(new THREE.CircleGeometry(1, 48), '#b4d4c4', 'pond')
      pond.rotation.x = -Math.PI / 2
      pond.position.set(0, 0.119, 0.08)
      pond.scale.set(1.94, 1.22, 1)
      wisps([
        { at: [-1.03, 0.16, 0.46], width: 1.5, opacity: 0.41 },
        { at: [0.96, 0.14, -0.16], width: 1.68, opacity: 0.38 },
        { at: [0.67, 0.05, 1.31], width: 1.13, opacity: 0.27 },
      ])
      break
    }
    case 'family': {
      const cord = (u: number, point = new THREE.Vector3()) => point.set(-1.76 + u * 3.34, 1.47 - 0.93 * u * (1 - u) + u * 0.2, -0.38 - u * 0.17)
      add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(Array.from({ length: 17 }, (_, i) => cord(i / 16))),
        new THREE.LineBasicMaterial({ color: '#a97a55' }),
      ))
      const flags = new THREE.BufferGeometry()
      flags.setAttribute('position', new THREE.Float32BufferAttribute([-0.09, 0, 0, 0.09, 0, 0, -0.012, -0.18, 0.018], 3))
      instances(flags, ['#6da0a4', '#d9a05c', '#edd2a1'], 10, (object, i, time) => {
        const u = (i + 0.85) / 11
        cord(u, object.position)
        object.rotation.set(0.25 + Math.sin(time * 2.3 - i * 0.65) * 0.47, 0, (u - 0.4) * 0.5)
      })
      break
    }
    case 'wildlife-and-nature': {
      const count = 25
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)
      const geometry = new THREE.BufferGeometry()
      const position = new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
      const color = new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
      geometry.setAttribute('position', position)
      geometry.setAttribute('color', color)
      const flies = add(new THREE.Points(geometry, new THREE.PointsMaterial({
        map: mote, transparent: true, depthWrite: false, vertexColors: true, size: 0.21,
        blending: THREE.AdditiveBlending,
      })))
      flies.frustumCulled = false
      const tint = new THREE.Color('#bad0a0')
      animations.push(time => {
        for (let i = 0; i < count; i++) {
          const phase = time * (0.53 + i % 5 * 0.11) + i * 2.399963
          position.setXYZ(i, (i * 13 % 31) / 7.4 - 2 + Math.cos(phase) * 0.23,
            0.22 + (i * 7 % 17) / 15 + Math.sin(phase * 1.3) * 0.13,
            -1.25 + (i * 11 % 23) / 8 + Math.sin(phase) * 0.23)
          const glow = 0.16 + Math.pow(0.5 + Math.sin(phase * 2.3) * 0.5, 3) * 0.84
          color.setXYZ(i, tint.r * glow, tint.g * glow, tint.b * glow)
        }
        position.needsUpdate = color.needsUpdate = true
      })
      break
    }
  }

  let previousTime = -1
  function update(time: number) {
    if (time === previousTime) return
    previousTime = time
    animations.forEach(animate => animate(time))
  }

  update(0)

  return {
    group,
    update,
    dispose() {
      group.removeFromParent()
      resources.forEach(resource => resource.dispose())
    },
  }
}
