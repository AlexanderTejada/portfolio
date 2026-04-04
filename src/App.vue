<script setup lang="ts">
import HeroSection from './components/sections/HeroSection.vue'
</script>

<template>
  <div id="app" class="gradient-bg">
    <HeroSection />

    <!-- Placeholder for future sections -->
    <section class="placeholder-section">
      <div class="container">
        <h2>[ LOADING SECTIONS ]</h2>
        <p>PROJECTS × EXPERIENCE × SKILLS × CONTACT</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}

.placeholder-section {
  position: relative;
  z-index: 20;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
}

.placeholder-section .container {
  text-align: center;
}

.placeholder-section h2 {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.5rem, 4vw, 2rem);
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  letter-spacing: 0.15em;
  font-weight: 600;
}

.placeholder-section p {
  font-family: 'Share Tech Mono', monospace;
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
</style>
