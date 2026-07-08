import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { AIRPLANE_JOURNEY_CONFIG } from '@/lib/airplane-journey/config'
import { getWorldTransform } from '@/lib/airplane-journey/path'

export type ModelLoadState = 'loading' | 'ready' | 'failed'

export type AirplaneSceneHandle = {
  setProgress: (progress: number) => void
  resize: (width: number, height: number) => void
  dispose: () => void
  getLoadState: () => ModelLoadState
}

type CreateAirplaneSceneOptions = {
  onLoadStateChange?: (state: ModelLoadState) => void
}

export function createAirplaneScene(
  canvas: HTMLCanvasElement,
  options: CreateAirplaneSceneOptions = {},
): AirplaneSceneHandle {
  const { camera: cameraConfig, lighting, aircraft, modelUrl } = AIRPLANE_JOURNEY_CONFIG
  const { onLoadStateChange } = options

  let loadState: ModelLoadState = 'loading'
  const setLoadState = (state: ModelLoadState) => {
    loadState = state
    onLoadStateChange?.(state)
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    cameraConfig.fov,
    canvas.clientWidth / Math.max(canvas.clientHeight, 1),
    0.1,
    40,
  )
  camera.position.set(cameraConfig.position.x, cameraConfig.position.y, cameraConfig.position.z)
  camera.lookAt(cameraConfig.lookAt.x, cameraConfig.lookAt.y, cameraConfig.lookAt.z)

  scene.add(new THREE.AmbientLight(0xfff4e8, lighting.ambientIntensity))

  const keyLight = new THREE.DirectionalLight(0xfff8ef, lighting.keyIntensity)
  keyLight.position.set(lighting.keyPosition.x, lighting.keyPosition.y, lighting.keyPosition.z)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0xc9e8ef, lighting.fillIntensity)
  fillLight.position.set(lighting.fillPosition.x, lighting.fillPosition.y, lighting.fillPosition.z)
  scene.add(fillLight)

  const airplaneRoot = new THREE.Group()
  scene.add(airplaneRoot)

  let modelLoaded = false
  let currentProgress = 0

  const loader = new GLTFLoader()
  loader.load(
    modelUrl,
    (gltf) => {
      const model = gltf.scene
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          mesh.castShadow = false
          mesh.receiveShadow = false
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
            materials.forEach((material) => {
              material.transparent = false
              material.depthWrite = true
            })
          }
        }
      })

      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const normalisedScale = aircraft.scale / maxDim
      model.scale.setScalar(normalisedScale)

      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center.multiplyScalar(normalisedScale))

      airplaneRoot.add(model)
      modelLoaded = true
      setLoadState('ready')
      applyTransform(currentProgress)
      renderer.render(scene, camera)
    },
    undefined,
    () => {
      setLoadState('failed')
    },
  )

  function applyTransform(progress: number) {
    const { position, rotation } = getWorldTransform(progress)
    airplaneRoot.position.set(position.x, position.y, position.z)
    airplaneRoot.rotation.set(rotation.x, rotation.y, rotation.z)
  }

  return {
    setProgress(progress: number) {
      currentProgress = progress
      if (modelLoaded) {
        applyTransform(progress)
        renderer.render(scene, camera)
      }
    },
    resize(width: number, height: number) {
      camera.aspect = width / Math.max(height, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      if (modelLoaded) renderer.render(scene, camera)
    },
    dispose() {
      renderer.dispose()
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh
          mesh.geometry?.dispose()
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          materials.forEach((material) => material.dispose())
        }
      })
    },
    getLoadState: () => loadState,
  }
}
