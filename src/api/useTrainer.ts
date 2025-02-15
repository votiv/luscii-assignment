import { useMutation, useQuery } from "@tanstack/react-query"

import { Trainer } from "./types/trainer.type"
import { getTrainer, postTrainer } from "./pokemonTrainer.api"

export const useTrainer = (trainerId: number) => {
  const {
    data: trainer,
    isLoading: isTrainerLoading,
    error: trainerError,
  } = useQuery<number, Error, Trainer>({
    queryKey: ["trainer", trainerId],
    queryFn: () => getTrainer(trainerId),
    enabled: !!trainerId,
  })

  const {
    data: registeredTrainer,
    mutateAsync: registerTrainer,
    error: registrationError,
  } = useMutation({
    mutationKey: ["trainer"],
    mutationFn: postTrainer,
  })

  return {
    trainer,
    registeredTrainer,
    isTrainerLoading,
    registerTrainer,
    trainerError,
    registrationError,
  }
}
