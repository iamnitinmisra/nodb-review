import React from 'react'
import Pokemon from './Pokemon'

function Pokedex(props){

    return (
        <div>
            <h2>Pokedex</h2>
            {props.caughtPokemon.map(element => {
                return <Pokemon 
                            key={element.id}
                            pokemon={element}
                            saveName={props.saveName}
                            releasePokemon={props.releasePokemon}
                        />
            })}
        </div>
    )
}

export default Pokedex