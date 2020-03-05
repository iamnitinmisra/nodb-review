import React, {Component} from 'react'
import Header from './Components/Header'
import Finder from './Components/Finder'
import Pokedex from './Components/Pokedex'
import './App.css'

class App extends Component {
  constructor(){
    super()
    this.state = {
      caughtPokemon: [{id: 1, name: 'bulbasaur', image: 'test'}]
    }
  }

  render(){
    return(
      <div className='App'>
        <Header />
        <Finder />
        <Pokedex caughtPokemon={this.state.caughtPokemon}/>
      </div>
    )
  }
}

export default App
