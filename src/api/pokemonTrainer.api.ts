import { Trainer } from "./types/trainer.type"

const rootApi = "http://localhost:3000/trainers"

export const getAllTrainers = () => fetch(rootApi).then((response) => response.json())

export const getTrainer = (id: number) => fetch(`${rootApi}/${id}`).then((response) => response.json())

const getPokemon = (id: number) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => response.json())

export const getAFewPokemon = (ids: number[]) => Promise.all(ids.map(getPokemon))

export const postTrainer = (trainer: Omit<Trainer, "id">) =>
  fetch(rootApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trainer),
  })

export const putTrainer = (trainer: Trainer) =>
  fetch(`${rootApi}/${trainer.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trainer),
  })

export const deleteTrainer = (trainerId: number) =>
  fetch(`${rootApi}/${trainerId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
