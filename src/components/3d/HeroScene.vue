<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const containerRef = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationId: number

const mouse = new THREE.Vector2()

const onMouseMove = (event: MouseEvent) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

onMounted(() => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xfafafa, 10, 100)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 15)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0xfafafa, 1)
  containerRef.value.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  loader.load(
    '/ALEXANDER TEJADA.glb',
    (gltf) => {
      const model = gltf.scene

      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 20 / maxDim
      model.scale.setScalar(scale)
      model.position.set(0, 0, 0)

      const geometry = new THREE.BufferGeometry()
      const allPositions: number[] = []

      model.traverse((child) => {
        if (child instanceof THREE.Mesh && child.type !== 'LineSegments') {
          const meshGeometry = child.geometry

          if (!meshGeometry || !meshGeometry.getAttribute('position')) return

          const posAttr = meshGeometry.getAttribute('position')

          child.updateWorldMatrix(true, false)
          const matrix = child.matrixWorld.clone()

          const edgePositions: number[] = []
          const count = posAttr.count

          for (let i = 0; i < count; i += 4) {
            if (i + 3 >= count) break

            const va = new THREE.Vector3().fromBufferAttribute(posAttr, i).applyMatrix4(matrix)
            const vb = new THREE.Vector3().fromBufferAttribute(posAttr, i + 1).applyMatrix4(matrix)
            const vc = new THREE.Vector3().fromBufferAttribute(posAttr, i + 2).applyMatrix4(matrix)
            const vd = new THREE.Vector3().fromBufferAttribute(posAttr, i + 3).applyMatrix4(matrix)

            edgePositions.push(va.x, va.y, va.z, vb.x, vb.y, vb.z)
            edgePositions.push(vb.x, vb.y, vb.z, vc.x, vc.y, vc.z)
            edgePositions.push(vc.x, vc.y, vc.z, vd.x, vd.y, vd.z)
            edgePositions.push(vd.x, vd.y, vd.z, va.x, va.y, va.z)
          }

          if (edgePositions.length > 0) {
            allPositions.push(...edgePositions)
          }
        }
      })

      if (allPositions.length === 0) {
        console.log('No edges found, creating test box')
        const boxGeo = new THREE.BoxGeometry(8, 4, 2)
        const edges = new THREE.EdgesGeometry(boxGeo)
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x1f2937 }))
        scene.add(line)
      } else {
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3))

        const material = new THREE.LineBasicMaterial({
          color: 0x1f2937,
          transparent: true,
          opacity: 0.9,
        })

        const edges = new THREE.LineSegments(geometry, material)
        scene.add(edges)

        console.log('Edges loaded, positions:', allPositions.length / 3)
      }
    },
    undefined,
    (error) => {
      console.error('Error loading model:', error)
    },
  )

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)
})

const onResize = () => {
  if (!camera || !renderer) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<template>
  <div ref="containerRef" class="scene-container"></div>
</template>

<style scoped>
.scene-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #fafafa;
}

.scene-container :deep(canvas) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
