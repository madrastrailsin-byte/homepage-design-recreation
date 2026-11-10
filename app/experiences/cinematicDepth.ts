import * as THREE from 'three'
import type { JourneyWorld } from './ExperienceWorldScene'
import type { Point } from './journeyMotion'

type Shape = 'rock' | 'block' | 'spire' | 'trunk'
type Piece = { at: Point; size: Point; color: string; turn: Point }

export function createCinematicDepth(world: JourneyWorld, direction: number, mist: THREE.Texture) {
  const group = new THREE.Group()
  const foreground = new THREE.Group()
  group.add(foreground)
  const materials = new Set<THREE.Material>()
  const geometries: Record<Shape, THREE.BufferGeometry> = {
    rock: new THREE.IcosahedronGeometry(1, 0),
    block: new THREE.BoxGeometry(),
    spire: new THREE.ConeGeometry(1, 1, 6),
    trunk: new THREE.CylinderGeometry(0.66, 1, 1, 6),
  }
  const plane = new THREE.PlaneGeometry(1, 1)
  const solid = new THREE.MeshStandardMaterial({ roughness: 1, flatShading: true })
  materials.add(solid)
  const batches = new Map<THREE.Group, Map<Shape, Piece[]>>([
    [group, new Map()],
    [foreground, new Map()],
  ])
  const outer = 2.79
  const nearZ = 1.16
  const ground = world.ground
  const shaded = new THREE.Color(ground).lerp(new THREE.Color(world.background), 0.52).getStyle()
  const green = '#345e46'
  const leaf = '#597452'

  function piece(shape: Shape, at: Point, size: Point, color: string, turn: Point = [0, 0, 0], near = false) {
    const batch = batches.get(near ? foreground : group)!
    const pieces = batch.get(shape) ?? []
    pieces.push({ at, size, color, turn })
    batch.set(shape, pieces)
  }

  function rock(at: Point, size: Point, turn: Point, near = false) {
    piece('rock', at, size, near ? shaded : ground, turn, near)
  }

  function tree(x: number, y: number, z: number, height: number, kind: 'pine' | 'palm' | 'broadleaf', near = false) {
    piece('trunk', [x, y + height * 0.4, z], [height * 0.047, height * 0.82, height * 0.047], '#685341', [0, 0, direction * 0.1], near)
    if (kind === 'palm') {
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI / 3
        piece('rock', [x + Math.cos(angle) * height * 0.19, y + height * 0.81, z + Math.sin(angle) * height * 0.19],
          [height * 0.26, height * 0.055, height * 0.087], i % 2 ? green : leaf,
          [0, -angle, Math.cos(angle) * -0.28], near)
      }
    } else if (kind === 'pine') {
      piece('spire', [x, y + height * 0.66, z], [height * 0.26, height * 0.87, height * 0.26], green, [0, x, 0.05], near)
      piece('spire', [x - 0.06, y + height * 0.93, z], [height * 0.17, height * 0.64, height * 0.17], leaf, [0, x + 1, 0.05], near)
    } else {
      for (let i = -1; i <= 1; i++) {
        piece('rock', [x + i * height * 0.2, y + height * (i === 0 ? 0.9 : 0.73), z + i * 0.19],
          [height * 0.27, height * 0.24, height * 0.27], i === 0 ? leaf : green, [0.3, i, 0.18], near)
      }
    }
  }

  function gateway(x: number, y: number, z: number, width: number, height: number, stone: string, trim: string, near = false) {
    for (const side of [-1, 1]) {
      const post = x + side * width / 2
      piece('block', [post, y + height * 0.48, z], [width * 0.16, height * 0.96, 0.31], stone, undefined, near)
      piece('block', [post, y + height * 0.08, z], [width * 0.25, height * 0.16, 0.46], trim, undefined, near)
      piece('block', [post, y + height * 0.86, z], [width * 0.23, height * 0.13, 0.41], trim, undefined, near)
    }
    piece('block', [x, y + height, z], [width * 1.29, height * 0.13, 0.47], trim, undefined, near)
    piece('block', [x, y + height * 1.10, z], [width * 1.14, height * 0.11, 0.38], stone, undefined, near)
  }

  function ledge(x: number, y: number, z: number, width: number, near = false) {
    // Two angular faces give the floating ledge a lit cap and a naturally shaded underside.
    rock([x, y - 0.29, z], [width, 0.44, width * 0.73], [0.09, x, 0], near)
    rock([x - 0.12, y - 0.70, z - 0.03], [width * 0.75, 0.65, width * 0.59], [0.18, x + 1, 0.12], near)
  }

  const edge = outer * direction
  const mid = 2.65 * direction
  const far = -3.48 * direction
  ledge(edge, -0.52, nearZ, 1.04, true)
  ledge(mid, -0.04, -2.45, 1.02)
  ledge(far, -0.59, -3.35, 1.25)

  switch (world.id) {
    case 'local-flavours':
      gateway(edge, -0.47, nearZ, 0.95, 1.78, '#774935', '#956248', true)
      piece('block', [edge, 1.44, nearZ], [1.62, 0.12, 0.9], '#3b2328', [0.12, 0, 0], true)
      gateway(mid, 0, -2.45, 1.05, 1.32, '#956248', '#774935')
      tree(far, -0.54, -3.36, 1.68, 'broadleaf')
      break
    case 'luxury-escapes':
      tree(edge, -0.48, nearZ, 2.48, 'palm', true)
      gateway(mid, -0.03, -2.45, 1.5, 1.46, '#d0aa7a', '#694334')
      tree(far, -0.54, -3.36, 2.14, 'palm')
      break
    case 'adventure':
      rock([edge, 0.27, nearZ], [0.88, 1.22, 0.79], [0.24, 0.8, 0.21], true)
      rock([edge + direction * 0.58, 0.9, nearZ - 0.42], [0.74, 1.48, 0.77], [0.12, 0.8, -0.22], true)
      tree(mid, -0.02, -2.45, 1.45, 'pine')
      piece('spire', [far, 0.41, -3.35], [1.22, 2.5, 1.16], '#855d49', [0, 0.46, -0.18])
      break
    case 'cultural-connections':
      gateway(edge, -0.49, nearZ, 1.1, 1.93, '#bc9366', '#795f47', true)
      for (let i = 0; i < 3; i++) {
        const width = 1.5 - i * 0.31
        piece('block', [edge, 1.67 + i * 0.16, nearZ], [width, 0.19, width * 0.57], i % 2 ? '#bc9366' : '#c9a477', undefined, true)
      }
      gateway(mid, -0.02, -2.45, 1.25, 1.32, '#c9a477', '#b98853')
      tree(far, -0.54, -3.36, 1.7, 'broadleaf')
      break
    case 'romance':
      tree(edge, -0.5, nearZ, 2.16, 'broadleaf', true)
      gateway(mid, -0.04, -2.45, 1.27, 1.58, '#9b6c67', '#d6ad78')
      for (let i = 0; i < 7; i++) {
        piece('rock', [mid + (i - 3) * 0.24, 1.63 + Math.sin(i * 0.53) * 0.17, -2.18],
          [0.24, 0.17, 0.18], i % 2 ? '#cc797c' : '#754e59', [0, i, 0.12])
      }
      tree(far, -0.54, -3.36, 1.66, 'broadleaf')
      break
    case 'wellness':
      tree(edge, -0.48, nearZ, 2.1, 'palm', true)
      for (let i = 0; i < 5; i++) {
        const width = 0.67 - i * 0.099
        piece('rock', [mid + i * 0.035, 0.15 + i * 0.26, -2.45], [width, 0.21, width * 0.76], i % 2 ? '#a9aea0' : '#727f78', [0, i, 0.07])
      }
      tree(far, -0.55, -3.35, 1.62, 'palm')
      break
    case 'family':
      tree(edge, -0.49, nearZ, 2.25, 'palm', true)
      gateway(mid, -0.03, -2.45, 1.31, 1.11, '#a97a55', '#826449')
      piece('spire', [mid, 1.26, -2.45], [0.94, 0.55, 0.72], '#6da0a4', [0, 0.47, 0])
      tree(far, -0.54, -3.36, 1.7, 'broadleaf')
      break
    case 'wildlife-and-nature':
      tree(edge, -0.48, nearZ, 2.32, 'pine', true)
      tree(edge + direction * 0.67, -0.52, nearZ - 0.3, 1.55, 'pine', true)
      tree(mid, 0, -2.46, 1.84, 'pine')
      tree(far, -0.54, -3.36, 2.02, 'pine')
      tree(far - direction * 0.6, -0.57, -3.12, 1.43, 'pine')
      break
  }

  const object = new THREE.Object3D()
  const tint = new THREE.Color()
  const meshes: THREE.InstancedMesh[] = []
  batches.forEach((batch, parent) => {
    batch.forEach((pieces, shape) => {
      const mesh = new THREE.InstancedMesh(geometries[shape], solid, pieces.length)
      pieces.forEach(({ at, size, color, turn }, i) => {
        object.position.set(...at)
        object.rotation.set(...turn)
        object.scale.set(...size)
        object.updateMatrix()
        mesh.setMatrixAt(i, object.matrix)
        mesh.setColorAt(i, tint.set(color))
      })
      mesh.computeBoundingSphere()
      parent.add(mesh)
      meshes.push(mesh)
    })
  })

  function gradient(mode: 'shaft' | 'shadow', opacity: number) {
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTint: { value: new THREE.Color(mode === 'shaft' ? '#ffe4cb' : world.background) }, uOpacity: { value: opacity } },
      defines: { [mode.toUpperCase()]: 1 },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uTint;
        uniform float uOpacity;
        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          #ifdef SHAFT
            float beam = exp(-11.0 * p.x * p.x / (1.1 - p.y * 0.65));
            float falloff = smoothstep(0.0, 0.8, vUv.y) * (1.0 - smoothstep(0.77, 1.0, vUv.y));
            float alpha = beam * falloff * (1.0 - smoothstep(0.68, 1.0, abs(p.x)));
          #else
            float alpha = 1.0 - smoothstep(0.0, 1.0, length(p));
          #endif
          gl_FragColor = vec4(uTint, alpha * uOpacity);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    })
    materials.add(material)
    return new THREE.Mesh(plane, material)
  }

  for (let i = 0; i < 2; i++) {
    const shaft = gradient('shaft', i === 0 ? 0.28 : 0.17)
    shaft.position.set(direction * (0.8 + i * 1.8), 2.0 + i * 0.38, -3.15 - i * 1.1)
    shaft.scale.set(2.55 - i * 0.43, 10, 1)
    shaft.rotation.z = -direction * 0.41
    group.add(shaft)
  }

  for (const [parent, x, y, z] of [[group, mid, 0.054, -2.45], [foreground, edge, -0.426, nearZ]] as const) {
    const shadow = gradient('shadow', 0.72)
    shadow.position.set(x, y, z)
    shadow.rotation.x = -Math.PI / 2
    shadow.scale.set(1.6, 1.03, 1)
    parent.add(shadow)
  }

  const veil = new THREE.Color(world.background).lerp(new THREE.Color(world.accent), 0.48)
  const cloud = new THREE.SpriteMaterial({ map: mist, color: veil, opacity: 0.47, depthWrite: false })
  materials.add(cloud)
  const midMist = new THREE.Sprite(cloud)
  midMist.position.set(mid - direction * 0.62, -0.58, -1.5)
  midMist.scale.set(5.3, 1.68, 1)
  group.add(midMist)
  const farMist = new THREE.Sprite(cloud)
  farMist.position.set(far, -0.34, -4.25)
  farMist.scale.set(7.1, 1.64, 1)
  group.add(farMist)
  const nearMist = new THREE.Sprite(cloud)
  nearMist.position.set(edge, -0.86, nearZ + 0.56)
  nearMist.scale.set(3.85, 1.16, 1)
  foreground.add(nearMist)

  return {
    group,
    update(travel: number, arrival: number, narrow: boolean, time: number) {
      foreground.position.x = direction * ((narrow ? 0.74 : -0.22) + travel * 0.41 + arrival * 1.4)
      foreground.position.z = travel * 0.18
      midMist.position.x = mid - direction * 0.62 + Math.sin(time * 0.29) * 0.84
      nearMist.position.x = edge + Math.sin(time * 0.43 + 1) * 0.62
      farMist.position.x = far + Math.sin(time * 0.17 + 2) * 1.5
      group.visible = arrival < 0.94
    },
    dispose() {
      group.removeFromParent()
      meshes.forEach(mesh => mesh.dispose())
      Object.values(geometries).forEach(geometry => geometry.dispose())
      plane.dispose()
      materials.forEach(material => material.dispose())
    },
  }
}
