import type { Metadata } from 'next'
import ClientWrapper from './ClientWrapper'

export const metadata: Metadata = {
  title: 'VERIDOUBT: The Last Question',
  description: 'A philosophical journey about truth, belief, logic, doubt, identity, God, science, and the human condition.',
  keywords: ['philosophy', 'truth', 'doubt', 'veridoubt', 'last question', 'consciousness'],
  openGraph: {
    title: 'VERIDOUBT: The Last Question',
    description: 'A philosophical journey about truth, belief, and the human condition.',
    type: 'website',
  },
}

export default function Home() {
  return <ClientWrapper />
}
