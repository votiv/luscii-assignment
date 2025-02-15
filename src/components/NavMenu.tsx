import classNames from "classnames"
import { Link, useLocation } from "react-router-dom"

export const NavMenu = () => {
  const location = useLocation()

  return (
    <nav className="bg-poke-red text-poke-cream flex flex-row items-center px-2 py-2 w-full">
      <img src={"/pokemon-icon.svg"} className="h-8 mr-4" alt="Pokeball" />
      <h1>Pokémon League Registration</h1>
      <div className="flex flex-row space-x-2 ml-auto">
        <Link
          className={classNames("px-3 py-2 transition-colors", {
            "hover:bg-poke-cream hover:text-poke-dark-blue": location.pathname !== "/trainers",
            "bg-poke-cream text-poke-dark-blue": location.pathname === "/trainers",
          })}
          to="trainers"
        >
          Registered trainers
        </Link>
        <Link
          className={classNames("px-3 py-2 transition-colors", {
            "hover:bg-poke-cream hover:text-poke-dark-blue": location.pathname !== "/trainers/register",
            "bg-poke-cream text-poke-dark-blue": location.pathname === "/trainers/register",
          })}
          to="trainers/register"
        >
          Register trainer
        </Link>
      </div>
    </nav>
  )
}
