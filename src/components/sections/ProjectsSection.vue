<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  inheritAttrs: true,
})

const systemInfo = {
  title: 'Sistema Integral de Gestión Eléctrica',
  company: 'DECSA - Distribuidora Eléctrica',
  description:
    'Plataforma integral para la gestión de reclamos, geolocalización en tiempo real, chatbot con IA y comunicación entre operadores.',
  images: [
    {
      src: '/DECSA/1.png',
      title: 'Dashboard',
      desc: 'Panel principal con métricas y gráficos en tiempo real',
    },
    {
      src: '/DECSA/2.png',
      title: 'Búsqueda',
      desc: 'Sistema de búsqueda avanzada de clientes con filtros dinámicos',
    },
    {
      src: '/DECSA/3.png',
      title: 'Geolocalización',
      desc: 'Mapa interactivo con SignalR, aislamiento de áreas y filtros',
    },
    {
      src: '/DECSA/4.png',
      title: 'Voz',
      desc: 'Creación de reclamos por transcripción de audio en tiempo real',
    },
    {
      src: '/DECSA/5.png',
      title: 'Chatbot RAG',
      desc: 'Asistente IA con RAG para regulaciones eléctricas',
    },
    {
      src: '/DECSA/6.png',
      title: 'Chat Operadores',
      desc: 'Comunicación en tiempo real entre operadores',
    },
    {
      src: '/DECSA/7.png',
      title: 'Gestión de Guardias',
      desc: 'Asignación de reclamos con tracking en mapa y app móvil',
    },
  ],
}

const isModalOpen = ref(false)
const activeIndex = ref(0)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const activeImage = ref(systemInfo.images[0])
let mouseX = 0
let mouseY = 0

const openModal = () => {
  isModalOpen.value = true
  activeIndex.value = 0
  activeImage.value = systemInfo.images[0]
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  activeIndex.value = (activeIndex.value + 1) % systemInfo.images.length
  activeImage.value = systemInfo.images[activeIndex.value]
}

const prevImage = () => {
  activeIndex.value = (activeIndex.value - 1 + systemInfo.images.length) % systemInfo.images.length
  activeImage.value = systemInfo.images[activeIndex.value]
}

const selectImage = (index: number) => {
  activeIndex.value = index
  activeImage.value = systemInfo.images[index]
}

const onMouseMove = (e: MouseEvent) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = (e.clientY / window.innerHeight) * 2 - 1
}

onMounted(() => {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let animationId: number

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)

  const gridSize = 35

  const draw = () => {
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let x = gridSize; x < canvas.width; x += gridSize) {
      for (let y = gridSize; y < canvas.height; y += gridSize) {
        ctx.fillStyle = 'rgba(80, 80, 90, 0.25)'
        ctx.fillRect(x - 1, y - 1, 2, 2)
      }
    }

    animationId = requestAnimationFrame(draw)
  }

  draw()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouseMove)
  })
})
</script>

<template>
  <section class="projects-section" :id="$attrs.id as string">
    <canvas ref="canvasRef" class="bg-canvas"></canvas>

    <div class="container">
      <div class="project-trigger" @click="openModal">
        <div class="trigger-content">
          <span class="trigger-label">PROYECTO DESTACADO</span>
          <h2 class="glitch-text" data-text="SISTEMA INTEGRAL">SISTEMA INTEGRAL</h2>
          <p>DECSA - Distribuidora Eléctrica</p>
          <div class="trigger-features">
            <span>RAG</span>
            <span>SignalR</span>
            <span>AI</span>
            <span>Maps</span>
            <span>Voice</span>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop>
            <button class="modal-close" @click="closeModal">CLOSE</button>

            <div class="modal-header">
              <h2>{{ systemInfo.title }}</h2>
              <p>{{ systemInfo.company }}</p>
            </div>

            <div class="carousel-container">
              <button class="nav-btn prev" @click="prevImage">PREV</button>

              <div class="carousel-main" v-if="activeImage">
                <img :src="activeImage.src" :alt="activeImage.title" class="main-image" />
                <div class="image-info">
                  <h3>{{ activeImage.title }}</h3>
                  <p>{{ activeImage.desc }}</p>
                </div>
              </div>

              <button class="nav-btn next" @click="nextImage">NEXT</button>
            </div>

            <div class="thumbnails">
              <div
                v-for="(img, index) in systemInfo.images"
                :key="index"
                class="thumb"
                :class="{ active: activeIndex === index }"
                @click="selectImage(index)"
              >
                <img :src="img.src" :alt="img.title" />
              </div>
            </div>

            <div class="modal-footer">
              <p>{{ systemInfo.description }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  padding: 6rem 2rem;
  background: #0a0a0f;
  overflow: hidden;
}

.bg-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.project-trigger {
  position: relative;
  background: transparent;
  border: 1px solid #1f2937;
  padding: 3rem;
  cursor: pointer;
  transition: all 0.4s ease;
}

.project-trigger:hover {
  border-color: #dc2626;
  transform: translateY(-2px);
}

.trigger-content {
  text-align: center;
}

.trigger-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: #dc2626;
  letter-spacing: 0.3em;
  display: block;
  margin-bottom: 1rem;
}

.trigger-content h2 {
  font-family: 'Orbitron', monospace;
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: #ffffff;
  letter-spacing: 0.1em;
  position: relative;
  display: inline-block;
}

.glitch-text {
  animation: glitch 3s infinite;
}

@keyframes glitch {
  0%,
  90%,
  100% {
    text-shadow: none;
  }
  91% {
    text-shadow:
      2px 0 #dc2626,
      -2px 0 #fff;
  }
  92% {
    text-shadow:
      -2px 0 #dc2626,
      2px 0 #fff;
  }
  93% {
    text-shadow:
      2px 2px #dc2626,
      -2px -2px #fff;
  }
  94% {
    text-shadow:
      -2px 2px #dc2626,
      2px -2px #fff;
  }
  95% {
    text-shadow:
      1px -1px #dc2626,
      -1px 1px #fff;
  }
}

.trigger-content p {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  color: #6b7280;
  margin: 1rem 0 1.5rem;
}

.trigger-features {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.trigger-features span {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid #374151;
  color: #9ca3af;
  letter-spacing: 0.15em;
  transition: all 0.2s ease;
}

.trigger-features span:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background: #0a0a0f;
  width: 100%;
  max-width: 1100px;
  max-height: 90vh;
  border: 1px solid #1f2937;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #dc2626;
  border: none;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 1rem;
  letter-spacing: 0.1em;
  z-index: 10;
}

.modal-close:hover {
  background: #b91c1c;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: #fff;
  letter-spacing: 0.1em;
}

.modal-header p {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  color: #dc2626;
  margin-top: 0.5rem;
  letter-spacing: 0.1em;
}

.carousel-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.nav-btn {
  background: transparent;
  border: 1px solid #374151;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
  letter-spacing: 0.1em;
  flex-shrink: 0;
}

.nav-btn:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.carousel-main {
  flex: 1;
}

.main-image {
  width: 100%;
  height: 420px;
  object-fit: contain;
  background: #111827;
}

.image-info {
  text-align: center;
  margin-top: 1rem;
  padding: 1rem;
  background: #111827;
}

.image-info h3 {
  font-family: 'Orbitron', monospace;
  font-size: 0.95rem;
  font-weight: 400;
  color: #fff;
}

.image-info p {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.thumb {
  width: 65px;
  height: 45px;
  cursor: pointer;
  opacity: 0.35;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.thumb:hover {
  opacity: 0.6;
}

.thumb.active {
  opacity: 1;
  border-color: #dc2626;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #1f2937;
}

.modal-footer p {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .main-image {
    height: 280px;
  }
}
</style>
