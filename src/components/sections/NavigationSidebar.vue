<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'NavigationSidebar',
})

const props = defineProps<{
  position: 'left' | 'right'
  texts: string[]
  to?: string
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  click: [to?: string]
}>()

const scrollProgress = ref(0)
const winHeight = ref(0)

const updateProgress = () => {
  const winScroll = window.scrollY
  const height = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (winScroll / height) * 100
  winHeight.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
  window.addEventListener('resize', updateProgress)
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})

const handleClick = () => {
  emit('click', props.to)
}
</script>

<template>
  <div class="sidebar" :class="[position, theme || 'light']" @click="handleClick">
    <!-- Side-Specific Geometry -->
    <div class="sidebar-geometry">
      <div v-if="position === 'left'" class="software-extra">
        <div class="code-stream">
          <div v-for="i in 3" :key="i" class="code-column">{{ '0101101011001'.repeat(10) }}</div>
        </div>
        <div class="logic-nodes">
          <div v-for="i in 8" :key="i" class="node" :style="{ '--delay': i * 0.15 + 's' }"></div>
        </div>
        <div class="scan-bar"></div>
      </div>
      
      <div class="rail-line">
        <div
          v-if="position === 'right'"
          class="progress-fill"
          :style="{ height: scrollProgress + '%' }"
        ></div>
        <div v-else class="pulse-line"></div>
      </div>
      
      <div v-if="position === 'right'" class="coord-markers">
        <span class="coord">X: {{ (scrollProgress * 2.4).toFixed(1) }}</span>
        <span class="coord">Y: {{ (scrollProgress * 1.8).toFixed(1) }}</span>
      </div>
    </div>

    <!-- Tech Overlays -->
    <div class="sidebar-scanline"></div>
    <div class="sidebar-labels">
      <span class="label">ID_{{ position === 'left' ? 'SYS_ARCH' : '3D_ART' }}</span>
      <span class="label">SEC_0{{ position === 'left' ? 1 : 2 }}</span>
    </div>

    <!-- Main Text -->
    <div class="sidebar-content">
      <span v-for="text in texts" :key="text" class="sidebar-text" :data-text="text">{{
        text
      }}</span>
    </div>

    <!-- Status -->
    <div class="sidebar-footer">
      <div class="status-indicator">
        <span class="dot"></span>
        <span class="text">SYS_LIVE</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 55px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: auto; /* Active for click area */
  cursor: pointer;
  
  /* Theme Variables */
  --sb-bg: rgba(255, 255, 255, 0.015);
  --sb-text: #9ca3af;
  --sb-text-active: #111827;
  --sb-accent: #111827;
  --sb-border: rgba(0, 0, 0, 0.04);
  --sb-blur: 8px;
  --sb-glow: rgba(0, 0, 0, 0.05);
}

.sidebar.dark {
  --sb-bg: rgba(0, 0, 0, 0.08);
  --sb-text: rgba(255, 255, 255, 0.4);
  --sb-text-active: #ffffff;
  --sb-accent: #ffffff;
  --sb-border: rgba(255, 255, 255, 0.04);
  --sb-blur: 12px;
  --sb-glow: rgba(255, 255, 255, 0.2);
}

.sidebar {
  background: var(--sb-bg);
  backdrop-filter: blur(var(--sb-blur));
  -webkit-backdrop-filter: blur(var(--sb-blur));
}

.sidebar:hover {
  background: var(--sb-bg); /* Slight intensify could go here */
}

.sidebar.left {
  left: 0;
  border-right: 1px solid var(--sb-border);
}

.sidebar.right {
  right: 0;
  border-left: 1px solid var(--sb-border);
}

/* Software Side Extra */
.software-extra {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 0;
}

.code-stream {
  position: absolute;
  top: 0;
  height: 100%;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.45rem;
  color: var(--sb-accent);
  opacity: 0.03;
  writing-mode: vertical-rl;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
}

/* Geometry & Rails */
.sidebar-geometry {
  position: absolute;
  top: 15%;
  bottom: 15%;
  width: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.sidebar.left .sidebar-geometry { left: 24px; }
.sidebar.right .sidebar-geometry { right: 24px; }

.logic-nodes {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.node {
  width: 2px;
  height: 2px;
  background: var(--sb-accent);
  border-radius: 50%;
  opacity: 0.15;
  animation: nodePulse 2.5s infinite var(--delay);
}

.scan-bar {
  position: absolute;
  width: 20px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--sb-accent), transparent);
  opacity: 0.15;
  animation: scanY 6s ease-in-out infinite;
}

@keyframes scanY {
  0%, 100% { top: 0; }
  50% { top: 100%; }
}

@keyframes nodePulse {
  0%, 100% { opacity: 0.05; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.4); }
}

.rail-line {
  flex: 1;
  width: 1px;
  background: var(--sb-border);
  position: relative;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--sb-accent);
  box-shadow: 0 0 10px var(--sb-accent);
  transition: height 0.1s ease-out;
}

.coord-markers {
  position: absolute;
  bottom: -2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  opacity: 0.15; /* Extreme Subtlety */
  transition: opacity 0.3s ease;
}

.sidebar:hover .coord-markers {
  opacity: 0.4;
}

.coord {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.4rem;
  color: var(--sb-accent);
  white-space: nowrap;
}

/* Content & Text */
.sidebar-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4rem; /* Increased Gap */
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.sidebar.left:hover .sidebar-content { transform: translateX(4px); }
.sidebar.right:hover .sidebar-content { transform: translateX(-4px); }

.sidebar-text {
  font-family: 'Orbitron', sans-serif; /* Thicker Font */
  font-size: 0.75rem;
  font-weight: 900; /* Extra Bold */
  letter-spacing: 0.5em; /* More spacing */
  color: var(--sb-text);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.sidebar:hover .sidebar-text {
  color: var(--sb-text-active);
  text-shadow: 0 0 10px var(--sb-glow), 0 0 20px var(--sb-glow);
  animation: glitch-monochrome 0.4s steps(2) infinite !important;
}

/* Labels & Status */
.sidebar-labels {
  position: absolute;
  top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0.3;
}

.sidebar.left .sidebar-labels { left: 40px; }
.sidebar.right .sidebar-labels { right: 40px; }

.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.5rem;
  color: var(--sb-accent);
  writing-mode: vertical-rl;
}

.sidebar-footer {
  position: absolute;
  bottom: 4rem;
  opacity: 0.3;
}

.status-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 1.5px;
  height: 1.5px;
  background: var(--sb-accent);
  animation: blink 3s infinite;
}

.text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.45rem;
  color: var(--sb-accent);
  writing-mode: vertical-rl;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.1; }
}

/* Scanline Overlay */
.sidebar-scanline {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--sb-accent) 50%,
    transparent
  );
  background-size: 100% 4px;
  pointer-events: none;
  opacity: 0.005;
  animation: scanFast 12s linear infinite;
}

@keyframes scanFast {
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
}

@media (max-width: 1200px) {
  .sidebar { display: none; }
}
</style>
