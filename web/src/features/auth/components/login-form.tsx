import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useLogin } from '../hooks/use-login'

export function LoginForm() {
  const { form, submit, isPending, error } = useLogin()

  return (
    <form onSubmit={submit}>
      <Input type="email" placeholder="E-mail" {...form.register('email')} />

      {form.formState.errors.email && (
        <span>{form.formState.errors.email.message}</span>
      )}

      <Input
        type="password"
        placeholder="Senha"
        {...form.register('password')}
      />

      {form.formState.errors.password && (
        <span>{form.formState.errors.password.message}</span>
      )}

      {error && <span>Não foi possível entrar.</span>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
