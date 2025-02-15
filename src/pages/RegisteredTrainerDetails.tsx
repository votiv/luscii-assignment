import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import classNames from "classnames"

import { type PokemonTeam } from "../api/types/trainer.type"
import { Button } from "../components/Button"
import { PokemonTeamPicker } from "../components/PokemonTeamPicker"
import { useTrainer } from "../api/useTrainer"
import { type TrainerFormData, trainerSchema } from "../trainerSchema"
import { PokemonCard } from "../components/PokemonCard"
import { PokemonCardShimmer } from "../components/PokemonCardShimmer"
import { Spinner } from "../components/Spinner"

export const RegisteredTrainerDetails = () => {
  const navigate = useNavigate()
  const { trainerId } = useParams()
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const { trainer, upsertTrainer, isTrainerLoading } = useTrainer(Number(trainerId))
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonTeam>([])
  const isRegistrationPage = useMemo(() => !Number.isInteger(Number(trainerId)), [trainerId])
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm<TrainerFormData>({
    resolver: zodResolver(trainerSchema),
    mode: "all",
    values: {
      name: trainer?.name ?? "",
      email: trainer?.email ?? "",
      phoneNumber: trainer?.phoneNumber ?? "",
    },
  })
  const shouldSubmit = useMemo(
    () =>
      isRegistrationPage
        ? isValid && isDirty && !!selectedPokemon.length
        : (isValid && isDirty) || !!selectedPokemon.length,
    [isValid, isDirty, selectedPokemon],
  )

  const togglePicker = () => setIsPickerOpen((prevState) => !prevState)

  const saveTrainer = async (formData: TrainerFormData) => {
    await upsertTrainer({
      id: trainerId ? Number(trainerId) : undefined,
      ...formData,
      pokemonTeam: selectedPokemon.length ? selectedPokemon : trainer?.pokemonTeam!,
    })
    navigate("/")
  }

  const handlePokemonSelection = (team: PokemonTeam) => {
    setSelectedPokemon(team)
  }

  return (
    <div className="py-8 w-96 mx-auto bg-poke-cream text-poke-dark-blue p-4">
      <PokemonTeamPicker isOpen={isPickerOpen} onClose={togglePicker} onSelected={handlePokemonSelection} />

      {isTrainerLoading ? (
        <Spinner />
      ) : (
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit(saveTrainer)}>
          <h2 className="text-lg">Trainer details</h2>
          <div className="flex flex-col space-y-1 w-auto">
            <span className="text-sm">Trainer Name</span>
            <input
              type="text"
              className="px-2 py-1 border-poke-dark-blue border focus:border-poke-light-blue outline-none"
              {...register("name")}
            />
            {errors.name?.message && <span className="text-sm text-poke-red">{errors.name.message}</span>}
          </div>
          <div className="flex flex-col space-y-1 w-auto">
            <span className="text-sm">Trainer Email</span>
            <input
              type="text"
              className="px-2 py-1 border-poke-dark-blue border focus:border-poke-light-blue outline-none"
              {...register("email")}
            />
            {errors.email?.message && <span className="text-sm text-poke-red">{errors.email.message}</span>}
          </div>
          <div className="flex flex-col space-y-1 w-auto">
            <span className="text-sm">Trainer Phone Number</span>
            <input
              type="text"
              className="px-2 py-1 border-poke-dark-blue border focus:border-poke-light-blue outline-none"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber?.message && <span className="text-sm text-poke-red">{errors.phoneNumber.message}</span>}
          </div>

          <Button onClick={togglePicker} type="button">
            Edit team
          </Button>
          <div className="grid grid-cols-3 gap-2 items-center justify-center">
            {isRegistrationPage &&
              (selectedPokemon.length === 0
                ? Array.from({ length: 6 }).map((_, i) => <PokemonCardShimmer key={i} />)
                : selectedPokemon.map((pokeTeamMember) => (
                    <PokemonCard key={pokeTeamMember.id} pokemon={pokeTeamMember} />
                  )))}

            {!isRegistrationPage &&
              (selectedPokemon.length > 0
                ? selectedPokemon.map((pokeTeamMember) => (
                    <PokemonCard key={pokeTeamMember.id} pokemon={pokeTeamMember} />
                  ))
                : trainer?.pokemonTeam.map((pokeTeamMember) => (
                    <PokemonCard key={pokeTeamMember.id} pokemon={pokeTeamMember} />
                  )))}
          </div>

          <div className="flex justify-end">
            <button
              className={classNames(
                "text-white font-bold py-2 px-4 transition-colors",
                !shouldSubmit ? "bg-poke-light-grey" : "bg-poke-red hover:bg-red-400",
              )}
              type="submit"
              disabled={!shouldSubmit}
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

RegisteredTrainerDetails.displayName = "RegisteredTrainerDetails"
