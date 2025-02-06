import { useNavigate } from "react-router-dom";
import { Trainer } from "../api/types/trainer.type";

type RegisteredTrainersTableProps = {
  trainers: Trainer[];
};

export const RegisteredTrainersTable: React.FC<
  RegisteredTrainersTableProps
> = ({ trainers }) => {
  const navigate = useNavigate();

  const navigateToTrainerPage = (trainerId: Trainer["id"]) => {
    navigate(`/trainers/details/${trainerId}`);
  };

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
        </tr>
      </thead>
      <tbody>
        {trainers.map((trainer) => (
          <tr
            className="hover:bg-red-100 cursor-pointer transition-colors"
            onClick={() => navigateToTrainerPage(trainer.id)}
          >
            <td className="py-3 px-6">{trainer.id}</td>
            <td className="py-3 px-6">{trainer.name}</td>
            <td className="py-3 px-6">{trainer.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
