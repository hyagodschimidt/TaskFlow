import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function CreateCompanyForm() {
  return (
    <form>
      <label>email</label>
      <Input />

      <label>senha</label>
      <Input type="password" />

      <label>Nome da empresa</label>
      <Input />

      <Button>Criar empresa</Button>
    </form>
  )
}
