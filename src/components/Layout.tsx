import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Menu from './Menu'

export default function Layout() {
  return (
    <>
      <Menu />
      <div className="p-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  )
}
