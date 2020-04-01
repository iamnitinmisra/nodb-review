# Suggested NoDB Review Guide - Rough Draft

## Clarify Application Concept and Wireframe
### Clarify Concept and App Specifications
- This is a Pokemon catching app
- We will be utilizing the Pokemon API for the Pokemon data
- Full CRUD
    - Get - Get any Pokemon that we have caught already
        - Get three random Pokemon to choose between from API
    - Post - Catch Pokemon and add them to our Pokedex
    - Put - Give our Pokemon a nickname
    - Delete - Release our Pokemon from our Pokedex

### Functionality and Wireframe
- We want a header with the Pokemon slogan across the top
- When the app loads, we want to see three grass images below the header
- When the grass image is clicked, a random Pokemon appears
- All or one of the grass images can be clicked to display Pokemon
- Once we choose a Pokemon, it will be added to our Pokedex and our Pokemon options will all be reset behind grass
- The Pokedex will display below the grass/Pokemon images
- Once a Pokemon is clicked, it will be added to the bottom of the Pokedex list of Pokemon caught
- When you click on the Pokemon name, an input box appears where can update the name of the Pokemon to give it a nickname
- Each Pokemon will have the option to release it from our caught list

### Component Architecture / Tree
- App.js (stateful - this.state.caughtPokemon)
    - Header (functional)
    - Finder (stateful - this.state.wildPokemon)
        - Grass (stateful - this.state.grassClicked)
    - Pokedex (functional)
        - Pokemon (stateful - this.state.editing, this.state.nickname)
    
### Endpoints
- Get - Get three random pokemon to display from API
    - This request we are going to place in our server / can also be placed in the front-end
    - This request will also trigger every time a Pokemon is caught, so it will be passed down to the Grass component via props
- Get - Get all pokemon that have been caught / in Pokedex
    - This request we are going to put in App.js
    - Put at App.js level so we have access to all of our caught Pokemon across our application
    - Want this to trigger when the component mounts
- Post - Add a new pokemon to our caughtPokemon list
    - Affecting our master caughtPokemon list so it will sit in App.js and be passed down to the Grass component via props
- Put - Change the Pokemon name / give it a nickname
    - Affecting our master caughtPokemon list so it will sit in App.js and be passed down to the Pokemon component via props
- Delete - Release Pokemon from caughtPokemon list
    - Affecting our master caughtPokemon list so it will sit in App.js and be passed down to the Pokemon component via props
    
## Begin Coding
### Initialize the Application
- Have the students run create-react-app to begin a new project

### Start by building out the server and creating first `get` endpoint
- Create a server folder
- Create an index.js file in the server folder
- Create a controllers folder in the server folder
- Create a grassController.js file in the controllers folder
- Have the students install express, axios and cors
- Code the following in the index.js file and be sure to explain the code particularly the `get` endpoint:
    ```js
        //index.js
        const express = require('express')
        const cors = require('cors')
        const grassCtrl = require('./controllers/grassController')

        const app = express()
        const PORT = 4050

        app.use(cors())
        app.use(express.json())

        app.get('/api/wild-pokemon', grassCtrl.getWildPokemon)

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    ```

- Code the following in the grassController.js file, be sure to explain the axios request and console log the data as it comes back for students to see what is going on:

    ```js
        //grassController.js
        const axios = require('axios')

        module.exports = {
            getWildPokemon: (req, res) => {
                const pokemonArray = []
                const rand1 = Math.ceil(Math.random() * 151)
                const rand2 = Math.ceil(Math.random() * 151)
                const rand3 = Math.ceil(Math.random() * 151)

                axios.get(`https://pokeapi.co/api/v2/pokemon/${rand1}`).then(response => {
                pokemonArray.push(response.data)
                axios.get(`https://pokeapi.co/api/v2/pokemon/${rand2}`).then(response => {
                    pokemonArray.push(response.data)
                    axios
                    .get(`https://pokeapi.co/api/v2/pokemon/${rand3}`)
                    .then(response => {
                        pokemonArray.push(response.data)
                        res.status(200).send(pokemonArray)
                    })
                })
                })
            }
        }
    ```

- Now the the endpoint is set up, adjust the main property in the package.json file to point to the server folder, run nodemon and test the endpoint using Postman

 ### Build out App.js framework, Header, Finder and Grass Components
- Create a Components folder in the `src` folder of the project
- Add the following files to the Components folder: Header.js, Finder.js and Grass.js
- Clear the code in App.css - making sure to leave the following:

```css
.App {
    text-align: center;
}
```

- Next, begin coding in App.js, clear out the original contents and code in the following:

```js
//App.js
import React, { Component } from 'react'
import Header from './components/Header'
import Finder from './components/Finder'
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            caughtPokemon: [],
        }
    }

    render() {
        return (
        <div className="App">
            <Header />
            <Finder/>
        </div>
        )
    }
}

export default App
```

- In Header.js, code in the following:

```js
//Header.js
import React from 'react'

function Header(props) {
    return (
        <header>
            <h1>Gotta Catch 'Em All</h1>
        </header>
    )
}

export default Header
```

- In Finder.js, code in the following:

```js
//Finder.js
import React, { Component } from 'react'
import Grass from './Grass'
import axios from 'axios'

class Finder extends Component {
    constructor() {
        super()
        this.state = {
            wildPokemon: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        axios.get('/api/wild-pokemon')
            .then(res => {
                this.setState({
                    wildPokemon: res.data,
                })
            })
    }

    render() {
        const pokemonList = this.state.wildPokemon.map(element => {
            return (
                <Grass
                key={element.id}
                pokemon={element}
                refreshFn={this.componentDidMount}
                />
            )
        })
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {pokemonList}
            </div>
        )
    }
}

export default Finder
```

- Now, send the students the pokemon-grass.png file and have them save it in an assets folder inside the public folder
- Next, let's build out the Grass.js component like so:

```js
//Grass.js
import React, { Component } from 'react'

class Grass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grassClicked: false,
        }

        this.checkGrass = this.checkGrass.bind(this)
    }

    checkGrass() {
        if (this.state.grassClicked) {
            this.props.refreshFn()
            this.setState({
                grassClicked: false,
            })
        } else {
            this.setState({
                grassClicked: true,
            })
        }
    }

    render() {
        return (
            <img
                style={{ width: '150px', height: '150px' }}
                src={
                    this.state.grassClicked
                    ? this.props.pokemon.sprites.front_default
                    : "assets/pokemon-grass.png"
                }
                alt={this.props.pokemon.name}
                onClick={this.checkGrass}
            />
        )
    }
}

export default Grass
```

- Let's take a look at our application now that we have the first pieces built in - let's run `npm start` to see what it looks like
- We should see our Header and our three grass images show up when the page loads
- We should then be able to click on each of the grass images and see a picture of a Pokemon appear
- Once we click on a Pokemon, the images should all change back to grass and a new random Pokemon should appear when we click on the grass images

- Use this as an opportunity to pause and ask students if they have any questions up to this point - take a break if it makes sense to at this point

### Build out the Pokedex and Pokemon components
- Now, let's add Pokedex.js and Pokemon.js to our Component folder
- Next, let's update the App.js component to include our Pokedex component and then pass down the caughtPokemon array from state using props

```js
//App.js
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
}

render() {
    return (
        <div className="App">
            <Header />
            <Finder />
            <Pokedex caughtPokemon={this.state.caughtPokemon} />
        </div>
    )
}
}

export default App
```

- Now, let's build out the Pokedex and Pokemon components for displaying the Pokemon that we are going to be catching

- Next, let's build out the Pokedex component, feel free to go back to the App.js component and add in a fake object to the caughtPokemon array for demonstration purposes:

```js
//Pokedex.js
import React from 'react'
import Pokemon from './Pokemon'

function Pokedex(props) {
    const pokemonList = props.caughtPokemon.map(element => {
        return (
            <Pokemon
                pokemon={element}
                key={element.id}
            />
        )
    })

    return (
        <div>
            <h2>POKEDEX</h2>
            {pokemonList}
        </div>
    )
}

export default Pokedex
```
- Now let's build out our Pokemon component, take time to talk through what is being built here and answer student questions:

```js
//Pokemon.js
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
    }

    toggleEdit() {
        this.setState({
            isEditing: !this.state.isEditing,
        })
    }

    handleChange(e) {
        this.setState({
            userInput: e.target.value,
        })
    }

    render() {
        return (
            <div>
                {this.state.isEditing ? (
                    <div>
                        <input onChange={this.handleChange} />
                        <button onClick={() => {
                            this.toggleEdit()
                        }}>
                            Save
                        </button>
                    </div>
                ) : (
                    <p onClick={this.toggleEdit}>{this.props.pokemon.name}</p>
                )}
                <img alt={this.props.pokemon.name} src={this.props.pokemon.image} />
                <button>
                    Release
                </button>
            </div>
        )
    }
}

export default Pokemon
```

- If you have added some fake data to the caughtPokemon array in App.js, you should that data show up component and image show up with a name and picture

### Build out the endpoints in `index.js` and test them using Postman
- Let's switch back over to our server and add in our other endpoints
- Direct the students to create a new file called pokemonController.js in the controller folder
- Starting with index.js, add your endpoints into the server:

```js
//index.js
const express = require('express')
const cors = require('cors')
const grassCtrl = require('./controllers/grassController')
const pokemonCtrl = require('./controllers/pokemonController')

const app = express()
const PORT = 4050

app.use(express.json())
app.use(cors())

app.get('/api/wild-pokemon', grassCtrl.getWildPokemon)

app.get('/api/pokemon', pokemonCtrl.getCaughtPokemon)
app.post('/api/pokemon', pokemonCtrl.catchPokemon)
app.put('/api/pokemon/:id', pokemonCtrl.editPokemonName)
app.delete('/api/pokemon/:id', pokemonCtrl.releasePokemon)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
```

- Now let's build out our pokemonController,js file:

```js
//pokemonController.js
const caughtPokemon = []
let id = 0

module.exports = {
    getCaughtPokemon: (req, res) => {
        res.status(200).send(caughtPokemon)
    },
    catchPokemon: (req, res) => {
        const { pokemon } = req.body
        pokemon.id = id
        id++
        caughtPokemon.push(pokemon)
        res.status(200).send(caughtPokemon)
    },
    editPokemonName: (req, res) => {
        const { id } = req.params
        const { name } = req.body
        const index = caughtPokemon.findIndex(element => {
            return element.id === +id
        })
        caughtPokemon[index].name = name
        res.status(200).send(caughtPokemon)
    },
    releasePokemon: (req, res) => {
        const { id } = req.params
        const index = caughtPokemon.findIndex(element => {
            return element.id === +id
        })
        caughtPokemon.splice(index, 1)
        res.status(200).send(caughtPokemon)
    }
}
```
- Now, let's test each of these endpoints using Postman

### Build the axios requests in App.js
- Now let's build out the axios requests in App.js and make sure to bind the functions that are going to be passed down via props:

```js
//App.js
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
    this.releasePokemon = this.releasePokemon.bind(this)
    this.saveName = this.saveName.bind(this)
}

componentDidMount() {
    axios.get('/api/pokemon').then(res => {
        this.setState({
            caughtPokemon: res.data,
        })
    })
}

catchPokemon(pokemon) {
    axios.post('/api/pokemon', { pokemon }).then(res => {
        this.setState({
            caughtPokemon: res.data,
        })
    })
}

saveName(id, newName) {
    axios.put(`/api/pokemon/${id}`, { name: newName }).then(res => {
        this.setState({
            caughtPokemon: res.data,
        })
    })
}

releasePokemon(id) {
    axios.delete(`/api/pokemon/${id}`).then(res => {
        this.setState({
            caughtPokemon: res.data,
        })
    })
}

render() {
    return (
    <div className="App">
        <Header />
        <Finder />
        <Pokedex caughtPokemon={this.state.caughtPokemon} />
    </div>
    )
}
}

export default App
```

### Connect the `post` request to the Grass component via props
- Now we are going to pass down the `catchPokemon` function to our Grass component using props
- First, we are going to pass it down to Finder from App.js

```js
//App.js
...
    <Finder catchPokemon={this.catchPokemon} />
...
```

- Next, we are going to pass it down from Finder to Grass

```js
//Finder.js
...
    <Grass
        key={element.id}
        catchPokemon={this.props.catchPokemon}
        pokemon={element}
        refreshFn={this.componentDidMount}
    />
...
```

- Finally, we are going to invoke the catchPokemon function from props in the onClick event checkGrass function in Grass:

```js
//Grass.js
...
    checkGrass() {
        if (this.state.grassClicked) {
            this.props.catchPokemon({
                name: this.props.pokemon.name,
                image: this.props.pokemon.sprites.front_default,
            })
            this.props.refreshFn()
            this.setState({
                grassClicked: false,
            })
        } else {
            this.setState({
                grassClicked: true,
            })
        }
    }
...
```

- Now, let's try to catch a randomly generated Pokemon in our actual application by testing our code in the browser

### Connect the `put` and `delete` requests to the Pokemon component via props

- Finally, let's connect our `put` and `delete` requests to the buttons in our Pokemon component

```js
//App.js
...
    <Pokedex
        saveName={this.saveName}
        releasePokemon={this.releasePokemon}
        caughtPokemon={this.state.caughtPokemon}
    />
...
```

- Next, we are going to pass these functions down from Pokedex to the Pokemon component

```js
//Pokedex.js
...
    <Pokemon
        saveName={props.saveName}
        releasePokemon={props.releasePokemon}
        pokemon={element}
        key={element.id}
    />
...
```

- Finally, let's invoke these functions as part of the onClick events in our Pokemon component

```js
//Pokemon.js
...
    return (
        <div>
            {this.state.isEditing ? (
            <div>
                <input onChange={this.handleChange} />
                <button
                onClick={() => {
                    this.props.saveName(this.props.pokemon.id, this.state.userInput)
                    this.toggleEdit()
                }}
                >
                Save
                </button>
            </div>
            ) : (
            <p onClick={this.toggleEdit}>{this.props.pokemon.name}</p>
            )}
            <img alt={this.props.pokemon.name} src={this.props.pokemon.image} />
            <button
            onClick={() => this.props.releasePokemon(this.props.pokemon.id)}
            >
            Release
            </button>
        </div>
        )
...
```

-Lastly, let's test our application in the browser and make sure it works!
