<script setup lang="ts">
interface Props {
  size?: number
  glitch?: boolean
  grayscale?: boolean
  variant?: 'compact' | 'showcase'
  showStatus?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 120,
  glitch: true,
  grayscale: true,
  variant: 'compact',
  showStatus: true
})
</script>

<template>
  <div 
    class="profile-container" 
    :class="[variant]"
    :style="{ '--size': size + 'px' }"
  >
    <!-- HUD Layer -->
    <div class="hud-frame">
      <span class="corner tl"></span>
      <span class="corner tr"></span>
      <span class="corner bl"></span>
      <span class="corner br"></span>
      <div class="scanline"></div>
    </div>

    <!-- Image Container with HUD Mask -->
    <div class="image-mask" :class="{ 'grayscale': grayscale, 'glitch-active': glitch }">
      <img src="/Alexander Tejada.png" alt="Alexander Tejada" class="profile-img" />
      
      <!-- Studio Showcase Gradient -->
      <div v-if="variant === 'showcase'" class="showcase-overlay"></div>
      
      <!-- Glitch Layers -->
      <div v-if="glitch" class="glitch-layer"></div>
      <div v-if="glitch" class="glitch-layer shadow"></div>
    </div>
    
    <!-- Biometric Label -->
    <div v-if="showStatus" class="bio-meta">
      <span class="tag">ID_026</span>
      <div class="status">
        <span class="dot"></span>
        <span class="label">BIO_AUTH_OK</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  position: relative;
  width: var(--size);
  height: var(--size);
  flex-shrink: 0;
}

.profile-container.showcase {
  height: calc(var(--size) * 1.3); /* Portrait aspect ratio */
  width: var(--size);
}

.hud-frame {
  position: absolute;
  inset: -8px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 10;
  pointer-events: none;
}

.corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: #111827;
  border-style: solid;
}

.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

.scanline {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(17, 24, 39, 0.05) 50%,
    transparent 100%
  );
  background-size: 100% 4px;
  animation: scan 4s linear infinite;
}

@keyframes scan {
  from { transform: translateY(-100%); }
  to { transform: translateY(100%); }
}

.image-mask {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  clip-path: polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%);
  background: #f3f4f6;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: filter 0.3s ease;
}

/* Portrait Showcase Mask */
.showcase .image-mask {
  clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%);
}

.showcase-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(17, 24, 39, 0.8) 0%,
    rgba(17, 24, 39, 0.2) 40%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.profile-container:hover .showcase-overlay {
  opacity: 0.4;
}

.grayscale {
  filter: grayscale(1);
}

.profile-container:hover .grayscale {
  filter: grayscale(0);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.profile-container:hover .profile-img {
  transform: scale(1.05);
}

.bio-meta {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.6;
}

.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  color: #111827;
}

.status {
  display: flex;
  align-items: center;
  gap: 3px;
}

.dot {
  width: 4px;
  height: 4px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 5px #22c55e;
}

.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.45rem;
  color: #111827;
}

/* Glitch Effect */
.glitch-layer {
  position: absolute;
  inset: 0;
  background: inherit;
  opacity: 0;
  z-index: 2;
}

.profile-container:hover .glitch-active .glitch-layer {
  animation: glitch-anim 0.3s steps(2, end) infinite;
  opacity: 0.1;
  background-image: url('/Alexander Tejada.png');
  background-size: cover;
  background-position: center;
}

@keyframes glitch-anim {
  0% { transform: translate(0); clip-path: inset(10% 0 30% 0); }
  20% { transform: translate(-2px, 2px); clip-path: inset(40% 0 10% 0); }
  40% { transform: translate(2px, -2px); clip-path: inset(60% 0 20% 0); }
  60% { transform: translate(-1px, 1px); clip-path: inset(20% 0 70% 0); }
  80% { transform: translate(1px, -1px); clip-path: inset(80% 0 5% 0); }
  100% { transform: translate(0); }
}
</style>
