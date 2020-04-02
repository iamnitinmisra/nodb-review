const axios = require('axios')

module.exports = {
  getWildPokemon: (req, res) => {
    const pokemon = []
    const random1 = Math.ceil(Math.random() * 151)
    const random2 = Math.ceil(Math.random() * 151)
    const random3 = Math.ceil(Math.random() * 151)

    axios.get(`https://pokeapi.co/api/v2/pokemon/${random1}`).then(response => {
      pokemon.push(response.data)
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${random2}`)
        .then(response => {
          pokemon.push(response.data)
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${random3}`)
            .then(response => {
              pokemon.push(response.data)

              res.status(200).send(pokemon)
            })
        })
    })
  },
}
