import { ref, onMounted } from 'vue'

export function useTypingEffect(text: string, speed: number = 50) {
  const displayedText = ref('')
  const isComplete = ref(false)
  const showCursor = ref(true)

  let currentIndex = 0
  let typingInterval: number
  let cursorInterval: number

  const startTyping = () => {
    typingInterval = window.setInterval(() => {
      if (currentIndex < text.length) {
        displayedText.value += text[currentIndex]
        currentIndex++
      } else {
        clearInterval(typingInterval)
        isComplete.value = true
      }
    }, speed)

    // Blinking cursor
    cursorInterval = window.setInterval(() => {
      showCursor.value = !showCursor.value
    }, 530)
  }

  onMounted(() => {
    startTyping()
  })

  return {
    displayedText,
    isComplete,
    showCursor,
  }
}
