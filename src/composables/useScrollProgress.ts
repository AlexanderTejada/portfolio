import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollProgress() {
  const scrollProgress = ref(0)
  const scrollY = ref(0)
  const viewportHeight = ref(0)
  const documentHeight = ref(0)

  const updateScroll = () => {
    scrollY.value = window.scrollY
    viewportHeight.value = window.innerHeight
    documentHeight.value = document.documentElement.scrollHeight

    const maxScroll = documentHeight.value - viewportHeight.value
    scrollProgress.value = maxScroll > 0 ? scrollY.value / maxScroll : 0
  }

  onMounted(() => {
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
    window.removeEventListener('resize', updateScroll)
  })

  return {
    scrollProgress,
    scrollY,
    viewportHeight,
    documentHeight,
  }
}
