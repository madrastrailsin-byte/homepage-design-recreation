import { useSyncExternalStore } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

const mobileQuery = '(max-width: 520px)'

function subscribe(callback: () => void) {
  const media = window.matchMedia(mobileQuery)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function isMobile() {
  return window.matchMedia(mobileQuery).matches
}

export function useCloudTexture() {
  const compact = useSyncExternalStore(subscribe, isMobile)
  return useLoader(TextureLoader, compact
    ? '/textures/earth-clouds-mobile.webp'
    : '/textures/earth-clouds-4k.c2fe168bcb69.webp')
}
