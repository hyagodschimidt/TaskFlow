import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { useAppRouter } from '@/app/router/user-app-router'
import { authStorage } from '@/core/auth/auth-storage'

import { type LoginFormData, loginSchema } from '../schemas/login-schema'
import { authService } from '../services/auth-service'

export function useLogin() {
  const router = useAppRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: authService.login,

    onSuccess: ({ token }) => {
      authStorage.setToken(token)

      router.replace('home')
    },
  })

  const submit = form.handleSubmit((data) => {
    mutation.mutate(data)
  })

  return {
    form,
    submit,

    isPending: mutation.isPending,
    error: mutation.error,
  }
}
