import { ref } from 'vue'

const isSweeping = ref(false)
const sweepDirection = ref<'down' | 'up'>('down')

export function useSweepTransition() {
  const sweep = (direction: 'down' | 'up' = 'down'): Promise<void> => {
    return new Promise((resolve) => {
      sweepDirection.value = direction
      isSweeping.value = true

      setTimeout(() => {
        isSweeping.value = false
        resolve()
      }, 600)
    })
  }

  return {
    isSweeping,
    sweepDirection,
    sweep,
  }
}
