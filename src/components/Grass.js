import React, { Component } from 'react'

class Grass extends Component {
  constructor() {
    super()
    this.state = {
      grassClicked: false,
    }
    this.handleCatchPokemon = this.handleCatchPokemon.bind(this)
  }

  checkGrass() {}

  handleCatchPokemon() {
    const newPokemon = {
      name: this.props.pokemon.name,
      image: this.props.pokemon.sprites.front_default,
    }

    this.props.catchPokemon(newPokemon)
    this.props.refreshFn()
  }

  render() {
    return (
      <div>
        <p onClick={this.handleCatchPokemon}>{this.props.pokemon.name}</p>
        <img
          onClick={this.handleCatchPokemon}
          alt={this.props.pokemon.name}
          src={this.props.pokemon.sprites.front_default}
        />
      </div>
    )
  }
}

export default Grass
