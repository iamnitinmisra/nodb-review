import React, { Component } from 'react'
import Grass from './Grass'

class Finder extends Component {
  constructor() {
    super()
    this.state = {
      wildPokemon: [],
    }
  }

  componentDidMount() {}

  render() {
    const wildPokemon = this.state.wildPokemon.map(pokemon => {
      return <Grass pokemon={pokemon} catchPokemon={this.props.catchPokemon} />
    })

    return (
      <div>
        Finder.js
        {wildPokemon}
      </div>
    )
  }
}

export default Finder
