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
    company: 'Excelencia Digital Software',
    role: 'Senior AI Implementer & Full-Stack Engineer',
    period: 'Apr 2024 – Present',
    description:
      'I specialize in architecting and deploying production grade AI solutions and high scale transactional systems. My work focuses on bridging the gap between Large Language Models (Claude, Gemini, GPT-4) and complex enterprise operations, ensuring scalability, security, and measurable business impact.',
    highlights: [
      {
        title: 'Agentic Workflows & Orchestration',
        desc: 'Engineered sophisticated multi agent systems using LangChain and LangGraph to automate real-time utility claim management and technical dispatching, handling high-concurrency operational data.',
      },
      {
        title: 'Advanced RAG Architectures',
        desc: 'Designed and optimized Retrieval-Augmented Generation pipelines leveraging Qdrant and vector search strategies, significantly enhancing information retrieval speed and accuracy for technical documentation.',
      },
      {
        title: 'AI Security & Red Teaming',
        desc: 'Established robust defense mechanisms against Prompt Injection, Sensitive Information Disclosure, and Model Poisoning, ensuring secure LLM integration within sensitive financial and transactional environments.',
      },
      {
        title: 'Full-Stack & Geospatial Engineering',
        desc: 'Built resilient backends using C# .NET and FastAPI, integrated with PostGIS for real time fleet optimization and geospatial anomaly detection.',
      },
      {
        title: 'Product-Ready Infrastructure',
        desc: 'Managed the end to end lifecycle of AI applications, from containerization with Docker to cross platform deployment via Capacitor and Vue.js, serving a user base of ~13,000+ individuals.',
      },
    ],
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Developer & 3D Digital Specialist',
    period: 'Jan 2020 – Feb 2025',
    description:
      'Consultant delivering integrated .NET, Angular, and high fidelity 3D solutions for international clients across US, LATAM, and Europe. Specialized in bridging enterprise software architecture with interactive digital assets and real-time visualization.',
    highlights: [
      {
        title: 'Full Stack Solutions (2020–2025)',
        desc: 'Delivered 15+ production-ready applications using .NET Core, C#, and Vue.js, specializing in technical management tools and scalable SaaS architectures with Clean Architecture principles.',
      },
      {
        title: 'Database & Performance Optimization',
        desc: 'Architected complex SQL Server schemas and optimized data layers using ADO.NET, achieving up to 70% reduction in query latency for high-traffic data monitoring systems.',
      },
      {
        title: 'Infrastructure & DevOps',
        desc: 'Managed end to end deployments in Linux and Windows Server environments, utilizing Docker for containerization and automated release cycles.',
      },
      {
        title: 'AI Integration (2023–2025)',
        desc: 'Began integrating LLM powered features and automated data extraction into client applications, enhancing functional capabilities through intelligent API orchestration.',
      },
    ],
  },
]

const skills = [
  {
    group: 'AI & LLMs',
    items: [
      'LangChain',
      'LangGraph',
      'Large Language Models',
      'RAG',
      'Qdrant',
      'AI Security & Red Teaming',
      'Prompt Engineering',
    ],
  },
  {
    group: 'Backend',
    items: [
      '.NET Core / C#',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'PostGIS',
      'SQL Server',
      'REST APIs',
      'SignalR',
    ],
  },
  { group: 'Frontend', items: ['Vue.js', 'Angular', 'TypeScript', 'Capacitor'] },
  { group: 'DevOps', items: ['Docker', 'Linux', 'Git', 'Clean Architecture', 'Agile'] },
]

const activeNode = ref<string | null>(null)
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
            <span class="modal-label">// SOFTWARE ENGINEERING</span>
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
              <span class="skills-label">// TECH STACK</span>
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

/* Timeline */
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

/* Skills */
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

/* Transition */
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
