import React, { Component } from 'react'
import Grass from './Grass'
import axios from 'axios'
import '../App.css'

class Finder extends Component {
  constructor() {
    super()
    this.state = {
      wildPokemon: [],
    }
  }

  componentDidMount() {
    axios.get('/api/wild-pokemon').then(res => {
      console.log(res.data)
      this.setState({
        wildPokemon: res.data,
      })
    })
  }

  render() {
    const wildPokemon = this.state.wildPokemon.map(pokemon => {
      return (
        <Grass
          key={pokemon.id}
          pokemon={pokemon}
          catchPokemon={this.props.catchPokemon}
        />
      )
    })

    return <div className="finder">{wildPokemon}</div>
  }
}

export default Finder
