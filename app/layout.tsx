import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VERIDOUBT: The Last Question',
  description: 'A philosophical journey about truth, belief, logic, and the human condition.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
