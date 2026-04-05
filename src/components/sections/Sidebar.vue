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
    <div class="sidebar-glow"></div>
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
  background: rgba(20, 20, 31, 0.8);
  border: 1px solid rgba(34, 211, 238, 0.15);
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
  cursor: pointer;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
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
  border-color: rgba(34, 211, 238, 0.4);
  transform: translateY(-50%) scale(1.02);
}

.sidebar:hover::before {
  opacity: 1;
}

.sidebar:hover .sidebar-text {
  color: #22d3ee;
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
}

.sidebar-glow {
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  bottom: 30px;
  right: 30px;
  pointer-events: none;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #64748b;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transition: all 0.3s ease;
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
