import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/apply')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="text-9xl">You were rejected :(</div>
    </div>
  )
}
