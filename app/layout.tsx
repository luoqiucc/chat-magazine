import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Chat Magazine',
  description: 'Chat Magazine',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
