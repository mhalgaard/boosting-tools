import type { PropsWithChildren } from 'react'
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
}

export default function Dialog({
  title,
  description,
  trigger,
  children,
}: Props & PropsWithChildren) {
  return (
    <ShadcnDialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </ShadcnDialog>
  )
}
