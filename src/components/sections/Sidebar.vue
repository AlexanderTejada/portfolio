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
  background: #0a0a0f;
  border: 1px solid rgba(224, 224, 232, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
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
  background: #1a1405;
  border-color: rgba(255, 149, 0, 0.8);
}

.sidebar:hover .sidebar-text {
  color: #ff9500;
  text-shadow: none;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-text {
  font-family: 'Orbitron', monospace;
  font-size: 1.2rem;
  letter-spacing: 0.35em;
  color: #e0e0e8;
  writing-mode: vertical-rl;
  text-orientation: mixed;
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
