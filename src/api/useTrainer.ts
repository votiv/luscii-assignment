import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Trainer } from "./types/trainer.type"
import { deleteTrainer, getAllTrainers, getTrainer, postTrainer, putTrainer } from "./pokemonTrainer.api"

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
    data: upsertedTrainer,
    mutateAsync: upsertTrainer,
    error: upsertionError,
  } = useMutation({
    mutationKey: ["trainer"],
    mutationFn: (trainer: Trainer | Omit<Trainer, "id">) =>
      "id" in trainer && trainer.id ? putTrainer(trainer) : postTrainer(trainer),
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
    upsertedTrainer,
    isTrainerLoading,
    areTrainersLoading,
    upsertTrainer,
    trainerError,
    upsertionError,
    removeTrainer,
    removeTrainerError,
    trainersError,
  }
}
