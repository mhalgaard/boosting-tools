import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Menu from './Menu'
import { SidebarProvider } from './ui/sidebar'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex">
      <SidebarProvider>
        <Sidebar />
        <main className="flex flex-col grow max-w-screen">
          <header className="w-full border-b-1">
            <Menu />
          </header>
          <div className="p-4">
            <Outlet />
          </div>
        </main>
        <TanStackRouterDevtools />
      </SidebarProvider>
    </div>
  )
}
