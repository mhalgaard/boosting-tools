import Button from '@/components/reusable/Button'
import Select, { type SelectOption } from '@/components/reusable/Select'
import { classValues, type Class, type Role } from '@/types/character'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useCharacter, useUpdateCharacter } from '@/hooks/useCharacter'
import { capitalize } from 'lodash'

const characterSchema = z.object({
  class: z.string().min(1, 'Class is required'),
  key: z.string().min(1, 'Key is required'),
  ilvl: z.number().min(1, 'iLvl is required'),
  role: z.array(z.enum(['tank', 'healer', 'dps'])).nonempty('Role is required'),
})

type CharacterFormValues = z.infer<typeof characterSchema>

const roleOptions: SelectOption<Role>[] = [
  { label: 'Tank', value: 'tank' },
  { label: 'DPS', value: 'dps' },
  { label: 'Healer', value: 'healer' },
]

const classOptions: SelectOption<Class>[] = classValues
  .map((className) => ({
    label: capitalize(className),
    value: className,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

type Props = {
  characterId: string
}

export default function EditCharacterForm({ characterId }: Props) {
  const { data: character } = useCharacter(characterId)
  const { mutate: updateCharacter, isPending } = useUpdateCharacter()

  console.log(character)

  const form = useForm<CharacterFormValues>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      class: character?.class,
      key: character?.key,
      ilvl: character?.ilvl,
      role: character?.role,
    },
  })

  useEffect(() => {
    if (character) {
      form.reset({
        class: character.class,
        key: character.key,
        ilvl: character.ilvl,
        role: character.role,
      })
    }
  }, [character, form])

  const onSubmit = (data: CharacterFormValues) => {
    if (!character) return
    updateCharacter({
      id: characterId,
      playerId: character?.playerId,
      class: data.class as Class,
      key: data.key,
      ilvl: data.ilvl,
      role: data.role,
    })
  }

  console.log('form', form.getValues())
  console.log('state', form.formState.errors)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name="class"
        render={({ field }) => (
          <Select
            {...field}
            label="Class"
            options={classOptions}
            placeholder="Select a class"
            onChange={(selected) => {
              field.onChange(selected?.value)
            }}
            value={classOptions.find((x) => x.value == field.value)}
          />
        )}
      />
      <Controller
        control={form.control}
        name="role"
        render={({ field }) => {
          const selectedOptions = roleOptions.filter((option) =>
            field.value?.includes(option.value),
          )

          return (
            <Select
              {...field}
              label="Roles"
              options={roleOptions}
              isMulti
              value={selectedOptions}
              onChange={(selected) => {
                const roles = (selected ?? []).map((option) => option.value)
                field.onChange(roles)
              }}
            />
          )
        }}
      />
      <Button type="submit" loading={isPending}>
        Save
      </Button>
    </form>
  )
}
