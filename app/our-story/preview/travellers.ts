import * as T from 'three'

export const performanceDuration = 26

type Activity = 'railway' | 'alpine' | 'garden' | 'desert' | 'arches' | 'coast'
type Ground = (x: number, z: number) => number
type Character = {
  activity: Activity
  at: [number, number]
  coat: string
  trim: string
  hair: 'cap' | 'bun' | 'braid' | 'bob'
  height: number
  build: number
}

const smooth = (x: number) => T.MathUtils.smoothstep(x, 0, 1)
const between = (time: number, a: number, b: number) => smooth((time - a) / (b - a))
const cue = (time: number, a: number, b: number, c: number, d: number) => between(time, a, b) * (1 - between(time, c, d))
const blendAngle = (from: number, to: number, weight: number) =>
  from + Math.atan2(Math.sin(to - from), Math.cos(to - from)) * weight

export function createTraveller(parent: T.Group, actor: Character, ground: Ground) {
  const rig = new T.Group()
  const body = new T.Group()
  rig.add(body)
  parent.add(rig)

  const cloth = new T.MeshStandardMaterial({ color: actor.coat, roughness: .83 })
  const accent = new T.MeshStandardMaterial({ color: actor.trim, roughness: .72 })
  const skin = new T.MeshStandardMaterial({ color: '#ba8a71', roughness: .83 })
  const hair = new T.MeshStandardMaterial({ color: actor.hair === 'cap' ? '#35434f' : '#392b31', roughness: .9 })
  const leather = new T.MeshStandardMaterial({ color: '#52453a', roughness: .84 })
  const boot = new T.MeshStandardMaterial({ color: '#272b32', roughness: .9 })
  const hardware = new T.MeshStandardMaterial({ color: '#909c9c', roughness: .4, metalness: .4 })
  const sphere = new T.SphereGeometry(1, 12, 9)
  const box = new T.BoxGeometry()
  const cylinder = new T.CylinderGeometry(.78, 1, 1, 10)

  function mesh(container: T.Object3D, geo: T.BufferGeometry, mat: T.Material, at: number[], scale: number[]) {
    const item = new T.Mesh(geo, mat)
    item.position.set(at[0], at[1], at[2])
    item.scale.set(scale[0], scale[1], scale[2])
    container.add(item)
    return item
  }

  const h = actor.height, w = actor.build
  const hipLevel = .824 * h
  const waist = new T.Group()
  waist.position.y = hipLevel
  body.add(waist)
  const skirt = actor.hair !== 'cap'
  mesh(waist, sphere, cloth, [0, .18 * h, 0], [.225 * w, .31 * h, .151 * w])
  mesh(waist, cylinder, cloth, [0, .02 * h, 0], [(skirt ? .224 : .17) * w, (skirt ? .31 : .16) * h, .153 * w])
  mesh(waist, sphere, accent, [0, .38 * h, .016], [.136 * w, .061, .128 * w])
  mesh(waist, sphere, leather, [0, .18 * h, -.161 * w], [.176 * w, .182 * h, .094 * w])
  for (const side of [-1, 1]) {
    const strap = mesh(waist, box, leather, [side * .112 * w, .23 * h, .129 * w], [.032, .28 * h, .03])
    strap.rotation.z = -side * .13
  }

  const head = new T.Group()
  head.position.y = .51 * h
  waist.add(head)
  mesh(head, sphere, skin, [0, 0, .013], [.117 * w, .147 * h, .112])
  mesh(head, sphere, skin, [0, -.012, .113], [.032, .035, .034])
  mesh(head, sphere, hair, [0, .068 * h, -.026], [.123 * w, .107 * h, .12])
  if (actor.hair === 'cap') {
    mesh(head, sphere, accent, [0, .074 * h, .065], [.126 * w, .027, .122])
  } else {
    const drop = actor.hair === 'braid' ? .16 : actor.hair === 'bob' ? .086 : .02
    mesh(head, sphere, hair, [0, .024 - drop * .54, -.089], [.105 * w, .075 + drop, .076])
    if (actor.hair === 'bun') mesh(head, sphere, hair, [0, .07, -.138], [.063, .071, .055])
  }

  const arms = [-1, 1].map(side => {
    const shoulder = new T.Group()
    shoulder.position.set(side * .209 * w, .326 * h, 0)
    waist.add(shoulder)
    mesh(shoulder, sphere, cloth, [0, -.104 * h, 0], [.069 * w, .165 * h, .07])
    const elbow = new T.Group()
    elbow.position.y = -.224 * h
    shoulder.add(elbow)
    mesh(elbow, sphere, cloth, [0, -.09 * h, 0], [.052 * w, .127 * h, .051])
    const hand = new T.Group()
    hand.position.y = -.199 * h
    elbow.add(hand)
    mesh(hand, sphere, skin, [0, 0, 0], [.04, .068, .04])
    return { shoulder, elbow, hand }
  })
  const cameraProp = mesh(arms[1].hand, box, boot, [0, -.047, .039], [.118, .074, .046])
  mesh(cameraProp, cylinder, hardware, [0, 0, 1], [.27, .35, .27]).rotation.x = Math.PI / 2

  const legs = [-1, 1].map(side => ({
    side,
    upper: mesh(rig, cylinder, boot, [0, 0, 0], [1, 1, 1]),
    lower: mesh(rig, cylinder, boot, [0, 0, 0], [1, 1, 1]),
    foot: mesh(rig, sphere, leather, [0, 0, 0], [.081 * w, .066 * h, .144]),
  }))

  const shadow = new T.Mesh(new T.PlaneGeometry(.94 * w, .71), new T.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    vertexShader: 'varying vec2 v; void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: 'varying vec2 v; void main(){gl_FragColor=vec4(.06,.09,.11,.42*pow(max(0.0,1.0-length(v-.5)*2.0),2.0));}',
  }))
  shadow.rotation.x = -Math.PI / 2
  rig.add(shadow)

  const [x, z] = actor.at
  const path = new T.CatmullRomCurve3([
    new T.Vector3(x + .30, 0, z + .92),
    new T.Vector3(x + .66, 0, z + .30),
    new T.Vector3(x, 0, z),
    new T.Vector3(x - .48, 0, z + .44),
  ], true, 'centripetal')
  const point = new T.Vector3(), tangent = new T.Vector3()
  const footA = new T.Vector3(), footB = new T.Vector3(), ankle = new T.Vector3()
  const hip = new T.Vector3(), knee = new T.Vector3(), axis = new T.Vector3()
  const front = new T.Vector3(), upperAxis = new T.Vector3()
  const up = new T.Vector3(0, 1, 0)
  const strideYaw = (u: number) => {
    path.getTangentAt(T.MathUtils.clamp(u, 0, 1), tangent)
    return Math.atan2(tangent.x, tangent.z)
  }

  const footprint = (u: number, side: number, into: T.Vector3) => {
    const yaw = strideYaw(u)
    path.getPointAt(u, into)
    into.x += Math.cos(yaw) * side * .107 * w
    into.z -= Math.sin(yaw) * side * .107 * w
    into.y = ground(into.x, into.z) + .066 * h
    return yaw
  }

  const limb = (item: T.Mesh, a: T.Vector3, b: T.Vector3, radius: number) => {
    upperAxis.subVectors(b, a)
    item.position.copy(a).lerp(b, .5)
    item.scale.set(radius, upperAxis.length() + .046, radius)
    item.quaternion.setFromUnitVectors(up, upperAxis.normalize())
  }

  // The curved out-and-back path closes at the original footprint and heading.
  // Feet advance only during swing. Each stance holds a fixed terrain sample.
  return (elapsed: number) => {
    const time = elapsed % performanceDuration
    const outgoing = time < 6
    const returning = time >= 19
    const walking = outgoing || returning
    const walk = outgoing ? between(time, 0, 6) : returning ? between(time, 19, 26) : 1
    const begin = returning ? .5 : 0
    const u = begin + walk * .5
    path.getPointAt(u, point)
    const tangentYaw = strideYaw(u)
    const pause = cue(time, 5.25, 7.1, 17.4, 19.7)
    const facing = blendAngle(tangentYaw, 2.85, pause)
    const step = walk * 10
    const movement = walking ? Math.sin(Math.PI * walk) ** .52 : 0
    const groundY = ground(point.x, point.z)
    body.position.set(point.x, groundY, point.z)
    body.rotation.y = facing
    waist.position.y = hipLevel + Math.cos(step * Math.PI * 2) * .023 * movement
    waist.rotation.set(.035 + movement * .055, Math.sin(step * Math.PI) * .075 * movement, Math.sin(step * Math.PI) * .029 * movement)

    const view = cue(time, 7, 9.4, 14, 16.2)
    const scan = cue(time, 10.7, 12.1, 15.2, 18.1)
    const photo = ['alpine', 'desert', 'arches'].includes(actor.activity) ? cue(time, 12.8, 14.3, 15.95, 17.2) : 0
    const gesture = cue(time, 8.4, 10.0, 11.4, 13)
    const reach = actor.activity === 'garden' ? gesture : actor.activity === 'arches' ? gesture * .76 : 0
    const shield = actor.activity === 'desert' ? gesture : 0
    const bag = actor.activity === 'railway' ? cue(time, 11.4, 12.4, 14.1, 15.2) : 0
    const farewell = actor.activity === 'coast' ? gesture : 0

    head.rotation.set(
      -.04 - view * (actor.activity === 'garden' || actor.activity === 'arches' ? .31 : .15) + bag * .24,
      Math.sin(time * Math.PI / 6.5) * .10 + view * (actor.activity === 'alpine' ? .47 : -.34) + scan * (actor.activity === 'desert' ? .56 : .12),
      reach * .11,
    )
    for (const [i, { shoulder, elbow }] of arms.entries()) {
      const sign = i ? 1 : -1
      shoulder.rotation.set(Math.sin(step * Math.PI) * sign * .35 * movement, 0, sign * .12)
      elbow.rotation.set(-.15 - movement * .12, 0, 0)
    }
    arms[1].shoulder.rotation.x -= reach * 1.12 + shield * 1.39 + photo * 1.39 + farewell * 1.0 + bag * .64
    arms[1].shoulder.rotation.z += reach * .46 + farewell * .72 + bag * .24
    arms[1].elbow.rotation.x -= reach * .3 + shield * 1.04 + photo * .99 + farewell * .67 + bag * .93
    arms[1].elbow.rotation.y = farewell * Math.sin(time * 5) * .4
    arms[0].shoulder.rotation.x -= photo * 1.34
    arms[0].elbow.rotation.x -= photo * .96
    arms[0].shoulder.rotation.y = photo * -.30
    arms[1].shoulder.rotation.y = photo * .24
    cameraProp.visible = photo > .09

    const c = Math.cos(facing), s = Math.sin(facing)
    front.set(s, 0, c)
    for (const { side, foot, upper, lower } of legs) {
      const delay = side > 0 ? 1 : 0
      const beat = (step + delay) / 2
      const swing = Math.max(0, Math.min(1, (beat % 1 - .48) / .52))
      const foothold = (Math.floor(beat) * 2 - delay + .6) / 10
      const last = T.MathUtils.clamp(foothold, 0, 1)
      const next = T.MathUtils.clamp(foothold + .2, 0, 1)
      const a = footprint(begin + last * .5, side, footA)
      const b = footprint(begin + next * .5, side, footB)
      foot.position.copy(footA).lerp(footB, smooth(swing))
      foot.position.y += Math.sin(swing * Math.PI) * .127 * h * movement
      foot.rotation.y = blendAngle(a, b, swing)
      // Settle to one stance at both ends, keeping the turn above the feet.
      const settle = 1 - smooth(Math.min(walk, 1 - walk) * 16)
      const endU = walk < .5 ? begin : begin + .5
      const planted = footprint(endU, side, footA)
      foot.position.lerp(footA, settle)
      foot.rotation.y = blendAngle(foot.rotation.y, planted, settle)
      ankle.copy(foot.position).addScaledVector(front, -.044)
      hip.set(point.x + c * side * .104 * w, groundY + waist.position.y, point.z - s * side * .104 * w)
      axis.subVectors(ankle, hip)
      const length = axis.length()
      axis.normalize()
      const bend = Math.sqrt(Math.max(.006, (.401 * h) ** 2 - (length * .5) ** 2))
      knee.copy(front).addScaledVector(axis, -front.dot(axis)).normalize().multiplyScalar(bend)
        .add(hip).addScaledVector(axis, length * .5)
      limb(upper, hip, knee, .095 * w)
      limb(lower, knee, ankle, .075 * w)
    }
    shadow.position.set(point.x + .05, groundY + .017, point.z + .04)
  }
}
