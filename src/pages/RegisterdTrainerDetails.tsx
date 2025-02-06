import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainer } from "../api/pokemonTrainer.api";
import { Trainer } from "../api/types/trainer.type";
import { Button } from "../components/Button";
import { PokemonTeamPicker } from "../components/PokemonTeamPicker";

export const RegisterdTrainerDetails = () => {
  const [trainer, setTrainer] = useState<null | Trainer>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    getTrainer(Number(params.trainerId))
      .then((trainer) => {
        setTrainer(trainer);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const handleOpenTeamPicker = () => setIsPickerOpen(true);

  const handleCloseTeamPicker = () => setIsPickerOpen(false);

  if (!trainer) return null;

  return (
    <div className="flex flex-col py-8 space-y-2 w-96 mx-auto bg-poke-cream text-poke-dark-blue p-4 ">
      <PokemonTeamPicker
        isOpen={isPickerOpen}
        onClose={handleCloseTeamPicker}
        onSelected={(team) => undefined}
      />
      <h2 className="text-lg">Trainer details</h2>
      <div className="flex flex-col space-y-1 w-auto">
        <span className="text-sm">Trainer Name</span>
        <input
          type="text"
          className="px-2 py-1 border-poke-dark-blue border focus:border-poke-light-blue outline-none"
          value={trainer.name}
        />
      </div>
      <div className="flex flex-col space-y-1 w-auto">
        <span className="text-sm">Trainer Email</span>
        <input
          type="text"
          className="px-2 py-1 border-poke-dark-blue border focus:border-poke-light-blue outline-none"
          value={trainer.email}
        />
      </div>
      <div className="flex flex-col space-y-1 w-auto">
        <span className="text-sm">Trainer Phone Number</span>
        <input
          type="text"
          className="px-2 py-1 border-poke-dark-blue border focus:border-poke-light-blue outline-none"
          value={trainer.phoneNumber}
        />
      </div>

      <Button onClick={handleOpenTeamPicker} title="Edit team" />
      <div className="grid grid-cols-3 gap-2 items-center justify-center">
        {trainer.pokemonTeam.map((pokeTeamMember) => (
          <div className="bg-red-200" key={pokeTeamMember.id}>
            <img
              title={pokeTeamMember.name}
              className="hover:animate-bounce p-1"
              src={pokeTeamMember.imagePath}
              alt={pokeTeamMember.name}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={() => undefined} title="Save" />
      </div>
    </div>
  );
};
