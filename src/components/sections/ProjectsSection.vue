<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

defineOptions({
  inheritAttrs: true,
})

const images = [
  { src: '/DECSA/1.png', title: 'Dashboard' },
  { src: '/DECSA/2.png', title: 'Búsqueda' },
  { src: '/DECSA/3.png', title: 'Geolocalización' },
  { src: '/DECSA/4.png', title: 'Voz' },
  { src: '/DECSA/5.png', title: 'Chatbot RAG' },
  { src: '/DECSA/6.png', title: 'Chat Operadores' },
  { src: '/DECSA/7.png', title: 'Gestión de Guardias' },
]

const canvasRef = ref<HTMLCanvasElement | null>(null)
const visible = ref(false)
const activeSlideIndex = ref(0)
const isHovering = ref(false)
const mouseX = ref(50)
const mouseY = ref(50)

const modules = [
  { label: 'WHATSAPPI', desc: 'Reclamos, consultas y facturación vía WhatsApp' },
  { label: 'FIELD APP', desc: 'App móvil para guardias: cierre de reclamos en terreno' },
  { label: 'AI DETECT', desc: 'Detección de anomalías de consumo por categoría de usuario' },
  { label: 'GEO-MAP', desc: 'PostGIS → coordenadas: SETAs, REDMT, seccionadores' },
  { label: 'MSG AUDIT', desc: 'Auditoría completa de mensajes y chat en tiempo real' },
  { label: 'KPIs', desc: 'Consumo, notas de crédito, facturas, dinero pendiente' },
]

const techStack = [
  { key: 'CLIENTS', val: '~13,000' },
  { key: 'BACKEND', val: 'C# .NET' },
  { key: 'FRONTEND', val: 'Vue.js' },
  { key: 'DB', val: 'PostGIS' },
  { key: 'REAL-TIME', val: 'SignalR' },
  { key: 'AI', val: 'RAG + LLM' },
]

function onSwiperSlideChange(swiper: any) {
  activeSlideIndex.value = swiper.realIndex
}

function onDistortionMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = ((e.clientX - rect.left) / rect.width) * 100
  mouseY.value = ((e.clientY - rect.top) / rect.height) * 100
}

function onDistortionEnter() {
  isHovering.value = true
}

function onDistortionLeave() {
  isHovering.value = false
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

  const gridSize = 35

  const draw = () => {
    ctx.fillStyle = '#000000'
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

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true
      }
    },
    { threshold: 0.15 },
  )
  observer.observe(canvas.parentElement!)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
    observer.disconnect()
  })
})
</script>

<template>
  <section class="projects-section" :id="$attrs.id as string">
    <canvas ref="canvasRef" class="bg-canvas"></canvas>

    <div class="container">
      <div class="section-header" :class="{ visible }">
        <span class="label">// CASE STUDY</span>
        <h2>
          <span class="word" style="--delay: 0.1s">PLATAFORMA</span>
          <span class="word" style="--delay: 0.25s">INTEGRAL</span>
          <span class="word accent" style="--delay: 0.4s">DECSA</span>
        </h2>
        <div class="divider" :class="{ visible }">
          <span class="divider-line"></span>
          <span class="divider-dot"></span>
          <span class="divider-line"></span>
        </div>
      </div>

      <div class="content-grid" :class="{ visible }">
        <div class="info-panel">
          <div class="panel-header">
            <span class="panel-tag">SYS.OVERVIEW</span>
            <div class="panel-line"></div>
          </div>

          <p class="panel-text">
            Sistema integral de gestión eléctrica para ~13,000 clientes. Los usuarios generan
            reclamos y consultan facturas vía WhatsApp. Operadores gestionan reclamos auditados por
            origen, despachan guardias con tracking GPS, y monitorean la red en mapa con datos
            geoespaciales de PostGIS. IA detecta anomalías de consumo por categoría.
          </p>

          <div class="panel-specs">
            <div v-for="(s, i) in techStack" :key="i" class="spec-row">
              <span class="spec-key">{{ s.key }}</span>
              <span class="spec-val">{{ s.val }}</span>
            </div>
          </div>

          <div class="module-header">
            <span class="module-tag">MODULES</span>
            <div class="module-line"></div>
          </div>

          <div class="feature-list">
            <div v-for="(f, i) in modules" :key="i" class="feature-item" :style="{ '--i': i }">
              <span class="feature-dot"></span>
              <div class="feature-body">
                <span class="feature-label">{{ f.label }}</span>
                <span class="feature-desc">{{ f.desc }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="carousel-wrapper"
          @mousemove="onDistortionMove"
          @mouseenter="onDistortionEnter"
          @mouseleave="onDistortionLeave"
        >
          <div
            class="distort-container"
            :class="{ active: isHovering }"
            :style="{ '--mx': mouseX + '%', '--my': mouseY + '%' }"
          >
            <Swiper
              :modules="[Autoplay, Pagination]"
              :autoplay="{ delay: 3000, disableOnInteraction: false }"
              :pagination="{ clickable: true }"
              :loop="true"
              :speed="600"
              class="swiper"
              @slide-change="onSwiperSlideChange"
            >
              <SwiperSlide v-for="(img, i) in images" :key="i">
                <img :src="img.src" :alt="img.title" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>

    <svg style="position: absolute; width: 0; height: 0; overflow: hidden" aria-hidden="true">
      <defs>
        <filter id="decsa-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="4"
            result="noise"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="25"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  padding: 6rem 2rem;
  background: #000000;
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
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}

.label {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  color: #f59e0b;
  letter-spacing: 0.2em;
  display: block;
  margin-bottom: 1.25rem;
}

h2 {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 200;
  color: #ffffff;
  letter-spacing: 0.15em;
  line-height: 1.1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3em;
  text-transform: uppercase;
}

.word {
  display: inline-block;
  opacity: 0;
  transform: translateY(40px) scaleY(0.8);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay);
}

.section-header.visible .word {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

.word.accent {
  color: #f59e0b;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  opacity: 0;
  transition: opacity 0.5s ease 0.6s;
}

.divider.visible {
  opacity: 1;
}

.divider-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #f59e0b, transparent);
}

.divider-dot {
  width: 4px;
  height: 4px;
  background: #f59e0b;
  border-radius: 50%;
}

.content-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 2rem;
  align-items: start;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
}

.content-grid.visible {
  opacity: 1;
  transform: translateY(0);
}

.info-panel {
  position: sticky;
  top: 6rem;
  background: #050505;
  border: 1px solid #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.panel-tag {
  font-family: 'Orbitron', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  color: #f59e0b;
  letter-spacing: 0.2em;
}

.panel-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #f59e0b, transparent);
}

.panel-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  line-height: 1.7;
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.panel-specs {
  border-top: 1px solid #1a1a1a;
  padding-top: 0.75rem;
  margin-bottom: 1.25rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  border-bottom: 1px solid #111;
}

.spec-key {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #4b5563;
  letter-spacing: 0.15em;
}

.spec-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #e5e7eb;
  letter-spacing: 0.05em;
}

.module-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.module-tag {
  font-family: 'Orbitron', monospace;
  font-size: 0.6rem;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.2em;
}

.module-line {
  flex: 1;
  height: 1px;
  background: #1a1a1a;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.5rem 0.6rem;
  border-radius: 4px;
  background: #0a0a0a;
  border: 1px solid #151515;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: calc(0.4s + var(--i) * 0.08s);
}

.content-grid.visible .feature-item {
  opacity: 1;
  transform: translateX(0);
}

.feature-dot {
  width: 4px;
  height: 4px;
  background: #f59e0b;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

.feature-body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.feature-label {
  font-family: 'Orbitron', monospace;
  font-size: 0.55rem;
  font-weight: 700;
  color: #f59e0b;
  letter-spacing: 0.15em;
}

.feature-desc {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: #6b7280;
  line-height: 1.4;
}

.carousel-wrapper {
  position: relative;
  padding: 2px;
  background: #000000;
  border-radius: 12px;
  overflow: hidden;
  cursor: crosshair;
}

.carousel-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.4),
    transparent,
    rgba(245, 158, 11, 0.2)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  filter: blur(1px);
  z-index: 2;
  pointer-events: none;
}

.carousel-wrapper::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 16px;
  background: transparent;
  box-shadow:
    0 0 40px rgba(245, 158, 11, 0.08),
    0 0 80px rgba(245, 158, 11, 0.03);
  filter: blur(16px);
  z-index: -1;
}

.distort-container {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.distort-container.active {
  animation: glitchShift 0.1s ease infinite;
}

.distort-container.active .swiper {
  filter: url(#decsa-distort);
}

.swiper {
  width: 100%;
  height: 600px;
  border-radius: 10px;
}

.swiper :deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000;
}

.swiper :deep(.swiper-slide img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.swiper :deep(.swiper-pagination) {
  bottom: 8px;
}

.swiper :deep(.swiper-pagination-bullet) {
  background: #374151;
  opacity: 1;
  width: 8px;
  height: 8px;
}

.swiper :deep(.swiper-pagination-bullet-active) {
  background: #f59e0b;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.5);
}

@keyframes glitchShift {
  0% {
    transform: translate(0);
  }
  25% {
    transform: translate(-1px, 1px);
  }
  50% {
    transform: translate(1px, -1px);
  }
  75% {
    transform: translate(-1px, -1px);
  }
  100% {
    transform: translate(0);
  }
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .info-panel {
    position: static;
  }

  .swiper {
    height: 350px;
  }
}
</style>
