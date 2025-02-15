import classNames from "classnames"
import { PropsWithChildren } from "react"

type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  type?: "button" | "submit"
}

export const Button = ({ onClick, disabled, type = "button", children }: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={classNames(
        "text-white font-bold py-2 px-4 transition-colors",
        disabled ? "bg-poke-light-grey" : "bg-poke-red hover:bg-red-400",
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
