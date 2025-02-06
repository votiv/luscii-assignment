const rootApi = "http://localhost:3000/trainers";

export const getAllTrainers = () =>
  fetch(rootApi).then((response) => response.json());

export const getTrainer = (id: number) =>
  fetch(`${rootApi}/${id}`).then((response) => response.json());

const getPokemon = (id: number) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
    response.json()
  );

export const getAFewPokemon = () => {
  const amount = Array.from({ length: 30 }, (_, i) => i + 1);

  return Promise.all(amount.map(getPokemon));
};
