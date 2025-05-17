import { useState, type PropsWithChildren } from 'react'
import {
  Dialog as ShadcnDialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'

type Props = {
  title: string
  description?: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function Dialog({
  title,
  description,
  trigger,
  open,
  onOpenChange,
  children,
}: Props & PropsWithChildren) {
  const [dialogOpen, setDialogOpen] = useState(open)
  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (onOpenChange) {
      onOpenChange(open)
    }
  }
  return (
    <ShadcnDialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {dialogOpen && children}
      </DialogContent>
    </ShadcnDialog>
  )
}
