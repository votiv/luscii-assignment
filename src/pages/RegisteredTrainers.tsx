import { RegisteredTrainersTable } from "../components/RegisteredTrainersTable"
import { useTrainer } from "../api/useTrainer"
import { Spinner } from "../components/Spinner"

export const RegisteredTrainers = () => {
  const { trainers, areTrainersLoading } = useTrainer()

  return areTrainersLoading ? <Spinner /> : <RegisteredTrainersTable trainers={trainers} />
}
