<script setup lang="ts">
defineOptions({
  name: 'NavigationSidebar',
})

defineProps<{
  position: 'left' | 'right'
  texts: string[]
  to?: string
}>()

const emit = defineEmits<{
  click: [to?: string]
}>()

const handleClick = () => {
  emit('click', '')
}
</script>

<template>
  <div class="sidebar" :class="position" @click="handleClick">
    <div class="sidebar-content">
      <span v-for="text in texts" :key="text" class="sidebar-text" :data-text="text">{{
        text
      }}</span>
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
  padding: 4rem 2.5rem;
  background: transparent;
  border: none;
  transition: all 0.4s ease;
  cursor: pointer;
  overflow: hidden;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #111827;
  transform: translateX(-100%);
  transition: transform 0.4s ease;
  z-index: -1;
}

.sidebar:hover::before {
  transform: translateX(0);
}

.sidebar.left {
  left: 0;
}

.sidebar.right {
  right: 0;
}

.sidebar:hover .sidebar-text {
  color: #ffffff;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #4b5563;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transition: color 0.3s ease;
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
