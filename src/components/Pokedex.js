import React from 'react'
import Pokemon from './Pokemon'

function Pokedex(props) {
  const pokemonList = props.caughtPokemon.map(pokemon => {
    return (
      <Pokemon
        pokemon={pokemon}
        saveName={props.saveName}
        releasePokemon={props.releasePokemon}
      />
    )
  })

  return (
    <div>
      Pokedex.js
      {pokemonList}
    </div>
  )
}

export default Pokedex
