import { useEffect, useState } from "react";
import { getAllTrainers } from "../api/pokemonTrainer.api";
import { RegisteredTrainersTable } from "../components/RegisteredTrainersTable";

export const RegisteredTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    getAllTrainers().then((fetchedTrainers) => {
      setTrainers(fetchedTrainers);
    });
  }, []);

  return <RegisteredTrainersTable trainers={trainers} />;
};
