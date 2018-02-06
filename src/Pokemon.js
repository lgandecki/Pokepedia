import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'

import './pokemon.css'



const Pokemon = (props) => {
  const pokemon = props.data.pokemon;

  if (!pokemon) {
    return <div>Loading...</div>
  }


  const evolutions = pokemon.evolutions && pokemon.evolutions.map(pokemon => {
    return (
      <div key={pokemon.name} className='evolution'>
        <h4>{pokemon.name}</h4>
        <div style={{backgroundImage: `url("${pokemon.image}")`}}></div>
      </div>
    )
  })

  return (
    <div className='pokemon-wrapper'>
      <div className='pokemon'>
        <h1>{pokemon.name}</h1>
        <div style={{backgroundImage: `url("${pokemon.image}")`}}></div>
      </div>
      {evolutions
        ? <h2>Evolutions</h2>
        : <h2>No evolutions</h2>}

      <div className='evolutions'>
        { evolutions}
      </div>
    </div>
  )
}

const SelectedPokemon = gql`
    query pokemons($id: String!) {
        pokemon(id: $id) {
            id, name, image, evolutions {
                image
                name
            }
        }
    }`

const PokemonWithData = graphql(SelectedPokemon,
  {
    options: (props) => {
      const pokemonId = props.match.params.pokemonId
      return {
        variables: {id: pokemonId}
      }
    }

  })(Pokemon)

export default PokemonWithData
