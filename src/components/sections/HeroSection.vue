<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollProgress } from '@/composables/useScrollProgress'
import HeroScene from '@/components/3d/HeroScene.vue'
import NavigationSidebar from './NavigationSidebar.vue'

const { scrollProgress } = useScrollProgress()
const showContent = ref(false)
const isMenuOpen = ref(false)

const navItems = [
  { label: 'PROJECTS', to: 'projects' },
  { label: 'EXPERIENCE', to: 'experience' },
  { label: 'SKILLS', to: 'experience' },
  { label: 'CONTACT', to: 'experience' },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 300)
})
</script>

<template>
  <section id="hero" class="hero">
    <!-- 3D Background Scene -->
    <HeroScene />

    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-logo">ALEX</div>
      <ul class="nav-links" :class="{ open: isMenuOpen }">
        <li v-for="item in navItems" :key="item.label">
          <a href="#" @click.prevent="scrollTo(item.to)">{{ item.label }}</a>
        </li>
      </ul>
      <button class="nav-toggle" @click="isMenuOpen = !isMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <!-- Left Sidebar - Software Engineer -->
    <NavigationSidebar
      position="left"
      :texts="['ENGINEER', 'SOFTWARE']"
      @click="scrollTo('projects')"
    />

    <!-- Right Sidebar - 3D Design -->
    <NavigationSidebar position="right" :texts="['DESIGN', '3D']" @click="scrollTo('experience')" />

    <!-- Nombre en esquina inferior izquierda -->
    <div class="corner-title" :class="{ visible: showContent }">
      <h1 class="hero-title">
        <span class="line-1">ALEXANDER</span>
        <span class="line-2">TEJADA</span>
      </h1>
      <p class="hero-subtitle">SENIOR AI IMPLEMENTER & FULL-STACK DEVELOPER</p>
    </div>

    <!-- CTA Buttons en esquina inferior derecha -->
    <div class="corner-cta" :class="{ visible: showContent }">
      <button class="btn-primary" @click="scrollTo('projects')">
        <span>VIEW PROJECTS</span>
      </button>
      <button class="btn-secondary" @click="scrollTo('experience')">
        <span>CONTACT</span>
      </button>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" :class="{ visible: showContent }" v-show="scrollProgress < 0.1">
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

.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  background-size: 100% 4px;
  opacity: 0.3;
}

.navbar {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 1rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid var(--border-light);
}

.navbar::before,
.navbar::after {
  display: none;
}

.nav-logo {
  font-family: 'Orbitron', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--text-primary);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #4b5563;
  text-decoration: none;
  padding: 0.5rem 1rem;
  position: relative;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  color: #111827;
}

@keyframes bounce {
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

.corner-title {
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  z-index: 10;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.corner-title.visible {
  opacity: 1;
  transform: translateX(0);
}

.corner-cta {
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  z-index: 10;
  display: flex;
  gap: 1rem;
  opacity: 0;
  transform: translateX(20px);
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.corner-cta.visible {
  opacity: 1;
  transform: translateX(0);
}

.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  letter-spacing: 0.08em;
  position: relative;
  display: block;
}

.hero-title .line-1 {
  position: relative;
  display: inline-block;
  animation: glitch-tv 5s infinite steps(20);
}

.hero-title .line-1::before,
.hero-title .line-1::after {
  content: 'ALEXANDER';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-title .line-1::before {
  color: #1f2937;
  animation: glitch-tv-1 5s infinite steps(20);
}

.hero-title .line-1::after {
  color: #6b7280;
  animation: glitch-tv-2 5s infinite steps(20);
}

.hero-title .line-2 {
  display: block;
  animation: glitch-tv 5s infinite steps(20);
  animation-delay: 0.1s;
}

.hero-title .line-2::before,
.hero-title .line-2::after {
  content: 'TEJADA';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-title .line-2::before {
  color: #1f2937;
  animation: glitch-tv-1 5s infinite steps(20);
  animation-delay: 0.1s;
}

.hero-title .line-2::after {
  color: #6b7280;
  animation: glitch-tv-2 5s infinite steps(20);
  animation-delay: 0.1s;
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
    font-family: 'Bebas Neue', sans-serif;
  }
  93% {
    transform: translate(15px, 0) skewX(8deg);
    font-family: 'Inter', sans-serif;
  }
  94% {
    transform: translate(-10px, 0) skewX(-4deg);
    filter: contrast(1.3);
    font-family: 'Orbitron', sans-serif;
  }
  95% {
    transform: translate(10px, 0) skewX(5deg);
    font-family: 'Bebas Neue', sans-serif;
  }
  96% {
    transform: translate(-5px, 0);
    font-family: 'Inter', sans-serif;
  }
  97% {
    transform: translate(0);
    font-family: 'Orbitron', sans-serif;
  }
  98% {
    transform: translate(2px, 0);
    font-family: 'Bebas Neue', sans-serif;
  }
  99% {
    transform: translate(-2px, 0);
    font-family: 'Inter', sans-serif;
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

@keyframes glitch {
  0%,
  90%,
  100% {
    text-shadow: none;
  }
  91% {
    text-shadow:
      2px 0 #1f2937,
      -2px 0 #6b7280;
  }
  92% {
    text-shadow:
      -2px 0 #1f2937,
      2px 0 #6b7280;
  }
  93% {
    text-shadow:
      2px 2px #1f2937,
      -2px -2px #6b7280;
  }
  94% {
    text-shadow:
      -2px 2px #1f2937,
      2px -2px #6b7280;
  }
  95% {
    text-shadow:
      1px -1px #1f2937,
      -1px 1px #6b7280;
  }
}

.corner-title .hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0;
  font-weight: 400;
  letter-spacing: 0.05em;
}

.content-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 150%;
  pointer-events: none;
  z-index: -1;
}

.frame-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid var(--neon-cyan);
  opacity: 0.4;
  transition: transform 0.15s ease-out;
  transform-origin: center;
}

.frame-tl {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * -8px), calc(var(--mouse-y, 0) * -8px));
}

.frame-tm {
  top: 0;
  left: 50%;
  transform: translateX(-50%) translate(calc(var(--mouse-y, 0) * -3px));
  border-bottom: none;
  border-left: none;
  border-right: none;
  width: 20px;
  height: 12px;
}

.frame-tr {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * -8px));
}

.frame-ml {
  top: 50%;
  left: 0;
  transform: translateY(-50%) translate(calc(var(--mouse-x, 0) * -3px));
  border-right: none;
  border-top: none;
  border-bottom: none;
  width: 12px;
  height: 20px;
}

.frame-mr {
  top: 50%;
  right: 0;
  transform: translateY(-50%) translate(calc(var(--mouse-x, 0) * 3px));
  border-left: none;
  border-top: none;
  border-bottom: none;
  width: 12px;
  height: 20px;
}

.frame-bl {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
  transform: translate(calc(var(--mouse-x, 0) * -8px), calc(var(--mouse-y, 0) * 8px));
}

.frame-bm {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translate(calc(var(--mouse-y, 0) * 3px));
  border-top: none;
  border-left: none;
  border-right: none;
  width: 20px;
  height: 12px;
}

.frame-br {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
  transform: translate(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * 8px));
}

.frame-tl {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * -40px), calc(var(--mouse-y, 0) * -40px))
    rotate(calc(var(--mouse-x, 0) * -20deg)) skewX(calc(var(--mouse-y, 0) * -10deg));
}

.frame-tm {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0) translate(calc(var(--mouse-y, 0) * -30px))
    scaleX(calc(1 + abs(var(--mouse-x, 0)) * 1.2)) skewY(calc(var(--mouse-x, 0) * 10deg));
  border-bottom: none;
  border-left: none;
  border-right: none;
  width: 32px;
  height: 16px;
}

.frame-tr {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * 40px), calc(var(--mouse-y, 0) * -40px))
    rotate(calc(var(--mouse-x, 0) * 20deg)) skewX(calc(var(--mouse-y, 0) * 10deg));
}

.frame-ml {
  top: 50%;
  left: 0;
  border-right: none;
  border-top: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * -30px), -50%)
    scaleY(calc(1 + abs(var(--mouse-y, 0)) * 1.2)) skewX(calc(var(--mouse-y, 0) * 10deg));
  width: 16px;
  height: 32px;
}

.frame-mr {
  top: 50%;
  right: 0;
  border-left: none;
  border-top: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * 30px), -50%)
    scaleY(calc(1 + abs(var(--mouse-y, 0)) * 1.2)) skewX(calc(var(--mouse-y, 0) * -10deg));
  width: 16px;
  height: 32px;
}

.frame-bl {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
  transform: translate(calc(var(--mouse-x, 0) * -40px), calc(var(--mouse-y, 0) * 40px))
    rotate(calc(var(--mouse-x, 0) * 20deg)) skewX(calc(var(--mouse-y, 0) * -10deg));
}

.frame-bm {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0) translate(calc(var(--mouse-y, 0) * 30px))
    scaleX(calc(1 + abs(var(--mouse-x, 0)) * 1.2)) skewY(calc(var(--mouse-x, 0) * -10deg));
  border-top: none;
  border-left: none;
  border-right: none;
  width: 32px;
  height: 16px;
}

.frame-br {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
  transform: translate(calc(var(--mouse-x, 0) * 40px), calc(var(--mouse-y, 0) * 40px))
    rotate(calc(var(--mouse-x, 0) * -20deg)) skewX(calc(var(--mouse-y, 0) * 10deg));
}

.frame-tm {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0) translate(calc(var(--mouse-y, 0) * -30px))
    scaleX(calc(1 + abs(var(--mouse-x, 0)) * 0.8));
  border-bottom: none;
  border-left: none;
  border-right: none;
  width: 32px;
  height: 16px;
}

.frame-tr {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * 40px), calc(var(--mouse-y, 0) * -40px))
    rotate(calc(var(--mouse-x, 0) * 15deg));
}

.frame-ml {
  top: 50%;
  left: 0;
  border-right: none;
  border-top: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * -30px), -50%)
    scaleY(calc(1 + abs(var(--mouse-y, 0)) * 0.8));
  width: 16px;
  height: 32px;
}

.frame-mr {
  top: 50%;
  right: 0;
  border-left: none;
  border-top: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * 30px), -50%)
    scaleY(calc(1 + abs(var(--mouse-y, 0)) * 0.8));
  width: 16px;
  height: 32px;
}

.frame-bl {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
  transform: translate(calc(var(--mouse-x, 0) * -40px), calc(var(--mouse-y, 0) * 40px))
    rotate(calc(var(--mouse-x, 0) * 15deg));
}

.frame-bm {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0) translate(calc(var(--mouse-y, 0) * 30px))
    scaleX(calc(1 + abs(var(--mouse-x, 0)) * 0.8));
  border-top: none;
  border-left: none;
  border-right: none;
  width: 32px;
  height: 16px;
}

.frame-br {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
  transform: translate(calc(var(--mouse-x, 0) * 40px), calc(var(--mouse-y, 0) * 40px))
    rotate(calc(var(--mouse-x, 0) * -15deg));
}

.frame-tm {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0) translate(calc(var(--mouse-y, 0) * -15px))
    scaleX(calc(1 + abs(var(--mouse-x, 0)) * 0.3));
  border-bottom: none;
  border-left: none;
  border-right: none;
  width: 24px;
  height: 16px;
}

.frame-tr {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * -20px))
    rotate(calc(var(--mouse-x, 0) * 5deg));
}

.frame-ml {
  top: 50%;
  left: 0;
  border-right: none;
  border-top: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * -15px), -50%)
    scaleY(calc(1 + abs(var(--mouse-y, 0)) * 0.3));
  width: 16px;
  height: 24px;
}

.frame-mr {
  top: 50%;
  right: 0;
  border-left: none;
  border-top: none;
  border-bottom: none;
  transform: translate(calc(var(--mouse-x, 0) * 15px), -50%)
    scaleY(calc(1 + abs(var(--mouse-y, 0)) * 0.3));
  width: 16px;
  height: 24px;
}

.frame-bl {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
  transform: translate(calc(var(--mouse-x, 0) * -20px), calc(var(--mouse-y, 0) * 20px))
    rotate(calc(var(--mouse-x, 0) * 5deg));
}

.frame-bm {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0) translate(calc(var(--mouse-y, 0) * 15px))
    scaleX(calc(1 + abs(var(--mouse-x, 0)) * 0.3));
  border-top: none;
  border-left: none;
  border-right: none;
  width: 24px;
  height: 16px;
}

.frame-br {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
  transform: translate(calc(var(--mouse-x, 0) * 20px), calc(var(--mouse-y, 0) * 20px))
    rotate(calc(var(--mouse-x, 0) * -5deg));
}

.frame-edge {
  position: absolute;
  background: var(--neon-cyan);
  opacity: 0.3;
  border-radius: 2px;
  transition: transform 0.15s ease-out;
}

.frame-top {
  top: 0;
  left: 12px;
  right: 12px;
  height: 2px;
  transform-origin: center;
  transform: translateY(calc(var(--mouse-y, 0) * -5px));
}

.frame-bottom {
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 2px;
  transform-origin: center;
  transform: translateY(calc(var(--mouse-y, 0) * 5px));
}

.frame-left {
  top: 12px;
  bottom: 12px;
  left: 0;
  width: 2px;
  transform-origin: center;
  transform: translateX(calc(var(--mouse-x, 0) * -5px));
}

.frame-right {
  top: 12px;
  bottom: 12px;
  right: 0;
  width: 2px;
  transform-origin: center;
  transform: translateX(calc(var(--mouse-x, 0) * 5px));
}

@keyframes corner-tl {
  0%,
  90%,
  100% {
    transform: translate(0, 0);
    border-color: var(--neon-cyan);
  }
  92% {
    transform: translate(-5px, -5px);
    border-color: var(--neon-magenta);
  }
  94% {
    transform: translate(5px, 5px);
    border-color: var(--neon-cyan);
  }
  96% {
    transform: translate(-3px, 3px);
  }
}

@keyframes corner-tr {
  0%,
  90%,
  100% {
    transform: translate(0, 0);
    border-color: var(--neon-cyan);
  }
  92% {
    transform: translate(5px, -5px);
    border-color: var(--neon-magenta);
  }
  94% {
    transform: translate(-5px, 5px);
    border-color: var(--neon-cyan);
  }
  96% {
    transform: translate(3px, -3px);
  }
}

@keyframes corner-bl {
  0%,
  90%,
  100% {
    transform: translate(0, 0);
    border-color: var(--neon-cyan);
  }
  93% {
    transform: translate(-5px, 5px);
    border-color: var(--neon-magenta);
  }
  95% {
    transform: translate(5px, -5px);
    border-color: var(--neon-cyan);
  }
  97% {
    transform: translate(-3px, -3px);
  }
}

@keyframes corner-br {
  0%,
  90%,
  100% {
    transform: translate(0, 0);
    border-color: var(--neon-cyan);
  }
  93% {
    transform: translate(5px, 5px);
    border-color: var(--neon-magenta);
  }
  95% {
    transform: translate(-5px, -5px);
    border-color: var(--neon-cyan);
  }
  97% {
    transform: translate(3px, 3px);
  }
}

@keyframes edge-top {
  0%,
  90%,
  100% {
    transform: scaleX(1);
    background: var(--neon-cyan);
  }
  92% {
    transform: scaleX(1.2);
    background: var(--neon-magenta);
  }
  94% {
    transform: scaleX(0.9);
  }
  96% {
    transform: scaleX(1.1);
  }
}

@keyframes edge-bottom {
  0%,
  90%,
  100% {
    transform: scaleX(1);
    background: var(--neon-cyan);
  }
  93% {
    transform: scaleX(1.15);
    background: var(--neon-magenta);
  }
  95% {
    transform: scaleX(0.85);
  }
  97% {
    transform: scaleX(1);
  }
}

@keyframes edge-left {
  0%,
  90%,
  100% {
    transform: scaleY(1);
    background: var(--neon-cyan);
  }
  92% {
    transform: scaleY(1.25);
    background: var(--neon-magenta);
  }
  94% {
    transform: scaleY(0.9);
  }
  96% {
    transform: scaleY(1.1);
  }
}

@keyframes edge-right {
  0%,
  90%,
  100% {
    transform: scaleY(1);
    background: var(--neon-cyan);
  }
  93% {
    transform: scaleY(1.1);
    background: var(--neon-magenta);
  }
  95% {
    transform: scaleY(0.95);
  }
  97% {
    transform: scaleY(1);
  }
}

.corner-cta .btn-primary,
.corner-cta .btn-secondary {
  padding: 0.75rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
  white-space: nowrap;
}

.corner-cta .btn-primary:hover,
.corner-cta .btn-secondary:hover {
  background: #111827;
  color: #ffffff;
  border-color: #111827;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-muted);
  font-size: 1.5rem;
  opacity: 0;
  font-family: 'Share Tech Mono', monospace;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-indicator.visible {
  opacity: 0.4;
  animation: bounce 2s infinite;
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

@media (max-width: 640px) {
  .navbar {
    width: calc(100% - 2rem);
    gap: 1.5rem;
    padding: 0.75rem 1rem;
  }

  .nav-logo {
    font-size: 0.75rem;
  }

  .nav-links {
    position: fixed;
    top: 3.5rem;
    left: 0;
    right: 0;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid var(--border-light);
    padding: 1rem;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-toggle {
    display: flex;
  }

  .corner-title {
    bottom: 5rem;
    left: 1.5rem;
  }

  .hero-title {
    font-size: clamp(1.2rem, 5vw, 1.5rem);
  }

  .corner-title .hero-subtitle {
    font-size: 0.65rem;
  }

  .corner-cta {
    bottom: 1.5rem;
    right: 1.5rem;
    left: 1.5rem;
    flex-direction: column;
  }

  .corner-cta .btn-primary,
  .corner-cta .btn-secondary {
    width: 100%;
    font-size: 0.7rem;
    padding: 0.65rem 1rem;
  }

  .scroll-indicator {
    display: none;
  }
}
</style>
