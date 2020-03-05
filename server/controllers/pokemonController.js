const caughtPokemon = []
let id = 0

module.exports = {
    getCaughtPokemon: (req, res) => {
        res.status(200).send(caughtPokemon)
    },
    catchPokemon: (req, res) => {
        console.log(req.body)
        const {pokemon} = req.body
        pokemon.id = id
        id++
        caughtPokemon.push(pokemon)
        res.status(200).send(caughtPokemon)
    },
    editPokemonName: (req, res) => {
        const {id} = req.params
        const {name} = req.body
        const index = caughtPokemon.findIndex(element => element.id === +id)
        caughtPokemon[index].name = name
        res.status(200).send(caughtPokemon)
    },
    releasePokemon: (req, res) => {
        const {id} = req.params
        const index = caughtPokemon.findIndex(element => element.id === +id)
        caughtPokemon.splice(index, 1)
        res.status(200).send(caughtPokemon)
    }
}