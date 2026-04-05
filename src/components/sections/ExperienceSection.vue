<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasDotGrid } from '@/composables/useCanvasDotGrid'

const { canvasRef } = useCanvasDotGrid()

const experience = [
  {
    company: 'Excelencia Digital Software',
    role: 'Senior AI Implementer & Full-Stack Developer',
    period: 'Abr 2024 - Presente',
    location: 'Remote',
    description:
      'Arquitectura y despliegue de soluciones AI de grado producción y sistemas transaccionales de alta escala.',
    highlights: [
      'Agentic Workflows con LangChain y LangGraph para gestión de reclamos en tiempo real',
      'RAG avanzado con Qdrant y búsqueda vectorial',
      'Seguridad AI: defense contra Prompt Injection, Model Poisoning',
      'Backend con C# .NET y FastAPI, PostGIS para optimización de flotas',
      'Infraestructura completa: Docker, Capacitor, Vue.js (~13,000 usuarios)',
    ],
  },
  {
    company: 'Freelance',
    role: 'Full Stack Developer & 3D Digital Specialist',
    period: 'Ene 2020 - Feb 2025',
    location: 'Remote',
    description:
      'Consultor para clientes internacionales (US, LATAM, Europa) en soluciones .NET, Angular y 3D.',
    highlights: [
      '15+ aplicaciones producción con .NET Core, C#, Vue.js',
      'Pipeline completo de 3D: ZBrush, Blender, Substance Painter',
      'Módulos 3D interactivos y simulaciones web',
      'SQL Server: hasta 70% reducción en latencia de queries',
      'DevOps: Linux, Windows Server, Docker, CI/CD',
    ],
  },
  {
    company: 'Zelcar Games LLC',
    role: 'Character & Creature Artist (Mobile Focus)',
    period: 'Oct 2024 - Feb 2025',
    location: 'Remote',
    description: 'Artista 3D para juegos móviles, gestionando el pipeline completo de personajes.',
    highlights: [
      'Workflow High-to-Low: sculpting - low-poly con baking',
      'Retopología orientada a animación y deformación',
      'PBR Texturing con Substance Painter para móvil',
      'Optimización UV y texturas para performance móvil',
    ],
  },
  {
    company: 'Golemstudio',
    role: '3D Modeler',
    period: 'Dic 2021 - Ene 2023',
    location: 'Remote',
    description: 'Modelado 3D para sector luxury (joyería, accesorios).',
    highlights: [
      'Hard surface modeling para piezas de joyería',
      'Pipeline Blender-ZBrush para assets de alta calidad',
      'Shaders y lighting para metales y gemas preciosas',
    ],
  },
]

const skills = {
  ai: [
    'LangChain',
    'LangGraph',
    'LLMs',
    'RAG',
    'Vector Databases (Qdrant)',
    'AI Security & Red Teaming',
    'Prompt Engineering',
  ],
  backend: [
    '.NET Core / C#',
    'FastAPI',
    'Python',
    'PostgreSQL',
    'PostGIS',
    'SQL Server',
    'REST APIs',
  ],
  frontend: ['Vue.js', 'Angular', 'TypeScript', 'Capacitor'],
  devops: ['Docker', 'Linux', 'Git / Version Control', 'Clean Architecture'],
  '3d': [
    'ZBrush',
    'Blender',
    'Substance Painter',
    'PBR Texturing',
    'Retopology',
    'Hard Surface Modeling',
  ],
}

const expandedJob = ref<number | null>(null)

const toggleJob = (index: number) => {
  expandedJob.value = expandedJob.value === index ? null : index
}
</script>

<template>
  <section class="experience-section" v-bind="$attrs">
    <canvas ref="canvasRef" class="bg-canvas"></canvas>

    <div class="container">
      <h2 class="section-title glitch-text" data-text="EXPERIENCIA">EXPERIENCIA</h2>

      <div class="timeline">
        <div
          v-for="(job, index) in experience"
          :key="index"
          class="timeline-item"
          :class="{ expanded: expandedJob === index }"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-content" @click="toggleJob(index)">
            <div class="job-header">
              <div>
                <h3 class="job-role">{{ job.role }}</h3>
                <p class="job-company">{{ job.company }}</p>
              </div>
              <span class="job-period">{{ job.period }}</span>
            </div>
            <p class="job-description">{{ job.description }}</p>
            <div class="job-highlights" v-if="expandedJob === index">
              <ul>
                <li v-for="(highlight, hIndex) in job.highlights" :key="hIndex">
                  {{ highlight }}
                </li>
              </ul>
            </div>
            <span class="expand-hint">{{ expandedJob === index ? '[-]' : '[+]' }}</span>
          </div>
        </div>
      </div>

      <h2 class="section-title glitch-text" data-text="SKILLS">SKILLS</h2>

      <div class="skills-grid">
        <div class="skill-category">
          <h3>AI & Machine Learning</h3>
          <div class="skill-tags">
            <span v-for="skill in skills.ai" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
        </div>
        <div class="skill-category">
          <h3>Backend</h3>
          <div class="skill-tags">
            <span v-for="skill in skills.backend" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
        </div>
        <div class="skill-category">
          <h3>Frontend</h3>
          <div class="skill-tags">
            <span v-for="skill in skills.frontend" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
        </div>
        <div class="skill-category">
          <h3>DevOps & Architecture</h3>
          <div class="skill-tags">
            <span v-for="skill in skills.devops" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
        </div>
        <div class="skill-category">
          <h3>3D Digital</h3>
          <div class="skill-tags">
            <span v-for="skill in skills['3d']" :key="skill" class="skill-tag">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  position: relative;
  padding: 6rem 2rem;
  background: #fafafa;
  overflow: hidden;
}

.bg-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #111827;
  letter-spacing: 0.1em;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  animation: glitch 3s infinite;
}

@keyframes glitch {
  0%,
  90%,
  100% {
    text-shadow: none;
  }
  91% {
    text-shadow:
      2px 0 #1f2937,
      -2px 0 #6b7280;
  }
  92% {
    text-shadow:
      -2px 0 #1f2937,
      2px 0 #6b7280;
  }
  93% {
    text-shadow:
      2px 2px #1f2937,
      -2px -2px #6b7280;
  }
  94% {
    text-shadow:
      -2px 2px #1f2937,
      2px -2px #6b7280;
  }
  95% {
    text-shadow:
      1px -1px #1f2937,
      -1px 1px #6b7280;
  }
}

.timeline {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 4rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #d1d5db;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #1f2937;
}

.timeline-content {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.timeline-content:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.timeline-item.expanded .timeline-content {
  border-color: #1f2937;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.job-role {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.job-company {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  color: #1f2937;
  margin-top: 0.25rem;
}

.job-period {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
}

.job-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #4b5563;
  margin-top: 0.75rem;
  line-height: 1.5;
}

.job-highlights {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.job-highlights ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.job-highlights li {
  font-family: 'Inter', sans-serif;
  font-size: 0.825rem;
  color: #374151;
  padding: 0.35rem 0;
  padding-left: 1rem;
  border-left: 2px solid #d1d5db;
  margin-bottom: 0.25rem;
}

.job-highlights li:hover {
  border-left-color: #1f2937;
  color: #111827;
}

.expand-hint {
  display: block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 1rem;
  text-align: right;
  letter-spacing: 0.1em;
}

.skills-grid {
  display: grid;
  gap: 1.5rem;
}

.skill-category {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.skill-category h3 {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  font-weight: 400;
  color: #1f2937;
  margin-bottom: 1rem;
  letter-spacing: 0.2em;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  padding: 0.35rem 0.6rem;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  color: #4b5563;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  border-color: #1f2937;
  color: #111827;
  background: #ffffff;
}

@media (max-width: 768px) {
  .experience-section {
    padding: 4rem 1rem;
  }

  .job-header {
    flex-direction: column;
  }
}
</style>
