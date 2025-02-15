import { type SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"

import { Trainer } from "../api/types/trainer.type"
import DeleteIcon from "../assets/delete.svg?react"
import { useTrainer } from "../api/useTrainer"

type RegisteredTrainersTableProps = {
  trainers: Trainer[]
}

export const RegisteredTrainersTable = ({ trainers }: RegisteredTrainersTableProps) => {
  const navigate = useNavigate()
  const { removeTrainer } = useTrainer()

  const navigateToTrainerPage = (trainerId: Trainer["id"]) => {
    navigate(`/trainers/details/${trainerId}`)
  }

  const handleTrainerDelete = (trainerId: number) => async (event: SyntheticEvent) => {
    event.stopPropagation()
    await removeTrainer(trainerId)
  }

  return (
    <table className="table-fixed w-full bg-poke-cream">
      <thead className="bg-poke-red uppercase">
        <tr>
          <th className="py-3 px-6" align="left">
            Id
          </th>
          <th className="py-3 px-6" align="left">
            Name
          </th>
          <th className="py-3 px-6" align="left">
            Email
          </th>
          <th className="py-3 px-6" align="right"></th>
        </tr>
      </thead>
      <tbody>
        {trainers.map((trainer) => (
          <tr
            key={trainer.id}
            className="hover:bg-red-100 cursor-pointer transition-colors"
            onClick={() => navigateToTrainerPage(trainer.id)}
          >
            <td className="py-3 px-6">{trainer.id}</td>
            <td className="py-3 px-6">{trainer.name}</td>
            <td className="py-3 px-6">{trainer.email}</td>
            <td className="py-3 px-6" align="right" onClick={handleTrainerDelete(trainer.id)}>
              <DeleteIcon />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
