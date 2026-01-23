import { Metadata } from 'next'
import { TamaguiProvider } from './TamaguiProvider'
import { AppQueryClientProvider } from '@my/core/providers/query-client-provider'
import '../global.css'
import '../../public/tamagui.css'

export const metadata: Metadata = {
  title: 'Tamagui + RNR demo',
  description: 'Your page description',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body suppressHydrationWarning>
        <TamaguiProvider>
          <AppQueryClientProvider>{children}</AppQueryClientProvider>
        </TamaguiProvider>
      </body>
    </html>
  )
}