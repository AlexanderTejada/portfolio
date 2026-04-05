<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const containerRef = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let model: THREE.Group | null = null
let animId: number
const meshData: { mesh: THREE.Mesh; original: Float32Array }[] = []

onMounted(() => {
  const el = containerRef.value
  if (!el) return

  const w = el.clientWidth || 160
  const h = el.clientHeight || 160

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  el.appendChild(renderer.domElement)

  scene = new THREE.Scene()

  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
  dirLight.position.set(3, 3, 5)
  scene.add(dirLight)

  const backLight = new THREE.DirectionalLight(0xffffff, 0.8)
  backLight.position.set(-3, -1, -3)
  scene.add(backLight)

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
  camera.position.set(0, 0, 4)

  const loader = new GLTFLoader()
  loader.load('/3D/icons/software engineer/NET.glb', (gltf) => {
    model = gltf.scene

    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.2 / maxDim
    model.scale.setScalar(scale)
    model.position.sub(center.multiplyScalar(scale))

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const posAttr = child.geometry.getAttribute('position')
        if (posAttr) {
          meshData.push({
            mesh: child,
            original: new Float32Array(posAttr.array as Float32Array),
          })
        }
      }
    })

    scene.add(model)
  })

  let time = 0

  const animate = () => {
    animId = requestAnimationFrame(animate)
    time += 0.025

    for (const data of meshData) {
      const posAttr = data.mesh.geometry.getAttribute('position')
      if (!posAttr) continue

      const posArray = posAttr.array as Float32Array
      const count = posAttr.count
      const original = data.original

      for (let i = 0; i < count; i++) {
        const ox = original[i * 3]!
        const oy = original[i * 3 + 1]!
        const oz = original[i * 3 + 2]!

        const distort =
          Math.sin(oy * 4 + time * 2) * 0.015 +
          Math.cos(ox * 3 + time * 1.5) * 0.01 +
          Math.sin(oz * 3.5 + time * 2.5) * 0.008

        posArray[i * 3] = ox + distort
        posArray[i * 3 + 1] = oy + distort * 0.7
        posArray[i * 3 + 2] = oz + distort
      }

      posAttr.needsUpdate = true
      data.mesh.geometry.computeVertexNormals()
    }

    renderer.render(scene, camera)
  }
  animate()
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div ref="containerRef" class="net-canvas" />
</template>

<style scoped>
.net-canvas {
  width: 100%;
  height: 100%;
}
.net-canvas :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}
</style>
