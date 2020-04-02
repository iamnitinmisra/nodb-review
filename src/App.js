import React, { Component } from 'react'
import Header from './components/Header'
import Finder from './components/Finder'
import Pokedex from './components/Pokedex'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      caughtPokemon: [],
    }
    this.catchPokemon = this.catchPokemon.bind(this)
    this.saveName = this.saveName.bind(this)
    this.releasePokemon = this.releasePokemon.bind(this)
  }

  componentDidMount() {}

  catchPokemon(pokemon) {}

  saveName(id, newName) {}

  releasePokemon(id) {}

  render() {
    return (
      <div className="App">
        App.js
        <Header />
        <Finder catchPokemon={this.catchPokemon} />
        <Pokedex
          caughtPokemon={this.state.caughtPokemon}
          saveName={this.saveName}
          releasePokemon={this.releasePokemon}
        />
      </div>
    )
  }
}

export default App
