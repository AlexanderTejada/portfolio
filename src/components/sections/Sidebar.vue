<script setup lang="ts">
defineProps<{
  position: 'left' | 'right'
  texts: string[]
}>()
</script>

<template>
  <div class="sidebar" :class="position">
    <div class="sidebar-content">
      <span v-for="text in texts" :key="text" class="sidebar-text">{{ text }}</span>
    </div>
    <div class="spray-dot"></div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 4.5rem 3rem;
  background: linear-gradient(135deg, #2a1f3d 0%, #1a1625 100%);
  border: 3px solid;
  border-image: linear-gradient(135deg, #00f0ff, #bf00ff, #ff0080) 1;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.sidebar.left {
  left: 0;
  clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
}

.sidebar.right {
  right: 0;
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%);
}

.sidebar:hover {
  transform: translateY(-50%) scale(1.05);
  box-shadow:
    0 0 30px rgba(0, 240, 255, 0.3),
    0 0 60px rgba(191, 0, 255, 0.2);
}

.sidebar:hover .sidebar-text {
  animation: glitch-text 0.3s infinite;
}

@keyframes glitch-text {
  0%,
  100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-2px) skewX(-5deg);
  }
  50% {
    transform: translateY(2px) skewX(5deg);
  }
  75% {
    transform: translateY(-1px) skewX(-3deg);
  }
}

.spray-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(0, 240, 255, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  top: 20px;
  right: 20px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-text {
  font-family: 'Permanent Marker', 'Bebas Neue', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.15em;
  color: #ffdd00;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  text-shadow:
    2px 2px 0 #ff0080,
    4px 4px 0 #00f0ff;
}

.sidebar.left .sidebar-text {
  transform: rotate(0deg);
}

.sidebar.right .sidebar-text {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
