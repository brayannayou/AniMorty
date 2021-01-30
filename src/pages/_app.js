import 'styles/globals.css'
import '../../node_modules/antd/dist/antd.css'
import styles from './index.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.mainContainer}>
      <h1>
        Seja bem vindo ao projeto AniMorty!
      </h1>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
