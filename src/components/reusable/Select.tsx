import Select, {
  type GroupBase,
  type Props as ReactSelectProps,
} from 'react-select'
import { Label } from '../ui/label'
import { cx } from 'class-variance-authority'

export type SelectOption<T> = {
  label: string
  value: T
}

type SelectProps<T, isMulti extends boolean = false> = ReactSelectProps<
  SelectOption<T>,
  isMulti,
  GroupBase<SelectOption<T>>
> & {
  label?: string
  className?: string
}

export default function ReactSelect<T, isMulti extends boolean = false>(
  props: SelectProps<T, isMulti>,
) {
  const { label, className, ...selectProps } = props

  return (
    <div className={cx(className)}>
      {label && <Label>{label}</Label>}
      <Select {...selectProps} />
    </div>
  )
}
