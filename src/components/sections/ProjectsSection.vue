<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
// @ts-expect-error — Swiper CSS imports lack type declarations
import 'swiper/css'
// @ts-expect-error — Swiper CSS imports lack type declarations
import 'swiper/css/pagination'
import { useCanvasDotGrid } from '@/composables/useCanvasDotGrid'

const { canvasRef } = useCanvasDotGrid()
const sectionRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const modulesOpen = ref(false)

const images = [
  { src: '/DECSA/1.png', title: 'Interface Alpha' },
  { src: '/DECSA/2.png', title: 'Neural Map' },
  { src: '/DECSA/3.png', title: 'Data Stream' },
  { src: '/DECSA/4.png', title: 'Signal Track' },
  { src: '/DECSA/5.png', title: 'Node Sync' },
  { src: '/DECSA/6.png', title: 'Core Process' },
  { src: '/DECSA/7.png', title: 'System Link' },
]

const modules = [
  { label: 'MOD_ALPHA', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { label: 'CORE_SYNC', desc: 'Nullam in dui mauris, vivamus hendrerit arcu sed erat.' },
  { label: 'DATA_FLOW', desc: 'Sed auctor neque eu tellus rhoncus ut eleifend nibh.' },
  { label: 'NODE_MGMT', desc: 'Porttitor ut eleifend nibh, vivamus hendrerit arcu sed.' },
  { label: 'SYS_AUDIT', desc: 'Adipiscing elit, sed do eiusmod tempor incididunt ut.' },
  { label: 'VAL_STAT', desc: 'Labore et dolore magna aliqua, ut enim ad minim veniam.' },
]

const techStack = [
  { key: 'NODES', val: '~13,000' },
  { key: 'ARCH', val: 'LOREM IPSUM' },
  { key: 'LAYER', val: 'DOLOR SIT' },
  { key: 'DATA', val: 'CONSECTETUR' },
  { key: 'SYNC', val: 'ADIPISCING' },
  { key: 'LOGIC', val: 'ELIT_SED' },
]

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!sectionRef.value) return
  observer = new IntersectionObserver(
    ([entry]) => { if (entry?.isIntersecting) visible.value = true },
    { threshold: 0.15 },
  )
  observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <section ref="sectionRef" class="projects-section" v-bind="$attrs" data-theme="light">
    <canvas ref="canvasRef" class="bg-canvas"></canvas>

    <div class="container">
      <div class="section-header" :class="{ visible }">
        <span class="label">// CASE STUDY</span>
        <h2>
          <span class="word" style="--delay: 0.1s">CORE</span>
          <span class="word" style="--delay: 0.25s">SYSTEM</span>
          <span class="word accent" style="--delay: 0.4s">ARCHITECTURE</span>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
            rhoncus ut eleifend nibh porttitor. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div class="panel-specs">
            <div v-for="(s, i) in techStack" :key="i" class="spec-row">
              <span class="spec-key">{{ s.key }}</span>
              <span class="spec-val">{{ s.val }}</span>
            </div>
          </div>

          <button class="module-header" @click="modulesOpen = !modulesOpen">
            <span class="module-tag">MODULES</span>
            <div class="module-line"></div>
            <span class="module-chevron" :class="{ open: modulesOpen }">›</span>
          </button>

          <div class="feature-list" :class="{ open: modulesOpen }">
            <div class="feature-list-inner">
              <div v-for="(f, i) in modules" :key="i" class="feature-item">
                <span class="feature-dot"></span>
                <div class="feature-body">
                  <span class="feature-label">{{ f.label }}</span>
                  <span class="feature-desc">{{ f.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="carousel-wrapper">
          <Swiper
            :modules="[Autoplay, Pagination]"
            :autoplay="{ delay: 3000, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            :loop="true"
            :speed="600"
            class="swiper"
          >
            <SwiperSlide v-for="(img, i) in images" :key="i">
              <img :src="img.src" :alt="img.title" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  padding: 6rem 2rem;
  background: #fafafa;
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
  color: #6b7280;
  letter-spacing: 0.2em;
  display: block;
  margin-bottom: 1.25rem;
}

h2 {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 200;
  color: #111827;
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
  color: #1f2937;
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
  background: linear-gradient(90deg, transparent, #d1d5db, transparent);
}

.divider-dot {
  width: 4px;
  height: 4px;
  background: #1f2937;
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
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
  color: #1f2937;
  letter-spacing: 0.2em;
}

.panel-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, #d1d5db, transparent);
}

.panel-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.panel-specs {
  border-top: 1px solid #e5e7eb;
  padding-top: 0.75rem;
  margin-bottom: 1.25rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.spec-key {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #6b7280;
  letter-spacing: 0.15em;
}

.spec-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #111827;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.module-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0;
  width: 100%;
  background: none;
  border: none;
  padding: 0.5rem 0;
  cursor: pointer;
}

.module-header:hover .module-tag {
  color: #1f2937;
}

.module-tag {
  font-family: 'Orbitron', monospace;
  font-size: 0.6rem;
  font-weight: 700;
  color: #6b7280;
  letter-spacing: 0.2em;
  transition: color 0.2s;
}

.module-line {
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.module-chevron {
  font-size: 1rem;
  color: #9ca3af;
  line-height: 1;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s;
  transform: rotate(0deg);
}

.module-chevron.open {
  transform: rotate(90deg);
  color: #1f2937;
}

.feature-list {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
}

.feature-list.open {
  grid-template-rows: 1fr;
}

.feature-list > * {
  overflow: hidden;
}

.feature-list-inner {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.5rem 0.6rem;
  border-radius: 4px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.feature-dot {
  width: 4px;
  height: 4px;
  background: #1f2937;
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
  color: #1f2937;
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
  background: #f9fafb;
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
    rgba(31, 41, 55, 0.2),
    transparent,
    rgba(31, 41, 55, 0.1)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
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
    0 0 40px rgba(0, 0, 0, 0.03),
    0 0 80px rgba(0, 0, 0, 0.01);
  filter: blur(16px);
  z-index: -1;
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
  background: #ffffff;
}

.swiper :deep(.swiper-slide img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mask-image: radial-gradient(ellipse 85% 80% at 50% 50%, black 55%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 85% 80% at 50% 50%, black 55%, transparent 100%);
}

.swiper :deep(.swiper-pagination) {
  bottom: 8px;
}

.swiper :deep(.swiper-pagination-bullet) {
  background: #d1d5db;
  opacity: 1;
  width: 8px;
  height: 8px;
}

.swiper :deep(.swiper-pagination-bullet-active) {
  background: #1f2937;
  box-shadow: 0 0 8px rgba(31, 41, 55, 0.3);
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .info-panel {
    max-height: none;
    order: 2;
  }

  .carousel-wrapper {
    order: 1;
  }

  .swiper {
    height: clamp(250px, 50vw, 400px);
  }
}

@media (max-width: 600px) {
  .projects-section {
    padding: 4rem 1rem;
  }
  
  .info-panel {
    padding: 1.25rem;
  }
}
</style>
