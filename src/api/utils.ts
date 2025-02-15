export const getPokemonIds = (ids: number[]) => {
  const existingIds = new Set(ids)
  const newIds: number[] = []
  let counter = 1

  while (newIds.length < 30) {
    if (!existingIds.has(counter)) {
      newIds.push(counter)
    }
    counter++
  }

  return newIds
}
