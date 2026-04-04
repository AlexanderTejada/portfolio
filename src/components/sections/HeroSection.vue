<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollProgress } from '@/composables/useScrollProgress'
import HeroScene from '@/components/3d/HeroScene.vue'
import Sidebar from './Sidebar.vue'

const { scrollProgress } = useScrollProgress()
const showContent = ref(false)
const isMenuOpen = ref(false)

const navItems = ['PROJECTS', 'EXPERIENCE', 'SKILLS', 'CONTACT']

onMounted(() => {
  setTimeout(() => {
    showContent.value = true
  }, 300)
})
</script>

<template>
  <section class="hero">
    <!-- 3D Background Scene -->
    <HeroScene />

    <!-- Grid Pattern Overlay -->
    <div class="grid-pattern"></div>

    <!-- Noise Texture Overlay -->
    <div class="noise-overlay"></div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-logo">ALEX</div>
      <ul class="nav-links" :class="{ open: isMenuOpen }">
        <li v-for="item in navItems" :key="item">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
      <button class="nav-toggle" @click="isMenuOpen = !isMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <!-- Left Sidebar - Software Engineer -->
    <Sidebar position="left" :texts="['ENGINEER', 'SOFTWARE']" />

    <!-- Right Sidebar - 3D Design -->
    <Sidebar position="right" :texts="['DESIGN', '3D']" />

    <!-- Content Overlay -->
    <div class="hero-content" :class="{ visible: showContent }">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="line-1">ALEXANDER TEJADA</span>
        </h1>

        <p class="hero-subtitle">SENIOR AI IMPLEMENTER & FULL-STACK DEVELOPER</p>

        <div class="hero-tags">
          <span class="tag">LangChain • LangGraph</span>
          <span class="tag">RAG • Vector Search</span>
          <span class="tag">C# .NET • FastAPI</span>
          <span class="tag">ZBrush • Blender • Three.js</span>
        </div>

        <div class="cta-buttons">
          <button class="btn-primary">
            <span>[ VIEW PROJECTS ]</span>
          </button>
          <button class="btn-secondary">
            <span>[ CONTACT ]</span>
          </button>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator" v-show="scrollProgress < 0.1">
        <span>↓</span>
      </div>
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
  background: rgba(240, 240, 245, 0.95);
  border: 1px solid rgba(26, 26, 34, 0.2);
  backdrop-filter: blur(10px);
}

.navbar::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  width: 12px;
  height: 12px;
  border-top: 2px solid var(--neon-cyan);
  border-left: 2px solid var(--neon-cyan);
}

.navbar::after {
  content: '';
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 12px;
  height: 12px;
  border-bottom: 2px solid var(--neon-cyan);
  border-right: 2px solid var(--neon-cyan);
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
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  text-decoration: none;
  padding: 0.5rem 1rem;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--neon-cyan);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.15s ease;
}

.nav-links a:hover {
  color: var(--bg-primary);
  animation: glitch-nav 0.3s ease forwards;
}

.nav-links a:hover::before {
  opacity: 0.8;
}

@keyframes glitch-nav {
  0% {
    text-shadow:
      2px 0 var(--neon-magenta),
      -2px 0 var(--neon-cyan);
  }
  20% {
    text-shadow:
      -2px 0 var(--neon-magenta),
      2px 0 var(--neon-cyan);
  }
  40% {
    text-shadow:
      2px 2px var(--neon-magenta),
      -2px -2px var(--neon-cyan);
  }
  60% {
    text-shadow:
      -2px 2px var(--neon-magenta),
      2px -2px var(--neon-cyan);
  }
  80% {
    text-shadow:
      1px -1px var(--neon-magenta),
      -1px 1px var(--neon-cyan);
  }
  100% {
    text-shadow: none;
  }
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav-toggle span {
  width: 20px;
  height: 2px;
  background: var(--text-muted);
  transition: background 0.3s ease;
}

.hero-content {
  position: absolute;
  z-index: 100;
  width: 100%;
  max-width: 1000px;
  padding: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hero-content.visible {
  opacity: 1;
  transform: translate(-50%, -50%);
}

.hero-text {
  text-align: center;
  width: 100%;
  padding: 3rem 2rem;
  background: rgba(240, 240, 245, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
}

.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
  position: relative;
  display: inline-block;
}

.line-1 {
  color: var(--text-primary);
  position: relative;
  display: inline-block;
  animation: glitch-tv 5s infinite steps(20);
}

.line-1::before,
.line-1::after {
  content: 'ALEXANDER TEJADA';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.line-1::before {
  color: var(--neon-cyan);
  animation: glitch-tv-1 5s infinite steps(20);
}

.line-1::after {
  color: var(--neon-magenta);
  animation: glitch-tv-2 5s infinite steps(20);
}

.line-1-geo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  z-index: -1;
  animation: glitch-geo 5s infinite steps(20);
  pointer-events: none;
}

.line-1-geo::before,
.line-1-geo::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--neon-cyan);
  opacity: 0.3;
}

.line-1-geo::before {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  animation: geo-1 5s infinite steps(20);
}

.line-1-geo::after {
  width: 90%;
  height: 90%;
  border: 2px solid var(--neon-magenta);
  border-radius: 4px;
  animation: geo-2 5s infinite steps(20);
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
    font-family: 'Share Tech Mono', monospace;
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
    font-family: 'Share Tech Mono', monospace;
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
    font-family: 'Share Tech Mono', monospace;
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

.hero-subtitle {
  font-family: 'Share Tech Mono', monospace;
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  color: var(--text-muted);
  margin-bottom: 3rem;
  line-height: 1.8;
  letter-spacing: 0.03em;
  font-weight: 400;
  animation: glitch-subtitle 8s infinite;
}

@keyframes glitch-subtitle {
  0%,
  95%,
  100% {
    transform: translate(0);
    filter: none;
    letter-spacing: 0.03em;
  }
  96% {
    transform: translate(-1px, 0);
    filter: blur(0.3px);
    letter-spacing: 0.05em;
  }
  97% {
    transform: translate(2px, 0);
    filter: blur(0.5px);
    letter-spacing: 0.01em;
  }
  98% {
    transform: translate(-1px, 0);
    filter: none;
    letter-spacing: 0.04em;
  }
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 3rem;
  justify-content: center;
}

.tag {
  padding: 0.4rem 0.9rem;
  background: rgba(232, 232, 240, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(80, 80, 96, 0.3);
  border-radius: 2px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: 'Share Tech Mono', monospace;
  transition: all 0.3s ease;
  letter-spacing: 0.02em;
}

.tag:hover {
  background: rgba(232, 232, 240, 0.8);
  border-color: rgba(80, 80, 96, 0.6);
  color: var(--text-primary);
  transform: translateY(-1px);
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 0.875rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Orbitron', monospace;
  letter-spacing: 0.1em;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  background: transparent;
}

.btn-primary {
  color: var(--text-primary);
  border: 1px solid rgba(26, 26, 34, 0.3);
}

.btn-primary:hover {
  border-color: rgba(26, 26, 34, 0.6);
  background: rgba(26, 26, 34, 0.05);
}

.btn-secondary {
  color: var(--text-muted);
  border: 1px solid rgba(80, 80, 96, 0.2);
}

.btn-secondary:hover {
  border-color: rgba(112, 112, 128, 0.5);
  color: var(--text-secondary);
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-muted);
  font-size: 1.5rem;
  opacity: 0.4;
  animation: bounce 2s infinite;
  font-family: 'Share Tech Mono', monospace;
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
    background: rgba(240, 240, 245, 0.95);
    border: 1px solid rgba(112, 112, 128, 0.2);
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

  .hero-content {
    padding: 1.5rem;
  }

  .hero-title {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
    margin-bottom: 1.5rem;
  }

  .line-2 {
    font-size: 0.8em;
  }

  .hero-subtitle {
    font-size: 0.875rem;
    margin-bottom: 2rem;
  }

  .hero-tags {
    gap: 0.4rem;
    margin-bottom: 2rem;
  }

  .tag {
    font-size: 0.7rem;
    padding: 0.35rem 0.7rem;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 0.8rem;
  }

  .scroll-indicator {
    bottom: 2rem;
    font-size: 1.2rem;
  }
}
</style>
