import type { DayPeriod } from '../utils/get-day-period'

type GreetingConfig = {
  message: string
  emojis: string[]
  rightGlow: string
  leftGlow: string
}

export const greetingConfig: Record<DayPeriod, GreetingConfig> = {
  morning: {
    message: 'Bom dia',
    emojis: ['☀️', '🌅', '☕', '✨'],

    rightGlow:
      'bg-[radial-gradient(circle_at_100%_0%,var(--greeting-primary-glow),transparent_48%)]',

    leftGlow:
      'bg-[radial-gradient(circle_at_0%_0%,var(--greeting-morning-glow),transparent_48%)]',
  },

  afternoon: {
    message: 'Boa tarde',
    emojis: ['🌤️', '☀️', '👋', '✨'],

    rightGlow:
      'bg-[radial-gradient(circle_at_100%_40%,var(--greeting-primary-glow),transparent_48%)]',

    leftGlow:
      'bg-[radial-gradient(circle_at_0%_45%,var(--greeting-afternoon-glow),transparent_50%)]',
  },

  night: {
    message: 'Boa noite',
    emojis: ['🌙', '🌃', '⭐', '✨'],

    rightGlow:
      'bg-[radial-gradient(circle_at_100%_100%,var(--greeting-primary-glow),transparent_55%)]',

    leftGlow:
      'bg-[radial-gradient(circle_at_0%_100%,var(--greeting-night-glow),transparent_60%)]',
  },
}
