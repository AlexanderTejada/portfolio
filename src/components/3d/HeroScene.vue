<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let waveMesh: THREE.Points
let raycasterPlane: THREE.Mesh
let animationId: number
let planeGeometry: THREE.PlaneGeometry

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const intersectionPoint = new THREE.Vector3()
let mouseInfluenceRadius = 15

const onMouseMove = (event: MouseEvent) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

defineExpose({ mouse, intersectionPoint })

onMounted(() => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xfafafa, 10, 100)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 15, 25)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0xfafafa, 1)
  containerRef.value.appendChild(renderer.domElement)

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
      uColorFront: { value: new THREE.Color(0x374151) },
      uColorBack: { value: new THREE.Color(0x9ca3af) },
      uGlowColor: { value: new THREE.Color(0x2563eb) },
      uSize: { value: 0.3 },
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
        
        vec3 finalColor = mix(baseColor, uGlowColor, vGlow);
        
        float strength = 1.0 - dist * 2.0;
        strength = pow(strength, 1.5);
        
        gl_FragColor = vec4(finalColor, strength * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  waveMesh = new THREE.Points(planeGeometry, material)
  scene.add(waveMesh)

  const positions = planeGeometry.attributes.position!.array as Float32Array
  const originalPositions = new Float32Array(positions)

  raycasterPlane = new THREE.Mesh(
    planeGeometry.clone(),
    new THREE.MeshBasicMaterial({ visible: false }),
  )
  scene.add(raycasterPlane)

  let time = 0

  const animate = () => {
    time += 0.02

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(raycasterPlane)

    if (intersects.length > 0) {
      intersectionPoint.copy(intersects[0]!.point)
    }

    const positions = planeGeometry.attributes.position!.array as Float32Array
    const alphas = planeGeometry.attributes.alpha!.array as Float32Array
    const colorMix = planeGeometry.attributes.colorMix!.array as Float32Array
    const glow = planeGeometry.attributes.glow!.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i]
      const z = originalPositions[i + 2]

      const wave = Math.sin(z! * 0.15 - time) * 2.5

      let mouseInfluence = 0
      let glowIntensity = 0

      if (intersects.length > 0) {
        const distanceToMouse = Math.sqrt(
          Math.pow(x! - intersectionPoint.x, 2) + Math.pow(z! - intersectionPoint.z, 2),
        )

        if (distanceToMouse < mouseInfluenceRadius) {
          const influence = 1 - distanceToMouse / mouseInfluenceRadius
          mouseInfluence = -Math.pow(influence, 2) * 4
          glowIntensity = influence
        }
      }

      const cursorPush = mouseInfluence

      positions[i + 1] = wave + cursorPush

      const vertexIndex = i / 3
      glow[vertexIndex] = glowIntensity

      const alpha = THREE.MathUtils.mapLinear(z!, -50, 50, 0.05, 1.0)
      alphas[vertexIndex] = THREE.MathUtils.clamp(alpha, 0.05, 1.0)
      colorMix[vertexIndex] = THREE.MathUtils.mapLinear(z!, -50, 50, 0.0, 1.0)
    }

    planeGeometry.attributes.position!.needsUpdate = true
    planeGeometry.attributes.alpha!.needsUpdate = true
    planeGeometry.attributes.colorMix!.needsUpdate = true
    planeGeometry.attributes.glow!.needsUpdate = true

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
  if (renderer) {
    renderer.dispose()
  }
  if (waveMesh) {
    waveMesh.geometry.dispose()
    if (waveMesh.material instanceof THREE.Material) {
      waveMesh.material.dispose()
    }
  }
  if (raycasterPlane) {
    raycasterPlane.geometry.dispose()
    if (raycasterPlane.material instanceof THREE.Material) {
      raycasterPlane.material.dispose()
    }
  }
  if (planeGeometry) {
    planeGeometry.dispose()
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
