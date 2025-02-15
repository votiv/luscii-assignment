import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Trainer } from "./types/trainer.type"
import { deleteTrainer, getAllTrainers, getTrainer, postTrainer } from "./pokemonTrainer.api"

export const useTrainer = (trainerId?: number) => {
  const queryClient = useQueryClient()
  const {
    data: trainer,
    isLoading: isTrainerLoading,
    error: trainerError,
  } = useQuery<number, Error, Trainer>({
    queryKey: ["trainer", trainerId],
    queryFn: () => getTrainer(trainerId!),
    enabled: !!trainerId,
  })

  const {
    data: trainers,
    isLoading: areTrainersLoading,
    error: trainersError,
  } = useQuery({
    queryKey: ["trainer"],
    queryFn: getAllTrainers,
  })

  const {
    data: registeredTrainer,
    mutateAsync: registerTrainer,
    error: registrationError,
  } = useMutation({
    mutationKey: ["trainer"],
    mutationFn: postTrainer,
  })

  const { mutateAsync: removeTrainer, error: removeTrainerError } = useMutation({
    mutationKey: ["trainer"],
    mutationFn: deleteTrainer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["trainer"] })
    },
  })

  return {
    trainer,
    trainers,
    registeredTrainer,
    isTrainerLoading,
    areTrainersLoading,
    registerTrainer,
    trainerError,
    registrationError,
    removeTrainer,
    removeTrainerError,
    trainersError,
  }
}
