<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasDotGrid } from '@/composables/useCanvasDotGrid'
import ProfileImage from '@/components/shared/ProfileImage.vue'

const { canvasRef } = useCanvasDotGrid()
const form = ref({ name: '', email: '', message: '' })
const status = ref<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE')

const handleSubmit = () => {
  status.value = 'SENDING'
  setTimeout(() => {
    status.value = 'SUCCESS'
    form.value = { name: '', email: '', message: '' }
    setTimeout(() => (status.value = 'IDLE'), 3000)
  }, 1500)
}
</script>

<template>
  <section id="contact" class="contact-section" v-bind="$attrs" data-theme="dark">
    <canvas ref="canvasRef" class="bg-canvas" />

    <div class="container">
      <div class="section-header">
        <span class="label">// COMMUNICATION NODE</span>
        <h2 class="glitch-text" data-text="GET IN TOUCH">
          GET IN <span class="accent">TOUCH</span>
        </h2>
        <p class="subtitle">Available for collaborative projects and technical consultations.</p>
      </div>

      <div class="contact-grid">
        <!-- Technical Side Info -->
        <div class="contact-info">
          <ProfileImage :size="200" variant="showcase" />
          <div class="info-block">
            <span class="block-tag">LOCATION_STATION</span>
            <p class="block-val">Remote / Worldwide</p>
          </div>
          <div class="info-block">
            <span class="block-tag">DIRECT_SIGNAL</span>
            <p class="block-val">jorge.alexander.t.g@gmail.com</p>
          </div>
          <div class="info-block">
            <span class="block-tag">ACTIVE_CHANNELS</span>
            <div class="social-links">
              <a
                href="https://www.linkedin.com/in/alexander-tejada-3a11041ab/"
                target="_blank"
                class="social-link"
                >LN_IN</a
              >
              <a href="https://github.com/AlexanderTejada" target="_blank" class="social-link"
                >GH_UB</a
              >
              <a href="#" class="social-link">AW_WDS</a>
            </div>
          </div>

          <!-- Stats Display -->
          <div class="stats-display">
            <div class="stat-item">
              <span class="stat-label">PROJECTS</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">YEARS</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">USERS</span>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-container">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="input-group">
              <label>SENDER_NAME</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Enter identification..."
                required
              />
            </div>
            <div class="input-group">
              <label>SIGNAL_RETURN</label>
              <input v-model="form.email" type="email" placeholder="email@example.com" required />
            </div>
            <div class="input-group">
              <label>ENCODED_MESSAGE</label>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Type your inquiry here..."
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="status !== 'IDLE'">
              <span v-if="status === 'IDLE'">INITIATE_TRANSFER</span>
              <span v-else-if="status === 'SENDING'">ENCRYPTING...</span>
              <span v-else>TRANSMISSION_COMPLETE</span>
              <div class="btn-glitch"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  padding: 8rem 2rem;
  background: #050505;
  color: #fff;
  overflow: hidden;
}

.bg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.4;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #6b7280;
  letter-spacing: 0.3em;
  display: block;
  margin-bottom: 1rem;
}

h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.accent {
  color: #71717a;
}

.subtitle {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  color: #9ca3af;
  margin-top: 1rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

/* Info Side */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.info-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.block-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #6b7280;
  letter-spacing: 0.2em;
}

.block-val {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
}

.social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.social-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #fff;
  text-decoration: none;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.social-link:hover {
  color: #9ca3af;
  border-bottom-color: #fff;
  transform: translateY(-2px);
}

/* Stats Display */
.stats-display {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #6b7280;
  letter-spacing: 0.15em;
}

/* Form Side */
.contact-form {
  background: rgba(255, 255, 255, 0.02);
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #6b7280;
  letter-spacing: 0.15em;
}

.input-group input,
.input-group textarea {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.input-group input:focus,
.input-group textarea:focus {
  border-color: rgba(255, 255, 255, 0.4);
  outline: none;
  background: rgba(255, 255, 255, 0.03);
}

.submit-btn {
  margin-top: 1rem;
  background: #fff;
  color: #000;
  border: none;
  padding: 1.25rem;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #9ca3af;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #333;
  color: #666;
  cursor: not-allowed;
}

/* Glitch effects */
.glitch-text {
  position: relative;
  animation: contact-glitch 4s infinite steps(2);
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.glitch-text::before {
  color: #ff0040;
  animation: glitch-clip-1 4s infinite steps(2);
  mix-blend-mode: screen;
  z-index: -1;
}

.glitch-text::after {
  color: #00e5ff;
  animation: glitch-clip-2 4s infinite steps(2);
  mix-blend-mode: screen;
  z-index: -1;
}

@keyframes contact-glitch {
  0%,
  88%,
  100% {
    transform: translate(0);
    filter: none;
  }
  89% {
    transform: translate(-3px, 1px) skewX(-2deg);
    filter: hue-rotate(90deg) saturate(2);
  }
  90% {
    transform: translate(3px, -1px) skewX(2deg);
    filter: hue-rotate(-90deg) saturate(1.5);
  }
  91% {
    transform: translate(-1px, 0);
    filter: none;
  }
  92% {
    transform: translate(2px, 0) skewX(-1deg);
    filter: hue-rotate(180deg);
  }
  93% {
    transform: translate(0);
    filter: none;
  }
}

@keyframes glitch-clip-1 {
  0%,
  88%,
  100% {
    clip-path: inset(0 0 100% 0);
    transform: translate(0);
  }
  89% {
    clip-path: inset(20% 0 40% 0);
    transform: translate(-5px, 0);
  }
  90% {
    clip-path: inset(60% 0 10% 0);
    transform: translate(5px, 0);
  }
  91% {
    clip-path: inset(10% 0 70% 0);
    transform: translate(-3px, 0);
  }
  92% {
    clip-path: inset(40% 0 30% 0);
    transform: translate(4px, 0);
  }
  93% {
    clip-path: inset(0 0 100% 0);
    transform: translate(0);
  }
}

@keyframes glitch-clip-2 {
  0%,
  88%,
  100% {
    clip-path: inset(100% 0 0 0);
    transform: translate(0);
  }
  89% {
    clip-path: inset(50% 0 20% 0);
    transform: translate(5px, 0);
  }
  90% {
    clip-path: inset(10% 0 60% 0);
    transform: translate(-5px, 0);
  }
  91% {
    clip-path: inset(70% 0 10% 0);
    transform: translate(3px, 0);
  }
  92% {
    clip-path: inset(30% 0 40% 0);
    transform: translate(-4px, 0);
  }
  93% {
    clip-path: inset(100% 0 0 0);
    transform: translate(0);
  }
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .stats-display {
    justify-content: center;
  }

  .contact-info {
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  .info-block {
    align-items: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .contact-section {
    padding: 4rem 1rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .label {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
  }

  h2 {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }

  .subtitle {
    font-size: 0.75rem;
  }

  .block-tag {
    font-size: 0.5rem;
  }

  .block-val {
    font-size: 0.9rem;
  }

  .social-link {
    font-size: 0.7rem;
  }

  .contact-form {
    padding: 1.5rem;
    gap: 1rem;
  }

  .input-group label {
    font-size: 0.55rem;
  }

  .input-group input,
  .input-group textarea {
    padding: 0.75rem;
    font-size: 0.85rem;
  }

  .submit-btn {
    padding: 1rem;
    font-size: 0.7rem;
  }
}
</style>
