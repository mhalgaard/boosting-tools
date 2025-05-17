import { Edit } from 'lucide-react'
import EditCharacterForm from './EditCharacterForm'
import Dialog from '@/components/reusable/Dialog'

type Props = {
  characterId: string
}

export default function EditCharacterDialog({ characterId }: Props) {
  return (
    <Dialog
      title="Edit Characters"
      trigger={<Edit className="cursor-pointer" size={16} />}
    >
      <EditCharacterForm characterId={characterId} />
    </Dialog>
  )
}
