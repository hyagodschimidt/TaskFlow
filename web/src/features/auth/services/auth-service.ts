import { httpClient } from '@/core/api/http-client'

import type { AuthResponse, LoginRequest } from '../types/auth'

export const authService = {
  async login(data: LoginRequest) {
    const response = await httpClient.post<AuthResponse>(
      '/api/auth/login',
      data,
    )

    return response.data
  },
}
