import { ref } from 'vue'

const locked = ref(false)

const lock = () => {
  locked.value = true
}

const unlock = () => {
  locked.value = false
}

export function useScrollLock() {
  return { locked, lock, unlock }
}
