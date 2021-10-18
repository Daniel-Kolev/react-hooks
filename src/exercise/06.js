// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import { ErrorBoundary } from 'react-error-boundary'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) return
    
    setPokemon(null)
    setError(null)
    fetchPokemon(pokemonName).then(
      (pokemonData) => { setPokemon(pokemonData) },
      (error) => setError(error))
  }, [pokemonName])

  if (error) throw error

  if (!pokemonName) return 'Submit a pokemon'
  else if (!pokemon) return <PokemonInfoFallback name={pokemonName} />
  else return <PokemonDataView pokemon={pokemon} /> 
}

function ErrorFallback ({error}) {
  return <div role="alert">
      There was an error: 
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
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
        <ErrorBoundary 
        FallbackComponent={ErrorFallback} 
        resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
