import { useEffect, useState } from 'react'
import { getAnimeCharacters } from 'services/anime'
import { getMortyCharacters } from 'services/morty'
import { Card, Avatar, Spin, Result, Button } from 'antd'
import styles from './index.module.css'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [characters, setCharacters] = useState([])

  useEffect(async () => {
    await getAnimeCharacters()
    .then(data => setCharacters(data))
    .catch(() => setError(true))

    await getMortyCharacters()
    .then(data => setCharacters(lastState => [...lastState, ...data]))
    .catch(() => setError(true))

    setLoading(false)
  }, [])

  if(loading) {
    return (
      <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin />
      </div>
    )
  }

  if(!characters.length) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Personagens que você procura estao em batalha no momento! Tente novamente mais tarde."
      />
    )
  }

  if(error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Erro de servico, por favor tente mais tarde!"
        extra={<Button type="primary" onClick={() => router.reload()}>Recarregar página</Button>}
      />
    )
  }

  return (
    <div className={styles.charactersList}>
      {characters.map(({ name , image }) => {
        return (
          <Card
            hoverable
            bodyStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            style={{ marginBottom: 8 }}
            key={name}
          >
            <Card.Meta
              avatar={<Avatar src={image} />}
              title={name}
            />
          </Card>
        )
      })}
    </div>
  )
}
