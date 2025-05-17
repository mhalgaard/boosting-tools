import Button from '@/components/reusable/Button'
import Dialog from '@/components/reusable/Dialog'
import Select, { type SelectOption } from '@/components/reusable/Select'
import { useCharacter } from '@/hooks/useCharacters'
import type { Role } from '@/types/character'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

const characterSchema = z.object({
  class: z.string().min(1, 'Class is required'),
  key: z.string().min(1, 'Key is required'),
  ilvl: z.number().min(1, 'iLvl is required'),
  role: z.array(z.enum(['tank', 'healer', 'dps']), {
    errorMap: () => ({ message: 'Role is required' }),
  }),
})

type CharacterForm = z.infer<typeof characterSchema>

const roleOptions: SelectOption<Role>[] = [
  { label: 'Tank', value: 'tank' },
  { label: 'DPS', value: 'dps' },
  { label: 'Healer', value: 'healer' },
]

type Props = {
  characterId: string
}

export default function EditCharacter({ characterId }: Props) {
  const { data: character } = useCharacter(characterId)

  const form = useForm()

  return (
    <Dialog title="Edit Characters" trigger={<p>Click me</p>}>
      <Select label="Role" options={roleOptions} isMulti />
      <Button type="submit">Save</Button>
    </Dialog>
  )
}
