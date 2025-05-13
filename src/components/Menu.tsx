import { Link } from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'

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
    <NavigationMenu className="p-2 border-b-1">
      <NavigationMenuList className="w-screen">
        {MenuItems.map((item) => (
          <Link key={item.to} to={item.to} className="[&.active]:font-bold">
            <NavigationMenuLink>{item.label}</NavigationMenuLink>
          </Link>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
