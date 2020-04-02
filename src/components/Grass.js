import React, { Component } from 'react'

class Grass extends Component {
  constructor() {
    super()
    this.state = {
      grassClicked: false,
    }
  }

  checkGrass() {}

  render() {
    return (
      <div>
        {this.props.pokemon.name}
        <img
          alt={this.props.pokemon.name}
          src={this.props.pokemon.sprites.front_default}
        />
      </div>
    )
  }
}

export default Grass
