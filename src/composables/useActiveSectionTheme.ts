import { ref, onMounted, onUnmounted } from 'vue'

export function useActiveSectionTheme() {
  const activeTheme = ref<'light' | 'dark'>('light')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const sections = document.querySelectorAll('section[data-theme]')
    
    observer = new IntersectionObserver((entries) => {
      // Find the entry that is most visible or crossing the top
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          const theme = entry.target.getAttribute('data-theme') as 'light' | 'dark'
          if (theme) {
            activeTheme.value = theme
          }
        }
      })
    }, {
      // Track as they enter/exit 40% of the viewport height from the top
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.1, 0.5, 1.0]
    })

    sections.forEach(s => observer?.observe(s))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeTheme }
}
