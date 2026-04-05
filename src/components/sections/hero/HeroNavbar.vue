<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  navItems: { label: string; to: string }[]
}>()

const emit = defineEmits<{
  navigate: [to: string]
}>()

const isMenuOpen = ref(false)
</script>

<template>
  <nav class="navbar">
    <div class="nav-logo">ALEX</div>
    <ul class="nav-links" :class="{ open: isMenuOpen }">
      <li v-for="item in navItems" :key="item.label">
        <a href="#" @click.prevent="emit('navigate', item.to)">{{ item.label }}</a>
      </li>
    </ul>
    <button class="nav-toggle" @click="isMenuOpen = !isMenuOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>
</template>

<style scoped>
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
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
}

.nav-links a::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #111827;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s ease;
  z-index: -1;
}

.nav-links a:hover {
  color: #ffffff;
}

.nav-links a:hover::before {
  transform: scaleY(1);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.nav-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: #111827;
  border-radius: 2px;
  transition: all 0.3s ease;
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

  .nav-toggle {
    display: flex;
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
}
</style>
