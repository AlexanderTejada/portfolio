<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollProgress } from '@/composables/useScrollProgress'
import { useActiveSectionTheme } from '@/composables/useActiveSectionTheme'
import HeroScene from '@/components/3d/HeroScene.vue'
import NavigationSidebar from '@/components/sections/NavigationSidebar.vue'
import HeroNavbar from './HeroNavbar.vue'
import SoftwareModal from './SoftwareModal.vue'
import ThreeDModal from './ThreeDModal.vue'

defineOptions({ name: 'HeroSection' })

const { scrollProgress } = useScrollProgress()
const { activeTheme } = useActiveSectionTheme()
const showContent = ref(false)
const showSoftwareModal = ref(false)
const showThreeDModal = ref(false)

const navItems = [
  { label: 'WORKS', to: 'projects' },
  { label: 'EXPERIENCE', to: 'experience' },
  { label: 'CONTACT', to: 'contact' },
]

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() =>
  setTimeout(() => {
    showContent.value = true
  }, 300),
)
</script>

<template>
  <section id="hero" class="hero" data-theme="light">
    <HeroScene />

    <HeroNavbar :nav-items="navItems" @navigate="scrollTo" />

    <!-- Mobile Hero Title - positioned at top -->
    <h2 class="hero-title-mobile glitch-text" data-text="ALEXANDER TEJADA">
      ALEXANDER TEJADA<span>ALEXANDER TEJADA</span>
    </h2>

    <NavigationSidebar
      position="left"
      :texts="['FULL', 'STACK']"
      :theme="activeTheme"
      @click="scrollTo('projects')"
    />
    <NavigationSidebar
      position="right"
      :texts="['DESIGN', '3D']"
      :theme="activeTheme"
      @click="scrollTo('threed')"
    />

    <div class="corner-content" :class="{ visible: showContent }">
      <p class="hero-subtitle">AI Implementer & Full-Stack Engineer</p>
      <div class="cta-buttons">
        <button class="btn-primary" @click="scrollTo('projects')">VIEW PROJECTS</button>
        <button class="btn-secondary" @click="scrollTo('contact')">CONTACT</button>
      </div>
    </div>

    <SoftwareModal :open="showSoftwareModal" @close="showSoftwareModal = false" />
    <ThreeDModal :open="showThreeDModal" @close="showThreeDModal = false" />

    <div
      class="hud-panel hud-left"
      :class="{ visible: showContent }"
      @click="showSoftwareModal = true"
    >
      <div class="hud-corner tl" />
      <div class="hud-corner tr" />
      <div class="hud-corner bl" />
      <div class="hud-corner br" />
      <span class="hud-label">// SYS_ARCH_NODE</span>
      <span class="hud-label hud-label--mobile">SOFTWARE</span>
      <div class="hud-divider" />
      <p class="hud-bio">Full-stack Engineer | .NET · C# · Vue.js · RAG & LLM Systems</p>
    </div>

    <div
      class="hud-panel hud-right"
      :class="{ visible: showContent }"
      @click="showThreeDModal = true"
    >
      <div class="hud-corner tl" />
      <div class="hud-corner tr" />
      <div class="hud-corner bl" />
      <div class="hud-corner br" />
      <span class="hud-label">// 3D ARTIST</span>
      <span class="hud-label hud-label--mobile">3D</span>
      <div class="hud-divider" />
      <p class="hud-bio">Character & Creature Artist | ZBrush, Substance & Mobile Game Assets</p>
    </div>

    <!-- Mobile: panels in a row below content -->
    <div class="hud-panels-row" :class="{ visible: showContent }">
      <div class="hud-panel-mobile" @click="showSoftwareModal = true">
        <span class="hud-label--mobile">SOFTWARE</span>
      </div>
      <div class="hud-panel-mobile" @click="showThreeDModal = true">
        <span class="hud-label--mobile">3D</span>
      </div>
    </div>

    <div v-show="scrollProgress < 0.1" class="scroll-indicator" :class="{ visible: showContent }">
      <span>↓</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* Corner content */
.corner-content {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  padding: clamp(1.5rem, 5vw, 2rem);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  max-width: 420px;
  overflow: hidden;
}

.corner-content::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 50%);
}

.corner-content.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #1f2937;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 2px;
  width: fit-content;
  background: #ffffff;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: #0a65ff;
  color: #ffffff;
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: 50%;
}

.hero-subtitle {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  color: #374151;
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.03em;
  line-height: 1.5;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.8rem 1.5rem;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
  min-height: 44px;
  text-transform: uppercase;
}

.btn-primary:hover {
  transform: translateY(-2px) scaleX(1.05);
  opacity: 0.85;
}

@supports (touch-action: manipulation) {
  .btn-primary:active {
    transform: scale(0.95);
  }
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #111827;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 0.8rem 1.5rem;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
  min-height: 44px;
  text-transform: uppercase;
}

.btn-secondary:hover {
  transform: translateY(-2px) scaleX(1.05);
  opacity: 0.85;
}

@supports (touch-action: manipulation) {
  .btn-secondary:active {
    transform: scale(0.95);
  }
}

/* HUD panels */
.hud-panel {
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  z-index: 10;
  width: 200px;
  padding: 1.1rem 1.25rem;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
    transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.hud-left {
  left: 3rem;
}
.hud-right {
  right: 3rem;
}

.hud-panel.visible {
  opacity: 1;
  transform: translateY(-50%);
}

.hud-panel.visible:hover {
  transform: translateY(calc(-50% - 4px));
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.hud-panel.visible:hover .hud-corner {
  width: 10px;
  height: 10px;
  border-color: #111827;
}

.hud-panel.visible:hover .hud-label {
  animation: cyber-flicker 0.8s steps(1) 1 forwards;
  color: #111827;
}

.hud-panel.visible:hover .hud-bio {
  animation: hud-bio-glitch 0.6s steps(1) 1 forwards;
}

/* Corner accents */
.hud-corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: #1f2937;
  border-style: solid;
  transition:
    width 0.3s ease,
    height 0.3s ease,
    border-color 0.3s ease;
}

.hud-corner.tl {
  top: -1px;
  left: -1px;
  border-width: 2px 0 0 2px;
}
.hud-corner.tr {
  top: -1px;
  right: -1px;
  border-width: 2px 2px 0 0;
}
.hud-corner.bl {
  bottom: -1px;
  left: -1px;
  border-width: 0 0 2px 2px;
}
.hud-corner.br {
  bottom: -1px;
  right: -1px;
  border-width: 0 2px 2px 0;
}

.hud-label {
  display: block;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #374151;
  letter-spacing: 0.2em;
  margin-bottom: 0.6rem;
  transition: none;
}

/* Mobile-only short label — hidden on desktop */
.hud-label--mobile {
  display: none;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.hud-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin-bottom: 0.6rem;
}

.hud-bio {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
  padding: 0.5rem;
  border-radius: 2px;
  position: relative;
}

.hud-panels-row {
  display: none;
}

.hero-title-mobile {
  display: none;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: clamp(1.8rem, 10vw, 3rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #111827;
  margin: 0;
  padding: 0 1rem;
  text-align: center;
  position: relative;
  animation: glitch-rgb 2.5s infinite steps(8);
  line-height: 1.1;
}

.hero-title-mobile::before,
.hero-title-mobile::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.hero-title-mobile::before {
  color: #ff0040;
  animation: glitch-rgb-1 2.5s infinite steps(8);
  text-shadow: 0 0 20px rgba(255, 0, 64, 0.8);
}

.hero-title-mobile::after {
  color: #ff0080;
  animation: glitch-rgb-2 2.5s infinite steps(8);
  text-shadow: 0 0 20px rgba(255, 0, 128, 0.6);
}

.hero-title-mobile span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff3366;
  animation: glitch-rgb-3 2.5s infinite steps(8);
  text-shadow: 0 0 15px rgba(255, 51, 102, 0.7);
}

@keyframes glitch-rgb {
  0%,
  80%,
  100% {
    transform: translate(0);
    filter: none;
    font-family: 'Orbitron', sans-serif;
  }
  81% {
    font-family: 'Bebas Neue', cursive;
  }
  82% {
    transform: translate(-6px, 0) skewX(-4deg);
  }
  83% {
    transform: translate(6px, 0) skewX(4deg);
    font-family: 'Share Tech Mono', monospace;
  }
  84% {
    transform: translate(-3px, 0);
  }
  85% {
    transform: translate(0);
  }
}

@keyframes glitch-rgb-1 {
  0%,
  80%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  81% {
    transform: translate(-3px, 0);
    opacity: 0.85;
  }
  82% {
    transform: translate(4px, 0);
    opacity: 0.6;
  }
  83% {
    transform: translate(-2px, 0);
    opacity: 0.7;
  }
  84% {
    transform: translate(0);
    opacity: 0;
  }
}

@keyframes glitch-rgb-2 {
  0%,
  80%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  81% {
    transform: translate(3px, 0);
    opacity: 0.75;
  }
  82% {
    transform: translate(-4px, 0);
    opacity: 0.8;
  }
  83% {
    transform: translate(2px, 0);
    opacity: 0.65;
  }
  84% {
    transform: translate(0);
    opacity: 0;
  }
}

@keyframes glitch-rgb-3 {
  0%,
  80%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  81% {
    transform: translate(-2px, 2px);
    opacity: 0.7;
  }
  82% {
    transform: translate(2px, -2px);
    opacity: 0.8;
  }
  83% {
    transform: translate(-1px, 1px);
    opacity: 0.75;
  }
  84% {
    transform: translate(0);
    opacity: 0;
  }
}

.hud-panel-mobile {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.hud-panel-mobile:hover {
  background: rgba(255, 255, 255, 0.98);
  border-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.hud-panel-mobile .hud-label--mobile {
  display: block;
  color: #374151;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}

@media (max-width: 1024px) {
  .hud-panel {
    width: 140px;
    padding: 0.8rem 1rem;
    top: 30%;
  }
  .hud-left {
    left: 1rem;
  }
  .hud-right {
    right: 1rem;
  }
  .corner-content {
    left: 2rem;
    bottom: 2rem;
    max-width: 50%;
  }
}

@media (max-width: 768px) {
  .hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
    padding: 4rem 1rem 2rem;
    position: relative;
    gap: 2rem;
  }

  .hud-panel {
    display: none;
  }

  .hud-panels-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    margin-top: 1rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    order: 2;
  }

  .hud-panels-row.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-title-mobile {
    display: block !important;
    position: relative;
    margin: 0;
    order: 1;
    width: 100%;
    padding: 0 0.5rem;
  }

  .hud-panel-mobile {
    flex: 1;
    padding: 1.2rem 1rem;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hud-panel-mobile:active {
    transform: scale(0.98);
  }

  .corner-content {
    position: relative;
    bottom: auto;
    left: auto !important;
    right: auto !important;
    width: 100%;
    max-width: 100%;
    padding: 1.5rem 1rem;
    margin-top: 0;
    transform: none !important;
    opacity: 1 !important;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(0, 0, 0, 0.05);
    order: 3;
    gap: 1.2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }

  .role-badge {
    font-size: 0.6rem;
    padding: 0.3rem 0.6rem;
  }

  .name-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    position: relative;
  }

  .verified-badge {
    position: absolute;
    right: 0;
    top: 0;
    width: 16px;
    height: 16px;
    font-size: 0.55rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #4b5563;
    font-weight: 500;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    padding: 1rem 1.2rem;
    font-size: 0.8rem;
    width: 100%;
    border-radius: 4px;
    font-weight: 600;
  }

  .btn-primary {
    background: #111827;
    color: #ffffff;
  }

  .btn-primary:active {
    background: #1f2937;
    transform: scale(0.98);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.98);
    color: #111827;
    border: 1px solid #d1d5db;
  }

  .btn-secondary:active {
    background: rgba(255, 255, 255, 0.95);
    transform: scale(0.98);
  }

  .scroll-indicator {
    bottom: 1rem;
    font-size: 1.5rem;
  }

  /* Hide navigation sidebar on very small screens */
  :deep(.navigation-sidebar) {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 3.5rem 0.75rem 1rem;
    gap: 1.5rem;
  }

  .hero-title-mobile {
    font-size: clamp(1.5rem, 9vw, 2.5rem);
    padding: 0 0.5rem;
    margin-bottom: 0.5rem;
  }

  .hud-panels-row {
    gap: 0.75rem;
    margin-top: 0.5rem;
    padding: 0 0.5rem;
  }

  .hud-panel-mobile {
    padding: 1rem 0.75rem;
    min-height: 70px;
    border-radius: 3px;
    transition: all 0.2s ease;
  }

  .hud-panel-mobile:active {
    transform: scale(0.96);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .hud-panel-mobile .hud-label--mobile {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
  }

  .corner-content {
    padding: 1.2rem 0.75rem;
    gap: 1rem;
    border-radius: 3px;
    transition: all 0.4s ease;
  }

  .hero-subtitle {
    font-size: 0.85rem;
  }

  .cta-buttons {
    gap: 0.6rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.9rem 1rem;
    font-size: 0.75rem;
    min-height: 40px;
    transition: all 0.2s ease;
  }

  /* Reduce glitch animation for less screen space - disable on very mobile */
  .hero-title-mobile {
    animation: none;
  }

  .hero-title-mobile::before,
  .hero-title-mobile::after {
    display: none;
  }

  .hero-title-mobile span {
    display: none;
  }

  /* Smooth transitions for mobile */
  * {
    --transition-duration: 0.2s;
  }
}

/* Glitch */
.glitch-text {
  position: relative;
  display: inline-block;
  animation: glitch-tv 5s infinite steps(20);
}

.hero-title-mobile.glitch-text {
  display: none;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.glitch-text::before {
  color: #1f2937;
  animation: glitch-tv-1 5s infinite steps(20);
}

.glitch-text::after {
  color: #6b7280;
  animation: glitch-tv-2 5s infinite steps(20);
  animation-delay: 0.1s;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-muted);
  font-size: 1.5rem;
  font-family: 'Share Tech Mono', monospace;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-indicator.visible {
  opacity: 0.4;
  animation: bounce 2s infinite;
}

@keyframes hud-label-glitch {
  0% {
    font-family: 'Orbitron', sans-serif;
    color: #ef4444;
    letter-spacing: 0.3em;
    transform: translate(-3px, 1px);
    text-shadow:
      2px 0 #ef4444,
      -2px 0 #b91c1c;
  }
  15% {
    font-family: 'Bebas Neue', cursive;
    color: #dc2626;
    letter-spacing: 0.05em;
    transform: translate(3px, -1px);
    text-shadow:
      -3px 0 #ef4444,
      3px 0 #b91c1c;
  }
  30% {
    font-family: 'Share Tech Mono', monospace;
    color: #ef4444;
    letter-spacing: 0.35em;
    transform: translate(-1px, 0);
    text-shadow: 1px 0 #dc2626;
  }
  45% {
    font-family: 'Inter', sans-serif;
    color: #b91c1c;
    letter-spacing: 0.1em;
    transform: translate(2px, 1px);
    text-shadow: -1px 0 #ef4444;
  }
  60%,
  100% {
    font-family: 'JetBrains Mono', monospace;
    color: #9ca3af;
    letter-spacing: 0.2em;
    transform: translate(0);
    text-shadow: none;
  }
}

@keyframes hud-bio-glitch {
  0% {
    font-family: 'Orbitron', sans-serif;
    color: #ef4444;
    transform: translate(-2px, 0);
    text-shadow: 1px 0 #ef4444;
  }
  15% {
    font-family: 'Share Tech Mono', monospace;
    color: #dc2626;
    transform: translate(2px, 1px);
    text-shadow: -1px 0 #b91c1c;
  }
  30% {
    font-family: 'Bebas Neue', cursive;
    color: #ef4444;
    transform: translate(-1px, -1px);
    text-shadow: 2px 0 #dc2626;
  }
  50%,
  100% {
    font-family: 'Inter', sans-serif;
    color: #4b5563;
    transform: translate(0);
    text-shadow: none;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 0.4;
  }
  50% {
    transform: translateX(-50%) translateY(10px);
    opacity: 0.7;
  }
}

@keyframes glow-pulse {
  0%,
  100% {
    text-shadow: none;
    border-left-color: rgba(0, 0, 0, 0.2);
  }
  50% {
    text-shadow: none;
    border-left-color: rgba(0, 0, 0, 0.4);
  }
}

@keyframes cyber-flicker {
  0%,
  18%,
  22%,
  25%,
  54%,
  56%,
  100% {
    opacity: 1;
  }
  19%,
  24%,
  55% {
    opacity: 0.8;
  }
}

@keyframes scan-line {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes glitch-tv {
  0%,
  90%,
  100% {
    transform: translate(0);
    filter: none;
    font-family: 'Orbitron', sans-serif;
  }
  91% {
    font-family: 'Bebas Neue', sans-serif;
  }
  92% {
    transform: translate(-15px, 0) skewX(-8deg);
    filter: contrast(1.5) brightness(1.2);
  }
  93% {
    transform: translate(15px, 0) skewX(8deg);
    font-family: 'Inter', sans-serif;
  }
  94% {
    transform: translate(-10px, 0) skewX(-4deg);
    filter: contrast(1.3);
  }
  95% {
    transform: translate(10px, 0) skewX(5deg);
  }
  96% {
    transform: translate(-5px, 0);
  }
  97% {
    transform: translate(0);
  }
}

@keyframes glitch-tv-1 {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 0;
    clip-path: inset(0 0 0 0);
  }
  91% {
    transform: translate(-5px, 0);
    opacity: 0.6;
    clip-path: inset(15% 0 40% 0);
  }
  92% {
    transform: translate(-15px, 0) scaleX(1.1);
    opacity: 0.9;
    clip-path: inset(20% 0 30% 0);
  }
  93% {
    transform: translate(12px, 0) scaleX(0.9);
    opacity: 0.7;
    clip-path: inset(50% 0 10% 0);
  }
  94% {
    transform: translate(-10px, 0) scaleX(1.05);
    opacity: 0.8;
    clip-path: inset(70% 0 5% 0);
  }
  95% {
    transform: translate(8px, 0);
    opacity: 0;
    clip-path: inset(0 0 0 0);
  }
}

@keyframes glitch-tv-2 {
  0%,
  90%,
  100% {
    transform: translate(0);
    opacity: 0;
    clip-path: inset(0 0 0 0);
  }
  91% {
    transform: translate(5px, 0);
    opacity: 0.5;
    clip-path: inset(10% 0 60% 0);
  }
  92% {
    transform: translate(12px, 0) scaleY(1.1);
    opacity: 0.8;
    clip-path: inset(10% 0 60% 0);
  }
  93% {
    transform: translate(-10px, 0) scaleY(0.9);
    opacity: 0.6;
    clip-path: inset(40% 0 30% 0);
  }
  94% {
    transform: translate(8px, 0);
    opacity: 0.7;
    clip-path: inset(30% 0 40% 0);
  }
  95% {
    transform: translate(0);
    opacity: 0;
    clip-path: inset(0 0 0 0);
  }
}
</style>
