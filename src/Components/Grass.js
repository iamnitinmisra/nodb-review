import React, {Component} from 'react'

class Grass extends Component{
    constructor(){
        super()
        this.state = {
            grassClicked: false
        }
    }

    checkGrass = () => {
        if (this.state.grassClicked){
            this.props.catchPokemon({
                name: this.props.pokemon.name,
                image: this.props.pokemon.sprites.front_default
            })
            this.props.refreshFn()
            this.setState({
                grassClicked: false
            })
        } else {
            this.setState({
                grassClicked: true
            })
        }
    }

    render(){
        return(
            <img
                className='grass-img'
                src = {
                    this.state.grassClicked
                    ? this.props.pokemon.sprites.front_default
                    : "assets/pokemon-grass.png"
                }
                alt = {this.props.pokemon.name}
                onClick={this.checkGrass}
            />
        )
    }
}

export default Grass