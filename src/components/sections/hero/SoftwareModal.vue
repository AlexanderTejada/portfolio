<script setup lang="ts">
import { ref, watch } from 'vue'
import { useScrollLock } from '@/composables/useScrollLock'
import ProfileImage from '@/components/shared/ProfileImage.vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { locked } = useScrollLock()
const modalBodyRef = ref<HTMLElement | null>(null)

watch(
  () => props.open,
  (val) => {
    locked.value = val
  },
)

const onBackdropWheel = (e: WheelEvent) => {
  if (!modalBodyRef.value) return
  modalBodyRef.value.scrollTop += e.deltaY
}

const experience = [
  {
    id: '0x01',
    company: 'Lorem Ipsum Systems',
    role: 'Lorem Ipsum Architect & Technical Developer',
    period: 'Apr 2024 – Present',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.',
    highlights: [
      { title: 'Lorem Ipsum', desc: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: 'Sit Amet', desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
      { title: 'Adipiscing Elit', desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
      { title: 'Eiusmod Tempor', desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.' },
    ],
  },
  {
    id: '0x02',
    company: 'Freelance',
    role: 'Full Stack Developer & 3D Specialist',
    period: 'Jan 2020 – Feb 2025',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.',
    highlights: [
      { title: 'Lorem Ipsum', desc: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: '3D Engineering', desc: 'Professional 3D pipeline using ZBrush, Blender, and Substance Painter.' },
      { title: 'Sit Amet', desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    ],
  },
]

const skills = [
  {
    group: 'SYSTEM_INTEL',
    items: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur'],
  },
  {
    group: 'CORE_LAYERS',
    items: ['Adipiscing', 'Elit', 'Sed', 'Do', 'Eiusmod', 'Tempor'],
  },
  { group: 'INTERFACE_MODS', items: ['Incididunt', 'Labore', 'Dolore', 'Magna'] },
  { group: 'ARCH_DEVOPS', items: ['Aliqua', 'Ut', 'Enim', 'Ad'] },
]
</script>

<template>
  <Transition name="modal">
    <div
      v-if="open"
      class="modal-backdrop"
      @click.self="emit('close')"
      @wheel.prevent="onBackdropWheel"
    >
      <div class="modal-wrapper">
        <div class="modal">
          <!-- Decorative HUD elements -->
          <div class="hud-corner tl" />
          <div class="hud-corner tr" />
          <div class="hud-corner bl" />
          <div class="hud-corner br" />
          <div class="hud-line-top" />
          
          <div class="modal-header">
            <div class="header-left">
              <ProfileImage :size="60" :show-status="false" />
              <div class="header-main">
                <span class="system-id">[SYS.ID: SF_ENG_026]</span>
                <h2 class="modal-title glitch-text" data-text="TECHNICAL ARCHITECTURE">TECHNICAL ARCHITECTURE</h2>
              </div>
            </div>
            <button class="modal-close" @click="emit('close')">
              <span class="close-label">CLOSE</span>
              <span class="close-x">✕</span>
            </button>
          </div>

          <div ref="modalBodyRef" class="modal-body">
            <!-- Timeline Section -->
            <div class="section-container">
              <span class="section-label">// CAREER PATH</span>
              <div class="timeline">
                <div 
                  v-for="(job, i) in experience" 
                  :key="job.id" 
                  class="timeline-item"
                  :style="{ animationDelay: `${0.2 + i * 0.15}s` }"
                >
                  <div class="timeline-dot" />
                  <div class="timeline-content">
                    <div class="job-header">
                      <div class="job-info">
                        <span class="job-id">{{ job.id }}</span>
                        <h3 class="job-role">{{ job.role }}</h3>
                        <p class="job-company">{{ job.company }}</p>
                      </div>
                      <span class="job-period">{{ job.period }}</span>
                    </div>
                    <p class="job-desc">{{ job.description }}</p>
                    <div class="highlights">
                      <div 
                        v-for="(h, hi) in job.highlights" 
                        :key="hi" 
                        class="highlight"
                        :style="{ animationDelay: `${0.4 + i * 0.15 + hi * 0.05}s` }"
                      >
                        <span class="h-title">{{ h.title }}</span>
                        <span class="h-desc">{{ h.desc }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Skills Section -->
            <div class="section-container skills-section">
              <span class="section-label">// TECH STACK CONFIG</span>
              <div class="skills-grid">
                <div 
                  v-for="(group, i) in skills" 
                  :key="group.group" 
                  class="skill-group"
                  :style="{ animationDelay: `${0.6 + i * 0.1}s` }"
                >
                  <p class="skill-group-name">{{ group.group }}</p>
                  <div class="skill-tags">
                    <span 
                      v-for="(s, si) in group.items" 
                      :key="s" 
                      class="skill-tag"
                      :style="{ animationDelay: `${0.7 + i * 0.1 + si * 0.03}s` }"
                    >
                      {{ s }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <span class="footer-meta">STATUS: READY / NO_ERRORS_DETECTED</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px) saturate(180%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-wrapper {
  position: relative;
  width: 100%;
  max-width: 640px;
}

.modal {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 30px 100px rgba(0, 0, 0, 0.1),
    inset 0 0 40px rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

/* Decorative HUD */
.hud-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: #111827;
  border-style: solid;
  opacity: 0.8;
  z-index: 2;
}
.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

.hud-line-top {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 2rem 2.5rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center; /* Changed from flex-end for better alignment with avatar */
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.system-id {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #9ca3af;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.modal-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: 0.05em;
  margin: 0;
}

.modal-close {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #6b7280;
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: #111827;
}

.close-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
}

.close-x {
  font-size: 0.8rem;
  border: 1px solid currentColor;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  overflow-y: auto;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,0,0,0.1) transparent;
}

.section-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #9ca3af;
  letter-spacing: 0.2em;
}

/* Timeline Staggered Animation */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-left: 1.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.timeline-item {
  position: relative;
  opacity: 0;
  transform: translateY(15px);
  animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-dot {
  position: absolute;
  left: calc(-1.5rem - 4.5px);
  top: 6px;
  width: 8px;
  height: 8px;
  background: #111827;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 1), 0 0 0 5px rgba(0, 0, 0, 0.05);
}

.job-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  color: #111827;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.1rem 0.3rem;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  display: inline-block;
}

/* Text Loading Effect */
.job-role, .job-company, .job-desc, .h-title, .h-desc, .skill-group-name, .skill-tag, .modal-title {
  animation: textLoad 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes textLoad {
  from { color: #d1d5db; }
}

.job-role {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.job-company {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0.2rem 0 0.75rem;
}

.job-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #9ca3af;
}

.job-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.highlights {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.highlight {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.02);
  border-left: 2px solid rgba(0, 0, 0, 0.05);
  opacity: 0;
  animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.highlight:hover {
  background: rgba(0, 0, 0, 0.04);
  border-left-color: #111827;
}

.h-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: 0.02em;
}

.h-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.5;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.skill-group {
  opacity: 0;
  animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.skill-group-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 0.6rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  padding: 0.35rem 0.75rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #4b5563;
  opacity: 0;
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards, textLoad 0.8s ease forwards;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  border-color: #111827;
  color: #111827;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.modal-footer {
  padding: 1.25rem 2.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.01);
}

.footer-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  color: #9ca3af;
  letter-spacing: 0.1em;
}

/* Glitch Effect */
.glitch-text {
  position: relative;
  display: inline-block;
  animation: glitch-tv 5s infinite steps(20);
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
  color: #111827;
  animation: glitch-tv-1 5s infinite steps(20);
}

.glitch-text::after {
  color: #6b7280;
  animation: glitch-tv-2 5s infinite steps(20);
  animation-delay: 0.1s;
}

@keyframes glitch-tv {
  0%,
  90%,
  100% {
    transform: translate(0);
    filter: none;
    font-family: 'Orbitron', sans-serif;
    color: #111827;
  }
  91% {
    font-family: 'Bebas Neue', cursive;
    color: #ef4444;
    transform: translate(-2px, 1px);
  }
  92% {
    transform: translate(-15px, 0) skewX(-8deg);
    filter: contrast(1.5) brightness(1.2);
    color: #dc2626;
  }
  93% {
    transform: translate(15px, 0) skewX(8deg);
    font-family: 'Inter', sans-serif;
    color: #ef4444;
  }
  94% {
    transform: translate(-10px, 0) skewX(-4deg);
    filter: contrast(1.3);
    color: #111827;
  }
  96% {
    transform: translate(5px, 0);
    font-family: 'Orbitron', sans-serif;
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
    transform: translate(-2px, 0);
    opacity: 0.5;
    clip-path: inset(15% 0 40% 0);
  }
  93% {
    transform: translate(-10px, 0) scaleX(1.1);
    opacity: 0.7;
    clip-path: inset(20% 0 30% 0);
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
    transform: translate(2px, 0);
    opacity: 0.4;
    clip-path: inset(10% 0 60% 0);
  }
  93% {
    transform: translate(10px, 0) scaleY(1.1);
    opacity: 0.6;
    clip-path: inset(10% 0 60% 0);
  }
  95% {
    transform: translate(0);
    opacity: 0;
    clip-path: inset(0 0 0 0);
  }
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-active .modal {
  animation: modalIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .modal-backdrop {
    padding: 0;
  }
  
  .modal {
    height: 100vh;
    max-height: 100vh;
  }
  
  .highlights {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
