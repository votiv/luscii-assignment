import { useEffect, useState } from "react"
import Modal from "react-modal"
import classNames from "classnames"

import { type PokemonTeamMember } from "../api/types/pokemonTeamMember.type"
import { type PokemonTeam } from "../api/types/trainer.type"
import { usePokemon } from "../api/usePokemon"
import { Button } from "./Button"
import { Spinner } from "./Spinner"
import { useTrainer } from "../api/useTrainer"

type PokemonTeamPickerProps = {
  isOpen: boolean
  onSelected: (team: PokemonTeam) => void
  onClose: () => void
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 0,
  },
}

export const PokemonTeamPicker = ({ isOpen, onSelected, onClose }: PokemonTeamPickerProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen)
  const [pokeTeam, togglePokeTeam] = useState<PokemonTeam>([])
  const { trainers } = useTrainer()
  const { pokemonPool, isPokemonPoolLoading } = usePokemon(trainers)

  useEffect(() => {
    setModalIsOpen(isOpen)
  }, [isOpen])

  const closeModal = () => {
    setModalIsOpen(false)
    onClose()
  }

  const togglePokemonSelection = (newSelection: PokemonTeamMember) => () => {
    const selectedPokemon = pokeTeam.find((s) => s.id === newSelection.id)
    if (selectedPokemon) {
      togglePokeTeam((prevState) => prevState.filter((ps) => ps.id !== selectedPokemon.id))
    } else if (pokeTeam.length < 6) {
      togglePokeTeam((prevState) => [...prevState, newSelection])
    }
  }

  const saveTeamSelection = () => {
    onSelected(pokeTeam)
    closeModal()
    togglePokeTeam([])
  }

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg">Pick your team</h2>
        <Button onClick={closeModal}>x</Button>
      </div>
      <div className="my-2">
        <div className="grid grid-cols-5 gap-2 items-center justify-center">
          {isPokemonPoolLoading && (
            <div>
              <Spinner />
            </div>
          )}

          {pokemonPool &&
            pokemonPool.map((pokemon) => (
              <div
                className={classNames("bg-red-200 relative", {
                  "before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:border-2 before:border-poke-red":
                    pokeTeam.find((p) => p.id === pokemon.id),
                })}
                onClick={togglePokemonSelection(pokemon)}
                key={pokemon.id}
              >
                <img
                  title={pokemon.name}
                  className="hover:animate-bounce p-1"
                  src={pokemon.imagePath}
                  alt={pokemon.name}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-row w-full justify-end">
        <Button onClick={saveTeamSelection}>Select</Button>
      </div>
    </Modal>
  )
}

PokemonTeamPicker.displayName = "PokemonTeamPicker"
