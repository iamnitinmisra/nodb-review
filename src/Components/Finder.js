import React, {Component} from 'react'
import Grass from './Grass'
import axios from 'axios'

class Finder extends Component {
    constructor(){
        super()
        this.state = {
            wildPokemon: []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:4060/api/wild-pokemon')
            .then(res => {
                this.setState({
                    wildPokemon: res.data
                })
            })
    }

    render(){
        const pokemonList = this.state.wildPokemon.map(element => {
            return <Grass 
                        key={element.id}
                        pokemon={element}
                        refreshFn={this.componentDidMount}
                    />
        })
        return(
            <div className='finder-box'>
                {pokemonList}
            </div>
        )
    }
}

export default Finder