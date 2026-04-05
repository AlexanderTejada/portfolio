import { ref, onMounted, onUnmounted } from 'vue'

export function useCanvasDotGrid() {
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  let animationId: number
  let removeResize: (() => void) | null = null

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gridSize = 35

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      ctx.fillStyle = '#fafafa'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          ctx.fillStyle = 'rgba(31, 41, 55, 0.15)'
          ctx.fillRect(x - 1, y - 1, 2, 2)
        }
      }
      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    removeResize = () => window.removeEventListener('resize', resize)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    removeResize?.()
  })

  return { canvasRef }
}
