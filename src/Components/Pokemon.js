import React, {Component} from 'react'

class Pokemon extends Component {
    constructor(){
        super()
        this.state = {
            isEditing: false,
            userInput: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    toggleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleChange(event){
        this.setState({
            userInput: event.target.value
        })
    }

    render(){
        return(
            <div>
                {this.state.isEditing ? (
                    <div>
                        <input onChange={(event) => this.handleChange(event)}/>
                        <button
                            onClick={() => {
                                this.props.saveName(this.props.pokemon.id, this.state.userInput)
                                this.toggleEdit()
                            }}
                        >
                            Save
                        </button>
                    </div>
                ):(
                <p onClick={this.toggleEdit}>
                    {this.props.pokemon.name}
                </p>
                )}
                <img 
                    src={this.props.pokemon.image}
                    alt={this.props.pokemon.name}
                />
                <button
                    onClick={() => this.props.releasePokemon(this.props.pokemon.id)}
                >Release</button>
            </div>
        )
    }
}

export default Pokemon