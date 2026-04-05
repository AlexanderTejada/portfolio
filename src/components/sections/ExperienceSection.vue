<template>
  <section class="experience-section" v-bind="$attrs" data-theme="light">
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
                  <span class="highlight-title">{{ highlight.title }}</span>
                  <span class="highlight-desc">{{ highlight.desc }}</span>
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

<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasDotGrid } from '@/composables/useCanvasDotGrid'

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

const { canvasRef } = useCanvasDotGrid()

const experience: Job[] = [
  {
    company: 'Excelencia Digital Software',
    role: 'Senior AI Implementer & Full-Stack Engineer',
    period: 'Apr 2024 – Present',
    location: 'Remote',
    description:
      'Architecting and deploying production-grade AI solutions and high-scale transactional systems. Bridging the gap between Large Language Models (Claude, Gemini, GPT-4) and complex enterprise operations, ensuring scalability, security, and measurable business impact.',
    highlights: [
      {
        title: 'Agentic Workflows & Orchestration',
        desc: 'Engineered sophisticated multi-agent systems using LangChain and LangGraph to automate real-time utility claim management and technical dispatching, handling high-concurrency operational data.',
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
        desc: 'Built resilient backends using C# .NET and FastAPI, integrated with PostGIS for real-time fleet optimization and geospatial anomaly detection.',
      },
      {
        title: 'Product-Ready Infrastructure',
        desc: 'Managed the end-to-end lifecycle of AI applications, from containerization with Docker to cross-platform deployment via Capacitor and Vue.js, serving a user base of ~13,000+ individuals.',
      },
    ],
  },
  {
    company: 'Zelcar Games LLC',
    role: 'Character & Creature Artist (Mobile Focus)',
    period: 'Oct 2024 – Feb 2025',
    location: 'Remote',
    description:
      '3D Character and Creature Artist dedicated to developing high-quality, game-ready assets for mobile platforms. Managed the end-to-end character pipeline, ensuring artistic vision and technical performance lived in harmony within the game engine.',
    highlights: [
      {
        title: 'High-to-Low Workflow',
        desc: 'Executed professional sculpting of stylized and realistic creatures, translating intricate high-resolution details into optimized low-poly meshes through advanced baking techniques.',
      },
      {
        title: 'Performance-Driven Retopology',
        desc: 'Mastered hand-crafted retopology focused on edge flow for animation, ensuring character joints and silhouettes deformed correctly under real-time constraints.',
      },
      {
        title: 'Texturing & LookDev',
        desc: 'Developed PBR textures using Substance Painter to achieve high-end visual fidelity, focusing on material definition and readability tailored for smaller mobile screens.',
      },
      {
        title: 'Mobile Optimization',
        desc: 'Drastically reduced engine overhead by optimizing UV layouts and texture budgets, ensuring smooth frame rates across a wide range of mobile hardware without compromising artistic integrity.',
      },
    ],
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Developer & 3D Digital Specialist',
    period: 'Jan 2020 – Feb 2025',
    location: 'Remote — US, LATAM, Europe',
    description:
      'Consultant delivering integrated .NET, Angular, and high-fidelity 3D solutions for international clients. Specialized in bridging enterprise software architecture with interactive digital assets and real-time visualization.',
    highlights: [
      {
        title: 'Full-Stack Solutions (2020–2025)',
        desc: 'Delivered 15+ production-ready applications using .NET Core, C#, and Vue.js, specializing in technical management tools and scalable SaaS architectures with Clean Architecture principles.',
      },
      {
        title: '3D Character Art & Engineering',
        desc: 'Established a professional 3D pipeline for high-fidelity character and creature design. Expert in ZBrush, Blender, and Substance Painter — anatomical precision, retopology, and PBR texturing for real-time engines.',
      },
      {
        title: 'Interactive 3D Integration',
        desc: 'Developed web-based 3D modules and interactive simulations, combining traditional software engineering with advanced digital sculpting to create immersive user experiences.',
      },
      {
        title: 'Database & Performance Optimization',
        desc: 'Architected complex SQL Server schemas and optimized data layers using ADO.NET, achieving up to 70% reduction in query latency for high-traffic data monitoring systems.',
      },
      {
        title: 'Infrastructure & DevOps',
        desc: 'Managed end-to-end deployments in Linux and Windows Server environments, utilizing Docker for containerization and automated release cycles.',
      },
      {
        title: 'AI Integration (2023–2025)',
        desc: 'Integrated LLM-powered features and automated data extraction into client applications, enhancing functional capabilities through intelligent API orchestration.',
      },
    ],
  },
  {
    company: 'Golemstudio',
    role: '3D Modeler',
    period: 'Dec 2021 – Jan 2023',
    location: 'Remote',
    description:
      'High-fidelity 3D Modeler specializing in hard surface workflows for the luxury goods sector — fine jewelry and high-end fashion accessories. Delivered production-ready digital twins bridging conceptual design and commercial visualization.',
    highlights: [
      {
        title: 'Precision Hard Surface Modeling',
        desc: 'Engineered complex, clean topology meshes for intricate jewelry pieces, ensuring perfect light behavior and reflection continuity for high-end marketing renders.',
      },
      {
        title: 'Digital Craftsmanship',
        desc: 'Leveraged ZBrush to sculpt realistic leather textures, stitching, and intricate metalwork for luxury bags, achieving photorealistic quality that enhanced virtual catalog presentations.',
      },
      {
        title: 'Workflow Optimization',
        desc: 'Mastered a seamless pipeline between Blender and ZBrush, utilizing advanced retopology and baking techniques to deliver high-detail assets optimized for high-resolution renders and interactive 3D viewers.',
      },
      {
        title: 'Technical Artistry',
        desc: 'Collaborated on shader and lighting environment setup to accurately represent precious metals, gemstones, and exotic materials for luxury brand campaigns.',
      },
    ],
  },
]

const skills = {
  ai: [
    'LangChain',
    'LangGraph',
    'Large Language Models',
    'Retrieval-Augmented Generation (RAG)',
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
  devops: ['Docker', 'Linux', 'Git / Version Control', 'Clean Architecture', 'Agile Methodologies'],
  '3d': [
    'Blender',
    'ZBrush',
    'Substance Painter',
    'Maya Autodesk',
    'Unreal Engine',
    '3D Character Modeling',
    'Hard Surface Modeling',
    'Organic Sculpting',
    'Retopology',
    'PBR Texturing',
    'UV Maps',
    'Rigging',
  ],
}

const expandedJob = ref<number | null>(null)

const toggleJob = (index: number) => {
  expandedJob.value = expandedJob.value === index ? null : index
}
</script>



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
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.5rem 0 0.5rem 1rem;
  border-left: 2px solid #d1d5db;
  margin-bottom: 0.4rem;
  transition: border-color 0.2s;
}

.job-highlights li:hover {
  border-left-color: #1f2937;
}

.highlight-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: 0.05em;
}

.highlight-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #4b5563;
  line-height: 1.55;
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
