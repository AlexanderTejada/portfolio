import { ref } from 'vue'

const isModalAudioActive = ref(false)

export function useAudioState() {
  return {
    isModalAudioActive
  }
}
