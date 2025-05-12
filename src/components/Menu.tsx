import { Link } from '@tanstack/react-router'

export default function Menu() {
  return (
    <div className="p-2 flex gap-2 border-b-black border-b-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/characters" className="[&.active]:font-bold">
        Characters
      </Link>
    </div>
  )
}
