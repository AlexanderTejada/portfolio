# Tech Noir 3D Portfolio

A cutting-edge portfolio website combining Vue 3, Three.js, and advanced 3D visualization to showcase full-stack development and 3D artistry skills.

## Tech Stack

### Core
- **Vue 3** - Progressive JavaScript framework with Composition API
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server

### 3D Graphics
- **Three.js** - WebGL 3D library
- **TresJS** - Declarative Three.js integration for Vue 3
- **@tresjs/cientos** - Collection of useful Three.js helpers

### Animation & Interaction
- **GSAP** - Professional-grade animation library
- **VueUse** - Collection of essential Vue Composition utilities

### State Management
- **Pinia** - Intuitive state management for Vue 3

## Project Structure

```
portfolio-3d/
├── src/
│   ├── components/
│   │   ├── 3d/              # Three.js components
│   │   │   └── HeroScene.vue
│   │   └── sections/        # Page sections
│   │       └── HeroSection.vue
│   ├── composables/         # Reusable composition functions
│   │   ├── useScrollProgress.ts
│   │   └── useParallax.ts
│   ├── styles/              # Global styles and theme
│   │   ├── global.css
│   │   └── theme.ts
│   ├── stores/              # Pinia stores
│   └── assets/
│       ├── models/          # 3D models (GLB/GLTF)
│       └── textures/        # Texture files
├── public/
└── package.json
```

## Design System

### Color Palette (Tech Noir)
- **Background**: Deep blacks (#0a0a0f, #121218, #1a1a24)
- **Neon Accents**:
  - Blue: #00d4ff
  - Purple: #b820ff
  - Magenta: #ff0080
  - Cyan: #00fff5
- **Text**: Light grays (#e0e0e8, #a0a0b0)

### Features
- Parallax scrolling with smooth mouse tracking
- Reactive 3D scene responding to user interaction
- Optimized for mobile performance
- Tech Noir aesthetic with neon glows and gradients

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
- Local: http://localhost:5173
- Vue DevTools available at: http://localhost:5173/__devtools__/

### IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur)

## Customization

### Adding Your 3D Model

1. Export your model as GLB/GLTF from Blender
2. Optimize it using [gltf-transform](https://gltf-transform.dev/)
3. Place it in `src/assets/models/`
4. Import and use it in `HeroScene.vue`:

```vue
<script setup>
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/your-model.glb')
</script>

<template>
  <primitive :object="scene" />
</template>
```

### Updating Theme Colors

Edit `src/styles/theme.ts` and `src/styles/global.css` to customize the color palette.

### Adding New Sections

1. Create component in `src/components/sections/`
2. Import and add to `App.vue`
3. Use composables for scroll effects and animations

## Performance Optimization

### Current Optimizations
- Passive event listeners for scroll/mouse
- RequestAnimationFrame for smooth animations
- Lazy loading of 3D assets
- CSS-based animations where possible

### Mobile Considerations
- Touch-friendly interactions
- Reduced particle count on mobile
- Simplified shaders for lower-end devices
- Progressive enhancement approach

## Next Steps

### Planned Features
- [ ] Load optimized 3D character model
- [ ] Projects showcase section with 3D previews
- [ ] Interactive timeline for experience
- [ ] Skills visualization (3D graph/particles)
- [ ] Contact form with animated background
- [ ] Blog section with code snippets
- [ ] Dark/Light mode toggle
- [ ] Performance monitoring

### 3D Enhancements
- [ ] Post-processing effects (bloom, SSAO)
- [ ] Advanced lighting setup
- [ ] Animated holographic UI elements
- [ ] Interactive 3D project cards
- [ ] Particle system enhancements

## License

Private - All Rights Reserved

## Author

Senior AI Implementer & Full-Stack Developer

Specializing in:
- AI/ML Implementation (LangChain, RAG, Vector Search)
- Full-Stack Development (C# .NET, FastAPI, Vue.js)
- 3D Digital Art (ZBrush, Blender, Substance Painter)
