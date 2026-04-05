<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './components/sections/HeroSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'

const currentSection = ref('hero')
const isTransitioning = ref(false)

const sections = ['hero', 'projects', 'experience']

// Generar partículas tipo desintegración
const particleCount = 800
const particles = Array.from({ length: particleCount }, (_, i) => {
  const x = Math.random() * 100
  const y = Math.random() * 100

  // Dirección aleatoria para el vuelo
  const angle = Math.random() * Math.PI * 2
  const distance = Math.random() * 80 + 40

  // Puntos de control Bézier para trayectoria orgánica
  const control1X = x + Math.cos(angle) * distance * 0.3 + (Math.random() - 0.5) * 30
  const control1Y = y + Math.sin(angle) * distance * 0.3 + (Math.random() - 0.5) * 30
  const control2X = x + Math.cos(angle) * distance * 0.7 + (Math.random() - 0.5) * 40
  const control2Y = y + Math.sin(angle) * distance * 0.7 + (Math.random() - 0.5) * 40
  const endX = x + Math.cos(angle) * distance + (Math.random() - 0.5) * 50
  const endY = y + Math.sin(angle) * distance + (Math.random() - 0.5) * 50

  // Paleta de colores grises con variación
  const colors = [
    '#1f2937',
    '#374151',
    '#4b5563',
    '#6b7280',
    '#9ca3af',
    '#d1d5db'
  ]
  const color = colors[Math.floor(Math.random() * colors.length)]

  // Tamaño aleatorio de partícula
  const size = Math.random() * 4 + 1

  // Delay basado en posición para efecto de barrido
  const delay = (x / 100) * 0.6 + Math.random() * 0.3

  return {
    id: i,
    x,
    y,
    control1X,
    control1Y,
    control2X,
    control2Y,
    endX,
    endY,
    color,
    size,
    delay
  }
})

const handleScroll = () => {
  // Transición desactivada temporalmente
  // const viewportHeight = window.innerHeight

  // for (const sectionId of sections) {
  //   const el = document.getElementById(sectionId)
  //   if (el) {
  //     const rect = el.getBoundingClientRect()
  //     if (rect.top >= -100 && rect.top <= 100) {
  //       const prevSection = currentSection.value
  //       const newSection = sectionId

  //       const currentIdx = sections.indexOf(newSection)
  //       const prevIdx = sections.indexOf(prevSection)

  //       if (currentIdx !== prevIdx && !isTransitioning.value) {
  //         isTransitioning.value = true

  //         setTimeout(() => {
  //           currentSection.value = newSection
  //         }, 800)

  //         setTimeout(() => {
  //           isTransitioning.value = false
  //         }, 2000)
  //       }
  //       break
  //     }
  //   }
  // }
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
      <div class="particles-container">
        <div
          v-for="p in particles"
          :key="p.id"
          class="particle"
          :style="{
            '--start-x': p.x + '%',
            '--start-y': p.y + '%',
            '--c1-x': p.control1X + '%',
            '--c1-y': p.control1Y + '%',
            '--c2-x': p.control2X + '%',
            '--c2-y': p.control2Y + '%',
            '--end-x': p.endX + '%',
            '--end-y': p.endY + '%',
            '--delay': p.delay + 's',
            '--size': p.size + 'px',
            left: p.x + '%',
            top: p.y + '%',
            background: p.color,
            width: p.size + 'px',
            height: p.size + 'px',
          }"
        ></div>
      </div>
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
  overflow: hidden;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 4px currentColor;
  will-change: transform, opacity;
}

.transition-container.active .particle {
  animation: particleDisintegrate 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: var(--delay);
}

@keyframes particleDisintegrate {
  0% {
    transform: translate(0, 0) scale(0) rotate(0deg);
    opacity: 0;
    filter: blur(0px) brightness(1);
  }
  10% {
    transform: translate(
        calc((var(--c1-x) - var(--start-x)) * 0.2),
        calc((var(--c1-y) - var(--start-y)) * 0.2)
      )
      scale(1.2) rotate(0deg);
    opacity: 0.9;
    filter: blur(0px) brightness(1.2);
  }
  30% {
    transform: translate(
        calc((var(--c1-x) - var(--start-x)) * 0.6),
        calc((var(--c1-y) - var(--start-y)) * 0.6)
      )
      scale(1) rotate(180deg);
    opacity: 1;
    filter: blur(0.5px) brightness(1);
  }
  60% {
    transform: translate(
        calc(var(--c2-x) - var(--start-x)),
        calc(var(--c2-y) - var(--start-y))
      )
      scale(0.8) rotate(270deg);
    opacity: 0.7;
    filter: blur(1px) brightness(0.8);
  }
  85% {
    transform: translate(
        calc((var(--end-x) - var(--start-x)) * 0.9),
        calc((var(--end-y) - var(--start-y)) * 0.9)
      )
      scale(0.3) rotate(340deg);
    opacity: 0.3;
    filter: blur(2px) brightness(0.6);
  }
  100% {
    transform: translate(
        calc(var(--end-x) - var(--start-x)),
        calc(var(--end-y) - var(--start-y))
      )
      scale(0) rotate(360deg);
    opacity: 0;
    filter: blur(4px) brightness(0.4);
  }
}
</style>
