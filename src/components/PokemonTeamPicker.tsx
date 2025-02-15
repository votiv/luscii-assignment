import { useEffect, useState } from "react"
import Modal from "react-modal"
import classNames from "classnames"

import { getAFewPokemon } from "../api/pokemonTrainer.api"
import { type PokemonTeamMember } from "../api/types/pokemonTeamMember.type"
import { type PokemonTeam } from "../api/types/trainer.type"
import { Button } from "./Button"

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
  const [fetchedPokemon, setFetchedPokemon] = useState<PokemonTeam>([])
  const [pokeTeam, togglePokeTeam] = useState<PokemonTeam>([])

  useEffect(() => {
    getAFewPokemon().then((pokemon) => {
      const transformedResult = pokemon.map((entry) => {
        return {
          name: entry.name.toUpperCase(),
          id: entry.id,
          imagePath: entry.sprites.front_default,
        }
      })

      setFetchedPokemon(transformedResult)
    })
  }, [])

  useEffect(() => {
    setModalIsOpen(isOpen)
  }, [isOpen])

  function closeModal() {
    setModalIsOpen(false)
    onClose()
  }

  const togglePokemonSelection = (selectedPokemon: PokemonTeamMember) => () => {
    togglePokeTeam((prevPokemon) =>
      prevPokemon.find((p) => p.id === selectedPokemon.id)
        ? prevPokemon.filter((p) => p.id !== selectedPokemon.id)
        : [...prevPokemon, selectedPokemon],
    )
  }

  const saveTeamSelection = () => {
    onSelected(pokeTeam)
    closeModal()
  }

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg">Pick your team</h2>
        <Button onClick={closeModal}>x</Button>
      </div>
      <div className="my-2">
        <div className="grid grid-cols-5 gap-2 items-center justify-center">
          {fetchedPokemon.map((pokemon) => (
            <div
              className={classNames("bg-red-200", {
                "border-2 border-poke-red": pokeTeam.find((p) => p.id === pokemon.id),
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
        <Button onClick={saveTeamSelection}>Save</Button>
      </div>
    </Modal>
  )
}
