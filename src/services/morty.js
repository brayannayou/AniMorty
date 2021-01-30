import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import _get from 'lodash/get'

const clientMortyAPI = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
  });
  
  const mortyCharactersQuery = gql`
    query {
      characters {
        results {
          name,
          image
        }
      }
    }
  `

const getMortyCharacters = () => {
    return clientMortyAPI.query({ query: mortyCharactersQuery })
    .then(data => _get(data, 'data.characters.results', []))
}

export { getMortyCharacters }
