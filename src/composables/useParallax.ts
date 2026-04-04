import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useScrollProgress } from './useScrollProgress'

export interface ParallaxOptions {
  speed?: number // Multiplier for parallax effect (0.5 = half speed, 2 = double speed)
  direction?: 'vertical' | 'horizontal'
  smooth?: boolean
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'vertical', smooth = true } = options
  const { scrollY } = useScrollProgress()

  const mouseX = ref(0)
  const mouseY = ref(0)
  const smoothMouseX = ref(0)
  const smoothMouseY = ref(0)

  // Parallax based on scroll
  const scrollOffset = computed(() => {
    return scrollY.value * speed
  })

  // Parallax based on mouse (for subtle movements)
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2

    mouseX.value = x
    mouseY.value = y
  }

  // Smooth interpolation for mouse movement
  const smoothUpdate = () => {
    if (smooth) {
      smoothMouseX.value += (mouseX.value - smoothMouseX.value) * 0.1
      smoothMouseY.value += (mouseY.value - smoothMouseY.value) * 0.1
      requestAnimationFrame(smoothUpdate)
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    if (smooth) {
      smoothUpdate()
    }
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return {
    scrollOffset,
    mouseX: smooth ? smoothMouseX : mouseX,
    mouseY: smooth ? smoothMouseY : mouseY,
  }
}
