import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Menu from './Menu'

export default function Layout() {
  return (
    <div className="h-screen">
      <Menu />
      <div className="p-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  )
}
