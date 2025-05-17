import { Link } from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'
import { SidebarTrigger } from './ui/sidebar'

type MenuItem = {
  to: string
  label: string
}

const MenuItems: MenuItem[] = [
  { to: '/', label: 'Home' },
  { to: '/characters', label: 'Characters' },
  { to: '/apply', label: 'Apply as booster' },
]

export default function Menu() {
  return (
    <NavigationMenu className="p-2">
      <NavigationMenuList className="w-full">
        <SidebarTrigger />
        {MenuItems.map((item) => (
          <div>
            <Link key={item.to} to={item.to} className="[&.active]:font-bold">
              <NavigationMenuLink asChild>
                <div>{item.label}</div>
              </NavigationMenuLink>
            </Link>
          </div>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
