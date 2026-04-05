<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollProgress } from '@/composables/useScrollProgress'
import HeroScene from '@/components/3d/HeroScene.vue'
import NavigationSidebar from '@/components/sections/NavigationSidebar.vue'
import HeroNavbar from './HeroNavbar.vue'
import SoftwareModal from './SoftwareModal.vue'

defineOptions({ name: 'HeroSection' })

const { scrollProgress } = useScrollProgress()
const showContent = ref(false)
const showSoftwareModal = ref(false)

const navItems = [
  { label: '3D', to: 'threed' },
  { label: 'PROJECTS', to: 'projects' },
  { label: 'EXPERIENCE', to: 'experience' },
  { label: 'CONTACT', to: 'experience' },
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
  <section id="hero" class="hero">
    <HeroScene />

    <HeroNavbar :nav-items="navItems" @navigate="scrollTo" />

    <NavigationSidebar
      position="left"
      :texts="['ENGINEER', 'SOFTWARE']"
      @click="scrollTo('projects')"
    />
    <NavigationSidebar position="right" :texts="['DESIGN', '3D']" @click="scrollTo('threed')" />

    <div class="corner-content" :class="{ visible: showContent }">
      <div class="role-badge glitch-text" data-text="PORTFOLIO 2026">PORTFOLIO 2026</div>
      <p class="hero-subtitle glitch-text" data-text="SENIOR AI IMPLEMENTER & FULL-STACK ENGINEER">
        SENIOR AI IMPLEMENTER &amp; FULL-STACK ENGINEER
      </p>
      <div class="cta-buttons">
        <button class="btn-primary" @click="scrollTo('projects')">VIEW PROJECTS</button>
        <button class="btn-secondary" @click="scrollTo('experience')">CONTACT</button>
      </div>
    </div>

    <SoftwareModal :open="showSoftwareModal" @close="showSoftwareModal = false" />

    <!-- HUD: Software Engineering -->
    <div class="hud-panel hud-left" :class="{ visible: showContent }" @click="showSoftwareModal = true">
      <div class="hud-corner tl" /><div class="hud-corner tr" />
      <div class="hud-corner bl" /><div class="hud-corner br" />
      <span class="hud-label">// SOFTWARE ENG</span>
      <div class="hud-divider" />
      <p class="hud-bio">
        I specialize in architecting and deploying production grade AI solutions and high scale
        transactional systems. My work focuses on bridging the gap between Large Language Models
        (Claude, Gemini, GPT-4) and complex enterprise operations, ensuring scalability, security,
        and measurable business impact.
      </p>
    </div>

    <!-- HUD: 3D -->
    <div class="hud-panel hud-right" :class="{ visible: showContent }">
      <div class="hud-corner tl" /><div class="hud-corner tr" />
      <div class="hud-corner bl" /><div class="hud-corner br" />
      <span class="hud-label">// 3D ARTIST</span>
      <div class="hud-divider" />
      <p class="hud-bio">
        3D Character and Creature Artist dedicated to developing high-quality, game ready assets
        for mobile platforms. Managed the end to end character pipeline, ensuring that artistic
        vision and technical performance lived in perfect harmony within the game engine.
      </p>
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
  left: 3rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
}

.corner-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.role-badge {
  display: inline-block;
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

.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
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
  background: #111827;
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.btn-primary:hover {
  background: #374151;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: #111827;
  border: 1px solid #d1d5db;
  padding: 0.8rem 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.btn-secondary:hover {
  border-color: #111827;
  transform: translateY(-2px);
}

/* HUD panels */
.hud-panel {
  position: absolute;
  top: 30%;
  transform: translateY(calc(-50% + 20px));
  z-index: 10;
  width: 180px;
  padding: 1.1rem 1.25rem;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
              transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
              background 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

.hud-left  { left: 5rem; }
.hud-right { right: 5rem; }

.hud-panel.visible {
  opacity: 1;
  transform: translateY(-50%);
}

.hud-panel.visible:hover {
  transform: translateY(calc(-50% - 4px));
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(0, 0, 0, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.hud-panel.visible:hover .hud-corner {
  width: 10px;
  height: 10px;
  border-color: #111827;
}

.hud-panel.visible:hover .hud-label {
  animation: hud-label-glitch 0.6s steps(1) 1 forwards;
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
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
}

.hud-corner.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.hud-corner.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.hud-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.hud-corner.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

.hud-label {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #9ca3af;
  letter-spacing: 0.2em;
  margin-bottom: 0.6rem;
  transition: none;
}

.hud-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin-bottom: 0.6rem;
}

.hud-bio {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
}

/* Glitch */
.glitch-text {
  position: relative;
  display: inline-block;
  animation: glitch-tv 5s infinite steps(20);
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
    text-shadow: 2px 0 #ef4444, -2px 0 #b91c1c;
  }
  15% {
    font-family: 'Bebas Neue', cursive;
    color: #dc2626;
    letter-spacing: 0.05em;
    transform: translate(3px, -1px);
    text-shadow: -3px 0 #ef4444, 3px 0 #b91c1c;
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
  60%, 100% {
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
  50%, 100% {
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
