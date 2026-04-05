# Refactor Plan — Portfolio Vue 3

> Objetivo: código idiomático Vue 3, sin sobre-ingeniería, sin código muerto.
> Cada decisión tiene justificación.

---

## Estructura objetivo

```
src/
  assets/               ← solo archivos estáticos (imágenes, fuentes locales)
  components/
    3d/
      HeroScene.vue     ← se queda igual
    sections/
      hero/
        index.vue       ← lógica inline + template + orquestación
        HeroNavbar.vue  ← único subcomponente justificado (tiene estado propio)
        hero.css        ← estilos base de .hero solamente
      NavigationSidebar.vue
      ProjectsSection.vue
      ExperienceSection.vue
  composables/
    useScrollProgress.ts   ← se queda (podría usarse en múltiples secciones)
    useParallax.ts         ← revisar si se usa; eliminar si no
    useTypingEffect.ts     ← revisar si se usa; eliminar si no
  styles/
    global.css             ← variables CSS + reset + tipografía global
  stores/                  ← vacío por ahora; agregar solo si hay estado global real
  App.vue
  main.ts
```

---

## Acciones por área

### 1. Eliminar archivos muertos

| Archivo | Razón |
|---|---|
| `src/components/HelloWorld.vue` | Scaffold de Vue CLI, no usado |
| `src/components/TheWelcome.vue` | Scaffold de Vue CLI, no usado |
| `src/components/WelcomeItem.vue` | Scaffold de Vue CLI, no usado |
| `src/components/icons/` (carpeta completa) | Íconos del scaffold, no usados |
| `src/components/3d/OldHeroScene.vue` | Versión anterior, reemplazada |
| `src/stores/counter.ts` | Store de ejemplo del scaffold, no usado |
| `src/assets/base.css` | Scaffold, reemplazado por global.css |
| `src/assets/main.css` | Scaffold, reemplazado por global.css |
| `src/composables/useSweepTransition.ts` | Verificar uso; si no se usa, eliminar |

---

### 2. Hero — deshacer la sobre-componentización

**Problema:** `HeroContent.vue`, `HeroScrollIndicator.vue` y `useHero.ts` se crearon
imitando patrones Angular. En Vue, extraer lógica de 10 líneas o plantillas de 3 líneas
a archivos separados no aporta valor — aumenta la fragmentación sin justificación.

**Regla Vue para extraer un componente:**
- Tiene estado propio **o** lógica no trivial → `HeroNavbar.vue` ✓ (maneja `isMenuOpen`)
- Se reutiliza en más de un lugar
- El template/lógica crece tanto que el archivo padre se vuelve difícil de leer

**Regla Vue para extraer un composable:**
- La lógica se reutiliza en múltiples componentes
- Gestiona estado asíncrono, suscripciones, o efectos complejos
- Es suficientemente compleja para testear de forma independiente

**Acciones:**
- [ ] Eliminar `src/composables/useHero.ts` — mover el contenido inline a `hero/index.vue`
- [ ] Eliminar `src/components/sections/hero/HeroContent.vue` — inline en `hero/index.vue`
- [ ] Eliminar `src/components/sections/hero/HeroScrollIndicator.vue` — inline en `hero/index.vue`
- [ ] Mantener `HeroNavbar.vue` — estado propio (`isMenuOpen`) justifica la separación

**Resultado esperado de `hero/index.vue`:**
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollProgress } from '@/composables/useScrollProgress'
import HeroScene from '@/components/3d/HeroScene.vue'
import NavigationSidebar from '@/components/sections/NavigationSidebar.vue'
import HeroNavbar from './HeroNavbar.vue'

const { scrollProgress } = useScrollProgress()
const showContent = ref(false)

const navItems = [
  { label: 'PROJECTS', to: 'projects' },
  { label: 'EXPERIENCE', to: 'experience' },
]

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => setTimeout(() => { showContent.value = true }, 300))
</script>
```

---

### 3. Estilos — consolidar y limpiar

**Problema:** hay tres capas de CSS potencialmente redundantes:
- `src/assets/base.css` + `src/assets/main.css` (scaffold)
- `src/styles/global.css` (el real, con variables y reset)
- `src/styles/theme.ts` (duplica las variables de global.css en TypeScript)

**Acciones:**
- [ ] Verificar que `main.ts` importe solo `styles/global.css`, no los de assets
- [ ] Eliminar `assets/base.css` y `assets/main.css` si están importados pero son redundantes
- [ ] Decidir qué hacer con `theme.ts`:
  - Si ningún componente lo importa → eliminar
  - Si se usa → unificar los valores con los de `global.css` (actualmente pueden diferir)

**Regla:** una sola fuente de verdad para variables de diseño — `global.css` con custom properties CSS.
`theme.ts` como duplicado TypeScript solo tiene sentido si se usan los valores en lógica JS/TS
(animaciones con GSAP, cálculos de Three.js, etc.).

---

### 4. App.vue — limpiar código comentado

**Problema:** hay ~25 líneas de lógica de transición comentada y variables sin usar
(`currentSection`, `isTransitioning`, `sections`, `handleScroll` con todo su contenido comentado).

**Acciones:**
- [ ] Si la transición de partículas no se va a retomar → eliminar todo el código comentado
  y las variables asociadas (`currentSection`, `isTransitioning`, `sections`)
- [ ] Si se va a retomar → crear un issue/TODO claro en vez de dejar código muerto comentado
- [ ] El `handleScroll` vacío que se registra con `addEventListener` es un noop — eliminarlo

---

### 5. Stores — usar Pinia con intención

**Estado actual:** `stores/counter.ts` es el ejemplo del scaffold, no sirve para nada.

**Cuándo agregar un store en este proyecto:**
- Estado de UI global (ej: sección activa, tema claro/oscuro)
- Estado compartido entre secciones que no tienen relación padre-hijo directa

**Acciones:**
- [ ] Eliminar `counter.ts`
- [ ] No agregar stores nuevos hasta que haya una necesidad concreta

---

### 6. Composables existentes — auditoría

| Composable | ¿Se usa actualmente? | Acción |
|---|---|---|
| `useScrollProgress.ts` | Sí, en `hero/index.vue` | Mantener |
| `useParallax.ts` | Verificar | Eliminar si no se usa en ningún componente |
| `useTypingEffect.ts` | Verificar | Eliminar si no se usa en ningún componente |
| `useSweepTransition.ts` | Probablemente no (transición comentada) | Eliminar |
| `useHero.ts` | Solo en hero/index.vue | Inline + eliminar el archivo |

---

## Convenciones a mantener

```
Componentes     → PascalCase             NavigationSidebar.vue
Composables     → camelCase con "use"    useScrollProgress.ts
CSS clases      → kebab-case             .hero-subtitle
Props           → camelCase en TS        showContent
                  kebab-case en template :show-content="..."
Emits           → camelCase              emit('navigate', id)
```

## Lo que NO hacer (lecciones aprendidas)

- No extraer composables para lógica de un solo componente
- No crear componentes para plantillas de menos de ~15 líneas sin estado propio
- No imitar patrones de Angular (servicios para todo, módulos, decoradores)
- No duplicar variables de diseño en TS y CSS al mismo tiempo
- No dejar código comentado como "por si acaso" — para eso existe git

---

## Orden de ejecución sugerido

1. Eliminar archivos muertos (scaffold + código viejo)
2. Limpiar App.vue
3. Inline de hero/index.vue + eliminar archivos sobre-extraídos
4. Auditar y limpiar composables
5. Consolidar CSS
6. Verificar que el proyecto compila y funciona igual que antes
