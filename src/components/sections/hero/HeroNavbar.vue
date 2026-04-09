<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useScrollProgress } from '@/composables/useScrollProgress'
import { useScrollLock } from '@/composables/useScrollLock'

defineProps<{
  navItems: { label: string; to: string }[]
}>()

const emit = defineEmits<{
  navigate: [to: string]
}>()

const isMenuOpen = ref(false)
const isDark = ref(false)
const { scrollProgress } = useScrollProgress()
const { lock, unlock } = useScrollLock()

watch(isMenuOpen, (open) => {
  if (open) {
    lock()
  } else {
    unlock()
  }
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  // Observar todas las secciones con data-theme
  const sections = document.querySelectorAll('section[data-theme]')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute('data-theme')
          isDark.value = theme === 'dark'
        }
      })
    },
    {
      // Detectamos la sección que ocupa la parte superior del viewport
      threshold: 0,
      rootMargin: '-10% 0px -90% 0px',
    },
  )

  sections.forEach((s) => observer?.observe(s))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <nav class="navbar" :class="{ 'menu-open': isMenuOpen, 'is-dark': isDark }">
    <!-- HUD Corner Accents -->
    <div class="hud-corner tl"></div>
    <div class="hud-corner tr"></div>
    <div class="hud-corner bl"></div>
    <div class="hud-corner br"></div>

    <div class="nav-logo" @click="emit('navigate', 'hero')" @mouseenter="isMenuOpen = false">
      <span class="logo-text">ALEX</span>
    </div>

    <ul class="nav-links" :class="{ open: isMenuOpen }">
      <li v-for="item in navItems" :key="item.label">
        <a href="#" @click.prevent="emit('navigate', item.to)" class="nav-item">
          <span class="bracket left">[</span>
          <span class="label">{{ item.label }}</span>
          <span class="bracket right">]</span>
        </a>
      </li>
    </ul>

    <button class="nav-toggle" @click="isMenuOpen = !isMenuOpen" :aria-expanded="isMenuOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Scroll Progress Bar -->
    <div class="scroll-progress-container">
      <div class="scroll-progress-bar" :style="{ width: `${scrollProgress * 100}%` }"></div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding: 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.03),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  min-width: 600px;
}

/* Dark Theme State */
.navbar.is-dark {
  background: rgba(10, 10, 10, 0.75);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.4),
    inset 0 0 15px rgba(255, 255, 255, 0.03);
}

.navbar.is-dark .logo-text {
  color: #ffffff;
}

.navbar.is-dark .nav-item {
  color: #9ca3af;
}

.navbar.is-dark .nav-item:hover {
  color: #ffffff;
}

.navbar.is-dark .bracket {
  color: #ffffff;
}

.navbar.is-dark .hud-corner {
  border-color: #ffffff;
  opacity: 0.4;
}

.navbar.is-dark .nav-toggle span {
  background: #ffffff;
}

.navbar.is-dark .scroll-progress-bar {
  background: linear-gradient(90deg, #ffffff, #6b7280);
}

/* HUD Corner Accents */
.hud-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: #111827;
  border-style: solid;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.tl {
  top: -1px;
  left: -1px;
  border-width: 2px 0 0 2px;
}
.tr {
  top: -1px;
  right: -1px;
  border-width: 2px 2px 0 0;
}
.bl {
  bottom: -1px;
  left: -1px;
  border-width: 0 0 2px 2px;
}
.br {
  bottom: -1px;
  right: -1px;
  border-width: 0 2px 2px 0;
}

.navbar:hover .hud-corner {
  opacity: 1;
  width: 14px;
  height: 14px;
}

.nav-logo {
  cursor: pointer;
  perspective: 1000px;
}

.logo-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #111827;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
}

.nav-logo:hover .logo-text {
  letter-spacing: 0.5em;
  filter: drop-shadow(0 0 8px rgba(17, 24, 39, 0.2));
  transform: translateZ(10px);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #4b5563;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.nav-item .label {
  transition:
    transform 0.3s ease,
    color 0.3s ease;
}

.nav-item .bracket {
  position: absolute;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  color: #111827;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;
}

.nav-item .bracket.left {
  left: -5px;
  transform: translateX(10px);
}
.nav-item .bracket.right {
  right: -5px;
  transform: translateX(-10px);
}

.nav-item:hover {
  color: #111827;
}

.nav-item:hover .bracket {
  opacity: 1;
  transform: translateX(0);
}

.nav-item:hover .label {
  transform: scale(1.05);
}

.scroll-progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.scroll-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #111827, #4b5563);
  transition: width 0.1s ease;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  z-index: 1001;
}

.nav-toggle span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: #111827;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (max-width: 768px) {
  .navbar {
    width: calc(100% - 1.5rem);
    min-width: unset;
    gap: 1rem;
    padding: 0.6rem 1rem;
    left: 0.75rem;
    transform: none;
    top: 0.75rem;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    gap: 2.5rem;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }

  /* Mobile menu dark state adjustment */
  .navbar.is-dark .nav-links {
    background: rgba(10, 10, 10, 0.98);
  }

  .nav-links.open {
    transform: translateX(0);
    pointer-events: auto;
  }

  .nav-item {
    font-size: 1.25rem;
  }

  .nav-logo {
    z-index: 1001;
  }

  .logo-text {
    font-size: 0.75rem;
  }

  /* Toggle Animation */
  .menu-open .nav-toggle span:nth-child(1) {
    transform: translateY(6.5px) rotate(45deg);
  }
  .menu-open .nav-toggle span:nth-child(2) {
    opacity: 0;
    transform: translateX(-10px);
  }
  .menu-open .nav-toggle span:nth-child(3) {
    transform: translateY(-6.5px) rotate(-45deg);
  }
}
</style>
