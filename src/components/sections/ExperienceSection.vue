<template>
  <section class="experience-section" v-bind="$attrs" data-theme="light">
    <div class="container">
      <div class="section-header">
        <span class="section-label">// CAREER PATH</span>
        <h2 class="section-title glitch-text" data-text="EXPERIENCE">EXPERIENCE</h2>
      </div>

      <div class="timeline">
        <div
          v-for="(job, index) in experience"
          :key="index"
          class="timeline-item"
          :class="{ visible: visibleItems.has(index), expanded: expandedJob === index }"
          :style="{ '--delay': `${index * 0.15}s` }"
        >
          <div class="timeline-line">
            <div class="timeline-dot"></div>
          </div>

          <div class="timeline-card" @click="toggleJob(index)">
            <div class="card-top">
              <div class="card-info">
                <span class="job-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <h3 class="job-role">{{ job.role }}</h3>
                <p class="job-company">{{ job.company }}</p>
              </div>
              <div class="card-meta">
                <span class="job-period">{{ job.period }}</span>
                <span class="job-location">{{ job.location }}</span>
              </div>
            </div>

            <p class="job-description">{{ job.description }}</p>

            <div class="job-highlights" v-if="expandedJob === index">
              <div
                v-for="(highlight, hIndex) in job.highlights"
                :key="hIndex"
                class="highlight-item"
                :style="{ '--h-delay': `${hIndex * 0.08}s` }"
              >
                <span class="highlight-title">{{ highlight.title }}</span>
                <span class="highlight-desc">{{ highlight.desc }}</span>
              </div>
            </div>

            <span class="expand-hint">{{ expandedJob === index ? 'COLLAPSE' : 'EXPAND' }}</span>
          </div>
        </div>
      </div>

      <div class="skills-section">
        <div class="skills-header">
          <span class="section-label">// TECH ARSENAL</span>
          <h2 class="section-title glitch-text" data-text="SKILLS">SKILLS</h2>
        </div>

        <div class="skills-grid">
          <div class="skill-category">
            <h3>SYSTEM_INTEL</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.ai" :key="skill.name" class="skill-tag">
                <span
                  v-if="getSkillIcon(skill.icon)"
                  v-html="getSkillIcon(skill.icon)"
                  class="skill-icon"
                ></span>
                {{ skill.name }}
              </span>
            </div>
          </div>
          <div class="skill-category">
            <h3>CORE_LAYERS</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.backend" :key="skill.name" class="skill-tag">
                <span
                  v-if="getSkillIcon(skill.icon)"
                  v-html="getSkillIcon(skill.icon)"
                  class="skill-icon"
                ></span>
                {{ skill.name }}
              </span>
            </div>
          </div>
          <div class="skill-category">
            <h3>INTERFACE_MODS</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.frontend" :key="skill.name" class="skill-tag">
                <span
                  v-if="getSkillIcon(skill.icon)"
                  v-html="getSkillIcon(skill.icon)"
                  class="skill-icon"
                ></span>
                {{ skill.name }}
              </span>
            </div>
          </div>
          <div class="skill-category">
            <h3>ARCH_DEVOPS</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.devops" :key="skill.name" class="skill-tag">
                <span
                  v-if="getSkillIcon(skill.icon)"
                  v-html="getSkillIcon(skill.icon)"
                  class="skill-icon"
                ></span>
                {{ skill.name }}
              </span>
            </div>
          </div>
          <div class="skill-category full-width">
            <h3>3D DIGITAL</h3>
            <div class="skill-tags">
              <span v-for="skill in skills['3d']" :key="skill.name" class="skill-tag">
                <span
                  v-if="getSkillIcon(skill.icon)"
                  v-html="getSkillIcon(skill.icon)"
                  class="skill-icon"
                ></span>
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as Si from 'simple-icons'

interface Highlight {
  title: string
  desc: string
}
interface Job {
  company: string
  role: string
  period: string
  location: string
  description: string
  highlights: Highlight[]
}

interface SkillItem {
  name: string
  icon: string | null
}

const getSkillIcon = (iconName: string | null) => {
  if (!iconName) return null
  const nameMap: Record<string, string> = {
    dotnet: 'Dotnet',
    vuedotjs: 'Vuedotjs',
    angular: 'Angular',
    typescript: 'Typescript',
    docker: 'Docker',
    postgresql: 'Postgresql',
    mongodb: 'Mongodb',
    linux: 'Linux',
    redis: 'Redis',
    blender: 'Blender',
    unrealengine: 'Unrealengine',
    fastapi: 'Fastapi',
    langchain: 'Langchain',
    capacitor: 'Capacitor',
    csharp: 'Csharp',
    azure: 'Azure',
    html: 'Html5',
  }
  const key = nameMap[iconName]
  if (!key) return null
  const icon = Si[('si' + key) as keyof typeof Si] as { path: string; hex: string } | undefined
  if (!icon) return null
  const color = `#${icon.hex}`
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="color:${color}"><path fill="currentColor" d="${icon.path}"/></svg>`
}

interface Job {
  company: string
  role: string
  period: string
  location: string
  description: string
  highlights: Highlight[]
}

interface SkillItem {
  name: string
  icon: string | null
}

const experience: Job[] = [
  {
    company: 'Excelencia Digital Software',
    role: 'AI & Full Stack Developer',
    period: 'Apr 2024 – Present',
    location: 'Hybrid — Argentina',
    description:
      'AI & Full Stack Developer working on a utility management system. Day-to-day work spans RAG pipelines (LangChain, LangGraph, vector databases), LLM integration with WhatsApp-connected transactional systems, real-time operations, and geospatial data processing with PostGIS.',
    highlights: [
      {
        title: 'RAG Pipelines & LLM Integration',
        desc: 'Building production RAG pipelines with LangChain, LangGraph, and vector databases. Integrating LLMs with WhatsApp for transactional systems serving 13,000+ users.',
      },
      {
        title: 'Real-time Operations',
        desc: 'Managing mass claim operations, shift tracking, and geospatial data processing with PostGIS for utility management.',
      },
      {
        title: 'Full-stack Development',
        desc: 'Backend in C# .NET with Entity Framework Core. Frontend and mobile with Vue.js and Capacitor. Data layer across PostgreSQL, SQL Server, MongoDB, and Redis.',
      },
    ],
  },
  {
    company: 'Zelcar Games LLC',
    role: '3D Artist',
    period: 'Oct 2024 – Feb 2025',
    location: 'Remote',
    description:
      '3D modeling of creatures and characters for a mobile video game, including sculpting, retopology, texturing, and optimization for real-time rendering.',
    highlights: [
      {
        title: 'High-to-Low Workflow',
        desc: 'Executed professional sculpting of stylized and realistic creatures, translating intricate high-resolution details into optimized low-poly meshes through advanced baking techniques.',
      },
      {
        title: 'Performance-Driven Retopology',
        desc: 'Delivered optimized character models ensuring smooth performance on mobile devices while maintaining visual fidelity.',
      },
    ],
  },
  {
    company: 'Freelance',
    role: 'Full-stack Developer & 3D Artist',
    period: 'Jun 2020 – Present',
    location: 'Remote — Argentina',
    description:
      'Consultant delivering integrated .NET, Angular, and high-fidelity 3D solutions for international clients. Specialized in bridging enterprise software architecture with interactive digital assets and real-time visualization.',
    highlights: [
      {
        title: 'Full Stack Solutions (2020–2025)',
        desc: 'Delivered 15+ production-ready applications using .NET Core, C#, and Angular/Vue.js, focusing on scalable SaaS architectures and Clean Architecture principles.',
      },
      {
        title: 'AI & LLM Integration (2023–2025)',
        desc: 'Architecting RAG pipelines and intelligent API orchestration to enhance functional capabilities through automated data extraction and LLM-powered features.',
      },
      {
        title: '3D Character Art & Engineering',
        desc: 'Established professional pipelines for high-fidelity character/creature design. Expert in ZBrush, Blender, and Substance Painter, focusing on retopology and PBR texturing for real-time engines.',
      },
    ],
  },
  {
    company: 'Golemstudio',
    role: '3D Modeler',
    period: 'Dec 2021 – Jan 2023',
    location: 'Remote — Lima, Peru',
    description:
      'Hard surface modeling for the luxury goods sector — fine jewelry and high-end fashion accessories. Delivered production-ready digital twins bridging conceptual design and commercial visualization.',
    highlights: [
      {
        title: 'Precision Hard Surface Modeling',
        desc: 'Engineered complex, clean topology meshes for intricate jewelry pieces, ensuring perfect light behavior and reflection continuity for high-end marketing renders.',
      },
      {
        title: 'Digital Craftsmanship',
        desc: 'Leveraged ZBrush to sculpt realistic leather textures, stitching, and intricate metalwork for luxury bags, achieving photorealistic quality.',
      },
    ],
  },
]

const skills = {
  ai: [
    { name: 'LangChain', icon: 'langchain' },
    { name: 'LangGraph', icon: null },
    { name: 'RAG Systems', icon: null },
    { name: 'LLM Integration', icon: null },
    { name: 'Azure OpenAI', icon: 'azure' },
    { name: 'Claude API', icon: null },
    { name: 'GPT-4 API', icon: null },
  ],
  backend: [
    { name: '.NET', icon: 'dotnet' },
    { name: 'C#', icon: 'csharp' },
    { name: 'ASP.NET', icon: null },
    { name: 'Entity Framework', icon: null },
    { name: 'FastAPI', icon: 'fastapi' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'SQL Server', icon: null },
  ],
  frontend: [
    { name: 'Vue.js', icon: 'vuedotjs' },
    { name: 'Angular', icon: 'angular' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Capacitor', icon: 'capacitor' },
    { name: 'HTML/CSS', icon: 'html' },
  ],
  devops: [
    { name: 'Docker', icon: 'docker' },
    { name: 'IIS', icon: null },
    { name: 'Linux', icon: 'linux' },
    { name: 'Redis', icon: 'redis' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'PostGIS', icon: null },
  ],
  '3d': [
    { name: 'Blender', icon: 'blender' },
    { name: 'ZBrush', icon: null },
    { name: 'Substance Painter', icon: null },
    { name: 'Maya Autodesk', icon: null },
    { name: 'Unreal Engine', icon: 'unrealengine' },
    { name: '3D Character Modeling', icon: null },
    { name: 'Hard Surface Modeling', icon: null },
    { name: 'Organic Sculpting', icon: null },
    { name: 'Retopology', icon: null },
    { name: 'PBR Texturing', icon: null },
    { name: 'UV Maps', icon: null },
    { name: 'Rigging', icon: null },
  ],
}

const showExperience = ref(true)
const showSkills = ref(true)
const expandedJob = ref<number | null>(null)
const expandedSkills = ref<Set<string>>(new Set())
const visibleItems = ref<Set<number>>(new Set())

const toggleJob = (index: number) => {
  expandedJob.value = expandedJob.value === index ? null : index
}

const toggleSkillCategory = (category: string) => {
  if (expandedSkills.value.has(category)) {
    expandedSkills.value.delete(category)
  } else {
    expandedSkills.value.add(category)
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  const items = document.querySelectorAll('.timeline-item')
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Array.from(items).indexOf(entry.target as HTMLElement)
        if (entry.isIntersecting) {
          visibleItems.value.add(index)
        }
      })
    },
    { threshold: 0.15 },
  )

  items.forEach((item) => observer?.observe(item))
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.experience-section {
  position: relative;
  padding: 8rem 2rem;
  background: #fafafa;
  overflow: hidden;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 4rem;
  text-align: center;
}

.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #9ca3af;
  letter-spacing: 0.3em;
  display: block;
  margin-bottom: 0.75rem;
}

.section-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(1.75rem, 5vw, 2.5rem);
  font-weight: 800;
  color: #111827;
  letter-spacing: 0.08em;
  margin: 0;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: #111827;
}

/* Timeline */
.timeline {
  position: relative;
  margin-bottom: 6rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, #d1d5db 10%, #d1d5db 90%, transparent);
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay, 0s);
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-line {
  position: absolute;
  left: 0;
  top: 1.5rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #111827;
  border: 2px solid #fafafa;
  box-shadow: 0 0 0 2px #d1d5db;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  background: #374151;
  box-shadow: 0 0 0 3px #9ca3af;
  transform: scale(1.2);
}

.timeline-card {
  margin-left: 3rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.timeline-card::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 1.25rem;
  width: 12px;
  height: 12px;
  background: #ffffff;
  border-left: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.timeline-card:hover {
  border-color: #d1d5db;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.timeline-card:hover::before {
  opacity: 1;
}

.timeline-item.expanded .timeline-card {
  border-color: #111827;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.job-index {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  color: #9ca3af;
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 0.25rem;
}

.job-role {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.3;
}

.job-company {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0.2rem 0 0;
}

.card-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
  flex-shrink: 0;
}

.job-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #9ca3af;
  white-space: nowrap;
}

.job-location {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  color: #d1d5db;
}

.job-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #4b5563;
  margin-top: 0.75rem;
  line-height: 1.6;
}

.job-highlights {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-left: 2px solid #d1d5db;
  opacity: 0;
  transform: translateX(-10px);
  animation: highlightIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--h-delay, 0s);
}

@keyframes highlightIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.highlight-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: 0.05em;
}

.highlight-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #6b7280;
  line-height: 1.55;
}

.expand-hint {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #d1d5db;
  margin-top: 1rem;
  text-align: right;
  letter-spacing: 0.15em;
  transition: color 0.3s ease;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 4px;
}

.skills-header:hover {
  background: rgba(0, 0, 0, 0.02);
}

.skills-header.active {
  background: rgba(0, 0, 0, 0.04);
}

.skills-header .header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.timeline-card:hover .expand-hint {
  color: #9ca3af;
}

/* Skills Section */
.skills-section {
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.skills-header {
  text-align: center;
  margin-bottom: 3rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.skill-category {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.skill-category:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.skill-category.full-width {
  grid-column: 1 / -1;
}

.skill-category h3 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.75rem;
  letter-spacing: 0.2em;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.skill-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  padding: 0.3rem 0.55rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  letter-spacing: 0.03em;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  border-color: #111827;
  color: #111827;
  background: #ffffff;
  transform: translateY(-1px);
}

.skill-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  margin-right: 0.3rem;
}

.skill-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

@media (max-width: 768px) {
  .experience-section {
    padding: 4rem 1rem;
  }

  .section-header {
    margin-bottom: 2.5rem;
  }

  .timeline {
    margin-bottom: 3rem;
  }

  .timeline::before {
    left: 8px;
  }

  .timeline-line {
    width: 16px;
    height: 16px;
  }

  .timeline-dot {
    width: 6px;
    height: 6px;
  }

  .timeline-card {
    margin-left: 2rem;
    padding: 1rem;
  }

  .timeline-card::before {
    display: none;
  }

  .card-top {
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-meta {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
  }

  .job-role {
    font-size: 0.9rem;
  }

  .job-company {
    font-size: 0.7rem;
  }

  .job-description {
    font-size: 0.8rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .skill-category {
    padding: 1rem;
  }
}
</style>
