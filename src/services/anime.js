import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import _get from 'lodash/get'

const clientAnilist = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache(),
});


const animeCharactersQuery = gql`
  query {
    Page{
      characters {
          name {
            full
          },
          image {
            medium
          }
      }
    }
  }
`

const getAnimeCharacters = () => {
    return clientAnilist.query({ query: animeCharactersQuery })
    .then(data => {
        const characters = _get(data, 'data.Page.characters', [])
        
        return characters.map(({ name: { full }, image: { medium } }) => ({ name: full, image: medium }))
    })
}

export { getAnimeCharacters }
