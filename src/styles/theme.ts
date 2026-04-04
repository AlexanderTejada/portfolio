export const theme = {
  colors: {
    // Tech Noir Palette
    background: {
      primary: '#0a0a0f',
      secondary: '#121218',
      tertiary: '#1a1a24',
    },
    neon: {
      blue: '#00d4ff',
      purple: '#b820ff',
      magenta: '#ff0080',
      cyan: '#00fff5',
    },
    text: {
      primary: '#e0e0e8',
      secondary: '#a0a0b0',
      muted: '#6b6b78',
    },
    accent: {
      glow: 'rgba(0, 212, 255, 0.3)',
      glowPurple: 'rgba(184, 32, 255, 0.3)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '8rem',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'Fira Code', 'Consolas', monospace",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
  },
  animation: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.6s',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
} as const

export type Theme = typeof theme
