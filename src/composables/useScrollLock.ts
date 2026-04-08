import { ref } from 'vue'

const locked = ref(false)

export function useScrollLock() {
  return { locked }
}
