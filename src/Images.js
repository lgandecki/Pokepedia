import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import Image from './Image'
import _ from 'underscore'

const style = {
  link: {
    textDecoration: 'none'
  }
}

const Images = (props) => {
  const pokemons = props.data.pokemons
  if (!pokemons)
    return null
  const randomPokemons = _.shuffle(_.sample(pokemons, 9))
  return (
    <div className='images'>
      {randomPokemons.map(pokemon =>
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`} style={style.link}>
          <Image name={pokemon.name} url={pokemon.image} className='image' />
        </Link>
      )}
    </div>
  )
}

// const ImagesWithData = graphql(gql`{
//     pokemons (first:150) {
//         id,
//         image,
//         name
//     }
// }`)(Images)

const AllPokemons = gql`
  query pokemons($first: Int!) {
    pokemons (first:$first) {
        id,
        image,
        name
    }
  }
`
const ImagesWithData = graphql(AllPokemons, {
  options: (props) => {
    // arguments from router are in props.match.params
    // e.g. pokemon/:pokemonId is under props.match.params.pokemonId
    return {
      variables: {first: 150}
    }
  }
})(Images)



export default ImagesWithData
