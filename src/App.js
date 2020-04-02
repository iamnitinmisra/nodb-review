import React, { Component } from 'react'
import Header from './components/Header'
import Finder from './components/Finder'
import Pokedex from './components/Pokedex'
import axios from 'axios'
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

  componentDidMount() {
    axios.get('/api/pokemon').then(res => {
      this.setState({
        caughtPokemon: res.data,
      })
    })
  }

  catchPokemon(pokemon) {
    axios.post('/api/pokemon', pokemon).then(res => {
      this.setState({
        caughtPokemon: res.data,
      })
    })
  }

  saveName(id, newName) {
    axios.put(`/api/pokemon/${id}`, { newName }).then(res => {
      this.setState({
        caughtPokemon: res.data,
      })
    })
  }

  releasePokemon(id) {}

  render() {
    return (
      <div className="App">
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
