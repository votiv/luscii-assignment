type PokemonCardShimmerProps = {
  key: string | number
}

export const PokemonCardShimmer = () => (
  <div className="relative w-28 h-26 overflow-hidden bg-gradient-to-r from-red-100 to-red-200 animate-shimmer">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-shimmer"></div>
  </div>
)

PokemonCardShimmer.displayName = "PokemonCardShimmer"
