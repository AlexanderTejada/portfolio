<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const containerRef = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let waveMesh: THREE.Points
let raycasterPlane: THREE.Mesh
let animationId: number
let planeGeometry: THREE.PlaneGeometry

let textModel: THREE.Group | null = null
const solidMeshesData: { mesh: THREE.Mesh; originalPositions: Float32Array }[] = []

const mouse = new THREE.Vector2()
const targetMouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const intersectionPoint = new THREE.Vector3()
const mouseInfluenceRadius = 8

const onMouseMove = (event: MouseEvent) => {
  targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1
  targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

defineExpose({ mouse, intersectionPoint })

onMounted(() => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xfafafa, 10, 100)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 5, 25)
  camera.lookAt(0, 2, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  containerRef.value.appendChild(renderer.domElement)

  // 1. WAVE MESH GEOMETRY
  planeGeometry = new THREE.PlaneGeometry(180, 100, 360, 160)
  planeGeometry.rotateX(-Math.PI / 2)

  const count = planeGeometry.attributes.position!.count
  const alphas = new Float32Array(count)
  const colorMix = new Float32Array(count)
  const glow = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const z = planeGeometry.attributes.position!.getZ(i)
    const alpha = THREE.MathUtils.mapLinear(z, -50, 50, 0.05, 1.0)
    alphas[i] = THREE.MathUtils.clamp(alpha, 0.05, 1.0)
    colorMix[i] = THREE.MathUtils.mapLinear(z, -50, 50, 0.0, 1.0)
    glow[i] = 0
  }

  planeGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))
  planeGeometry.setAttribute('colorMix', new THREE.BufferAttribute(colorMix, 1))
  planeGeometry.setAttribute('glow', new THREE.BufferAttribute(glow, 1))

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uColorFront: { value: new THREE.Color(0x9ca3af) }, // Lighter gray for the front
      uColorBack: { value: new THREE.Color(0xe5e7eb) },  // Very soft gray for the back
      uGlowColor: { value: new THREE.Color(0x6b7280) },  // Soft medium gray for the mouse interaction
      uSize: { value: 0.35 },
    },
    vertexShader: `
      attribute float alpha;
      attribute float colorMix;
      attribute float glow;
      varying float vAlpha;
      varying float vColorMix;
      varying float vGlow;
      uniform float uSize;

      void main() {
        vAlpha = alpha;
        vColorMix = colorMix;
        vGlow = glow;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = uSize * (300.0 / -mvPosition.z);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorFront;
      uniform vec3 uColorBack;
      uniform vec3 uGlowColor;
      varying float vAlpha;
      varying float vColorMix;
      varying float vGlow;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        vec3 baseColor = mix(uColorBack, uColorFront, vColorMix);
        vec3 finalColor = mix(baseColor, uGlowColor, vGlow * 0.5);
        
        float strength = 1.0 - dist * 2.0;
        strength = pow(strength, 1.5);
        
        float brightness = 1.0 - vGlow * 0.3;
        
        gl_FragColor = vec4(finalColor * brightness, strength * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  })

  waveMesh = new THREE.Points(planeGeometry, material)
  waveMesh.position.y = -6 // Push wave down
  scene.add(waveMesh)

  const positions = planeGeometry.attributes.position!.array as Float32Array
  const originalPositions = new Float32Array(positions)

  raycasterPlane = new THREE.Mesh(
    planeGeometry.clone(),
    new THREE.MeshBasicMaterial({ visible: false }),
  )
  raycasterPlane.position.y = -6
  scene.add(raycasterPlane)

  // Lights for solid mesh
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(5, 10, 8)
  scene.add(dirLight)
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
  fillLight.position.set(-5, 0, -5)
  scene.add(fillLight)

  // 2. LOAD 3D TEXT "ALEXANDER TEJADA"
  const loader = new GLTFLoader()
  loader.load(
    '/ALEXANDER TEJADA.glb',
    (gltf) => {
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 25 / maxDim
      model.scale.setScalar(scale)
      model.position.set(0, 3, 0) // float above the wave

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x1f2937,
            roughness: 0.4,
            metalness: 0.1,
          })
          
          // Guardar posiciones base para efecto interactivo
          const posAttr = child.geometry.getAttribute('position')
          if (posAttr) {
            solidMeshesData.push({
              mesh: child as THREE.Mesh,
              originalPositions: new Float32Array(posAttr.array)
            })
          }
        }
      })

      scene.add(model)
      textModel = model
    },
    undefined,
    (error) => {
      console.error('Error loading text model:', error)
    }
  )

  let time = 0

  const animate = () => {
    time += 0.02
    
    // Smooth mouse
    mouse.x += (targetMouse.x - mouse.x) * 0.05
    mouse.y += (targetMouse.y - mouse.y) * 0.05

    // A. WAVE MESH ANIMATION
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(raycasterPlane)

    if (intersects.length > 0) {
      intersectionPoint.copy(intersects[0]!.point)
    }

    const wavePosArray = planeGeometry.attributes.position!.array as Float32Array
    const waveAlphas = planeGeometry.attributes.alpha!.array as Float32Array
    const waveColorMix = planeGeometry.attributes.colorMix!.array as Float32Array
    const waveGlow = planeGeometry.attributes.glow!.array as Float32Array

    for (let i = 0; i < wavePosArray.length; i += 3) {
      const x = originalPositions[i]
      const z = originalPositions[i + 2]

      const wave = Math.sin(z! * 0.15 - time) * 2.5

      let mouseInfluence = 0
      let glowIntensity = 0

      if (intersects.length > 0) {
        const localIntersect = intersectionPoint.clone().sub(new THREE.Vector3(0, -6, 0))
        
        const distanceToMouse = Math.sqrt(
          Math.pow(x! - localIntersect.x, 2) + Math.pow(z! - localIntersect.z, 2),
        )

        if (distanceToMouse < mouseInfluenceRadius) {
          const influence = 1 - distanceToMouse / mouseInfluenceRadius
          mouseInfluence = -Math.pow(influence, 2) * 4
          glowIntensity = Math.pow(influence, 1.5)
        }
      }

      const cursorPush = mouseInfluence
      wavePosArray[i + 1] = wave + cursorPush

      const vertexIndex = i / 3
      waveGlow[vertexIndex] = glowIntensity

      const alpha = THREE.MathUtils.mapLinear(z!, -50, 50, 0.05, 1.0)
      waveAlphas[vertexIndex] = THREE.MathUtils.clamp(alpha, 0.05, 1.0)
      waveColorMix[vertexIndex] = THREE.MathUtils.mapLinear(z!, -50, 50, 0.0, 1.0)
    }

    planeGeometry.attributes.position!.needsUpdate = true
    planeGeometry.attributes.alpha!.needsUpdate = true
    planeGeometry.attributes.colorMix!.needsUpdate = true
    planeGeometry.attributes.glow!.needsUpdate = true

    // B. TEXT MODEL ANIMATION (SOLIDO)
    if (solidMeshesData.length > 0 && textModel) {
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const mousePos3D = new THREE.Vector3()
      raycaster.ray.intersectPlane(planeZ, mousePos3D)

      for (const data of solidMeshesData) {
        const { mesh, originalPositions } = data
        const posAttr = mesh.geometry.getAttribute('position')
        if (!posAttr) continue
        
        const textPosArray = posAttr.array as Float32Array
        
        mesh.updateWorldMatrix(true, false)
        const inverseMatrix = mesh.matrixWorld.clone().invert()
        const localMousePos = mousePos3D.clone().applyMatrix4(inverseMatrix)

        for (let i = 0; i < textPosArray.length; i += 3) {
          const originalX = originalPositions[i]!
          const originalY = originalPositions[i + 1]!
          const originalZ = originalPositions[i + 2]!

          const vertexPos = new THREE.Vector3(originalX, originalY, originalZ)

          const maxDistance = 6 / textModel.scale.x
          const distance = vertexPos.distanceTo(localMousePos)
          const textMouseInfluence = Math.max(0, 1 - distance / maxDistance)

          if (textMouseInfluence > 0) {
            const force = textMouseInfluence * textMouseInfluence * (4 / textModel.scale.x)
            const direction = new THREE.Vector3().subVectors(vertexPos, localMousePos).normalize()

            textPosArray[i] = originalX + direction.x * force
            textPosArray[i + 1] = originalY + direction.y * force
            textPosArray[i + 2] = originalZ
          } else {
            // Regresar el vertice a su lugar si le pasaste el mouse y lo alejaste
            textPosArray[i] = textPosArray[i]! + (originalX - textPosArray[i]!) * 0.1
            textPosArray[i + 1] = textPosArray[i + 1]! + (originalY - textPosArray[i + 1]!) * 0.1
            textPosArray[i + 2] = textPosArray[i + 2]! + (originalZ - textPosArray[i + 2]!) * 0.1
          }
        }
        
        posAttr.needsUpdate = true
        mesh.geometry.computeVertexNormals() // Computar normales para que la luz rebote bien en la deformacion
      }
    }

    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
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
  if (renderer) renderer.dispose()
  if (waveMesh) {
    waveMesh.geometry.dispose()
    if (waveMesh.material instanceof THREE.Material) waveMesh.material.dispose()
  }
  if (raycasterPlane) {
    raycasterPlane.geometry.dispose()
    if (raycasterPlane.material instanceof THREE.Material) raycasterPlane.material.dispose()
  }
  if (planeGeometry) planeGeometry.dispose()
  if (textModel) {
    textModel.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (child.material instanceof THREE.Material) child.material.dispose()
      }
    })
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
  background: transparent;
}

.scene-container :deep(canvas) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
