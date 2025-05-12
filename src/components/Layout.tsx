import { Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export default function Layout() {
  return (
    <>
      <div className="p-2 flex gap-2 border-b-black border-b-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/characters" className="[&.active]:font-bold">
          Characters
        </Link>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  )
}
