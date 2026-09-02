const TOKEN_KEY = 'taskflow.token'

export const authStorage = {
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token)
  },

  clear() {
    sessionStorage.removeItem(TOKEN_KEY)
  },
}
