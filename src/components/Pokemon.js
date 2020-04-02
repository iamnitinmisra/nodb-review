import React, { Component } from 'react'

class Pokemon extends Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      userInput: '',
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSaveName = this.handleSaveName.bind(this)
  }

  toggleEdit() {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  handleChange(event) {
    this.setState({
      userInput: event.target.value,
    })
  }

  handleSaveName() {
    this.props.saveName(this.props.pokemon.id, this.state.userInput)
    this.toggleEdit()
  }

  render() {
    return (
      <div>
        {/*
          if(this.state.isEditing === true){
            return <div>
              <input/>
              <button>Cancel</button>
              <button>Save</button>
            </div>
          } else {
            return <p>{this.props.pokemon.name}</p>
          }
        */}
        {this.state.isEditing ? (
          <div>
            <input onChange={this.handleChange} />
            <button onClick={this.toggleEdit}>Cancel</button>
            <button onClick={this.handleSaveName}>Save</button>
          </div>
        ) : (
          <p onDoubleClick={this.toggleEdit}>{this.props.pokemon.name}</p>
        )}
        <img alt={this.props.pokemon.name} src={this.props.pokemon.image} />
      </div>
    )
  }
}

export default Pokemon
