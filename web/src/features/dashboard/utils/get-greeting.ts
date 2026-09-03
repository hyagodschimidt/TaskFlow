import { greetingConfig } from '../config/greeting-config'
import { getDayPeriod } from './get-day-period'

export function getGreeting(date = new Date()) {
  const period = getDayPeriod(date)
  const config = greetingConfig[period]

  const emoji = config.emojis[Math.floor(Math.random() * config.emojis.length)]

  return {
    period,
    message: `${config.message} ${emoji}`,
    rightGlow: config.rightGlow,
    leftGlow: config.leftGlow,
  }
}
