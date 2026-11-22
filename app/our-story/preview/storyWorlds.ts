import * as T from 'three'
import { createTraveller } from './travellers'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

export const spacing = 18
export const palettes = [
  ['#30495d', '#9ec9cf', '#f7bb70'],
  ['#52758d', '#c5e7f2', '#ffd8a4'],
  ['#513c65', '#ed9bc2', '#ffbc89'],
  ['#92664b', '#ffc377', '#ffda91'],
  ['#725266', '#f2ad93', '#ffce89'],
  ['#30445f', '#7db9cc', '#ffb97b'],
] as const

type V = [number, number, number]
type Motion = (time: number, approach: number) => void
const TAU = Math.PI * 2

function random(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
}

class Batch {
  private parts: T.BufferGeometry[] = []

  add(source: T.BufferGeometry, color: string | undefined, at: V = [0, 0, 0], size: V = [1, 1, 1], yaw = 0) {
    const geometry = source.index ? source.toNonIndexed() : source
    if (source !== geometry) source.dispose()
    geometry.deleteAttribute('uv')
    geometry.scale(...size).rotateY(yaw).translate(...at)
    if (color) {
      const tint = new T.Color(color)
      const colors = new Float32Array(geometry.attributes.position.count * 3)
      for (let i = 0; i < colors.length; i += 3) tint.toArray(colors, i)
      geometry.setAttribute('color', new T.BufferAttribute(colors, 3))
    }
    this.parts.push(geometry)
  }

  box(at: V, size: V, color: string, yaw = 0) {
    this.add(new T.BoxGeometry(), color, at, size, yaw)
  }

  stone(at: V, size: V, color: string, yaw = 0) {
    this.add(new T.IcosahedronGeometry(1, 1), color, at, size, yaw)
  }

  cylinder(at: V, size: V, color: string, top = 1, sides = 8, yaw = 0) {
    this.add(new T.CylinderGeometry(top, 1, 1, sides), color, at, size, yaw)
  }

  mesh(material: T.Material) {
    const geometry = mergeGeometries(this.parts)
    this.parts.forEach(part => part.dispose())
    return new T.Mesh(geometry, material)
  }
}

function surface() {
  const material = new T.MeshStandardMaterial({ vertexColors: true, roughness: 0.77, side: T.DoubleSide })
  material.onBeforeCompile = shader => {
    shader.vertexShader = 'varying vec3 vClayPosition;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\nvClayPosition = position;',
    )
    shader.fragmentShader = 'varying vec3 vClayPosition;\n' + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
        vec3 fleck = floor(vClayPosition * 46.0);
        float grain = fract(sin(dot(fleck, vec3(12.9898, 78.233, 38.719))) * 43758.5453);
        float mottle = sin(vClayPosition.x * 5.5 + vClayPosition.y * 7.0) * sin(vClayPosition.z * 4.2);
        diffuseColor.rgb *= 0.96 + grain * 0.075 + mottle * 0.032;`,
    )
  }
  return material
}
const glow = () => new T.MeshBasicMaterial({ vertexColors: true, side: T.DoubleSide })

const soil = [
  ['#183b3d', '#597b60', '#9d9671'],
  ['#557180', '#aac7cb', '#e5e9dc'],
  ['#314743', '#75816a', '#c0a98b'],
  ['#985834', '#d09a61', '#e9bd83'],
  ['#534b3e', '#a08566', '#c6a786'],
  ['#23505a', '#5f8469', '#a3976a'],
] as const

function noise(x: number, z: number) {
  return Math.sin(x * .69 + z * .71) * .53
    + Math.sin(x * 1.81 - z * 1.37) * .26
    + Math.sin(x * 3.88 + z * 2.49) * .12
    + Math.sin(x * 7.16 - z * 4.74) * .052
}

function landscape(
  width: number, depth: number, nx: number, nz: number,
  sample: (x: number, z: number) => number,
  tint: (x: number, z: number, y: number) => T.Color,
  origin: V = [0, 0, 0],
) {
  const geometry = new T.PlaneGeometry(width, depth, nx, nz).rotateX(-Math.PI / 2)
  const positions = geometry.attributes.position
  const colors = new Float32Array(positions.count * 3)
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i) + origin[0]
    const z = positions.getZ(i) + origin[2]
    const y = sample(x, z)
    positions.setXYZ(i, x, origin[1] + y, z)
    tint(x, z, y).toArray(colors, i * 3)
  }
  geometry.setAttribute('color', new T.BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  return geometry
}

function terrainHeight(index: number, x: number, z: number) {
  const distance = Math.max(0, Math.abs(z - .65) - 3.0)
  const envelope = 1 - Math.min(1, Math.abs(x) / (spacing * .5)) ** 4
  const globalX = x + index * spacing
  const rolling = (noise(globalX * .38, z * .51) + .1) * Math.min(distance * .24, 1.25)
  const dunes = index === 3 ? Math.sin(x * .40 + z * .83 + Math.sin(x * .41)) * Math.min(distance * .29, 1.65) : 0
  const coast = index === 5 ? -T.MathUtils.smoothstep(z + Math.sin(x * .48) * .94, .3, 4) * 1.37 : 0
  return -.035 + (rolling + dunes + coast) * envelope
}

function terrain(index: number) {
  const tone = soil[index].map(c => new T.Color(c))
  const before = new T.Color(soil[Math.max(index - 1, 0)][1])
  const after = new T.Color(soil[Math.min(index + 1, soil.length - 1)][1])
  const middle = new T.Color()
  const color = new T.Color()
  // The six strips meet on the same grade and blend at their boundaries.
  const extension = index === 0 || index === soil.length - 1 ? 18 : 0
  const geometry = landscape(
    spacing + extension, 38, extension ? 108 : 64, 86,
    (x, z) => terrainHeight(index, x, z),
    (x, z, y) => {
      const outside = (index === 0 && x < 0) || (index === soil.length - 1 && x > 0)
      const seam = outside ? 0 : T.MathUtils.smoothstep(Math.abs(x), 5.9, spacing / 2) * .5
      middle.copy(tone[1]).lerp(x < 0 ? before : after, seam)
      const fleck = noise(x * .62 + index * spacing, z * .78)
      return color.copy(middle)
        .lerp(fleck > 0 ? tone[2] : tone[0], Math.abs(fleck) * .56 * (1 - seam * 2))
        .multiplyScalar(1 + Math.min(.13, y * .08))
    },
    [index === 0 ? -extension * .5 : extension * .5, 0, -5],
  )
  return new T.Mesh(geometry, surface())
}

function peak(batch: Batch, at: V, size: V, seed: number, snowy: boolean) {
  const tint = new T.Color()
  const stone = new T.Color(snowy ? '#50677c' : '#3c5c5d')
  const rim = new T.Color(snowy ? '#eef0df' : '#789282')
  const sample = (x: number, z: number) => {
    const bend = Math.sin(z * .58 + seed) * size[0] * .14
    const distance = Math.hypot((x + bend - z * .24) / size[0], z / size[2])
    const base = Math.max(0, 1 - distance)
    const erosion = noise(x * 1.2 + seed, z * 1.07) * Math.min(distance * 2.5, 1)
    return -1.42 + (size[1] + 1.42) * base ** 1.18 * (1 + erosion * .54)
  }
  const geometry = landscape(size[0] * 2.6, size[2] * 2.6, 45, 40, sample, (x, z, y) => {
    const slope = Math.hypot(sample(x + .09, z) - y, sample(x, z + .09) - y) / .09
    const wind = noise(x * .95 + seed, z * .94)
    const coverage = T.MathUtils.smoothstep(y / size[1] + wind * .16 - slope * .033, .27, .53)
    return tint.copy(stone).lerp(rim, coverage).multiplyScalar(.92 + wind * .14)
  })
  // Keep the sculpted colour bands when combining the terrain mesh with scenery.
  batch.add(geometry, undefined, at)
}

function pines(batch: Batch, seed: number, count: number, x: number, z: number, width: number, spread: number, frosted = false) {
  const rng = random(seed)
  for (let i = 0; i < count; i++) {
    const at: V = [x + (rng() - .5) * width, 0, z + (rng() - .5) * spread]
    const h = .56 + rng() * 1.45
    batch.cylinder([at[0], h * .16, at[2]], [h * .065, h * .32, h * .065], '#483d3d', .8, 5)
    for (let j = 0; j < 3; j++) {
      const r = h * (.32 - j * .068)
      batch.cylinder([at[0], h * (.37 + .23 * j), at[2]], [r, h * .5, r], frosted && j > 0 ? '#91b8bb' : ['#26474c', '#395c59', '#56816e'][j], 0, 6)
    }
  }
}

function arch(batch: Batch, x: number, y: number, z: number, width: number, height: number, depth: number, tint: string, yaw = 0) {
  const r = width * .5
  const spring = height * .53
  const shape = new T.Shape()
  shape.moveTo(-r, 0)
  shape.lineTo(-r, height)
  shape.lineTo(r, height)
  shape.lineTo(r, 0)
  shape.lineTo(r * .68, 0)
  shape.lineTo(r * .68, spring)
  shape.absarc(0, spring, r * .68, 0, Math.PI, false)
  shape.lineTo(-r * .68, 0)
  shape.closePath()
  const geo = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: .012, bevelThickness: .012, bevelSegments: 1, curveSegments: 10 })
  geo.translate(0, 0, -depth / 2)
  batch.add(geo, tint, [x, y, z], [1, 1, 1], yaw)
}

function snowFlag(group: T.Group, batch: Batch, motion: Motion[]) {
  batch.cylinder([4.5, .85, 2.05], [.032, 1.7, .032], '#d8d8bf', .88, 7)
  batch.stone([4.5, 1.73, 2.05], [.075, .075, .075], '#f6cf85')
  const cloth = new T.PlaneGeometry(.85, .59, 14, 8).translate(.425, 0, 0)
  const color: number[] = []
  const uv = cloth.attributes.uv
  for (let i = 0; i < uv.count; i++) {
    const x = Math.abs(uv.getX(i) - .5), y = Math.abs(uv.getY(i) - .5)
    const tint = new T.Color(x < .14 && y < .34 || y < .12 && x < .34 ? '#fff4dd' : '#bf2d42')
    color.push(tint.r, tint.g, tint.b)
  }
  cloth.setAttribute('color', new T.Float32BufferAttribute(color, 3))
  const flag = new T.Mesh(cloth, surface())
  flag.position.set(4.5, 1.42, 2.05)
  group.add(flag)
  motion.push(time => {
    const p = cloth.attributes.position
    for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getX(i) * 8 - time * 3.7) * p.getX(i) * .18)
    p.needsUpdate = true
    cloth.computeVertexNormals()
  })
}

function pagoda(batch: Batch, lights: Batch) {
  const x = .75, z = -.95
  batch.box([x, .13, z], [3.9, .26, 3.6], '#9e747f')
  for (let i = 0; i < 5; i++) {
    const w = 2.45 - i * .31
    const y = .3 + i * .91
    batch.box([x, y + .32, z], [w, .68, w * .82], '#713a43')
    batch.box([x, y + .18, z], [w + .08, .11, w * .85], '#ae6350')
    for (let j = -1; j <= 1; j++) {
      lights.box([x + j * w * .27, y + .36, z + w * .42], [w * .12, .31, .026], '#f8b878')
      batch.box([x + j * w * .27, y + .36, z + w * .442], [.027, .32, .03], '#663842')
    }
    const radius = w * .84
    const vertices: number[] = []
    const roof = new T.BufferGeometry()
    const eave = Array.from({ length: 4 }, (_, j) => {
      const angle = Math.PI / 4 + j * Math.PI / 2
      return [Math.cos(angle) * radius, .13, Math.sin(angle) * radius] as V
    })
    for (let j = 0; j < 4; j++) {
      const a = eave[j], b = eave[(j + 1) % 4]
      const mid: V = [(a[0] + b[0]) / 2, -.06, (a[2] + b[2]) / 2]
      const ridge: V = [0, .45, 0]
      vertices.push(...a, ...mid, ...ridge, ...mid, ...b, ...ridge)
      batch.stone([x + a[0], y + .72 + a[1], z + a[2]], [.12, .11, .12], '#597081')
    }
    roof.setAttribute('position', new T.Float32BufferAttribute(vertices, 3))
    roof.computeVertexNormals()
    batch.add(roof, '#30394f', [x, y + .7, z])
    batch.box([x, y + .68, z], [radius * 1.27, .055, radius * 1.27], '#b87f68')
  }
  batch.cylinder([x, 5.22, z], [.045, .86, .045], '#e4b76e', .4, 6)
  for (let i = 0; i < 5; i++) batch.cylinder([x, 4.98 + i * .115, z], [.14 - i * .015, .035, .14 - i * .015], '#b67d51', .8, 8)
}

function blossoms(batch: Batch, seed: number, x: number, z: number, scale: number) {
  const rng = random(seed)
  const bark = '#59404b'
  const colors = ['#a94d79', '#c86c98', '#e995b6', '#f3b7cb', '#ffe0df']

  const trunk = new T.CatmullRomCurve3([
    new T.Vector3(x, 0, z),
    new T.Vector3(x - .13 * scale, .65 * scale, z),
    new T.Vector3(x + .12 * scale, 1.42 * scale, z - .1 * scale),
    new T.Vector3(x + .18 * scale, 1.85 * scale, z - .16 * scale),
  ])
  batch.add(new T.TubeGeometry(trunk, 12, .105 * scale, 8, false), bark)

  for (let b = 0; b < 9; b++) {
    const angle = b / 9 * TAU + rng() * .25
    const reach = (1.0 + rng() * .85) * scale
    const origin = new T.Vector3(
      x + .1 * scale,
      (1.05 + rng() * .45) * scale,
      z,
    )
    const tip = new T.Vector3(
      x + Math.cos(angle) * reach,
      (1.75 + rng() * .75) * scale,
      z + Math.sin(angle) * reach * .72,
    )
    const branch = new T.CatmullRomCurve3([
      origin,
      new T.Vector3(
        (origin.x + tip.x) * .5,
        tip.y - .22 * scale,
        (origin.z + tip.z) * .5,
      ),
      tip,
    ])
    batch.add(
      new T.TubeGeometry(branch, 8, (.035 + rng() * .025) * scale, 5, false),
      bark,
    )

    for (let i = 0; i < 21; i++) {
      const theta = rng() * TAU
      const radius = Math.sqrt(rng()) * .77 * scale
      const size = (.081 + rng() * .13) * scale
      const px = tip.x + Math.cos(theta) * radius
      const py = tip.y + (rng() - .5) * .68 * scale
      const pz = tip.z + Math.sin(theta) * radius * .8
      batch.stone(
        [px, py, pz],
        [size * 1.39, size * (.42 + rng() * .37), size * .77],
        colors[Math.floor(rng() * colors.length)],
        rng() * TAU,
      )
    }
  }

  for (let i = 0; i < 35; i++) {
    const a = rng() * TAU
    const r = Math.sqrt(rng()) * 1.65 * scale
    const size = (.06 + rng() * .11) * scale
    batch.stone(
      [x + Math.cos(a) * r, (1.6 + rng() * 1.1) * scale,
       z + Math.sin(a) * r * .7],
      [size, size * .55, size * .75],
      colors[Math.floor(rng() * colors.length)],
      rng() * TAU,
    )
  }
}

function kyotoAtmosphere(group: T.Group, motion: Motion[]) {
  const rng = random(20261110)
  const count = 120
  const geometry = new T.PlaneGeometry(.12, .19)
  const material = new T.MeshStandardMaterial({
    color: '#ffd2df',
    roughness: .9,
    side: T.DoubleSide,
    transparent: true,
    opacity: .86,
    depthWrite: false,
  })
  const petals = new T.InstancedMesh(geometry, material, count)
  petals.frustumCulled = false
  petals.instanceMatrix.setUsage(T.DynamicDrawUsage)
  group.add(petals)

  const dummy = new T.Object3D()
  const seeds = Array.from({ length: count }, () => ({
    x: rng() * 13 - 6.5,
    y: rng() * 7,
    z: rng() * 9 - 3.5,
    speed: .22 + rng() * .36,
    phase: rng() * TAU,
    scale: .55 + rng() * .85,
  }))

  const colors = ['#fff0e9', '#ffd1df', '#f4a7c4', '#e88fb1']
  const tint = new T.Color()
  seeds.forEach((_, i) => {
    petals.setColorAt(i, tint.set(colors[i % colors.length]))
  })
  if (petals.instanceColor) petals.instanceColor.needsUpdate = true

  const hazeMaterial = new T.MeshBasicMaterial({
    color: '#e9b9d8',
    transparent: true,
    opacity: .075,
    depthWrite: false,
    side: T.DoubleSide,
    blending: T.NormalBlending,
  })

  const haze = Array.from({ length: 3 }, (_, i) => {
    const mesh = new T.Mesh(
      new T.PlaneGeometry(8.5 + i * 2.5, 2.1 + i * .5),
      hazeMaterial.clone(),
    )
    mesh.position.set(i * 1.2 - 2, 1.1 + i * .45, -2.7 - i * 1.5)
    mesh.rotation.x = -.13
    group.add(mesh)
    return mesh
  })
  hazeMaterial.dispose()

  const ambience = new T.PointLight('#ffb6c9', 2.2, 9, 2)
  ambience.position.set(-2.8, 3.5, 1.3)
  group.add(ambience)

  motion.push((time, approach) => {
    for (let i = 0; i < count; i++) {
      const s = seeds[i]
      const fall = ((s.y - time * s.speed) % 7 + 7) % 7

      dummy.position.set(
        s.x + Math.sin(time * .43 + s.phase) * .85 + time * .065 % 2,
        fall - .4,
        s.z + Math.cos(time * .28 + s.phase) * .35,
      )
      dummy.rotation.set(
        time * .7 + s.phase,
        time * .95 + s.phase,
        Math.sin(time + s.phase) * .75,
      )
      dummy.scale.setScalar(s.scale)
      dummy.updateMatrix()
      petals.setMatrixAt(i, dummy.matrix)
    }
    petals.instanceMatrix.needsUpdate = true

    haze.forEach((mesh, i) => {
      mesh.position.x = i * 1.2 - 2 + Math.sin(time * .12 + i) * .9
      mesh.position.y = 1.1 + i * .45 + Math.sin(time * .19 + i) * .12
    })

    ambience.intensity = 2.2 + Math.sin(time * .42) * .35
  })
}

function pyramid(batch: Batch, x: number, z: number, width: number, height: number) {
  const bands = 19
  for (let i = 0; i < bands; i++) {
    const fraction = i / bands
    const r = width * (1 - fraction)
    const top = i === bands - 1 ? 0 : (r - width / bands) / r
    const color = i > bands - 4 ? '#d8b18a' : i % 3 === 0 ? '#bd916b' : '#c59a72'
    batch.cylinder([x, height * (i + .5) / bands, z], [r, height / bands + .008, r], color, top, 4, Math.PI / 4)
  }
}

function colosseum(batch: Batch) {
  const cx = .8, cz = -.65
  const tiers = [22, 22, 16, 10]
  for (let tier = 0; tier < tiers.length; tier++) {
    for (let i = 0; i < tiers[tier]; i++) {
      const a = (i / 22) * TAU + (tier > 1 ? -.45 : 0)
      const rx = 4.15 - tier * .075, rz = 2.65 - tier * .05
      const x = cx + Math.sin(a) * rx, z = cz + Math.cos(a) * rz
      const yaw = Math.atan2(Math.sin(a) * rz, Math.cos(a) * rx)
      const span = Math.hypot(Math.cos(a) * rx, Math.sin(a) * rz) * TAU / 22 + .025
      const y = .16 + tier * 1.03
      const tint = ['#c99271', '#ddab86', '#bc8b74', '#e5b597'][i % 4]
      if (tier === 3) {
        batch.box([x, y + .35, z], [span, .73 + (i % 4) * .06, .35], tint, yaw)
      } else {
        arch(batch, x, y, z, span, .94, .45, tint, yaw)
      }
      batch.box([x, y - .035, z], [span + .045, .14, .53], '#e9b88d', yaw)
      batch.box([x + Math.sin(yaw) * .25, y + .37, z + Math.cos(yaw) * .25], [.07, .66, .075], '#ecc29a', yaw)
    }
  }
  batch.cylinder([cx, .11, cz], [4.3, .22, 2.82], '#a36f5d', 1, 22)
  batch.cylinder([cx, .27, cz], [2.75, .27, 1.67], '#ac8069', 1, 20)
}

function railScene(group: T.Group, batch: Batch, motion: Motion[]) {
  for (let i = -4; i <= 4; i++) {
    const x = i * 1.22
    arch(batch, x, -.02, .9, 1.22, 1.64, .61, i % 2 ? '#9b8382' : '#867984')
    batch.box([x, 1.57, .9], [1.27, .16, .81], '#b18d79')
  }
  for (const side of [-1, 1]) {
    batch.box([side * 7.15, .72, .9], [3.5, 1.54, 1.21], '#6f7065')
    batch.box([side * 7.15, 1.55, .9], [3.5, .13, .82], '#958975')
  }
  for (const z of [.68, 1.12]) batch.box([0, 1.68, z], [17.7, .04, .035], '#e8c389')

  const train = new Batch()
  const lamps = new Batch()
  for (let i = 0; i < 4; i++) {
    const x = i * -1.06
    train.box([x, .35, 0], [1.01, .46, .5], i ? '#285657' : '#243447')
    train.box([x, .61, 0], [1.02, .09, .55], '#a97151')
    train.box([x, .12, 0], [.98, .15, .51], '#282c3e')
    for (let j = -1; j <= 1; j++) lamps.box([x + j * .27, .4, .258], [.15, .135, .022], '#ffc888')
    for (const side of [-1, 1]) {
      const wheel = new T.CylinderGeometry(.115, .115, .052, 8).rotateX(Math.PI / 2)
      train.add(wheel, '#6d544c', [x + side * .31, .087, .237])
    }
  }
  train.cylinder([.28, .74, 0], [.08, .2, .08], '#514753', .74, 6)
  lamps.stone([.51, .4, .02], [.06, .07, .08], '#fff0b5')
  const convoy = new T.Group()
  const carriage = surface()
  const windows = glow()
  for (const material of [carriage, windows]) {
    material.transparent = true
    material.alphaTest = .03
  }
  convoy.add(train.mesh(carriage), lamps.mesh(windows))
  group.add(convoy)
  const vapor = new Batch()
  vapor.stone([0, 0, 0], [.55, .37, .34], '#c1d3ce')
  vapor.stone([-.31, .18, 0], [.42, .29, .26], '#d4ddd6')
  const puff = vapor.mesh(new T.MeshStandardMaterial({ vertexColors: true, transparent: true, opacity: .38, depthWrite: false, flatShading: true }))
  group.add(puff)
  motion.push(time => {
    const crossing = (time + 10) % 22
    const visibility = T.MathUtils.smoothstep(crossing, 0, 2.2) * (1 - T.MathUtils.smoothstep(crossing, 19.6, 22))
    convoy.position.set(-7.9 + crossing * .76, 1.68, .9)
    carriage.opacity = windows.opacity = visibility
    puff.material.opacity = visibility * .38
    puff.position.set(convoy.position.x - .23 - Math.sin(time * .5) * .3, 2.62, .92)
    puff.scale.setScalar(.73 + Math.sin(time * .8) * .16)
  })
}

function coast(group: T.Group, batch: Batch, lights: Batch, motion: Motion[]) {
  const rng = random(42)
  for (let i = 0; i < 19; i++) {
    const tier = Math.floor(i / 7)
    const x = -3.1 + (i % 7) * .88 + tier * .45
    const y = .25 + tier * .57 + rng() * .19
    const z = -1.1 - tier * 1.02
    const h = .43 + rng() * .4
    const w = .47 + rng() * .23
    batch.box([x, y - .23, z], [w * 1.32, .58, .87], '#9b776e')
    batch.box([x, y + h / 2, z], [w, h, .68], ['#dfae90', '#c58e7a', '#efc9a5'][i % 3])
    batch.box([x, y + h, z], [w + .07, .09, .75], '#96615e')
    lights.box([x - .07, y + h * .57, z + .345], [.086, .12, .021], '#ffd082')
  }
  batch.cylinder([2.38, 2.08, -3.06], [.35, .95, .35], '#e6c6aa', .95, 8)
  batch.stone([2.38, 2.61, -3.06], [.4, .25, .4], '#718eaa')
  const waterGeometry = new T.PlaneGeometry(spacing, 20, 80, 52).rotateX(-Math.PI / 2).translate(0, -.21, 7.8)
  const waterTime = { value: 0 }
  const waterMaterial = new T.MeshStandardMaterial({
    color: '#39898a', roughness: .33, metalness: .23, emissive: '#173c52', emissiveIntensity: .39,
  })
  waterMaterial.onBeforeCompile = shader => {
    shader.uniforms.waterTime = waterTime
    shader.vertexShader = 'uniform float waterTime;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      transformed.y += sin(position.z * 3.2 - waterTime * 1.3 + position.x * .68) * .035
        + sin(position.x * 1.1 + position.z * 1.4 + waterTime * .52) * .021;`,
    )
  }
  group.add(new T.Mesh(waterGeometry, waterMaterial))
  const ripples = new Batch()
  for (let i = 0; i < 34; i++) {
    const x = (rng() - .5) * 9, z = 2.2 + rng() * 1.8
    ripples.box([x, -.04 + i * .0001, z], [.19 + rng() * .65, .017, .018], i % 2 ? '#83b8ba' : '#5e98a8')
  }
  const waves = ripples.mesh(surface())
  group.add(waves)
  const sail = new Batch()
  sail.stone([0, .04, 0], [.42, .115, .12], '#744750')
  sail.cylinder([0, .3, 0], [.013, .55, .013], '#c8b197', 1, 5)
  const canvas = new T.BufferGeometry()
  canvas.setAttribute('position', new T.Float32BufferAttribute([0, .55, 0, 0, .12, 0, .34, .15, .035], 3))
  canvas.computeVertexNormals()
  sail.add(canvas, '#f7d7a4')
  const boat = sail.mesh(surface())
  const secondBoat = boat.clone()
  secondBoat.scale.setScalar(.72)
  group.add(boat, secondBoat)
  motion.push((time, approach) => {
    waterTime.value = time
    waves.position.x = Math.sin(time * .56) * .23
    const heading = time * .095 + .65
    boat.position.set(-1.3 + Math.sin(heading) * 2.1, -.16 + Math.sin(time * 1.15) * .038, 4.0 + Math.cos(heading) * .61)
    boat.rotation.set(0, Math.atan2(-Math.sin(heading) * .61, Math.cos(heading) * 2.1), Math.sin(time * 1.15) * .035)
    const other = time * .072 + 2.4
    secondBoat.position.set(3.15 + Math.sin(other) * 1.3, -.16 + Math.sin(time * .85) * .029, 5.65 + Math.cos(other) * .58)
    secondBoat.rotation.y = Math.atan2(-Math.sin(other) * .58, Math.cos(other) * 1.3)
  })
}

function scenery(group: T.Group, index: number, motion: Motion[]) {
  const characters = [
    { activity: 'railway', at: [3.45, 3.15], coat: '#335c55', trim: '#b38153', hair: 'cap', height: 1.02, build: 1 },
    { activity: 'alpine', at: [3.15, 2.82], coat: '#435873', trim: '#ac6c46', hair: 'cap', height: 1.17, build: 1.05 },
    { activity: 'garden', at: [2.38, 3.0], coat: '#805367', trim: '#e4b696', hair: 'bun', height: .98, build: .96 },
    { activity: 'desert', at: [2.74, 2.89], coat: '#a37755', trim: '#e4ba79', hair: 'braid', height: 1.03, build: 1.22 },
    { activity: 'arches', at: [2.76, 2.78], coat: '#4e686d', trim: '#9e604a', hair: 'bob', height: 1.18, build: 1.24 },
    { activity: 'coast', at: [4.08, -.82], coat: '#557475', trim: '#e1aa73', hair: 'cap', height: 1.02, build: 1 },
  ] as const
  const actor = characters[index]
  const perform = createTraveller(group, { ...actor, at: [...actor.at] }, (x, z) => terrainHeight(index, x, z))
  perform(0)

  const batch = new Batch()
  const lights = new Batch()
  const rng = random(500 + index)
  const rim = [
    ['#708b87', '#586a70', '#394655'],
    ['#c6dde2', '#809cae', '#485c76'],
    ['#9f827d', '#7c5869', '#533f59'],
    ['#ca9b6d', '#a67458', '#785443'],
    ['#b29182', '#967469', '#654e59'],
    ['#79958c', '#557679', '#3b5267'],
  ][index]
  group.add(terrain(index))
  for (let i = 0; i < 35; i++) {
    const angle = rng() * Math.PI
    const r = 3.1 + rng() * 2.4
    const x = Math.cos(angle) * r, z = Math.sin(angle) * r * .65 - (index === 5 ? 2.3 : 0)
    const s = .1 + rng() * .28
    batch.stone([x, terrainHeight(index, x, z), z], [s, s * .43, s * .72], rim[i % 3], rng() * TAU)
  }

  if (index === 0) {
    peak(batch, [-2.9, -.02, -2.8], [3.4, 4.1, 2.9], 28, true)
    peak(batch, [2.15, -.02, -2.5], [3.6, 5.15, 3.0], 9, true)
    pines(batch, 86, 34, 0, -1.0, 13.8, 3.1)
    pines(batch, 19, 9, 6.8, 6.7, 2.8, 3.3)
    pines(batch, 21, 18, -9, 6.2, 5.5, 3.4)
    railScene(group, batch, motion)
  } else if (index === 1) {
    peak(batch, [-3.7, 0, -2.05], [3.25, 4.35, 2.65], 23, true)
    peak(batch, [.02, 0, -2.85], [4.0, 6.15, 2.9], 114, true)
    peak(batch, [3.55, 0, -2.55], [3.1, 4.75, 2.6], 39, true)
    const ice = new T.Color()
    const crevasse = new T.Color('#5b9daf')
    const crust = new T.Color('#c9e5e7')
    const glacier = landscape(3.2, 5.7, 40, 56, (x, z) => {
      const channel = Math.sin((z + 2.1) * .68) * .58 - .45
      const across = Math.abs(x - channel)
      return -.14 + .29 * Math.exp(-((across * 1.1) ** 3)) + .026 * noise(x * 2.4, z * 2.9)
    }, (x, z) => {
      const fold = Math.sin(z * 9.2 + x * x * 4.5 + Math.sin(x * 2.1) * 1.6)
      return ice.copy(crust).lerp(crevasse, .13 + Math.max(0, fold) ** 7 * .43)
    }, [0, 0, .05])
    batch.add(glacier, undefined)
    // The Sphinx observation deck sits on a separate rocky spur above the glacier.
    batch.stone([2.26, .47, -.04], [1.02, .8, .78], '#586e83', .22)
    batch.box([2.27, 1.15, -.08], [1.03, .13, .64], '#b0c4cc')
    batch.box([2.27, 1.32, -.08], [.75, .28, .47], '#385b72')
    batch.box([2.27, 1.49, -.08], [.86, .07, .53], '#bdccd1')
    batch.cylinder([2.43, 1.59, -.15], [.21, .19, .21], '#8da9b8', 1, 12)
    batch.add(new T.SphereGeometry(1, 12, 5, 0, TAU, 0, Math.PI / 2), '#d2e2e4',
      [2.43, 1.68, -.15], [.22, .18, .22])
    for (let i = 0; i < 5; i++) batch.box([1.99 + i * .14, 1.34, .165], [.09, .095, .026], '#edc99d')
    pines(batch, 17, 12, -3.65, .9, 2.5, 1.65, true)
    for (let i = 0; i < 7; i++) batch.stone([5.7 + i * .27, .14, 5.6 + i * .35], [.68, .23, .53], '#cad9d7', i)
    snowFlag(group, batch, motion)
  } else if (index === 2) {
    pagoda(batch, lights)
    const lantern = new T.PointLight('#ffab69', 5.5, 4.9, 1.7)
    lantern.position.set(.48, .85, 1.48)
    group.add(lantern)
    motion.push(time => { lantern.intensity = 5.5 + Math.sin(time * 1.7) * .35 })
    const grove = new Batch()
    for (const [x,z,s] of [[-4,-.8,1.3],[3.8,-1.6,1.4],[-2.55,1.18,.83],[5.1,.13,1],[6.5,5.4,1.38]]) blossoms(grove, Math.round(x * 35), x, z, s)
    const trees = grove.mesh(surface())
    group.add(trees)
    motion.push(time => { trees.rotation.z = Math.sin(time * .49) * .009 })
    for (let i = 0; i < 8; i++) {
      const z = 2.95 - i * .44
      batch.box([.15, .055, z], [1.35 + i * .1, .09, .34], i % 2 ? '#b09494' : '#c0a5a1')
      if (i % 2 === 0) {
        const x = i % 4 === 0 ? -.84 : 1.48
        batch.cylinder([x, .26, z], [.055, .51, .055], '#554652', 1, 6)
        lights.box([x, .51, z], [.22,.19,.18], '#fbc080')
        batch.cylinder([x, .65, z], [.17,.11,.17], '#523c53', .45, 4)
      }
    }
    for (let i = 0; i < 12; i++) {
      const z = 4.5 - i * .20
      const x = 2.68 + Math.sin(i * .31) * .39
      batch.stone([x, terrainHeight(index, x, z), z], [.25, .021, .12], i % 2 ? '#b8aba0' : '#a89b92', .18)
    }
    kyotoAtmosphere(group, motion)
  } else if (index === 3) {
    pyramid(batch, -1.5, -1.05, 3.52, 4.63)
    pyramid(batch, 2.55, -2.55, 2.9, 3.76)
    pyramid(batch, 3.08, .2, 1.45, 1.92)
    desertHaze(group, motion)
  } else if (index === 4) {
    colosseum(batch)
    for (let i = 0; i < 7; i++) {
      const x = -6.9 + i * .55
      const h = 1.05 + (i % 3) * .34
      batch.box([x,h * .5,-5.05],[.54,h,.75], i % 2 ? '#bc8c71' : '#b99a7c')
      batch.box([x,h,-5.05],[.59,.12,.82],'#935f53')
    }
    birds(group, motion)
    const cypresses = new Batch()
    for (let i = 0; i < 8; i++) {
      const x = i < 4 ? -4.8 + rng() * .9 : 4.4 + rng() * .7
      const z = -1.7 + rng() * 1.8
      const h = .9 + rng() * 1.05
      batch.cylinder([x, h * .4, z], [.065,h*.8,.065], '#725650', .75, 6)
      cypresses.stone([x,h*.84,z],[.65,h*.42,.52], i % 2 ? '#667655' : '#829168')
    }
    const canopies = cypresses.mesh(surface())
    group.add(canopies)
    motion.push(time => { canopies.position.x = Math.sin(time * .66) * .041 })
    for (let i = 0; i < 10; i++) batch.box([-2.55 + i * .47, .05, 2.92 - (i % 3) * .12], [.39,.11,.24], '#c4a693', i * .05)
  } else {
    peak(batch, [-3.7, -.07, -6.2], [5.1, 3.3, 4.1], 52, false)
    peak(batch, [2.2, -.08, -6.9], [4.8, 2.85, 4.3], 61, false)
    coast(group, batch, lights, motion)
  }
  group.add(batch.mesh(surface()))
  if ([2, 5].includes(index)) group.add(lights.mesh(glow()))
  if (index === 0 || index === 4 || index === 5) windPlants(group, index, motion)
  return perform
}

function desertHaze(group: T.Group, motion: Motion[]) {
  const elapsed = { value: 0 }
  const material = new T.ShaderMaterial({
    uniforms: { elapsed },
    transparent: true,
    depthWrite: false,
    side: T.DoubleSide,
    vertexShader: `varying vec2 v;
      uniform float elapsed;
      void main() {
        v = uv;
        vec3 p = position;
        p.y += sin(p.x * 2.0 - elapsed * 1.3) * .075;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: `varying vec2 v;
      uniform float elapsed;
      void main() {
        float edge = pow(max(0.0, 1.0 - length((v - .5) * vec2(2.0, 2.0))), 1.5);
        float flow = sin(v.x * 22.0 + v.y * 11.0 - elapsed * 2.1) * .26 + .62;
        gl_FragColor = vec4(.94, .68, .44, edge * flow * .13);
      }`,
  })
  const shimmer = new T.Mesh(new T.PlaneGeometry(13, 1.22, 30, 1), material)
  shimmer.position.set(0, .47, -3.2)
  group.add(shimmer)
  motion.push(time => {
    elapsed.value = time
    shimmer.position.x = Math.sin(time * .21) * 1.15
  })
}

function windPlants(group: T.Group, index: number, motion: Motion[]) {
  const rng = random(index * 256 + 19)
  const geometry = new T.PlaneGeometry(.062, .65, 1, 4).translate(0, .325, 0)
  const positions = geometry.attributes.position
  for (let i = 0; i < positions.count; i++) {
    const height = positions.getY(i) / .65
    positions.setX(i, positions.getX(i) * (1 - .93 * height) + height ** 2 * .095)
  }
  geometry.computeVertexNormals()
  const time = { value: 0 }
  const material = new T.MeshStandardMaterial({ color: '#e9e5cd', roughness: .94, side: T.DoubleSide })
  material.onBeforeCompile = shader => {
    shader.uniforms.windTime = time
    shader.vertexShader = 'uniform float windTime;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      float phase = instanceMatrix[3].x * .62 + instanceMatrix[3].z * .81;
      transformed.x += sin(windTime * 1.65 + phase) * position.y * position.y * .55;`,
    )
  }
  const plants = new T.InstancedMesh(geometry, material, 156)
  const placement = new T.Object3D()
  const colors = index === 5 ? ['#566c48', '#82925b', '#bb9d63'] : ['#465e45', '#71835a', '#999260']
  for (let i = 0; i < plants.count; i++) {
    const x = (i % 3 === 0 ? 5.1 : -4.0) + (rng() - .5) * 3.8
    const z = index === 5 ? rng() * 1.7 - 1.1 : 4.3 + rng() * 3.8
    placement.position.set(x, terrainHeight(index, x, z), z)
    placement.rotation.set(0, rng() * TAU, (rng() - .5) * .39)
    placement.scale.setScalar(.42 + rng() * .86)
    placement.updateMatrix()
    plants.setMatrixAt(i, placement.matrix)
    plants.setColorAt(i, new T.Color(colors[i % colors.length]))
  }
  group.add(plants)
  motion.push(elapsed => { time.value = elapsed })
}

function birds(group: T.Group, motion: Motion[]) {
  const flock = new T.Group()
  for (let i = 0; i < 5; i++) {
    const pair = new T.Group()
    for (const side of [-1, 1]) {
      const wing = new T.BufferGeometry()
      wing.setAttribute('position', new T.Float32BufferAttribute([
        0, 0, 0, side * .19, .025, -.12, side * .37, .04, -.21,
        0, 0, 0, side * .37, .04, -.21, side * .13, 0, .031,
      ], 3))
      pair.add(new T.Mesh(wing, new T.MeshBasicMaterial({color: '#675363', side: T.DoubleSide})))
    }
    pair.position.set(-i * .59, Math.sin(i * .9) * .34, -i * .27)
    flock.add(pair)
  }
  group.add(flock)
  motion.push(time => {
    const course = time * .24
    flock.position.set(Math.sin(course) * 4.4 - .7, 5.15 + Math.sin(time * .4) * .21, -5.1 + Math.cos(course) * 2.1)
    flock.rotation.y = Math.atan2(Math.cos(course) * 4.4, -Math.sin(course) * 2.1)
    flock.children.forEach((pair, i) => {
      pair.children.forEach((wing, side) => { wing.rotation.z = Math.sin(time * 5.8 + i) * .49 * (side ? 1 : -1) })
    })
  })
}

function air(group: T.Group, index: number, motion: Motion[], mist: T.Texture) {
  const rng = random(188 + index * 5)
  const count = index === 1 ? 112 : index === 2 ? 80 : 54
  const positions = new Float32Array(count * 3)
  const seeds = Array.from({ length: count }, () => [rng(), rng(), rng(), rng()])
  const geometry = new T.BufferGeometry()
  geometry.setAttribute('position', new T.BufferAttribute(positions, 3).setUsage(T.DynamicDrawUsage))
  const material = new T.PointsMaterial({
    color: palettes[index][1], map: mist, size: index === 2 ? .17 : .093,
    transparent: true, opacity: index === 3 ? .47 : .75, depthWrite: false, sizeAttenuation: true,
  })
  const dust = new T.Points(geometry, material)
  dust.frustumCulled = false
  group.add(dust)
  motion.push(time => {
    for (let i = 0; i < count; i++) {
      const [x, y, z, speed] = seeds[i]
      const fall = (y + 1 - time * (.014 + speed * .023) % 1) % 1
      const wind = index === 3 ? (x + time * (.027 + speed * .031)) % 1 : x
      positions[i * 3] = wind * 14 - 7 + Math.sin(time * .55 + i) * .3
      positions[i * 3 + 1] = index === 3 ? fall ** 2 * 2.65 + .05 : fall * 8 - 1.15
      positions[i * 3 + 2] = z * 12 - 6
    }
    geometry.attributes.position.needsUpdate = true
  })
}

function horizon(group: T.Group, index: number, motion: Motion[], mist: T.Texture) {
  const palette = palettes[index]
  const skyline = new T.Color(palette[0])
  const ridgeTint = new T.Color(palette[1])
  for (const layer of [0, 1]) {
    const shade = new T.Color()
    const ridge = landscape(spacing, 12, 54, 29, (x, z) => {
      const global = x + index * spacing
      const height = (Math.sin(global * .29 + layer) + Math.sin(global * .68 - layer) * .48 + 1.58)
      return height * (layer ? 1.42 : 1.05) * Math.exp(-(((z + 15 + layer * 8) / 3.7) ** 2))
        + noise(global * .53, z * .52) * .24
    }, (x, z, y) => shade.copy(skyline).lerp(ridgeTint, .07 + y * .055 + noise(x, z) * .05), [0, -.65, -15 - layer * 8])
    group.add(new T.Mesh(ridge, surface()))
  }
  const haze = new Batch()
  for (let i = 0; i < 6; i++) {
    haze.stone([i * 2.9 - 7.3, -1.35 + (i % 2) * 1.09, -5.0 - i % 3], [2.7, .16 + (i % 3) * .13, .68], palette[1])
  }
  const clouds = haze.mesh(new T.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: .18, depthWrite: false }))
  group.add(clouds)
  const veils = [-1, 1, 2].map(side => {
    const sprite = new T.Sprite(new T.SpriteMaterial({
      map: mist, color: palette[1], transparent: true, opacity: index === 3 ? .31 : .26, depthWrite: false,
    }))
    sprite.scale.set(side === 2 ? 16 : 10, side === 2 ? 2.6 : 1.85, 1)
    sprite.position.set(side * 3.4, side === 2 ? 4.1 : -.57 + side * .44, side === 2 ? -13 : 4 - side * 1.4)
    group.add(sprite)
    return sprite
  })
  motion.push(time => {
    clouds.position.x = Math.sin(time * .21 + index) * .8
    veils.forEach((sprite, i) => {
      sprite.position.x = (i === 2 ? 2.8 : (i * 2 - 1) * 3.4) + Math.sin(time * .18 + i + index) * (i === 2 ? 2.0 : .92)
    })
  })
}

export function createStoryWorlds() {
  const width = 32
  const pixels = new Uint8Array(width * width * 4)
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < width; x++) {
      const radius = Math.hypot((x + .5) / width * 2 - 1, (y + .5) / width * 2 - 1)
      const offset = (y * width + x) * 4
      pixels.set([255, 255, 255, 255 * Math.max(0, 1 - radius ** 2) ** 3], offset)
    }
  }
  const mist = new T.DataTexture(pixels, width, width)
  mist.minFilter = mist.magFilter = T.LinearFilter
  mist.needsUpdate = true
  const worlds = palettes.map((_, index) => {
    const group = new T.Group()
    group.position.x = spacing * index
    const motion: Motion[] = []
    horizon(group, index, motion, mist)
    const perform = scenery(group, index, motion)
    air(group, index, motion, mist)
    motion.forEach(update => update(0, 0))
    return { group, motion, perform }
  })

  return {
    worlds,
    dispose() {
      mist.dispose()
      const geometries = new Set<T.BufferGeometry>()
      const materials = new Set<T.Material>()
      for (const { group } of worlds) {
        group.traverse(object => {
          if (object instanceof T.InstancedMesh) object.dispose()
          if (object instanceof T.Mesh || object instanceof T.Points) {
            geometries.add(object.geometry)
            if (Array.isArray(object.material)) object.material.forEach(material => materials.add(material))
            else materials.add(object.material)
          } else if (object instanceof T.Sprite) materials.add(object.material)
        })
      }
      geometries.forEach(geometry => geometry.dispose())
      materials.forEach(material => material.dispose())
    },
  }
}
