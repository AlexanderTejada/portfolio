<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './components/sections/HeroSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'

const currentSection = ref('hero')
const isTransitioning = ref(false)

const sections = ['hero', 'projects', 'experience']
const panels = Array.from({ length: 12 }, (_, i) => i)

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
          }, 400)

          setTimeout(() => {
            isTransitioning.value = false
          }, 900)
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
      <div
        v-for="i in panels"
        :key="i"
        class="transition-panel"
        :style="{ '--panel-index': i }"
      ></div>
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
  display: flex;
  gap: 2px;
}

.transition-panel {
  flex: 1;
  background: #dc2626;
  transform: scaleY(0);
  transform-origin: top;
}

.transition-container.active .transition-panel {
  animation: panelSweep 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation-delay: calc(var(--panel-index) * 0.04s);
}

@keyframes panelSweep {
  0% {
    transform: scaleY(0);
    transform-origin: top;
    opacity: 1;
  }
  45% {
    transform: scaleY(1);
    transform-origin: top;
    opacity: 1;
  }
  55% {
    transform: scaleY(1);
    transform-origin: bottom;
    opacity: 1;
  }
  100% {
    transform: scaleY(0);
    transform-origin: bottom;
    opacity: 0;
  }
}
</style>
