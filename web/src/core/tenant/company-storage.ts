const COMPANY_CODE_KEY = 'taskflow.companyCode'

export const companyStorage = {
  get() {
    return localStorage.getItem(COMPANY_CODE_KEY)
  },

  set(companyCode: string) {
    localStorage.setItem(COMPANY_CODE_KEY, companyCode)
  },

  clear() {
    localStorage.removeItem(COMPANY_CODE_KEY)
  },
}
