<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './components/sections/HeroSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'

const currentSection = ref('hero')
const isTransitioning = ref(false)

const sections = ['hero', 'projects', 'experience']
const cols = 20
const rows = 8
const tiles = Array.from({ length: cols * rows }, (_, i) => i)

const handleScroll = () => {
  const viewportHeight = window.innerHeight

  for (const sectionId of sections) {
    const el = document.getElementById(sectionId)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top >= -viewportHeight / 2 && rect.top <= viewportHeight / 2) {
        const prevSection = currentSection.value
        const newSection = sectionId

        const currentIdx = sections.indexOf(newSection)
        const prevIdx = sections.indexOf(prevSection)

        if (currentIdx !== prevIdx && !isTransitioning.value) {
          isTransitioning.value = true

          setTimeout(() => {
            currentSection.value = newSection
          }, 500)

          setTimeout(() => {
            isTransitioning.value = false
          }, 1200)
        }
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div id="app">
    <HeroSection />
    <ProjectsSection id="projects" />
    <ExperienceSection id="experience" />

    <div class="transition-container" :class="{ active: isTransitioning }">
      <div class="blur-layer"></div>
      <div class="flash-overlay"></div>

      <div class="tiles-grid">
        <div
          v-for="i in tiles"
          :key="i"
          class="transition-tile"
          :style="{
            '--col': i % cols,
            '--row': Math.floor(i / cols),
            '--cols': cols,
            '--rows': rows,
          }"
        ></div>
      </div>

      <div class="scan-line"></div>
    </div>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  position: relative;
}

.transition-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
}

.blur-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  z-index: 1;
}

.transition-container.active .blur-layer {
  animation: blurPulse 1s ease-out forwards;
}

@keyframes blurPulse {
  0% {
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }
  30% {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  70% {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  100% {
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }
}

.flash-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(220, 38, 38, 0.15);
  opacity: 0;
  z-index: 2;
}

.transition-container.active .flash-overlay {
  animation: flashPulse 0.8s ease-out forwards;
}

@keyframes flashPulse {
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.tiles-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 2px;
}

.transition-tile {
  background: #dc2626;
  transform: scale(0) rotate(45deg);
  opacity: 0;
}

.transition-container.active .transition-tile {
  animation: tileReveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--col) * 0.025s + var(--row) * 0.035s);
}

@keyframes tileReveal {
  0% {
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  20% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  70% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #fff;
  box-shadow:
    0 0 15px #dc2626,
    0 0 30px #dc2626,
    0 0 60px rgba(220, 38, 38, 0.5);
  opacity: 0;
  z-index: 4;
}

.transition-container.active .scan-line {
  animation: scanDown 0.5s ease-out 0.3s forwards;
}

@keyframes scanDown {
  0% {
    top: 0;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
</style>
