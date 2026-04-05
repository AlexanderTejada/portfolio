<script setup lang="ts">
import { ref, watch } from 'vue'
import { useScrollLock } from '@/composables/useScrollLock'

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
    company: 'Zelcar Games LLC',
    role: 'Character & Creature Artist (Mobile Focus)',
    period: 'Oct 2024 – Feb 2025',
    description:
      '3D Character and Creature Artist dedicated to developing high-quality, game ready assets for mobile platforms. Managed the end to end character pipeline.',
    highlights: [
      {
        title: 'High to Low Workflow',
        desc: 'Executed professional sculpting of stylized and realistic creatures, translating high-resolution details into optimized low-poly meshes through advanced baking techniques.',
      },
      {
        title: 'Performance Driven Retopology',
        desc: 'Mastered hand crafted retopology focused on edge flow for animation, ensuring character joints and silhouettes deform correctly under real time constraints.',
      },
      {
        title: 'Texturing & LookDev',
        desc: 'Developed PBR textures using Substance Painter to achieve high end visual fidelity, focusing on material definition and readability for mobile screens.',
      },
      {
        title: 'Mobile Optimization',
        desc: 'Drastically reduced engine overhead by optimizing UV layouts and texture budgets, ensuring smooth frame rates across wide range of mobile hardware.',
      },
    ],
  },
  {
    company: 'Golemstudio',
    role: '3D Modeler',
    period: 'Dec 2021 – Jan 2023',
    description:
      'High fidelity 3D Modeler specializing in hard surface workflows for the luxury goods sector, focusing on fine jewelry and high-end fashion accessories.',
    highlights: [
      {
        title: 'Precision Hard Surface Modeling',
        desc: 'Engineered complex, clean topology meshes for intricate jewelry pieces, ensuring perfect light behavior and reflection continuity.',
      },
      {
        title: 'Digital Craftsmanship',
        desc: 'Leveraged ZBrush to sculpt realistic leather textures, stitching, and intricate metalwork for luxury bags achieving photorealistic quality.',
      },
      {
        title: 'Workflow Optimization',
        desc: 'Mastered seamless pipeline between Blender and ZBrush, utilizing advanced retopology and baking techniques for high-detail assets.',
      },
      {
        title: 'Technical Artistry',
        desc: 'Collaborated on technical setup of shaders and lighting to accurately represent physical properties of precious metals and gemstones.',
      },
    ],
  },
  {
    company: 'Freelance',
    role: '3D Digital Specialist',
    period: 'Jan 2020 – Present',
    description:
      'Delivering integrated high fidelity 3D solutions for international clients across US, LATAM, and Europe.',
    highlights: [
      {
        title: 'Interactive 3D Integration',
        desc: 'Developed web-based 3D modules and interactive simulations, combining software engineering with advanced digital sculpting.',
      },
      {
        title: 'Character Design',
        desc: 'Created original characters and creatures from concept to final implementation for game and commercial projects.',
      },
    ],
  },
]

const skills = [
  { group: 'Modeling', items: ['ZBrush', 'Blender', 'Maya', 'Topogun', 'Substance Painter'] },
  { group: 'Texturing', items: ['Substance Painter', 'Mari', 'Photoshop', 'Substance Designer'] },
  { group: 'Game Engines', items: ['Unity', 'Unreal Engine', 'Godot'] },
  {
    group: 'Specialization',
    items: ['Character Design', 'Creature Design', 'Hard Surface', 'Organic Modeling', 'Jewelry'],
  },
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
          <div class="hud-corner tl" />
          <div class="hud-corner tr" />
          <div class="hud-corner bl" />
          <div class="hud-corner br" />

          <div class="modal-header">
            <span class="modal-label">// 3D ARTIST</span>
            <button class="modal-close" @click="emit('close')">✕</button>
          </div>

          <div ref="modalBodyRef" class="modal-body">
            <!-- Timeline -->
            <div class="timeline">
              <div v-for="(job, i) in experience" :key="i" class="timeline-item">
                <div class="timeline-dot" />
                <div class="timeline-content">
                  <div class="job-header">
                    <div>
                      <p class="job-role">{{ job.role }}</p>
                      <p class="job-company">{{ job.company }}</p>
                    </div>
                    <span class="job-period">{{ job.period }}</span>
                  </div>
                  <p class="job-desc">{{ job.description }}</p>
                  <div class="highlights">
                    <div v-for="(h, hi) in job.highlights" :key="hi" class="highlight">
                      <span class="h-title">{{ h.title }}</span>
                      <span class="h-desc">{{ h.desc }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div class="skills-section">
              <span class="skills-label">// TOOLKIT</span>
              <div class="skills-grid">
                <div v-for="group in skills" :key="group.group" class="skill-group">
                  <p class="skill-group-name">{{ group.group }}</p>
                  <div class="skill-tags">
                    <span v-for="s in group.items" :key="s" class="skill-tag">{{ s }}</span>
                  </div>
                </div>
              </div>
            </div>
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
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-wrapper {
  position: relative;
}

.modal {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.15);
}

.hud-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border-color: #111827;
  border-style: solid;
}
.hud-corner.tl {
  top: -1px;
  left: -1px;
  border-width: 2px 0 0 2px;
}
.hud-corner.tr {
  top: -1px;
  right: -1px;
  border-width: 2px 2px 0 0;
}
.hud-corner.bl {
  bottom: -1px;
  left: -1px;
  border-width: 0 0 2px 2px;
}
.hud-corner.br {
  bottom: -1px;
  right: -1px;
  border-width: 0 2px 2px 0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  flex-shrink: 0;
}

.modal-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #9ca3af;
  letter-spacing: 0.2em;
}

.modal-close {
  background: none;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  width: 28px;
  height: 28px;
  font-size: 0.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.modal-close:hover {
  border-color: #111827;
  color: #111827;
}

.modal-body {
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 1.25rem;
  border-left: 1px solid #e5e7eb;
}

.timeline-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: calc(-1.25rem - 5px);
  top: 4px;
  width: 9px;
  height: 9px;
  background: #111827;
  border-radius: 50%;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}

.job-role {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
}

.job-company {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.15rem;
}

.job-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #9ca3af;
  white-space: nowrap;
  flex-shrink: 0;
}

.job-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #4b5563;
  line-height: 1.65;
  margin-bottom: 1rem;
}

.highlights {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.highlight {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-left: 0.75rem;
  border-left: 2px solid #e5e7eb;
  transition: border-color 0.2s;
}

.highlight:hover {
  border-left-color: #111827;
}

.h-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: 0.04em;
}

.h-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #6b7280;
  line-height: 1.6;
}

.skills-section {
  border-top: 1px solid #f3f4f6;
  padding-top: 1.5rem;
}

.skills-label {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #9ca3af;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.skill-group-name {
  font-family: 'Orbitron', monospace;
  font-size: 0.55rem;
  font-weight: 700;
  color: #374151;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.skill-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  padding: 0.25rem 0.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.skill-tag:hover {
  border-color: #1f2937;
  color: #111827;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active .modal-wrapper,
.modal-leave-active .modal-wrapper {
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-wrapper,
.modal-leave-to .modal-wrapper {
  transform: translateY(16px);
  opacity: 0;
}
</style>
