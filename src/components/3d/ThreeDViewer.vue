<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface MaterialConfig {
  name: string
  color: number
  metalness: number
  roughness: number
}

const props = defineProps<{
  src: string
}>()

const containerRef = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let necklace: THREE.Group | null = null
let animationId: number

interface PartMaterial {
  partName: string
  color: number
  metalness: number
  roughness: number
}

const materialConfigs: { name: string; parts: PartMaterial[] }[] = [
  {
    name: 'Sapphire & Gold',
    parts: [
      { partName: 'Stone', color: 0x0f52ba, metalness: 1.0, roughness: 0.05 },
      { partName: 'Metal', color: 0xffd700, metalness: 1.0, roughness: 0.1 },
    ],
  },
  {
    name: 'Ruby & Silver',
    parts: [
      { partName: 'Stone', color: 0xe0115f, metalness: 0.9, roughness: 0.1 },
      { partName: 'Metal', color: 0xc0c0c0, metalness: 1.0, roughness: 0.15 },
    ],
  },
  {
    name: 'Emerald & Gold',
    parts: [
      { partName: 'Stone', color: 0x50c878, metalness: 1.0, roughness: 0.05 },
      { partName: 'Metal', color: 0xffd700, metalness: 1.0, roughness: 0.1 },
    ],
  },
  {
    name: 'Diamond & Platinum',
    parts: [
      { partName: 'Stone', color: 0xe0e0e0, metalness: 1.0, roughness: 0.02 },
      { partName: 'Metal', color: 0xe5e4e2, metalness: 1.0, roughness: 0.05 },
    ],
  },
  {
    name: 'Amber & Bronze',
    parts: [
      { partName: 'Stone', color: 0xffbf00, metalness: 0.6, roughness: 0.3 },
      { partName: 'Metal', color: 0xcd7f32, metalness: 0.9, roughness: 0.2 },
    ],
  },
]

const materials = materialConfigs.map((c) => ({ name: c.name }))

const currentMaterialIndex = ref(0)

const initScene = () => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0a0a)

  camera = new THREE.PerspectiveCamera(
    45,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    0.1,
    1000,
  )
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  containerRef.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = true
  controls.minDistance = 2
  controls.maxDistance = 10

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5)
  keyLight.position.set(5, 5, 5)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8)
  fillLight.position.set(-5, 0, -5)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0xffffff, 1)
  rimLight.position.set(0, -5, -5)
  scene.add(rimLight)

  loadModel()
  animate()
}

const loadModel = () => {
  const loader = new GLTFLoader()
  loader.load(
    props.src,
    (gltf) => {
      necklace = gltf.scene
      const box = new THREE.Box3().setFromObject(necklace)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 4 / maxDim
      necklace.scale.setScalar(scale)
      necklace.position.sub(center).multiplyScalar(scale)

      applyMaterial(0)
      scene.add(necklace)
    },
    undefined,
    (error) => console.error('Error loading model:', error),
  )
}

const applyMaterial = (index: number) => {
  if (!necklace) return

  const config = materialConfigs[index]
  if (!config || config.parts.length === 0) return

  necklace.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const meshName = child.name.toLowerCase()
      const foundPart = config.parts.find((p) => meshName.includes(p.partName.toLowerCase()))

      const partConfig = foundPart || config.parts[0]
      if (!partConfig) return

      child.material = new THREE.MeshStandardMaterial({
        color: partConfig.color,
        metalness: partConfig.metalness,
        roughness: partConfig.roughness,
        envMapIntensity: 1.5,
      })
    }
  })
}

const setMaterial = (index: number) => {
  currentMaterialIndex.value = index
  applyMaterial(index)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  controls?.update()

  if (necklace) {
    necklace.rotation.y += 0.003
  }

  renderer.render(scene, camera)
}

const onResize = () => {
  if (!containerRef.value || !camera || !renderer) return
  camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
}

onMounted(() => {
  initScene()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) renderer.dispose()
  if (controls) controls.dispose()
})
</script>

<template>
  <div class="viewer">
    <div ref="containerRef" class="canvas"></div>

    <div class="controls">
      <button
        v-for="(mat, i) in materials"
        :key="i"
        class="material-btn"
        :class="{ active: currentMaterialIndex === i }"
        @click="setMaterial(i)"
      >
        {{ mat.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.viewer {
  position: relative;
  width: 100%;
  height: 400px;
}

.canvas {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.controls {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.material-btn {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
  background: #1a1a1a;
  border: 1px solid #333;
  color: #888;
  cursor: pointer;
  transition: all 0.2s ease;
}

.material-btn:hover {
  border-color: #666;
  color: #fff;
}

.material-btn.active {
  background: #fff;
  color: #0a0a0a;
  border-color: #fff;
}
</style>
