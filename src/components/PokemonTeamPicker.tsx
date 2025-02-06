import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getAFewPokemon } from "../api/pokemonTrainer.api";
import { PokemonTeamMember } from "../api/types/pokemonTeamMember.type";

import { PokemonTeam } from "../api/types/trainer.type";
import { Button } from "./Button";

type PokemonTeamPickerProps = {
  isOpen: boolean;
  onSelected: (team: PokemonTeam) => void;
  onClose: () => void;
};

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
};

export const PokemonTeamPicker: React.FC<PokemonTeamPickerProps> = (props) => {
  const { isOpen, onSelected, onClose } = props;
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [fetchedPokemon, setFetchedPokemon] = useState<PokemonTeamMember[]>([]);

  useEffect(() => {
    getAFewPokemon().then((pokemon) => {
      const transformedResult = pokemon.map((entry) => {
        return {
          name: entry.name.toUpperCase(),
          id: entry.id,
          imagePath: entry.sprites.front_default,
        };
      });

      setFetchedPokemon(transformedResult);
    });
  }, []);

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    onClose();
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg">Pick your team</h2>
        <Button title="x" onClick={closeModal} />
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-5 gap-2 items-center justify-center">
          {fetchedPokemon.map((pokemon) => (
            <div className="bg-red-200" key={pokemon.id}>
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
    </Modal>
  );
};
