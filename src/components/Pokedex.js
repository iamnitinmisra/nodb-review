import React from 'react'
import Pokemon from './Pokemon'
import '../App.css'

function Pokedex(props) {
  const pokemonList = props.caughtPokemon.map(pokemon => {
    return (
      <Pokemon
        key={pokemon.id}
        pokemon={pokemon}
        saveName={props.saveName}
        releasePokemon={props.releasePokemon}
      />
    )
  })

  return (
    <div className="pokedex">
      <h2>POKEDEX</h2>
      <div>{pokemonList}</div>
    </div>
  )
}

export default Pokedex
