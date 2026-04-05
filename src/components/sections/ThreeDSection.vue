<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCanvasDotGrid } from '@/composables/useCanvasDotGrid'

interface MediaItem {
  src: string
  type: 'image' | 'video'
  title: string
}

const { canvasRef } = useCanvasDotGrid()
const activeCategory = ref<'ART' | 'INDUSTRIAL'>('ART')
const lightboxItem = ref<MediaItem | null>(null)

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
    { src: '/3D/INDUSTRIAL/todos los productos en un video.mp4', type: 'video', title: 'All Products Reel' },
    { src: '/3D/INDUSTRIAL/vaper video.mp4', type: 'video', title: 'Vaper' },
    { src: '/3D/INDUSTRIAL/batidora.png', type: 'image', title: 'Batidora' },
    { src: '/3D/INDUSTRIAL/freidora electrica.png', type: 'image', title: 'Freidora Eléctrica' },
    { src: '/3D/INDUSTRIAL/freidora vista top.png', type: 'image', title: 'Freidora Vista Top' },
    { src: '/3D/INDUSTRIAL/fumadorvapers.png', type: 'image', title: 'Vaper' },
    { src: '/3D/INDUSTRIAL/guante.png', type: 'image', title: 'Guante Táctico' },
    { src: '/3D/INDUSTRIAL/licuadora.png', type: 'image', title: 'Licuadora' },
    { src: '/3D/INDUSTRIAL/necklace2.png', type: 'image', title: 'Necklace I' },
    { src: '/3D/INDUSTRIAL/necklace3.png', type: 'image', title: 'Necklace II' },
    { src: '/3D/INDUSTRIAL/necklace5.png', type: 'image', title: 'Necklace III' },
    { src: '/3D/INDUSTRIAL/ventilador distintas partes separadas.png', type: 'image', title: 'Ventilador' },
  ],
}

const currentItems = computed(() => categories[activeCategory.value])

const openLightbox = (item: MediaItem) => { lightboxItem.value = item }
const closeLightbox = () => { lightboxItem.value = null }
</script>

<template>
  <section class="threed-section" v-bind="$attrs">
    <canvas ref="canvasRef" class="bg-canvas" />

    <div class="container">
      <div class="section-header">
        <span class="label">// 3D WORK</span>
        <h2>DIGITAL <span class="accent">CRAFT</span></h2>
        <p class="subtitle">Character art, organic sculpting &amp; hard surface modeling</p>
      </div>

      <div class="tabs">
        <button
          v-for="cat in (['ART', 'INDUSTRIAL'] as const)"
          :key="cat"
          class="tab"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="grid">
        <div
          v-for="(item, i) in currentItems"
          :key="i"
          class="grid-item"
          :class="{ 'is-video': item.type === 'video' }"
          @click="openLightbox(item)"
        >
          <template v-if="item.type === 'image'">
            <img :src="item.src" :alt="item.title" loading="lazy" />
          </template>
          <template v-else>
            <video :src="item.src" preload="metadata" muted />
            <div class="play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </template>
          <div class="item-overlay">
            <span class="item-title">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="fade">
      <div v-if="lightboxItem" class="lightbox" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox">✕</button>
        <div class="lightbox-content">
          <img
            v-if="lightboxItem.type === 'image'"
            :src="lightboxItem.src"
            :alt="lightboxItem.title"
          />
          <video
            v-else
            :src="lightboxItem.src"
            controls
            autoplay
          />
          <p class="lightbox-title">{{ lightboxItem.title }}</p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.threed-section {
  position: relative;
  padding: 6rem 2rem;
  background: #fafafa;
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
  color: #111827;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.accent {
  font-weight: 700;
}

.subtitle {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.75rem;
  letter-spacing: 0.05em;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.tab {
  font-family: 'Orbitron', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #9ca3af;
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #111827;
  transform: scaleX(0);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.tab.active {
  color: #111827;
}

.tab.active::after {
  transform: scaleX(1);
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.grid-item {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  cursor: pointer;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
}

.grid-item img,
.grid-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.grid-item:hover img,
.grid-item:hover video {
  transform: scale(1.04);
}

/* Play icon for videos */
.play-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  pointer-events: none;
  z-index: 1;
}

.play-icon svg {
  width: 48px;
  height: 48px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
  opacity: 0.9;
}

/* Hover overlay */
.item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(17, 24, 39, 0.7) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 0.75rem;
}

.grid-item:hover .item-overlay {
  opacity: 1;
}

.item-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: #ffffff;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s;
}

.lightbox-close:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

.lightbox-content {
  max-width: min(90vw, 1200px);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.lightbox-content img,
.lightbox-content video {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
}

.lightbox-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .threed-section {
    padding: 4rem 1rem;
  }
}
</style>
