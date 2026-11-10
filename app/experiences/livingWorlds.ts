import * as THREE from 'three'
import type { JourneyWorld } from './ExperienceWorldScene'
import type { Point } from './journeyMotion'

type Animate = (time: number) => void
type Wisp = { at: Point; width: number; opacity: number; rise?: number; offset?: number }
export type WorldMotion = 'foliage' | 'flame' | 'flag' | 'lotus'

export function createLivingWorld(world: JourneyWorld, mist: THREE.Texture, mote: THREE.Texture, scenery: THREE.Group) {
  const group = new THREE.Group()
  const animations: Animate[] = []
  const restore: (() => void)[] = []
  const resources = new Set<THREE.Material | THREE.BufferGeometry | THREE.InstancedMesh>()

  function add<T extends THREE.Object3D & { material: THREE.Material; geometry?: THREE.BufferGeometry }>(object: T) {
    resources.add(object.material)
    if (object.geometry) resources.add(object.geometry)
    group.add(object)
    return object
  }

  function wisps(specs: Wisp[], color = world.accent) {
    specs.forEach(({ at, width, opacity, rise = 0, offset }, i) => {
      const material = new THREE.SpriteMaterial({ map: mist, color, transparent: true, depthWrite: false })
      const sprite = new THREE.Sprite(material)
      // Three's sprite quad is shared internally.
      resources.add(material)
      group.add(sprite)
      animations.push(time => {
        const phase = (time * 0.23 + (offset ?? i * 0.618)) % 1
        const drift = Math.sin(time * 0.45 + i)
        sprite.position.set(at[0] + (rise ? phase * width * 0.82 : drift * width * 0.38), at[1] + phase * rise, at[2])
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
    const tint = new THREE.Color()
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.frustumCulled = false
    for (let i = 0; i < count; i++) mesh.setColorAt(i, tint.set(colors[i % colors.length]))
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
            opacity = edge * smoothstep(0.0, 0.12, p.y) * (0.34 + 0.32 * stream + 0.29 * pow(run, 2.0));
          #else
            float wave = sin(p.y * 56.0 + sin(p.x * 17.0 + uTime * 0.54) * 1.8 - uTime * 1.24);
            float crest = smoothstep(0.6, 1.0, wave);
            #ifdef POOL
              float pane = pow(0.5 + 0.5 * cos((p.x + wave * 0.055) * 25.0), 4.0);
              float glint = pow(crest, 4.0) * pow(0.5 + 0.5 * sin(p.x * 48.0 - uTime + p.y * 11.0), 7.0);
              opacity = (0.09 + 0.48 * pane) * (0.3 + crest * 0.7) * (0.4 + p.y * 0.6) + glint * 0.42;
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

  function lanterns(positions: Point[], hanging: boolean) {
    const length = hanging ? 0.16 : 0.23
    const color = '#ffb56e'
    instances(new THREE.CylinderGeometry(0.72, 1, 1, 6), [color, '#ffd49b'], positions.length, (object, i, time) => {
      const [x, y, z] = positions[i]
      const sway = Math.sin(time * 1.48 + i * 0.78)
      const flicker = 1 + Math.sin(time * 2.1 + i * 1.7) * 0.065
      object.position.set(x + sway * (hanging ? 0.067 : 0.21), y + sway * (hanging ? 0.009 : 0.18), z)
      object.rotation.z = sway * 0.28
      object.scale.set(length * 0.36 * flicker, length * flicker, length * 0.32 * flicker)
    })
  }

  function warmLight(at: Point, color: string, intensity: number, distance: number) {
    const light = new THREE.PointLight(color, intensity, distance)
    light.position.set(...at)
    group.add(light)
    animations.push(time => {
      light.intensity = intensity * (0.9 + 0.08 * Math.sin(time * 2.2) + 0.02 * Math.sin(time * 5.4))
    })
  }

  function airborne(origin: Point, radius: Point, count: number, butterfly = false) {
    const wing = new THREE.BufferGeometry()
    wing.setAttribute('position', new THREE.Float32BufferAttribute([
      0, 0, 0.36, 0, 0, -0.42, 0.5, 0, -0.2,
      0, 0, 0.36, 0.5, 0, -0.2, 1, 0, butterfly ? -0.5 : -0.72,
    ], 3))
    const pose = new THREE.Object3D()
    const hinge = new THREE.Object3D()
    pose.add(hinge)
    instances(wing, butterfly ? ['#f6cd7c', '#f6aa7d', '#fff0ae'] : ['#423039', '#644b48'],
      count * 2, (object, i, time) => {
        const bird = Math.floor(i / 2)
        const phase = time * (butterfly ? 0.67 : 0.48) + bird * 2.399963
        const side = i % 2 ? -1 : 1
        pose.position.set(origin[0] + Math.cos(phase) * radius[0],
          origin[1] + Math.sin(phase * 2 + bird) * radius[1], origin[2] + Math.sin(phase) * radius[2])
        pose.rotation.set(0.13, Math.atan2(-Math.sin(phase) * radius[0], Math.cos(phase) * radius[2]), 0.23)
        const size = (butterfly ? 0.115 : 0.205) - bird % 3 * 0.014
        pose.scale.setScalar(size)
        hinge.rotation.z = (side < 0 ? Math.PI : 0) + side * (0.18 + Math.sin(time * (butterfly ? 15 : 8.5) + bird) * 0.64)
        pose.updateMatrixWorld(true)
        hinge.matrixWorld.decompose(object.position, object.quaternion, object.scale)
      })
  }

  function driftingSparks(at: Point, spread: Point, colors: string[], count: number) {
    instances(new THREE.OctahedronGeometry(1), colors, count, (object, i, time) => {
      const phase = (time * (0.38 + i % 3 * 0.03) + i * 0.618) % 1
      const angle = i * 2.399963 + phase * 0.9
      const radius = Math.sin(phase * Math.PI / 2)
      object.position.set(at[0] + Math.cos(angle) * spread[0] * radius,
        at[1] + phase * spread[1], at[2] + Math.sin(angle) * spread[2] * radius)
      const size = (0.022 + (i % 3) * 0.007) * Math.sin(phase * Math.PI)
      object.rotation.set(time + i, time * 2 + i, angle)
      object.scale.set(size, size * 1.8, size)
    })
  }

  scenery.traverse(object => {
    const motion = object.userData.worldMotion as WorldMotion | undefined
    if (!motion) return
    const { x, y, z } = object.rotation
    const height = object.position.y
    const scaleY = object.scale.y
    const offset = object.position.x * 2.1 + object.position.z * 0.8
    restore.push(() => {
      object.rotation.set(x, y, z)
      object.position.y = height
      object.scale.y = scaleY
    })
    animations.push(time => {
      switch (motion) {
        case 'foliage':
          object.rotation.z = z + Math.sin(time * 1.8 + offset) * (world.id === 'adventure' ? 0.16 : 0.075)
          object.rotation.x = x + Math.sin(time * 1.21 + offset) * 0.045
          break
        case 'flame':
          object.scale.y = scaleY * (1 + 0.19 * Math.sin(time * 6.1 + offset) + 0.08 * Math.sin(time * 12.8))
          object.rotation.z = z + Math.sin(time * 5.4 + offset) * 0.19
          break
        case 'flag':
          object.rotation.y = y + Math.sin(time * 4.1) * 0.64
          object.rotation.x = x + Math.sin(time * 3.3) * 0.19
          break
        case 'lotus':
          object.position.y = height + Math.sin(time * 1.45 + offset) * 0.045
          object.rotation.y = y + Math.sin(time * 0.82 + offset) * 0.21
          object.rotation.z = z + Math.sin(time * 1.32 + offset) * 0.11
          break
      }
    })
  })

  switch (world.id) {
    case 'local-flavours': {
      lanterns([[-1.43, 1.43, 0.92], [-0.74, 1.52, 0.83], [-0.04, 1.43, 0.74]], true)
      warmLight([-0.84, 1.2, 1.2], '#ffb163', 5, 2.8)
      // These roof peaks correspond to houses 0, 5, 7, and 10 in CliffVillage.
      const chimneys: Point[] = [[-1.215, 0.97, -0.70], [-0.205, 1.47, -1.43],
        [1.315, 1.77, -1.43], [0.505, 1.97, -2.16]]
      wisps(chimneys.flatMap((at, i) => [0, 1, 2].map(puff => ({
        at, width: 0.55, opacity: 0.42, rise: 1.2, offset: i * 0.19 + puff / 3,
      }))), '#e0bda4')
      airborne([0, 2.42, -0.78], [2.15, 0.28, 1.0], 5)
      driftingSparks([0.14, 0.32, 0.87], [0.75, 0.75, 0.48], ['#ffb659', '#f6d399'], 13)
      break
    }
    case 'luxury-escapes': {
      const pool = surface(new THREE.PlaneGeometry(2.3, 0.85), '#ffcd9a', 'pool')
      pool.rotation.x = -Math.PI / 2
      pool.position.set(0, 0.217, 0.91)
      warmLight([0, 1.12, 0.02], '#ffc998', 6, 3.4)
      instances(new THREE.IcosahedronGeometry(1, 0), ['#ead3b2', '#efa897', '#f9dfc8'], 9, (object, i, time) => {
        const phase = time * 0.62 + i * 2.399963
        object.position.set((i % 5 - 2) * 0.41 + Math.sin(phase) * 0.12,
          0.228 + Math.sin(phase * 2) * 0.006, 0.9 + (i % 3 - 1) * 0.2 + Math.cos(phase) * 0.055)
        object.rotation.y = phase * 0.68
        object.scale.set(0.057, 0.012, 0.038)
      })
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
        vertices.setXYZ(i, 0.49 + down * 0.31 + vertices.getX(i) * (0.18 + down * 0.5),
          1.65 - down * 1.56, -0.16 + down * 0.86)
      }
      surface(ribbon, '#e3edf0', 'fall')
      instances(new THREE.IcosahedronGeometry(1, 0), ['#c8dee1', '#edf2df'], 23, (object, i, time) => {
        const phase = (time * (0.85 + i % 5 * 0.08) + i * 0.618) % 1
        const angle = i * 2.399963
        object.position.set(0.81 + Math.cos(angle) * phase * 0.84,
          0.15 + Math.sin(phase * Math.PI) * (0.14 + (i % 5) * 0.09),
          0.72 + Math.sin(angle) * phase * 0.52)
        const size = (0.022 + i % 3 * 0.008) * Math.sin(phase * Math.PI)
        object.scale.set(size, size * 1.9, size)
      })
      wisps([
        { at: [-2.36, 1.32, -0.9], width: 2.7, opacity: 0.42 },
        { at: [2.08, 1.1, -1.8], width: 2.8, opacity: 0.35 },
      ], '#ded4cf')
      wisps([
        { at: [0.81, 0.19, 0.72], width: 1.48, opacity: 0.63 },
        { at: [1.41, 0.33, 0.98], width: 1.84, opacity: 0.39 },
        { at: [-1.21, 0.65, -0.21], width: 1.83, opacity: 0.30 },
      ], '#eed9b9')
      break
    }
    case 'cultural-connections':
      lanterns([[-1.66, 1.25, -0.15], [-1.37, 1.92, -0.48], [-0.78, 2.44, -0.3],
        [0.57, 2.71, -0.45], [1.67, 2.14, -0.31], [1.91, 1.49, 0.29]], false)
      warmLight([0.85, 0.94, 1.29], '#ffc37a', 6, 3.1)
      driftingSparks([0.85, 0.86, 1.2], [0.95, 1.4, 0.72], ['#efb767', '#ffe1a3'], 17)
      wisps([
        { at: [-1.15, 0.51, 0.93], width: 0.62, opacity: 0.44, rise: 0.58 },
        { at: [1.15, 0.51, 0.93], width: 0.62, opacity: 0.44, rise: 0.58 },
      ])
      break
    case 'romance':
      warmLight([-0.92, 0.96, 1.37], '#ffb98c', 4.6, 2.55)
      airborne([-0.66, 0.88, 1.34], [0.91, 0.3, 0.46], 4, true)
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
      airborne([-0.54, 0.87, 1.16], [1.12, 0.36, 0.48], 6, true)
      warmLight([-0.88, 0.81, 1.67], '#ffcb84', 4.3, 2.8)
      driftingSparks([0.53, 0.46, 1.12], [0.37, 0.83, 0.27], ['#efaa53', '#f5d498'], 12)
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
      airborne([0.14, 1.89, 0.16], [2.17, 0.25, 0.76], 4)
      wisps([
        { at: [-1.7, 0.26, 0.44], width: 2.1, opacity: 0.43 },
        { at: [0.44, 0.14, 1.4], width: 2.7, opacity: 0.38 },
        { at: [0.25, 0.68, -1.23], width: 3.4, opacity: 0.31 },
      ], '#c2d4bd')
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
      restore.forEach(reset => reset())
    },
  }
}
