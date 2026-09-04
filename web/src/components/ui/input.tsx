import { Input as InputPrimitive } from '@base-ui/react/input'
import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'border-border bg-surface text-foreground',
        'placeholder:text-muted-foreground',
        'hover:bg-layer',
        'focus-visible:border-primary/50 focus-visible:ring-primary/20',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'disabled:bg-layer/50',
        'h-8 w-full min-w-0 rounded-lg border px-2.5 py-1',
        'text-base transition-[background-color,border-color,box-shadow,color]',
        'outline-none',
        'focus-visible:ring-2',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-2',
        'file:text-foreground file:inline-flex file:h-6 file:border-0',
        'file:bg-transparent file:text-sm file:font-medium',
        'md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
