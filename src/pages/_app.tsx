import type { AppProps } from 'next/app'
import { ConfigProvider } from '~/contexts/config'
import '~/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp
