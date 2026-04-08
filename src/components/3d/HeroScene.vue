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

// Track whether a real mouse is present
let lastMouseTime = 0
let hasRealMouse = false

const onMouseMove = (event: MouseEvent) => {
  targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1
  targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  lastMouseTime = performance.now()
  hasRealMouse = true
}

defineExpose({ mouse, intersectionPoint })

onMounted(() => {
  if (!containerRef.value) return

  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xfafafa, 10, 100)

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 5, 25)
  camera.lookAt(0, 5, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  containerRef.value.appendChild(renderer.domElement)

  // 1. WAVE MESH GEOMETRY
  planeGeometry = new THREE.PlaneGeometry(200, 120, 120, 60)
  planeGeometry.rotateX(-Math.PI / 2)

  const count = planeGeometry.attributes.position!.count
  const alphas = new Float32Array(count)
  const colorMix = new Float32Array(count)
  const glow = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const z = planeGeometry.attributes.position!.getZ(i)
    const alpha = THREE.MathUtils.mapLinear(z, -60, 60, 0.02, 1.0)
    alphas[i] = THREE.MathUtils.clamp(alpha, 0.02, 1.0)
    colorMix[i] = THREE.MathUtils.mapLinear(z, -60, 60, 0.0, 1.0)
    glow[i] = 0
  }

  planeGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))
  planeGeometry.setAttribute('colorMix', new THREE.BufferAttribute(colorMix, 1))
  planeGeometry.setAttribute('glow', new THREE.BufferAttribute(glow, 1))

  // NOISE SHADER for Points & Lines
  const waveShader = {
    uniforms: {
      uTime: { value: 0 },
      uColorFront: { value: new THREE.Color(0xd1d5db) },
      uColorBack: { value: new THREE.Color(0xf1f5f9) },
      uGlowColor: { value: new THREE.Color(0x111827) },
      uSize: { value: 0.35 },
      uMouse: { value: new THREE.Vector3() },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec3 uMouse;
      attribute float alpha;
      attribute float colorMix;
      attribute float glow;
      varying float vAlpha;
      varying float vColorMix;
      varying float vGlow;
      varying float vHeight;
      uniform float uSize;

      // Simple Noise function
      float hash(float n) { return fract(sin(n) * 1e4); }
      float noise(vec3 x) {
        const vec3 step = vec3(110, 241, 171);
        vec3 i = floor(x);
        vec3 f = fract(x);
        float n = dot(i, step);
        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix( hash(n + dot(step, vec3(0,0,0))), hash(n + dot(step, vec3(1,0,0))), u.x),
                       mix( hash(n + dot(step, vec3(0,1,0))), hash(n + dot(step, vec3(1,1,0))), u.x), u.y),
                   mix(mix( hash(n + dot(step, vec3(0,0,1))), hash(n + dot(step, vec3(1,0,1))), u.x),
                       mix( hash(n + dot(step, vec3(0,1,1))), hash(n + dot(step, vec3(1,1,1))), u.x), u.y), u.z);
      }

      void main() {
        vAlpha = alpha;
        vColorMix = colorMix;
        vGlow = glow;

        vec3 pos = position;

        // Multi-layered Noise for Ocean Motion
        float n = noise(vec3(pos.x * 0.05, pos.z * 0.05, uTime * 0.2)) * 4.0;
        n += noise(vec3(pos.x * 0.1, pos.z * 0.1, uTime * 0.4)) * 1.5;
        pos.y += n;

        // Mouse Ripple Effect
        float dist = distance(pos.xz, uMouse.xz);
        if(dist < 15.0) {
          float force = 1.0 - (dist / 15.0);
          pos.y -= pow(force, 2.0) * 8.0;
          vGlow += force * 0.6;
        }

        vHeight = pos.y;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = uSize * (350.0 / -mvPosition.z) * (1.0 + vGlow);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorFront;
      uniform vec3 uColorBack;
      uniform vec3 uGlowColor;
      varying float vAlpha;
      varying float vColorMix;
      varying float vGlow;
      varying float vHeight;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        vec3 baseColor = mix(uColorBack, uColorFront, vColorMix);
        vec3 finalColor = mix(baseColor, uGlowColor, vGlow);

        float strength = 1.0 - dist * 2.0;
        strength = pow(strength, 1.5);

        gl_FragColor = vec4(finalColor, strength * vAlpha * (1.0 + vGlow));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  }

  const pointMat = new THREE.ShaderMaterial(waveShader)
  waveMesh = new THREE.Points(planeGeometry, pointMat)
  waveMesh.position.y = -10
  scene.add(waveMesh)

  // Sparse Line Grid connectivity
  const segments: number[] = []
  const width = 120
  const height = 60
  const posArr = (planeGeometry.attributes.position as THREE.BufferAttribute).array as Float32Array
  const step = 6 // Connect every 6th vertex for a light, technical look

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 3
      // Horizontal line
      if (x + step < width) {
        segments.push(posArr[i]!, posArr[i + 1]!, posArr[i + 2]!)
        segments.push(posArr[i + step * 3]!, posArr[i + step * 3 + 1]!, posArr[i + step * 3 + 2]!)
      }
      // Vertical line
      if (y + step < height) {
        segments.push(posArr[i]!, posArr[i + 1]!, posArr[i + 2]!)
        segments.push(
          posArr[i + width * step * 3]!,
          posArr[i + width * step * 3 + 1]!,
          posArr[i + width * step * 3 + 2]!,
        )
      }
    }
  }

  const lineGeom = new THREE.BufferGeometry()
  lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(segments, 3))
  const lineMat = new THREE.ShaderMaterial({
    ...waveShader,
    fragmentShader: `
      uniform vec3 uColorFront;
      uniform vec3 uColorBack;
      varying float vAlpha;
      varying float vColorMix;
      varying float vGlow;

      void main() {
        vec3 baseColor = mix(uColorBack, uColorFront, vColorMix);
        gl_FragColor = vec4(baseColor, vAlpha * 0.15 * (1.0 + vGlow));
      }
    `,
  })
  const lineMesh = new THREE.LineSegments(lineGeom, lineMat)
  lineMesh.position.y = -10
  scene.add(lineMesh)

  raycasterPlane = new THREE.Mesh(
    planeGeometry.clone(),
    new THREE.MeshBasicMaterial({ visible: false }),
  )
  raycasterPlane.position.y = -10
  scene.add(raycasterPlane)

  // Lights for solid mesh
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
  scene.add(ambientLight)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(5, 10, 8)
  scene.add(dirLight)

  // 2. LOAD 3D TEXT "ALEXANDER TEJADA" - only on desktop
  const winWidth = window.innerWidth
  const isMobile = winWidth < 768

  if (!isMobile) {
    const getAdaptiveScale = () => {
      return 25
    }
    const targetScale = getAdaptiveScale()
    const targetY = 7

    const loader = new GLTFLoader()
    loader.load('/ALEXANDER TEJADA.glb', (gltf) => {
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const scale = targetScale / Math.max(size.x, size.y, size.z)
      model.scale.setScalar(scale)
      model.position.set(0, targetY, 0)

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0x111827,
            roughness: 0.2,
            metalness: 0.1,
          })
          const posAttr = child.geometry.getAttribute('position')
          if (posAttr) {
            solidMeshesData.push({
              mesh: child as THREE.Mesh,
              originalPositions: new Float32Array(posAttr.array),
            })
          }
        }
      })
      scene.add(model)
      textModel = model
    })
  }

  let time = 0

  const animate = () => {
    time += 0.02

    // Auto idle animation: disabled for performance - mouse only
    // when no real mouse has moved for >1s (or never, e.g. touch devices)
    // const idleTimeout = 1000
    // const isIdle = !hasRealMouse || performance.now() - lastMouseTime > idleTimeout
    // if (isIdle) {
    //   targetMouse.x = Math.sin(time * 0.35) * 0.55
    //   targetMouse.y = Math.cos(time * 0.22) * 0.28
    // }

    // Smooth mouse
    mouse.x += (targetMouse.x - mouse.x) * 0.05
    mouse.y += (targetMouse.y - mouse.y) * 0.05

    // A. WAVE MESH ANIMATION (simplified - no raycaster every frame)
    if (pointMat.uniforms.uTime) pointMat.uniforms.uTime.value = time
    if (lineMat.uniforms.uTime) lineMat.uniforms.uTime.value = time

    // B. TEXT MODEL GLITCH - subtle digital artifact
    if (solidMeshesData.length > 0 && textModel) {
      const glitchChance = 0.005
      const glitchStrength = 0.15
      const returnSpeed = 0.15

      for (const data of solidMeshesData) {
        const { mesh, originalPositions } = data
        const posAttr = mesh.geometry.getAttribute('position')
        const textArr = posAttr.array as Float32Array
        const origPos = originalPositions as Float32Array

        for (let i = 0; i < textArr.length; i += 3) {
          const ox = origPos[i] ?? 0
          const oy = origPos[i + 1] ?? 0
          const oz = origPos[i + 2] ?? 0

          if (Math.random() < glitchChance) {
            textArr[i]! = ox + (Math.random() - 0.5) * glitchStrength
            textArr[i + 1]! = oy + (Math.random() - 0.5) * glitchStrength
            textArr[i + 2]! = oz + (Math.random() - 0.5) * glitchStrength
          } else {
            textArr[i]! = (textArr[i] ?? 0) + (ox - (textArr[i] ?? 0)) * returnSpeed
            textArr[i + 1]! = (textArr[i + 1] ?? 0) + (oy - (textArr[i + 1] ?? 0)) * returnSpeed
            textArr[i + 2]! = (textArr[i + 2] ?? 0) + (oz - (textArr[i + 2] ?? 0)) * returnSpeed
          }
        }
        posAttr.needsUpdate = true
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
  const winW = window.innerWidth
  const isMobile = winW < 768

  camera.aspect = window.innerWidth / window.innerHeight

  if (isMobile) {
    camera.position.set(0, 2, 18)
    camera.fov = 60
  } else {
    camera.position.set(0, 5, 25)
    camera.fov = 75
  }

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
