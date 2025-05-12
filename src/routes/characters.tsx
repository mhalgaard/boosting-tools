import { createFileRoute } from '@tanstack/react-router'
import Characters from '../components/pages/Characters'

export const Route = createFileRoute('/characters')({
  component: Characters,
})
