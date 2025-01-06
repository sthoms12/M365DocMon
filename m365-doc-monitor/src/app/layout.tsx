import { Inter } from 'next/font/google'
import RootLayout from '@/components/layout/RootLayout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'M365 Doc Monitor',
  description: 'Monitor and manage M365 documentation synchronization',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}