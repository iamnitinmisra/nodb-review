const pokemon = []
let id = 0

module.exports = {
  getCaughtPokemon: (req, res) => {
    res.status(200).send(pokemon)
  },

  catchPokemon: (req, res) => {
    const { name, image } = req.body
    const newPokemon = {
      name,
      image,
      id,
    }

    pokemon.push(newPokemon)

    id++
    res.status(200).send(pokemon)
  },

  editPokemonName: (req, res) => {
    const { id } = req.params
    const { newName } = req.body

    const index = pokemon.findIndex(pokemon => {
      return pokemon.id === +id
    })

    if (index === -1) {
      return res.status(404).send('Pokemon not found')
    }

    pokemon[index].name = newName

    res.status(200).send(pokemon)
  },

  releasePokemon: (req, res) => {
    const { id } = req.params

    const index = pokemon.findIndex(pokemon => {
      return pokemon.id === +id
    })

    if (index === -1) {
      return res.status(404).send('Pokemon not found')
    }

    pokemon.splice(index, 1)

    res.status(200).send(pokemon)
  },
}
