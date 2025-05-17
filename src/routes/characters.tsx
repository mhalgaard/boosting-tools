import { createFileRoute } from '@tanstack/react-router'
import Characters from '../components/pages/characters/Characters'

export const Route = createFileRoute('/characters')({
  component: Characters,
})
