// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }

  render() {
    const {error} = this.state
    if (error) {
      return (
        <this.props.fallback error={error}/>
       
      )
    }
    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    error: null,
    status: 'idle',
    pokemon: null,
  })
  const {error, status, pokemon} = state

  React.useEffect(() => {
    if (pokemonName === '') {
      return
    } else {
      setState({
        error: null,
        status: 'pending',
        pokemon: null,
      })
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setState({
            status: 'resolved',
            pokemon: pokemonData,
          })
        })
        .catch(err => {
          setState({
            status: 'rejected',
            error: err,
          })
        })
    }
  }, [pokemonName])

  if (status === 'idle') {
    return <div>Submit a Pokemon!</div>
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  } else {
    return <div>Impossible</div>
  }
}
function FallBackErrorComponent({error}) {
  return <div>{`There was an error ${error.message}`}</div>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
 

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary fallback={FallBackErrorComponent}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App

// 🐨 Have state for the pokemon (null)
// 🐨 use React.useEffect where the callback should be called whenever the
// pokemon name changes.
// 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
// 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
// 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
// (This is to enable the loading state when switching between different pokemon.)
// 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
//   fetchPokemon('Pikachu').then(
//     pokemonData => {/* update all the state here */},
//   )
// 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
//   1. no pokemonName: 'Submit a pokemon'
//   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
//   3. pokemon: <PokemonDataView pokemon={pokemon} />

// 💣 remove this
