<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCanvasDotGrid } from '@/composables/useCanvasDotGrid'

interface MediaItem {
  src: string
  type: 'image' | 'video'
  title: string
}

const { canvasRef } = useCanvasDotGrid(true)
const lightboxItem = ref<MediaItem | null>(null)
const lightboxImgRef = ref<HTMLImageElement | null>(null)
const isMagnifying = ref(false)
const magnifierPos = ref({ x: 0, y: 0, bgX: 0, bgY: 0 })
const videoRefs = ref<(HTMLVideoElement | null)[]>([])
const sectionExpanded = ref(false)
const ZOOM = 3

const handleVideoHover = (video: HTMLVideoElement | null | undefined, hover: boolean) => {
  if (!video) return
  if (hover) {
    video.currentTime = 0
    video.play().catch(() => {})
  } else {
    video.pause()
  }
}

const handleMagnify = (e: MouseEvent) => {
  if (!lightboxImgRef.value || lightboxItem.value?.type !== 'image') return

  const img = lightboxImgRef.value
  const rect = img.getBoundingClientRect()

  // Cursor pos relative to image
  let x = e.clientX - rect.left
  let y = e.clientY - rect.top

  // Page scroll correction
  x = x - window.scrollX
  y = y - window.scrollY

  // Constraints
  if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
    isMagnifying.value = false
    return
  }

  isMagnifying.value = true

  // Glass position (centered on cursor)
  magnifierPos.value.x = x
  magnifierPos.value.y = y

  // Background position for the zoom effect
  // Glass size is 150px, border is 2px
  const glassSize = 150
  const bw = 2
  const w = glassSize / 2
  const h = glassSize / 2

  magnifierPos.value.bgX = x * ZOOM - w + bw
  magnifierPos.value.bgY = y * ZOOM - h + bw
}

const categories: Record<'ART' | 'INDUSTRIAL', MediaItem[]> = {
  ART: [
    { src: '/3D/ART/alexander-tejada-clay-render.jpg', type: 'image', title: 'Clay Render' },
    { src: '/3D/ART/alexander-tejada-combine8.jpg', type: 'image', title: 'Combine' },
    { src: '/3D/ART/alexander-tejada-dragon-profile.jpg', type: 'image', title: 'Dragon' },
    { src: '/3D/ART/alexander-tejada-kidbuu6.jpg', type: 'image', title: 'Kid Buu' },
    { src: '/3D/ART/dinosaurio full body.jpg', type: 'image', title: 'Dinosaur' },
    { src: '/3D/ART/dinosaurio_cabeza.jpg', type: 'image', title: 'Dinosaur Head' },
    { src: '/3D/ART/render retrato surma woman.mp4', type: 'video', title: 'Surma Woman' },
  ],
  INDUSTRIAL: [
    {
      src: '/3D/INDUSTRIAL/todos los productos en un video.mp4',
      type: 'video',
      title: 'All Products Reel',
    },
    { src: '/3D/INDUSTRIAL/vaper video.mp4', type: 'video', title: 'Vaper' },
    { src: '/3D/INDUSTRIAL/3.mp4', type: 'video', title: 'Industrial Reel 1' },
    { src: '/3D/INDUSTRIAL/4.mp4', type: 'video', title: 'Industrial Reel 2' },
    { src: '/3D/INDUSTRIAL/batidora.png', type: 'image', title: 'Stand Mixer' },
    { src: '/3D/INDUSTRIAL/batidora blanca.png', type: 'image', title: 'White Stand Mixer' },
    { src: '/3D/INDUSTRIAL/freidora electrica.png', type: 'image', title: 'Electric Air Fryer' },
    { src: '/3D/INDUSTRIAL/freidora vista top.png', type: 'image', title: 'Air Fryer Top View' },
    { src: '/3D/INDUSTRIAL/freidora cerrada.png', type: 'image', title: 'Air Fryer Closed' },
    { src: '/3D/INDUSTRIAL/fumadorvapers.png', type: 'image', title: 'Vaper' },
    { src: '/3D/INDUSTRIAL/guante.png', type: 'image', title: 'Tactical Glove' },
    { src: '/3D/INDUSTRIAL/licuadora.png', type: 'image', title: 'Blender' },
    { src: '/3D/INDUSTRIAL/necklace2.png', type: 'image', title: 'Necklace I' },
    { src: '/3D/INDUSTRIAL/necklace3.png', type: 'image', title: 'Necklace II' },
    { src: '/3D/INDUSTRIAL/necklace5.png', type: 'image', title: 'Necklace III' },
    {
      src: '/3D/INDUSTRIAL/ventilador distintas partes separadas.png',
      type: 'image',
      title: 'Fan',
    },
  ],
}

// Categories list for template iteration
const categoryList = [
  { id: 'ART', label: '[01. ARTISTIC CREATIONS]' },
  { id: 'INDUSTRIAL', label: '[02. INDUSTRIAL SYSTEMS]' },
] as const

const handleMouseMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = (centerY - y) / 10
  const rotateY = (x - centerX) / 10

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

const handleMouseLeave = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  card.style.transform = 'rotateX(0deg) rotateY(0deg)'
}

const openLightbox = (item: MediaItem) => {
  lightboxItem.value = item
}
const closeLightbox = () => {
  lightboxItem.value = null
}
</script>

<template>
  <section class="threed-section" v-bind="$attrs" data-theme="dark">
    <canvas ref="canvasRef" class="bg-canvas" :class="{ collapsed: !sectionExpanded }" />

    <div class="container">
      <div class="section-header">
        <span class="label">// 3D WORK</span>
        <h2>DIGITAL <span class="accent">CRAFT</span></h2>
        <p class="subtitle">Character art, organic sculpting &amp; hard surface modeling</p>
        <button class="expand-btn" @click="sectionExpanded = !sectionExpanded">
          {{ sectionExpanded ? 'COLLAPSE' : 'EXPAND' }}
          <span class="arrow" :class="{ open: sectionExpanded }">▼</span>
        </button>
      </div>

      <div class="category-block" :class="{ collapsed: !sectionExpanded }">
        <div v-for="cat in categoryList" :key="cat.id" class="category-group">
          <div class="category-header">
            <span class="category-num">{{ cat.id === 'ART' ? '01' : '02' }}</span>
            <h3 class="category-subtitle">{{ cat.label }}</h3>
            <div class="category-line"></div>
          </div>

          <div class="grid">
            <div
              v-for="(item, index) in categories[cat.id]"
              :key="item.src"
              class="grid-item"
              :class="{ 'is-video': item.type === 'video' }"
              :style="{ '--index': index }"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
              @click="openLightbox(item)"
            >
              <!-- Holographic Overlays -->
              <div class="card-gloss"></div>
              <div class="card-scanline"></div>
              <div class="card-border">
                <span class="bracket tl"></span>
                <span class="bracket tr"></span>
                <span class="bracket bl"></span>
                <span class="bracket br"></span>
              </div>

              <div class="media-container">
                <template v-if="item.type === 'image'">
                  <img :src="item.src" :alt="item.title" loading="lazy" />
                </template>
                <template v-else>
                  <video
                    :src="item.src"
                    preload="metadata"
                    muted
                    loop
                    playsinline
                    :ref="(el) => (videoRefs[index] = el as HTMLVideoElement)"
                    @mouseenter="handleVideoHover(videoRefs[index], true)"
                    @mouseleave="handleVideoHover(videoRefs[index], false)"
                  />
                  <div class="play-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </template>
              </div>

              <div class="item-overlay">
                <div class="overlay-content">
                  <span class="item-tag"
                    >{{ cat.id === 'ART' ? 'VIS' : 'IND' }}_{{ index + 1 }}</span
                  >
                  <span class="item-title">{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="fade">
      <div v-if="lightboxItem" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">✕</button>
        <div class="lightbox-content" :class="{ 'has-magnifier': lightboxItem.type === 'image' }">
          <div v-if="lightboxItem.type === 'image'" class="magnifier-container">
            <img
              ref="lightboxImgRef"
              :src="lightboxItem.src"
              :alt="lightboxItem.title"
              class="lightbox-img"
              @mousemove="handleMagnify"
              @mouseleave="isMagnifying = false"
            />
            <div
              v-if="isMagnifying"
              class="magnifier-glass"
              :style="{
                left: `${magnifierPos.x}px`,
                top: `${magnifierPos.y}px`,
                backgroundImage: `url('${lightboxItem.src}')`,
                backgroundPosition: `-${magnifierPos.bgX}px -${magnifierPos.bgY}px`,
                backgroundSize: `${(lightboxImgRef?.width || 0) * ZOOM}px ${(lightboxImgRef?.height || 0) * ZOOM}px`,
              }"
            >
              <div class="glass-scanline"></div>
            </div>
          </div>
          <video v-else :src="lightboxItem.src" controls autoplay muted playsinline style="width: 100%; min-width: 320px;" />
          <p class="lightbox-title">{{ lightboxItem.title }}</p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.threed-section {
  position: relative;
  padding: 8rem 2rem;
  background: #0a0a0a;
  overflow: hidden;
}

.bg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.bg-canvas.collapsed {
  display: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.label {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.75rem;
  color: #6b7280;
  letter-spacing: 0.2em;
  display: block;
  margin-bottom: 1rem;
}

h2 {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 200;
  color: #ffffff;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.accent {
  font-weight: 700;
}

.subtitle {
  font-family: 'Share Tech Mono', monospace;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  color: #9ca3af;
  margin-top: 0.75rem;
  letter-spacing: 0.05em;
  padding: 0 1rem;
}

.expand-btn {
  margin-top: 1.5rem;
  background: transparent;
  border: 1px solid #374151;
  color: #9ca3af;
  padding: 0.5rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.expand-btn:hover {
  border-color: #6b7280;
  color: #ffffff;
}

.expand-btn .arrow {
  display: inline-block;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.expand-btn .arrow.open {
  transform: rotate(180deg);
}

/* Categories */
.category-block {
  margin-bottom: 6rem;
}

.category-block.collapsed {
  display: none;
}

.category-block:last-child {
  margin-bottom: 0;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}

.category-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #6b7280;
}

.category-subtitle {
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #ffffff;
  white-space: nowrap;
}

.category-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), transparent);
}

@media (max-width: 768px) {
  .category-header {
    gap: 1rem;
  }
  .category-subtitle {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
  }
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  perspective: 2000px; /* Enable 3D space */
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.grid-item {
  position: relative;
  aspect-ratio: 16 / 10;
  cursor: pointer;
  background: #0a0a0a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  transition: transform 0.15s ease-out;
  transform: rotateX(var(--rotateX, 0deg)) rotateY(var(--rotateY, 0deg));
  contain: layout style paint;

  /* Staggered Entry */
  opacity: 0;
  animation: cardEntry 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--index) * 0.08s);
  animation-fill-mode: both;
}

@keyframes cardEntry {
  from {
    opacity: 0;
    transform: translateY(30px) rotateX(10deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

.media-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 4px;
  z-index: 1;
}

.grid-item img,
.grid-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  filter: grayscale(0.2) contrast(1.1);
  content-visibility: auto;
}

.grid-item:hover img,
.grid-item:hover video {
  transform: scale(1.08) translateZ(20px);
  filter: grayscale(0) contrast(1.2);
}

/* Holographic Overlays */
.card-gloss {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--mouseX, 50%) var(--mouseY, 50%),
    rgba(255, 255, 255, 0.12) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.grid-item:hover .card-gloss {
  opacity: 1;
}

.card-scanline {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.03) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  opacity: 0.4;
}

.card-border {
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s;
}

.grid-item:hover .card-border {
  border-color: rgba(255, 255, 255, 0.3);
}

.bracket {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: rgba(255, 255, 255, 0.5);
  border-style: solid;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.bracket.tl {
  top: -2px;
  left: -2px;
  border-width: 2px 0 0 2px;
  transform: translate(-5px, -5px);
}
.bracket.tr {
  top: -2px;
  right: -2px;
  border-width: 2px 2px 0 0;
  transform: translate(5px, -5px);
}
.bracket.bl {
  bottom: -2px;
  left: -2px;
  border-width: 0 0 2px 2px;
  transform: translate(-5px, 5px);
}
.bracket.br {
  bottom: -2px;
  right: -2px;
  border-width: 0 2px 2px 0;
  transform: translate(5px, 5px);
}

.grid-item:hover .bracket {
  opacity: 1;
  transform: translate(0, 0);
}

/* Play icon */
.play-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  pointer-events: none;
  z-index: 2;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.play-icon svg {
  width: 40px;
  height: 40px;
}

.grid-item:hover .play-icon {
  opacity: 1;
}

/* Hover overlay content */
.item-overlay {
  position: absolute;
  inset: 0;
  z-index: 7;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: flex-end;
  padding: 1.25rem;
}

.grid-item:hover .item-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transform: translateY(10px);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.grid-item:hover .overlay-content {
  transform: translateY(0);
}

.item-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.2em;
}

.item-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1.25rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
  transform: rotate(90deg);
}

.lightbox-content {
  max-width: 95vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.lightbox-content img,
.lightbox-content video {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.magnifier-container {
  position: relative;
  display: inline-block;
  line-height: 0;
}

.lightbox-img {
  cursor: crosshair;
  max-width: 100%;
  height: auto;
}

.magnifier-glass {
  position: absolute;
  width: 150px;
  height: 150px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  cursor: none;
  pointer-events: none;
  z-index: 100;
  box-shadow:
    0 0 0 100vw rgba(0, 0, 0, 0.2),
    0 0 20px rgba(255, 255, 255, 0.3);
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

/* Optional Octagonal Shape for HUD feel */
.magnifier-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.glass-scanline {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  animation: scan 4s linear infinite;
  pointer-events: none;
}

.lightbox-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .threed-section {
    padding: 6rem 1rem;
  }

  .lightbox {
    padding: 1rem;
  }

  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .lightbox-title {
    font-size: 0.8rem;
    text-align: center;
  }
}
</style>
