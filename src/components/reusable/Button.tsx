import { LoaderPinwheel } from 'lucide-react'
import { Button as ShadcnButton, type ButtonProps } from '../ui/button'
import { cn } from '@/lib/utils'

type Props = ButtonProps & {
  loading?: boolean
}

export default function Button(props: Props) {
  return (
    <ShadcnButton
      {...props}
      disabled={props.loading || props.disabled}
      className={cn('cursor-pointer')}
    >
      {props.loading ? (
        <div className="flex items-center gap-2">
          <LoaderPinwheel className="animate-spin" /> Processing...
        </div>
      ) : (
        props.children
      )}
    </ShadcnButton>
  )
}
