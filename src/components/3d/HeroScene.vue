<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const containerRef = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animationId: number
let edges: THREE.LineSegments | null = null
let originalPositions: Float32Array | null = null
let time = 0

const mouse = new THREE.Vector2()
const targetMouse = new THREE.Vector2()

const onMouseMove = (event: MouseEvent) => {
  targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1
  targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
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

      const allPositions: number[] = []
      const allColors: number[] = []
      const baseColor = new THREE.Color(0x1f2937)

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const meshGeometry = child.geometry

          if (!meshGeometry || !meshGeometry.getAttribute('position')) return

          child.updateWorldMatrix(true, false)
          const matrix = child.matrixWorld.clone()

          // Usar WireframeGeometry para mostrar TODOS los edges (internos y externos)
          const wireframeGeom = new THREE.WireframeGeometry(meshGeometry)
          const posAttr = wireframeGeom.getAttribute('position')

          for (let i = 0; i < posAttr.count; i++) {
            const vertex = new THREE.Vector3().fromBufferAttribute(posAttr, i).applyMatrix4(matrix)
            allPositions.push(vertex.x, vertex.y, vertex.z)
            allColors.push(baseColor.r, baseColor.g, baseColor.b)
          }
        }
      })

      if (allPositions.length === 0) {
        console.log('No edges found, creating test box')
        const boxGeo = new THREE.BoxGeometry(8, 4, 2)
        const edgesGeom = new THREE.EdgesGeometry(boxGeo)
        const line = new THREE.LineSegments(edgesGeom, new THREE.LineBasicMaterial({ color: 0x1f2937 }))
        scene.add(line)
      } else {
        originalPositions = new Float32Array(allPositions)

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(allColors, 3))

        const material = new THREE.LineBasicMaterial({
          transparent: true,
          opacity: 0.9,
          vertexColors: true,
        })

        edges = new THREE.LineSegments(geometry, material)
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
    time += 0.02

    // Suavizar movimiento del mouse
    mouse.x += (targetMouse.x - mouse.x) * 0.05
    mouse.y += (targetMouse.y - mouse.y) * 0.05

    // Aplicar efecto del mouse a los vértices
    if (edges && originalPositions) {
      const positions = edges.geometry.attributes.position.array as Float32Array
      const colors = edges.geometry.attributes.color.array as Float32Array

      // Proyectar mouse a coordenadas 3D usando raycaster
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const mousePos3D = new THREE.Vector3()
      raycaster.ray.intersectPlane(planeZ, mousePos3D)

      const baseColor = new THREE.Color(0x1f2937)
      const waveColor = new THREE.Color(0xd1d5db)
      const hoverColor = new THREE.Color(0xffffff)

      for (let i = 0; i < positions.length; i += 3) {
        const originalX = originalPositions[i]
        const originalY = originalPositions[i + 1]
        const originalZ = originalPositions[i + 2]

        const vertexPos = new THREE.Vector3(originalX, originalY, originalZ)

        // Animación automática de onda
        const waveX = Math.sin(originalX * 0.3 + time) * 0.5 + 0.5
        const waveY = Math.sin(originalY * 0.3 + time * 1.2) * 0.5 + 0.5
        const waveIntensity = (waveX + waveY) * 0.5

        // Deformación sutil de la onda
        const waveDeform = Math.sin(originalX * 0.5 + originalY * 0.3 + time) * 0.3

        // Efecto del mouse
        const distance = vertexPos.distanceTo(mousePos3D)
        const maxDistance = 8
        const mouseInfluence = Math.max(0, 1 - distance / maxDistance)

        if (mouseInfluence > 0) {
          const force = mouseInfluence * mouseInfluence * 4
          const direction = new THREE.Vector3()
            .subVectors(vertexPos, mousePos3D)
            .normalize()

          positions[i] = originalX + direction.x * force + waveDeform * 0.3
          positions[i + 1] = originalY + direction.y * force + waveDeform * 0.3
          positions[i + 2] = originalZ + waveDeform * 0.2

          // Mezclar animación de onda con efecto de hover
          const animatedColor = baseColor.clone().lerp(waveColor, waveIntensity * 0.3)
          const finalColor = animatedColor.lerp(hoverColor, mouseInfluence)
          colors[i] = finalColor.r
          colors[i + 1] = finalColor.g
          colors[i + 2] = finalColor.b
        } else {
          // Aplicar deformación de onda
          positions[i] = originalX + waveDeform * 0.3
          positions[i + 1] = originalY + waveDeform * 0.3
          positions[i + 2] = originalZ + waveDeform * 0.2

          // Aplicar solo la animación de onda
          const animatedColor = baseColor.clone().lerp(waveColor, waveIntensity * 0.3)
          colors[i] += (animatedColor.r - colors[i]) * 0.1
          colors[i + 1] += (animatedColor.g - colors[i + 1]) * 0.1
          colors[i + 2] += (animatedColor.b - colors[i + 2]) * 0.1
        }
      }

      edges.geometry.attributes.position.needsUpdate = true
      edges.geometry.attributes.color.needsUpdate = true
    }

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
